import { getChapter, getChapters } from '@/lib/mdx';
import MDXContent from '@/components/MDXContent';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const chapters = getChapters();
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapter(slug);

  if (!chapter) {
    return { title: 'Not Found' };
  }

  return {
    title: `${chapter.meta.title} | ATO in Days`,
    description: chapter.meta.description,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapter(slug);

  if (!chapter) {
    notFound();
  }

  const chapters = getChapters();
  const currentIndex = chapters.findIndex(c => c.slug === slug);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-slate-500 hover:text-teal-600">
          ← Back to Home
        </Link>
      </div>

      {/* Chapter indicator */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-teal-700 bg-teal-100 rounded-full">
          Chapter {currentIndex + 1}
        </span>
      </div>

      {/* Content */}
      <article>
        <MDXContent content={chapter.content} />
      </article>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="flex justify-between items-center">
          {prevChapter ? (
            <Link
              href={`/${prevChapter.slug}`}
              className="group flex flex-col items-start"
            >
              <span className="text-xs text-slate-500 mb-1">← Previous</span>
              <span className="text-sm font-medium text-slate-700 group-hover:text-teal-600">
                {prevChapter.title.replace(/^Chapter \d+:\s*/, '')}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextChapter ? (
            <Link
              href={`/${nextChapter.slug}`}
              className="group flex flex-col items-end text-right"
            >
              <span className="text-xs text-slate-500 mb-1">Next →</span>
              <span className="text-sm font-medium text-slate-700 group-hover:text-teal-600">
                {nextChapter.title.replace(/^Chapter \d+:\s*/, '')}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
