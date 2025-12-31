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
      gradient1: '0f766e',
      gradient2: '14532d',
      accent: '0ea5e9',
    };

    // Background colors based on slide type
    const getBgColor = (bg?: string) => {
      switch (bg) {
        case 'dark': return COLORS.navy;
        case 'gradient': return COLORS.gradient1;
        case 'accent': return COLORS.accent;
        default: return COLORS.white;
      }
    };

    const getTextColor = (bg?: string) => {
      return bg === 'dark' || bg === 'gradient' || bg === 'accent' ? COLORS.white : COLORS.darkGray;
    };

    // Generate slides
    executiveSummarySlides.forEach((slideData) => {
      const slide = pptx.addSlide();
      const bgColor = getBgColor(slideData.background);
      const textColor = getTextColor(slideData.background);

      // Full slide background
      slide.addShape('rect', {
        x: 0, y: 0, w: '100%', h: '100%',
        fill: { color: bgColor },
      });

      // Add title
      const titleY = slideData.layout === 'title' || slideData.layout === 'big-statement' ? 1.5 : 0.3;
      slide.addText(slideData.title, {
        x: 0.5, y: titleY, w: '90%', h: 0.6,
        fontSize: slideData.layout === 'title' || slideData.layout === 'big-statement' ? 36 : 28,
        bold: true,
        color: textColor,
        align: slideData.layout === 'title' || slideData.layout === 'big-statement' ? 'center' : 'left',
      });

      let yPos = titleY + 0.8;

      // Add subtitle if present
      if (slideData.subtitle) {
        slide.addText(slideData.subtitle, {
          x: 0.5, y: yPos, w: '90%', h: 0.4,
          fontSize: 18, color: COLORS.teal,
          align: slideData.layout === 'title' || slideData.layout === 'big-statement' ? 'center' : 'left',
        });
        yPos += 0.6;
      }

      // Render content
      slideData.content.forEach((content) => {
        switch (content.type) {
          case 'text':
            const fontSize = content.size === '2xl' ? 24 : content.size === 'xl' ? 20 : content.size === 'lg' ? 16 : content.size === 'sm' ? 11 : 13;
            slide.addText(content.text, {
              x: 0.5, y: yPos, w: '90%', h: 0.5,
              fontSize,
              bold: content.bold,
              italic: content.italic,
              color: textColor,
              align: content.align || 'left',
            });
            yPos += 0.6;
            break;

          case 'stats-row':
            const statWidth = 9 / content.stats.length;
            content.stats.forEach((stat, idx) => {
              const xPos = 0.5 + idx * statWidth;
              // Stat box background
              slide.addShape('rect', {
                x: xPos + 0.1, y: yPos, w: statWidth - 0.2, h: 1.2,
                fill: { color: slideData.background === 'dark' ? '2d4a6f' : COLORS.lightGray },
                line: { color: COLORS.teal, pt: 2 },
              });
              // Stat value
              slide.addText(stat.value, {
                x: xPos + 0.1, y: yPos + 0.15, w: statWidth - 0.2, h: 0.5,
                fontSize: 32, bold: true, color: COLORS.teal, align: 'center',
              });
              // Stat label
              slide.addText(stat.label, {
                x: xPos + 0.1, y: yPos + 0.7, w: statWidth - 0.2, h: 0.4,
                fontSize: 11, color: textColor, align: 'center',
              });
            });
            yPos += 1.5;
            break;

          case 'comparison':
            const colWidth = 4.3;
            // Left column
            slide.addShape('rect', {
              x: 0.5, y: yPos, w: colWidth, h: 2.5,
              fill: { color: content.left.color === 'red' ? 'fee2e2' : 'dcfce7' },
            });
            slide.addText(content.left.title, {
              x: 0.7, y: yPos + 0.1, w: colWidth - 0.4, h: 0.4,
              fontSize: 16, bold: true, color: content.left.color === 'red' ? COLORS.red : COLORS.green,
            });
            content.left.items.forEach((item, idx) => {
              slide.addText(`• ${item}`, {
                x: 0.7, y: yPos + 0.55 + idx * 0.4, w: colWidth - 0.4, h: 0.35,
                fontSize: 12, color: COLORS.darkGray,
              });
            });
            // Right column
            slide.addShape('rect', {
              x: 5.2, y: yPos, w: colWidth, h: 2.5,
              fill: { color: content.right.color === 'red' ? 'fee2e2' : 'dcfce7' },
            });
            slide.addText(content.right.title, {
              x: 5.4, y: yPos + 0.1, w: colWidth - 0.4, h: 0.4,
              fontSize: 16, bold: true, color: content.right.color === 'red' ? COLORS.red : COLORS.green,
            });
            content.right.items.forEach((item, idx) => {
              slide.addText(`• ${item}`, {
                x: 5.4, y: yPos + 0.55 + idx * 0.4, w: colWidth - 0.4, h: 0.35,
                fontSize: 12, color: COLORS.darkGray,
              });
            });
            yPos += 2.8;
            break;

          case 'diagram':
            if (content.variant === 'flow' || content.variant === 'timeline') {
              // Horizontal flow/timeline
              const boxW = 1.4;
              const totalW = content.data.length * boxW + (content.data.length - 1) * 0.3;
              const startX = (10 - totalW) / 2;
              content.data.forEach((item, idx) => {
                const x = startX + idx * (boxW + 0.3);
                slide.addShape('rect', {
                  x, y: yPos, w: boxW, h: 0.8,
                  fill: { color: content.variant === 'timeline' ? COLORS.teal : COLORS.navy },
                });
                slide.addText(item, {
                  x, y: yPos + 0.15, w: boxW, h: 0.5,
                  fontSize: 10, color: COLORS.white, align: 'center', valign: 'middle',
                });
                // Arrow between boxes
                if (idx < content.data.length - 1) {
                  slide.addText('→', {
                    x: x + boxW, y: yPos + 0.15, w: 0.3, h: 0.5,
                    fontSize: 18, color: COLORS.teal, align: 'center',
                  });
                }
              });
              yPos += 1.2;
            } else if (content.variant === 'stack') {
              // Vertical stack
              const stackW = 6;
              const stackX = (10 - stackW) / 2;
              content.data.forEach((item, idx) => {
                const color = idx === 0 ? COLORS.teal : idx === content.data.length - 1 ? COLORS.navy : COLORS.gradient1;
                slide.addShape('rect', {
                  x: stackX, y: yPos + idx * 0.6, w: stackW, h: 0.55,
                  fill: { color },
                });
                slide.addText(item, {
                  x: stackX, y: yPos + idx * 0.6 + 0.1, w: stackW, h: 0.35,
                  fontSize: 12, color: COLORS.white, align: 'center',
                });
              });
              yPos += content.data.length * 0.6 + 0.3;
            } else if (content.variant === 'hub') {
              // Hub diagram - center with surrounding nodes
              slide.addShape('ellipse', {
                x: 4, y: yPos, w: 2, h: 1,
                fill: { color: COLORS.navy },
              });
              slide.addText('Current State', {
                x: 4, y: yPos + 0.3, w: 2, h: 0.4,
                fontSize: 11, color: COLORS.white, align: 'center',
              });
              // Surrounding nodes
              const positions = [
                { x: 1.5, y: yPos - 0.3 },
                { x: 6.5, y: yPos - 0.3 },
                { x: 1.5, y: yPos + 0.8 },
                { x: 6.5, y: yPos + 0.8 },
              ];
              content.data.forEach((item, idx) => {
                if (idx < 4) {
                  const pos = positions[idx];
                  slide.addShape('rect', {
                    x: pos.x, y: pos.y, w: 1.8, h: 0.6,
                    fill: { color: COLORS.red },
                  });
                  slide.addText(item, {
                    x: pos.x, y: pos.y + 0.15, w: 1.8, h: 0.3,
                    fontSize: 10, color: COLORS.white, align: 'center',
                  });
                }
              });
              yPos += 1.8;
            }
            break;

          case 'icon-box':
            const boxColor = content.color === 'red' ? 'fee2e2' : 'fef3c7';
            const iconTextColor = content.color === 'red' ? COLORS.red : COLORS.amber;
            slide.addShape('rect', {
              x: 1, y: yPos, w: 8, h: 1,
              fill: { color: boxColor },
            });
            slide.addText(content.title, {
              x: 1.2, y: yPos + 0.1, w: 7.6, h: 0.35,
              fontSize: 14, bold: true, color: iconTextColor,
            });
            slide.addText(content.description, {
              x: 1.2, y: yPos + 0.5, w: 7.6, h: 0.4,
              fontSize: 11, color: COLORS.darkGray,
            });
            yPos += 1.3;
            break;

          case 'quote':
            slide.addText(`"${content.text}"`, {
              x: 1, y: yPos, w: 8, h: 1,
              fontSize: 18, italic: true, color: textColor, align: 'center',
            });
            if (content.author) {
              slide.addText(`— ${content.author}`, {
                x: 1, y: yPos + 1, w: 8, h: 0.4,
                fontSize: 12, color: COLORS.teal, align: 'center',
              });
              yPos += 1.5;
            } else {
              yPos += 1.2;
            }
            break;

          case 'cta':
            slide.addShape('rect', {
              x: 1.5, y: yPos, w: 7, h: 1.5,
              fill: { color: COLORS.teal },
            });
            slide.addText(content.text, {
              x: 1.5, y: yPos + 0.3, w: 7, h: 0.6,
              fontSize: 22, bold: true, color: COLORS.white, align: 'center',
            });
            if (content.subtext) {
              slide.addText(content.subtext, {
                x: 1.5, y: yPos + 0.9, w: 7, h: 0.4,
                fontSize: 14, color: COLORS.white, align: 'center',
              });
            }
            yPos += 1.8;
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

          case 'bullet':
            content.items.forEach((item) => {
              slide.addText([
                { text: '• ', options: { color: COLORS.teal } },
                { text: item },
              ], {
                x: 0.5, y: yPos, w: '90%', h: 0.35,
                fontSize: 12, color: textColor,
              });
              yPos += 0.35;
            });
            break;

          case 'numbered':
            content.items.forEach((item, idx) => {
              slide.addText(`${idx + 1}. ${item}`, {
                x: 0.5, y: yPos, w: '90%', h: 0.45,
                fontSize: 11, color: textColor,
              });
              yPos += 0.45;
            });
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
            const hlColor = content.color || 'teal';
            slide.addShape('rect', {
              x: 0.5, y: yPos, w: 9, h: 0.5,
              fill: { color: bgColors[hlColor] },
            });
            slide.addText(content.text, {
              x: 0.7, y: yPos + 0.08, w: 8.6, h: 0.35,
              fontSize: 13, bold: true, color: textColors[hlColor],
            });
            yPos += 0.6;
            break;

          case 'spacer':
            const spacerSize = content.size === 'lg' ? 0.5 : content.size === 'md' ? 0.35 : 0.2;
            yPos += spacerSize;
            break;
        }
      });

      // Add slide number
      slide.addText(`${slideData.id} / ${executiveSummarySlides.length}`, {
        x: 8.5, y: 5.2, w: 1, h: 0.3,
        fontSize: 10, color: textColor === COLORS.white ? 'ffffff80' : '33415580', align: 'right',
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
