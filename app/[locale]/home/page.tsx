import { redirect } from 'next/navigation';
import { buildHomeMetadata } from './HomePage';

export { buildHomeMetadata as generateMetadata };

export default async function HomePageRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
