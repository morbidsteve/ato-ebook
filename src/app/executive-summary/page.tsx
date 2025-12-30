import { getExecutiveSummary } from '@/lib/mdx';
import MDXContent from '@/components/MDXContent';
import DownloadPDFButton from '@/components/DownloadPDFButton';
import Link from 'next/link';

export const metadata = {
  title: 'Executive Summary | ATO in Days',
  description: 'Two-page executive summary: Modernizing Federal Authorization from Fragmented Compliance to Continuous ATO',
};

export default function ExecutiveSummaryPage() {
  const { content } = getExecutiveSummary();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="text-sm text-slate-500 hover:text-teal-600">
          ← Back to Home
        </Link>
      </div>

      {/* Executive Summary indicator */}
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full">
          Executive Summary
        </span>
        <span className="text-sm text-slate-500">Two-Page Brief for Leadership</span>
      </div>

      {/* Download PDF button */}
      <div className="mb-8 print:hidden">
        <DownloadPDFButton filename="executive-summary.pdf" label="Download PDF" />
      </div>

      {/* Content */}
      <article className="print:text-sm">
        <MDXContent content={content} />
      </article>
    </div>
  );
}
