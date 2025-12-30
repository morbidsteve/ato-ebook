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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length && index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 150);
    }
  }, [slides.length, currentSlide]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

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
        const textStyles = {
          sm: 'text-sm text-slate-500',
          md: 'text-lg text-slate-700',
          lg: 'text-2xl text-slate-800',
          xl: 'text-3xl text-slate-900 tracking-tight',
        };
        return (
          <p
            key={index}
            className={`${textStyles[content.size || 'md']} ${content.bold ? 'font-bold' : ''} ${content.italic ? 'italic' : ''} leading-relaxed`}
          >
            {content.text}
          </p>
        );

      case 'bullet':
        return (
          <ul key={index} className="space-y-3">
            {content.items.map((item, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 group-hover:scale-125 transition-transform" />
                <span className="text-lg text-slate-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        );

      case 'numbered':
        return (
          <ol key={index} className="space-y-4">
            {content.items.map((item, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform">
                  {i + 1}
                </span>
                <span className="flex-1 text-lg text-slate-700 leading-relaxed pt-1">{item}</span>
              </li>
            ))}
          </ol>
        );

      case 'table':
        return (
          <div key={index} className="overflow-hidden rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">
                  {content.headers.map((header, i) => (
                    <th key={i} className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {content.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="bg-white hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-transparent transition-colors">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-6 py-4 text-slate-700">
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
        const styles = {
          teal: 'from-teal-500 to-emerald-500 shadow-teal-500/25',
          red: 'from-red-500 to-rose-500 shadow-red-500/25',
          amber: 'from-amber-500 to-orange-500 shadow-amber-500/25',
          green: 'from-green-500 to-emerald-500 shadow-green-500/25',
        };
        return (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${styles[content.color || 'teal']} p-6 shadow-xl`}
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            <p className="relative text-xl font-bold text-white drop-shadow-sm">
              {content.text}
            </p>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          </div>
        );

      case 'spacer':
        return <div key={index} className="h-6" />;

      default:
        return null;
    }
  };

  const isTitleSlide = slide.layout === 'title' || slide.layout === 'conclusion';

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative'} bg-slate-900`}>
      {/* Controls Bar */}
      <div className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-1.5">
            <span className="text-sm font-medium text-slate-300">
              {currentSlide + 1}
            </span>
            <span className="text-slate-500">/</span>
            <span className="text-sm text-slate-400">{slides.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              showNotes
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-4 py-1.5 text-sm font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
          >
            {isFullscreen ? 'Exit' : 'Fullscreen'}
          </button>
          {onDownload && (
            <button
              onClick={onDownload}
              className="px-4 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-400 hover:to-emerald-400 transition-all shadow-lg shadow-teal-500/25 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              PPTX
            </button>
          )}
        </div>
      </div>

      {/* Slide Content */}
      <div className={`${isFullscreen ? 'h-[calc(100vh-96px)]' : 'aspect-[16/9]'} relative overflow-hidden`}>
        {/* Background */}
        {isTitleSlide ? (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-100/50 via-transparent to-transparent" />
          </div>
        )}

        {/* Slide Container */}
        <div className={`absolute inset-0 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {isTitleSlide ? (
            /* Title/Conclusion Slide Layout */
            <div className="h-full flex flex-col items-center justify-center text-center px-12">
              <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-2xl text-teal-400 font-medium mb-8">{slide.subtitle}</p>
              )}
              <div className="space-y-4 max-w-3xl">
                {slide.content.map((content, index) => {
                  if (content.type === 'text') {
                    const sizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl', xl: 'text-3xl' };
                    return (
                      <p key={index} className={`${sizes[content.size || 'md']} ${content.bold ? 'font-bold' : ''} ${content.italic ? 'italic' : ''} text-slate-300`}>
                        {content.text}
                      </p>
                    );
                  }
                  if (content.type === 'highlight') {
                    return (
                      <div key={index} className="inline-block mt-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 shadow-2xl shadow-teal-500/30">
                        <p className="text-2xl font-bold text-white">{content.text}</p>
                      </div>
                    );
                  }
                  if (content.type === 'spacer') {
                    return <div key={index} className="h-4" />;
                  }
                  return null;
                })}
              </div>
            </div>
          ) : (
            /* Content Slide Layout */
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="relative px-12 py-8">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                <h2 className="relative text-3xl font-bold text-white tracking-tight">{slide.title}</h2>
                {slide.subtitle && (
                  <p className="relative text-lg text-teal-400 mt-1">{slide.subtitle}</p>
                )}
              </div>

              {/* Body */}
              <div className="flex-1 px-12 py-8 overflow-auto">
                <div className="space-y-6 max-w-4xl">
                  {slide.content.map((content, index) => renderContent(content, index))}
                </div>
              </div>

              {/* Footer Accent */}
              <div className="h-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500" />
            </div>
          )}
        </div>

        {/* Slide Number Badge */}
        <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/50">
          <span className="text-sm font-bold text-white">{currentSlide + 1}</span>
          <span className="text-sm text-slate-400"> / {slides.length}</span>
        </div>
      </div>

      {/* Speaker Notes */}
      {showNotes && slide.notes && (
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-700/50 px-6 py-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <p className="text-slate-300 leading-relaxed">{slide.notes}</p>
          </div>
        </div>
      )}

      {/* Thumbnail Navigation */}
      <div className="bg-slate-900/95 backdrop-blur-sm border-t border-slate-700/50 p-3 overflow-x-auto">
        <div className="flex gap-2">
          {slides.map((s, index) => (
            <button
              key={s.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-28 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                index === currentSlide
                  ? 'ring-2 ring-teal-500 ring-offset-2 ring-offset-slate-900 scale-105'
                  : 'opacity-60 hover:opacity-100 hover:scale-102'
              }`}
            >
              <div className={`w-full h-full p-2 ${
                s.layout === 'title' || s.layout === 'conclusion'
                  ? 'bg-gradient-to-br from-slate-700 to-slate-800'
                  : 'bg-gradient-to-br from-slate-100 to-white'
              }`}>
                <div className={`w-full h-1.5 rounded-full mb-1 ${
                  s.layout === 'title' || s.layout === 'conclusion'
                    ? 'bg-slate-600'
                    : 'bg-slate-300'
                }`} />
                <p className={`text-[8px] font-medium truncate ${
                  s.layout === 'title' || s.layout === 'conclusion'
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }`}>
                  {s.title}
                </p>
                <div className={`mt-1 space-y-0.5 ${
                  s.layout === 'title' || s.layout === 'conclusion' ? 'hidden' : ''
                }`}>
                  <div className="w-3/4 h-1 rounded-full bg-slate-200" />
                  <div className="w-1/2 h-1 rounded-full bg-slate-200" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard hints */}
      {isFullscreen && (
        <div className="absolute bottom-20 right-6 flex gap-2 text-xs text-slate-500">
          <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700">←</kbd>
          <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700">→</kbd>
          <span className="px-2 py-1">Navigate</span>
          <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700">ESC</kbd>
          <span className="px-2 py-1">Exit</span>
        </div>
      )}
    </div>
  );
}
