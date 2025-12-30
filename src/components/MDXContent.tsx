import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MDXContentProps {
  content: string;
}

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-slate-900 mt-8 mb-4 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4 pb-2 border-b border-slate-200">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-slate-700 mt-4 mb-2">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-6 space-y-2 mb-4 text-slate-600">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-6 space-y-2 mb-4 text-slate-600">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-teal-500 pl-4 py-2 my-4 bg-teal-50 text-slate-700 italic">{children}</blockquote>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
              );
            }
            return (
              <code className={className}>{children}</code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto mb-4 text-sm font-mono">{children}</pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-50">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-slate-600 border-t border-slate-200">{children}</td>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-teal-600 hover:text-teal-800 underline underline-offset-2">{children}</a>
          ),
          hr: () => (
            <hr className="my-8 border-slate-200" />
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-800">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
