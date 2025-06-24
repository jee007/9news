
import { getArticles } from '@/lib/data';
import { BookmarkFeed } from '@/components/bookmark-feed';
import type { CountryCode } from '@/lib/types';

export default async function BookmarksPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined }}) {
  const country = searchParams?.country as CountryCode | undefined;
  const articles = await getArticles(country);
  return (
    <div>
        <h1 className="text-3xl font-headline font-bold mb-6">Your Bookmarks</h1>
        <BookmarkFeed articles={articles} />
    </div>
  )
}
