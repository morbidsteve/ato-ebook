'use client';

import { executiveSummarySlides } from '@/lib/presentation-data';
import SlideViewer from '@/components/SlideViewer';
import Link from 'next/link';

export default function PresentationPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-500 hover:text-teal-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Executive Brief Presentation</h1>
              <p className="text-sm text-slate-500">Modernizing Federal Authorization</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/executive-summary"
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900"
            >
              View Document
            </Link>
            <a
              href="/ato-executive-brief.pptx"
              download
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PowerPoint
            </a>
          </div>
        </div>
      </div>

      {/* Slide Viewer */}
      <div className="max-w-6xl mx-auto py-6 px-4">
        <SlideViewer slides={executiveSummarySlides} />
      </div>

      {/* Instructions */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900 mb-2">Keyboard Shortcuts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
            <div><kbd className="px-2 py-1 bg-slate-100 rounded">→</kbd> or <kbd className="px-2 py-1 bg-slate-100 rounded">Space</kbd> Next slide</div>
            <div><kbd className="px-2 py-1 bg-slate-100 rounded">←</kbd> Previous slide</div>
            <div><kbd className="px-2 py-1 bg-slate-100 rounded">F</kbd> Toggle fullscreen</div>
            <div><kbd className="px-2 py-1 bg-slate-100 rounded">Esc</kbd> Exit fullscreen</div>
          </div>
        </div>
      </div>
    </div>
  );
}
