'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  title: string;
  slug: string;
  href: string;
}

interface MobileNavProps {
  chapters: NavItem[];
  templates: NavItem[];
}

export default function MobileNav({ chapters, templates }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-slate-900">
          ATO in Days
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-600 hover:text-slate-900"
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-16 overflow-y-auto h-full">
          <nav className="space-y-8">
            {/* Introduction */}
            <div>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/'
                    ? 'bg-teal-100 text-teal-800'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Introduction
              </Link>
            </div>

            {/* Chapters */}
            <div>
              <h2 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Chapters
              </h2>
              <ul className="space-y-1">
                {chapters.map((chapter, index) => (
                  <li key={chapter.slug}>
                    <Link
                      href={chapter.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                        pathname === chapter.href
                          ? 'bg-teal-100 text-teal-800 font-medium'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className="text-slate-400 mr-2">{index + 1}.</span>
                      {chapter.title.replace(/^Chapter \d+:\s*/, '')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Templates */}
            <div>
              <h2 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Templates
              </h2>
              <ul className="space-y-1">
                {templates.map((template) => (
                  <li key={template.slug}>
                    <Link
                      href={template.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                        pathname === template.href
                          ? 'bg-teal-100 text-teal-800 font-medium'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {template.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
