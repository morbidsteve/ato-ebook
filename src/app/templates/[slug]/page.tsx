import { getTemplate, getTemplates } from '@/lib/mdx';
import MDXContent from '@/components/MDXContent';
import DownloadPDFButton from '@/components/DownloadPDFButton';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const templates = getTemplates();
  return templates.map((template) => ({
    slug: template.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const template = getTemplate(slug);

  if (!template) {
    return { title: 'Not Found' };
  }

  return {
    title: `${template.meta.title} | ATO in Days`,
    description: template.meta.description,
  };
}

export default async function TemplatePage({ params }: PageProps) {
  const { slug } = await params;
  const template = getTemplate(slug);

  if (!template) {
    notFound();
  }

  const templates = getTemplates();
  const currentIndex = templates.findIndex(t => t.slug === slug);
  const prevTemplate = currentIndex > 0 ? templates[currentIndex - 1] : null;
  const nextTemplate = currentIndex < templates.length - 1 ? templates[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-slate-500 hover:text-teal-600">
          ← Back to Home
        </Link>
      </div>

      {/* Template indicator */}
      <div className="mb-6 flex items-center gap-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full">
          Template
        </span>
        {slug === 'briefing-deck' && (
          <DownloadPDFButton filename="ao-briefing-deck.pdf" label="Download PDF" />
        )}
      </div>

      {/* Content */}
      <article>
        <MDXContent content={template.content} />
      </article>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="flex justify-between items-center">
          {prevTemplate ? (
            <Link
              href={`/templates/${prevTemplate.slug}`}
              className="group flex flex-col items-start"
            >
              <span className="text-xs text-slate-500 mb-1">← Previous Template</span>
              <span className="text-sm font-medium text-slate-700 group-hover:text-teal-600">
                {prevTemplate.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextTemplate ? (
            <Link
              href={`/templates/${nextTemplate.slug}`}
              className="group flex flex-col items-end text-right"
            >
              <span className="text-xs text-slate-500 mb-1">Next Template →</span>
              <span className="text-sm font-medium text-slate-700 group-hover:text-teal-600">
                {nextTemplate.title}
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
