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

      {/* Action buttons */}
      <div className="mb-8 print:hidden flex flex-wrap gap-3">
        <DownloadPDFButton filename="executive-summary.pdf" label="Download PDF" />
        <Link
          href="/presentation"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          View as Presentation
        </Link>
      </div>

      {/* Content */}
      <article className="print:text-sm">
        <MDXContent content={content} />
      </article>
    </div>
  );
}
