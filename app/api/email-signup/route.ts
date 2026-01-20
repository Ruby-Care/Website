import { createHash } from 'crypto';
import { NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type MailchimpMember = {
  status?: string;
};

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

  let body: { email?: string } | null = null;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Invalid JSON.' }, { status: 400 });
  }

  const rawEmail = body?.email ?? '';
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

  return NextResponse.json({ status: 'subscribed' });
}
