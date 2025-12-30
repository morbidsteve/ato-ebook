import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');

export interface ContentMeta {
  title: string;
  description?: string;
  slug: string;
  order?: number;
}

export interface ContentItem {
  meta: ContentMeta;
  content: string;
}

function extractTitleFromContent(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
}

function extractDescriptionFromContent(content: string): string {
  // Look for the first paragraph after the title
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---') && !trimmed.startsWith('>')) {
      return trimmed.slice(0, 160);
    }
  }
  return '';
}

export function getChapters(): ContentMeta[] {
  const chaptersDir = path.join(contentDirectory, 'chapters');
  const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

  return files.map((filename, index) => {
    const filePath = path.join(chaptersDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const slug = filename.replace(/\.md$/, '');

    return {
      title: data.title || extractTitleFromContent(content),
      description: data.description || extractDescriptionFromContent(content),
      slug,
      order: index + 1,
    };
  }).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getTemplates(): ContentMeta[] {
  const templatesDir = path.join(contentDirectory, 'templates');
  const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.md') && f !== 'home.md');

  return files.map((filename) => {
    const filePath = path.join(templatesDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const slug = filename.replace(/\.md$/, '');

    return {
      title: data.title || extractTitleFromContent(content),
      description: data.description || extractDescriptionFromContent(content),
      slug,
    };
  });
}

export function getChapter(slug: string): ContentItem | null {
  const filePath = path.join(contentDirectory, 'chapters', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    meta: {
      title: data.title || extractTitleFromContent(content),
      description: data.description || extractDescriptionFromContent(content),
      slug,
    },
    content,
  };
}

export function getTemplate(slug: string): ContentItem | null {
  const filePath = path.join(contentDirectory, 'templates', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    meta: {
      title: data.title || extractTitleFromContent(content),
      description: data.description || extractDescriptionFromContent(content),
      slug,
    },
    content,
  };
}

export function getHomeContent(): ContentItem {
  const filePath = path.join(contentDirectory, 'home.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    meta: {
      title: data.title || extractTitleFromContent(content),
      description: data.description || extractDescriptionFromContent(content),
      slug: 'home',
    },
    content,
  };
}
