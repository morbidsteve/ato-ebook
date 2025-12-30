import { getHomeContent, getChapters, getTemplates } from '@/lib/mdx';
import MDXContent from '@/components/MDXContent';
import Link from 'next/link';

export default function HomePage() {
  const { content } = getHomeContent();
  const chapters = getChapters();
  const templates = getTemplates();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero section */}
      <div className="mb-12 pb-8 border-b border-slate-200">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-teal-700 bg-teal-100 rounded-full mb-4">
          Federal DevSecOps Guide
        </span>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          ATO in Days, Not Years
        </h1>
        <p className="text-xl text-slate-600">
          The Kubernetes Playbook for Continuous Federal Compliance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-slate-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-teal-600">90</div>
          <div className="text-sm text-slate-600">Days to ATO</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-teal-600">50+</div>
          <div className="text-sm text-slate-600">Control Mappings</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-teal-600">25</div>
          <div className="text-sm text-slate-600">Evidence Scripts</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-teal-600">5</div>
          <div className="text-sm text-slate-600">Ready Templates</div>
        </div>
      </div>

      {/* Main content */}
      <MDXContent content={content} />

      {/* Chapter cards */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Chapters</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {chapters.map((chapter, index) => (
            <Link
              key={chapter.slug}
              href={`/${chapter.slug}`}
              className="block p-6 bg-white border border-slate-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="text-xs font-semibold text-teal-600 mb-2">
                Chapter {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-teal-700 mb-2">
                {chapter.title.replace(/^Chapter \d+:\s*/, '')}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                {chapter.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Template cards */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Templates & Resources</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Link
              key={template.slug}
              href={`/templates/${template.slug}`}
              className="block p-5 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all group"
            >
              <div className="text-xs font-semibold text-emerald-600 mb-2">
                Template
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-teal-700">
                {template.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
