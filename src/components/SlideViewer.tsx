'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Slide, SlideContent } from '@/lib/presentation-data';

interface SlideViewerProps {
  slides: Slide[];
  onDownload?: () => void;
}

// Icon components
const Icons: Record<string, React.ReactNode> = {
  speed: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  money: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  grid: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
  clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
  recycle: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  apps: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
  warning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
  doc: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  sync: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
  robot: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  queue: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
  chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  platform: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />,
  inherit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />,
  auto: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
  continuous: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
};

const Icon = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {Icons[name] || Icons.check}
  </svg>
);

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
      }, 200);
    }
  }, [slides.length, currentSlide]);

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
      else if (e.key === 'Escape') setIsFullscreen(false);
      else if (e.key === 'f' || e.key === 'F') setIsFullscreen(!isFullscreen);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isFullscreen]);

  const slide = slides[currentSlide];
  const isDark = slide.background === 'dark' || slide.background === 'gradient';

  const renderContent = (content: SlideContent, index: number) => {
    switch (content.type) {
      case 'text':
        const sizes = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl', xl: 'text-3xl', '2xl': 'text-4xl' };
        const aligns = { left: 'text-left', center: 'text-center', right: 'text-right' };
        return (
          <p key={index} className={`${sizes[content.size || 'md']} ${aligns[content.align || 'center']} ${content.bold ? 'font-bold' : ''} ${content.italic ? 'italic' : ''} ${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
            {content.text}
          </p>
        );

      case 'stats-row':
        return (
          <div key={index} className="grid grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
            {content.stats.map((stat, i) => (
              <div key={i} className={`relative group ${isDark ? 'bg-white/10' : 'bg-gradient-to-br from-slate-800 to-slate-900'} rounded-2xl p-6 text-center overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                {stat.icon && (
                  <div className={`mx-auto mb-3 w-12 h-12 rounded-xl ${isDark ? 'bg-teal-500/30' : 'bg-teal-500'} flex items-center justify-center`}>
                    <Icon name={stat.icon} className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className={`text-4xl font-black ${isDark ? 'text-white' : 'text-white'} mb-1`}>{stat.value}</div>
                <div className={`text-sm font-medium ${isDark ? 'text-teal-300' : 'text-teal-400'} uppercase tracking-wider`}>{stat.label}</div>
              </div>
            ))}
          </div>
        );

      case 'comparison':
        return (
          <div key={index} className="grid grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
            {[content.left, content.right].map((side, i) => (
              <div key={i} className={`rounded-2xl p-6 ${side.color === 'red' ? 'bg-gradient-to-br from-red-500/10 to-red-600/10 border-2 border-red-500/30' : 'bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border-2 border-emerald-500/30'}`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${side.color === 'red' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {side.color === 'red' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  )}
                  {side.title}
                </h3>
                <ul className="space-y-3">
                  {side.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-300">
                      <span className={`w-2 h-2 rounded-full ${side.color === 'red' ? 'bg-red-400' : 'bg-emerald-400'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'diagram':
        if (content.variant === 'flow') {
          return (
            <div key={index} className="flex items-center justify-center gap-2 w-full max-w-5xl mx-auto flex-wrap">
              {content.data.map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl px-5 py-3 text-white font-medium text-center shadow-lg border border-slate-600">
                    {item}
                  </div>
                  {i < content.data.length - 1 && (
                    <svg className="w-8 h-8 text-teal-400 mx-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          );
        }
        if (content.variant === 'stack') {
          return (
            <div key={index} className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
              {content.data.map((item, i) => (
                <div key={i} className="w-full">
                  <div className={`rounded-xl px-6 py-4 text-center font-bold text-white shadow-lg ${
                    i === 0 ? 'bg-gradient-to-r from-teal-500 to-emerald-500' :
                    i === 1 ? 'bg-gradient-to-r from-slate-600 to-slate-700 border-2 border-teal-500/50' :
                    i === 2 ? 'bg-gradient-to-r from-slate-700 to-slate-800' :
                    'bg-gradient-to-r from-slate-800 to-slate-900'
                  }`}>
                    {item}
                  </div>
                  {i < content.data.length - 1 && (
                    <div className="flex justify-center">
                      <svg className="w-6 h-6 text-teal-400 my-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        }
        if (content.variant === 'hub') {
          return (
            <div key={index} className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold shadow-2xl border-4 border-red-400">
                  <span className="text-center text-sm">Siloed<br/>Approach</span>
                </div>
              </div>
              {content.data.map((item, i) => {
                const angle = (i * 360 / content.data.length - 90) * Math.PI / 180;
                const x = 50 + 38 * Math.cos(angle);
                const y = 50 + 38 * Math.sin(angle);
                return (
                  <div key={i} className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ left: `${x}%`, top: `${y}%` }}>
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white text-xs font-medium shadow-lg border border-slate-600 p-2 text-center">
                      {item}
                    </div>
                  </div>
                );
              })}
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                {content.data.map((_, i) => {
                  const angle = (i * 360 / content.data.length - 90) * Math.PI / 180;
                  const x = 50 + 25 * Math.cos(angle);
                  const y = 50 + 25 * Math.sin(angle);
                  return <line key={i} x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`} stroke="#ef4444" strokeWidth="2" strokeDasharray="4" opacity="0.5" />;
                })}
              </svg>
            </div>
          );
        }
        if (content.variant === 'timeline') {
          return (
            <div key={index} className="relative w-full max-w-4xl mx-auto py-8">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 transform -translate-y-1/2" />
              <div className="flex justify-between relative">
                {content.data.map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/30 border-4 border-slate-900 z-10">
                      {i + 1}
                    </div>
                    <div className="mt-4 text-center">
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return null;

      case 'icon-box':
        const boxColors: Record<string, string> = {
          red: 'from-red-500/20 to-red-600/20 border-red-500/50',
          green: 'from-emerald-500/20 to-teal-600/20 border-emerald-500/50',
          teal: 'from-teal-500/20 to-emerald-600/20 border-teal-500/50',
        };
        return (
          <div key={index} className={`w-full max-w-2xl mx-auto rounded-2xl p-6 bg-gradient-to-br ${boxColors[content.color || 'teal']} border-2`}>
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${content.color === 'red' ? 'bg-red-500' : 'bg-teal-500'} flex items-center justify-center`}>
                <Icon name={content.icon} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">{content.title}</h4>
                <p className="text-slate-300">{content.description}</p>
              </div>
            </div>
          </div>
        );

      case 'highlight':
        const hlColors = {
          teal: 'from-teal-500 to-emerald-500',
          red: 'from-red-500 to-rose-500',
          amber: 'from-amber-500 to-orange-500',
          green: 'from-green-500 to-emerald-500',
        };
        return (
          <div key={index} className={`w-full max-w-3xl mx-auto rounded-2xl bg-gradient-to-r ${hlColors[content.color || 'teal']} p-6 shadow-xl`}>
            <p className="text-xl font-bold text-white text-center">{content.text}</p>
          </div>
        );

      case 'quote':
        return (
          <div key={index} className="w-full max-w-3xl mx-auto text-center">
            <svg className="w-16 h-16 text-teal-500/50 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className={`text-3xl font-medium italic ${isDark ? 'text-white' : 'text-slate-700'} leading-relaxed`}>{content.text}</p>
            {content.author && <p className="mt-4 text-teal-400 font-medium">— {content.author}</p>}
          </div>
        );

      case 'cta':
        return (
          <div key={index} className="text-center">
            <h2 className="text-5xl font-black text-white mb-4 leading-tight">{content.text}</h2>
            {content.subtext && <p className="text-2xl text-teal-400 font-medium">{content.subtext}</p>}
          </div>
        );

      case 'table':
        return (
          <div key={index} className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-red-500">
                  <th className="px-6 py-4 text-left text-lg font-bold text-white">{content.headers[0]}</th>
                  <th className="px-6 py-4 text-left text-lg font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500">{content.headers[1]}</th>
                </tr>
              </thead>
              <tbody>
                {content.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/50'}>
                    <td className="px-6 py-4 text-slate-400 border-r border-slate-700">{row[0]}</td>
                    <td className="px-6 py-4 text-emerald-300 font-medium">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'spacer':
        const spacerSizes = { sm: 'h-4', md: 'h-8', lg: 'h-12' };
        return <div key={index} className={spacerSizes[content.size || 'md']} />;

      default:
        return null;
    }
  };

  const bgClasses: Record<string, string> = {
    dark: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    light: 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800',
    gradient: 'bg-gradient-to-br from-slate-900 via-teal-900/30 to-slate-900',
    accent: 'bg-gradient-to-br from-teal-900/50 via-slate-900 to-emerald-900/50',
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative'} bg-slate-900`}>
      {/* Controls */}
      <div className="bg-slate-900/95 backdrop-blur border-b border-slate-700/50 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-1.5">
            <span className="text-sm font-bold text-white">{currentSlide + 1}</span>
            <span className="text-slate-500">/</span>
            <span className="text-sm text-slate-400">{slides.length}</span>
          </div>
          <div className="flex gap-1">
            <button onClick={prevSlide} disabled={currentSlide === 0} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 transition-all">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 transition-all">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowNotes(!showNotes)} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${showNotes ? 'bg-teal-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>Notes</button>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="px-4 py-1.5 text-sm font-medium rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700">{isFullscreen ? 'Exit' : 'Fullscreen'}</button>
          {onDownload && (
            <button onClick={onDownload} className="px-4 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              PPTX
            </button>
          )}
        </div>
      </div>

      {/* Slide */}
      <div className={`${isFullscreen ? 'h-[calc(100vh-96px)]' : 'aspect-[16/9]'} relative overflow-hidden ${bgClasses[slide.background || 'dark']}`}>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-12 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Title */}
          {slide.title && (
            <div className="text-center mb-8">
              <h1 className="text-5xl font-black text-white mb-2 tracking-tight">{slide.title}</h1>
              {slide.subtitle && <p className="text-2xl text-teal-400 font-medium">{slide.subtitle}</p>}
            </div>
          )}

          {/* Content */}
          <div className="w-full flex-1 flex flex-col items-center justify-center gap-6">
            {slide.content.map((content, i) => renderContent(content, i))}
          </div>
        </div>

        {/* Slide number */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/50">
          <span className="text-sm font-bold text-white">{currentSlide + 1}</span>
          <span className="text-sm text-slate-400"> / {slides.length}</span>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
          <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
        </div>
      </div>

      {/* Notes */}
      {showNotes && slide.notes && (
        <div className="bg-slate-800 border-t border-slate-700 px-6 py-4">
          <p className="text-slate-300"><span className="text-teal-400 font-medium">Notes:</span> {slide.notes}</p>
        </div>
      )}

      {/* Thumbnails */}
      <div className="bg-slate-900 border-t border-slate-700/50 p-3 overflow-x-auto">
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button key={s.id} onClick={() => goToSlide(i)} className={`flex-shrink-0 w-24 h-14 rounded-lg overflow-hidden transition-all ${i === currentSlide ? 'ring-2 ring-teal-500 ring-offset-2 ring-offset-slate-900' : 'opacity-50 hover:opacity-100'}`}>
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 p-2">
                <p className="text-[7px] font-medium text-white truncate">{s.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
