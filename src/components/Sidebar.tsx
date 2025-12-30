'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  title: string;
  slug: string;
  href: string;
}

interface SidebarProps {
  chapters: NavItem[];
  templates: NavItem[];
}

export default function Sidebar({ chapters, templates }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-slate-50 overflow-y-auto">
      <div className="p-6">
        <Link href="/" className="block mb-8">
          <h1 className="text-lg font-bold text-slate-900">ATO in Days</h1>
          <p className="text-xs text-slate-500">Kubernetes Compliance Playbook</p>
        </Link>

        <nav className="space-y-8">
          {/* Introduction */}
          <div className="space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-teal-100 text-teal-800'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Introduction
            </Link>
            <Link
              href="/executive-summary"
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/executive-summary'
                  ? 'bg-amber-100 text-amber-800'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              Executive Summary
            </Link>
            <Link
              href="/presentation"
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                pathname === '/presentation'
                  ? 'bg-purple-100 text-purple-800'
                  : 'text-purple-700 hover:bg-purple-50'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Presentation
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
    </aside>
  );
}
