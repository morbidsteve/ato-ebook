'use client';

import { executiveSummarySlides } from '@/lib/presentation-data';
import SlideViewer from '@/components/SlideViewer';
import Link from 'next/link';

export default function PresentationPage() {
  const handleDownload = async () => {
    // Dynamically import pptxgenjs only when needed (client-side)
    const PptxGenJS = (await import('pptxgenjs')).default;

    const pptx = new PptxGenJS();

    // Set presentation properties
    pptx.author = 'ATO in Days';
    pptx.title = 'Modernizing Federal Authorization';
    pptx.subject = 'Executive Brief for Leadership';

    // Color scheme
    const COLORS = {
      navy: '1e3a5f',
      teal: '0d9488',
      white: 'ffffff',
      lightGray: 'f1f5f9',
      darkGray: '334155',
      green: '16a34a',
      red: 'dc2626',
      amber: 'd97706',
    };

    // Generate slides
    executiveSummarySlides.forEach((slideData) => {
      const slide = pptx.addSlide();

      // Add header bar
      slide.addShape('rect', {
        x: 0, y: 0, w: '100%', h: 0.8,
        fill: { color: COLORS.navy },
      });

      // Add footer bar
      slide.addShape('rect', {
        x: 0, y: '93%', w: '100%', h: '7%',
        fill: { color: COLORS.teal },
      });

      // Add title
      slide.addText(slideData.title, {
        x: 0.3, y: 0.15, w: '90%', h: 0.5,
        fontSize: 24, bold: true, color: COLORS.white,
      });

      let yPos = 1.1;

      // Add subtitle if present
      if (slideData.subtitle) {
        slide.addText(slideData.subtitle, {
          x: 0.5, y: yPos, w: '90%', h: 0.4,
          fontSize: 16, color: COLORS.teal,
        });
        yPos += 0.5;
      }

      // Render content
      slideData.content.forEach((content) => {
        switch (content.type) {
          case 'text':
            const fontSize = content.size === 'xl' ? 20 : content.size === 'lg' ? 16 : content.size === 'sm' ? 11 : 13;
            slide.addText(content.text, {
              x: 0.5, y: yPos, w: '90%', h: 0.4,
              fontSize,
              bold: content.bold,
              italic: content.italic,
              color: COLORS.darkGray,
            });
            yPos += 0.45;
            break;

          case 'bullet':
            content.items.forEach((item) => {
              slide.addText([
                { text: '• ', options: { color: COLORS.teal } },
                { text: item },
              ], {
                x: 0.5, y: yPos, w: '90%', h: 0.35,
                fontSize: 12, color: COLORS.darkGray,
              });
              yPos += 0.35;
            });
            break;

          case 'numbered':
            content.items.forEach((item, idx) => {
              slide.addText(`${idx + 1}. ${item}`, {
                x: 0.5, y: yPos, w: '90%', h: 0.45,
                fontSize: 11, color: COLORS.darkGray,
              });
              yPos += 0.45;
            });
            break;

          case 'table':
            const tableRows = [
              content.headers.map(h => ({ text: h, options: { bold: true, fill: { color: COLORS.navy }, color: COLORS.white } })),
              ...content.rows.map(row => row.map(cell => ({ text: cell })))
            ];
            slide.addTable(tableRows, {
              x: 0.5, y: yPos, w: 9,
              colW: Array(content.headers.length).fill(9 / content.headers.length),
              fill: { color: COLORS.lightGray },
              border: { color: COLORS.navy, pt: 1 },
              fontFace: 'Arial',
              fontSize: 10,
              align: 'left',
              valign: 'middle',
            });
            yPos += 0.4 * (content.rows.length + 1) + 0.3;
            break;

          case 'highlight':
            const bgColors: Record<string, string> = {
              teal: 'ccfbf1',
              red: 'fee2e2',
              amber: 'fef3c7',
              green: 'dcfce7',
            };
            const textColors: Record<string, string> = {
              teal: '0f766e',
              red: 'b91c1c',
              amber: 'b45309',
              green: '15803d',
            };
            const color = content.color || 'teal';
            slide.addShape('rect', {
              x: 0.5, y: yPos, w: 9, h: 0.5,
              fill: { color: bgColors[color] },
            });
            slide.addText(content.text, {
              x: 0.7, y: yPos + 0.08, w: 8.6, h: 0.35,
              fontSize: 13, bold: true, color: textColors[color],
            });
            yPos += 0.6;
            break;

          case 'spacer':
            yPos += 0.25;
            break;
        }
      });

      // Add speaker notes if present
      if (slideData.notes) {
        slide.addNotes(slideData.notes);
      }
    });

    // Download the file
    pptx.writeFile({ fileName: 'ato-executive-brief.pptx' });
  };

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
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PowerPoint
            </button>
          </div>
        </div>
      </div>

      {/* Slide Viewer */}
      <div className="max-w-6xl mx-auto py-6 px-4">
        <SlideViewer slides={executiveSummarySlides} onDownload={handleDownload} />
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
