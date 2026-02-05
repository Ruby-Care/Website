import { createHash } from 'crypto';
import { NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type MailchimpMember = {
  status?: string;
};

const localeTags = new Set(['de', 'en', 'pl']);

function getLocaleTag(locale: string | undefined) {
  if (!locale) {
    return null;
  }
  const normalized = locale.trim().toLowerCase();
  return localeTags.has(normalized) ? normalized : null;
}

function getLocaleFromReferer(referer: string | null) {
  if (!referer) {
    return null;
  }
  try {
    const url = new URL(referer);
    const [firstSegment] = url.pathname.replace(/^\/+/, '').split('/');
    return getLocaleTag(firstSegment);
  } catch (error) {
    return null;
  }
}

async function updateMemberTags({
  baseUrl,
  audienceId,
  subscriberHash,
  headers,
  tag,
}: {
  baseUrl: string;
  audienceId: string;
  subscriberHash: string;
  headers: Record<string, string>;
  tag: string | null;
}) {
  if (!tag) {
    return { ok: true };
  }

  const tagResponse = await fetch(`${baseUrl}/lists/${audienceId}/members/${subscriberHash}/tags`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      tags: [{ name: tag, status: 'active' }],
    }),
  });

  return tagResponse;
}

export async function POST(request: Request) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return NextResponse.json(
      { status: 'error', message: 'Missing Mailchimp configuration.' },
      { status: 500 }
    );
  }

  const dataCenter = apiKey.split('-')[1];
  if (!dataCenter) {
    return NextResponse.json(
      { status: 'error', message: 'Invalid Mailchimp API key.' },
      { status: 500 }
    );
  }

  let body: { email?: string; locale?: string } | null = null;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Invalid JSON.' }, { status: 400 });
  }

  const rawEmail = body?.email ?? '';
  const localeTag = getLocaleTag(body?.locale) ?? getLocaleFromReferer(request.headers.get('referer'));
  const normalizedEmail = rawEmail.trim().toLowerCase();

  if (!emailPattern.test(normalizedEmail)) {
    return NextResponse.json({ status: 'invalid_email' }, { status: 400 });
  }

  const subscriberHash = createHash('md5').update(normalizedEmail).digest('hex');
  const baseUrl = `https://${dataCenter}.api.mailchimp.com/3.0`;
  const authHeader = `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`;

  const headers = {
    Authorization: authHeader,
    'Content-Type': 'application/json',
  };

  const memberResponse = await fetch(`${baseUrl}/lists/${audienceId}/members/${subscriberHash}`, {
    headers,
  });

  if (memberResponse.ok) {
    const member = (await memberResponse.json()) as MailchimpMember;
    if (member.status === 'subscribed') {
      const tagResponse = await updateMemberTags({
        baseUrl,
        audienceId,
        subscriberHash,
        headers,
        tag: localeTag,
      });

      if (!tagResponse.ok) {
        return NextResponse.json({ status: 'error' }, { status: 502 });
      }

      return NextResponse.json({ status: 'already_subscribed' });
    }

    const updateResponse = await fetch(`${baseUrl}/lists/${audienceId}/members/${subscriberHash}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        email_address: normalizedEmail,
        status: 'subscribed',
      }),
    });

    if (!updateResponse.ok) {
      return NextResponse.json({ status: 'error' }, { status: 502 });
    }

    const tagResponse = await updateMemberTags({
      baseUrl,
      audienceId,
      subscriberHash,
      headers,
      tag: localeTag,
    });

    if (!tagResponse.ok) {
      return NextResponse.json({ status: 'error' }, { status: 502 });
    }

    return NextResponse.json({ status: 'subscribed' });
  }

  if (memberResponse.status !== 404) {
    return NextResponse.json({ status: 'error' }, { status: 502 });
  }

  const createResponse = await fetch(`${baseUrl}/lists/${audienceId}/members`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email_address: normalizedEmail,
      status: 'subscribed',
    }),
  });

  if (!createResponse.ok) {
    return NextResponse.json({ status: 'error' }, { status: 502 });
  }

  const tagResponse = await updateMemberTags({
    baseUrl,
    audienceId,
    subscriberHash,
    headers,
    tag: localeTag,
  });

  if (!tagResponse.ok) {
    return NextResponse.json({ status: 'error' }, { status: 502 });
  }

  return NextResponse.json({ status: 'subscribed' });
}
