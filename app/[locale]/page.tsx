import { HomeContent, buildHomeMetadata } from './home/HomePage';

export { buildHomeMetadata as generateMetadata };

export default async function RootPage() {
  return <HomeContent />;
}
