'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Slide, SlideContent } from '@/lib/presentation-data';

interface SlideViewerProps {
  slides: Slide[];
  onDownload?: () => void;
}

export default function SlideViewer({ slides, onDownload }: SlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen(!isFullscreen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isFullscreen]);

  const slide = slides[currentSlide];

  const renderContent = (content: SlideContent, index: number) => {
    switch (content.type) {
      case 'text':
        const textSizes = {
          sm: 'text-sm',
          md: 'text-base',
          lg: 'text-xl',
          xl: 'text-2xl',
        };
        return (
          <p
            key={index}
            className={`${textSizes[content.size || 'md']} ${content.bold ? 'font-bold' : ''} ${content.italic ? 'italic' : ''} text-slate-700`}
          >
            {content.text}
          </p>
        );

      case 'bullet':
        return (
          <ul key={index} className="space-y-2 ml-4">
            {content.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="text-teal-600 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );

      case 'numbered':
        return (
          <ol key={index} className="space-y-3 ml-4">
            {content.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 text-white text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ol>
        );

      case 'table':
        return (
          <div key={index} className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  {content.headers.map((header, i) => (
                    <th key={i} className="px-4 py-2 text-left font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2 border-b border-slate-200 text-slate-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'highlight':
        const colors = {
          teal: 'bg-teal-100 border-teal-500 text-teal-800',
          red: 'bg-red-100 border-red-500 text-red-800',
          amber: 'bg-amber-100 border-amber-500 text-amber-800',
          green: 'bg-green-100 border-green-500 text-green-800',
        };
        return (
          <div
            key={index}
            className={`px-4 py-3 rounded-lg border-l-4 ${colors[content.color || 'teal']} font-medium`}
          >
            {content.text}
          </div>
        );

      case 'spacer':
        return <div key={index} className="h-4" />;

      default:
        return null;
    }
  };

  const getLayoutClasses = (layout: Slide['layout']) => {
    switch (layout) {
      case 'title':
        return 'flex flex-col items-center justify-center text-center';
      case 'conclusion':
        return 'flex flex-col items-center justify-center text-center';
      default:
        return 'flex flex-col justify-start';
    }
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'relative'}`}>
      {/* Controls Bar */}
      <div className="bg-slate-800 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-1 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="p-1 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1 text-sm rounded ${showNotes ? 'bg-teal-600' : 'bg-slate-700'} hover:bg-teal-500`}
          >
            Notes
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-3 py-1 text-sm rounded bg-slate-700 hover:bg-slate-600"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          {onDownload && (
            <button
              onClick={onDownload}
              className="px-3 py-1 text-sm rounded bg-teal-600 hover:bg-teal-500 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PPTX
            </button>
          )}
        </div>
      </div>

      {/* Slide Content */}
      <div className={`${isFullscreen ? 'h-[calc(100vh-96px)]' : 'aspect-[16/9]'} bg-white relative overflow-hidden`}>
        {/* Slide Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-slate-800 flex items-center px-8">
          <h2 className="text-xl font-bold text-white">{slide.title}</h2>
        </div>

        {/* Slide Body */}
        <div className={`absolute top-16 left-0 right-0 bottom-8 px-8 py-6 ${getLayoutClasses(slide.layout)}`}>
          {slide.subtitle && (
            <p className="text-lg text-teal-600 font-medium mb-4">{slide.subtitle}</p>
          )}
          <div className="space-y-4 w-full max-w-4xl">
            {slide.content.map((content, index) => renderContent(content, index))}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-teal-600" />
      </div>

      {/* Speaker Notes */}
      {showNotes && slide.notes && (
        <div className="bg-slate-100 border-t border-slate-200 px-4 py-3">
          <p className="text-sm text-slate-600">
            <span className="font-semibold">Speaker Notes:</span> {slide.notes}
          </p>
        </div>
      )}

      {/* Thumbnail Navigation */}
      <div className="bg-slate-100 border-t border-slate-200 p-2 overflow-x-auto">
        <div className="flex gap-2">
          {slides.map((s, index) => (
            <button
              key={s.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-24 h-14 rounded border-2 transition-all ${
                index === currentSlide
                  ? 'border-teal-500 ring-2 ring-teal-200'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
            >
              <div className="w-full h-full bg-white rounded overflow-hidden p-1">
                <div className="w-full h-2 bg-slate-800 rounded-t" />
                <p className="text-[6px] text-slate-600 truncate px-1 mt-1">{s.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      {isFullscreen && (
        <div className="absolute bottom-12 right-4 text-xs text-slate-400">
          ← → Navigate | F Fullscreen | ESC Exit
        </div>
      )}
    </div>
  );
}
