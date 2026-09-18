import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  category: string;
  readingTime: string;
  tags: string[];
  featured?: boolean;
  content: string;
}

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  
  const posts: BlogPost[] = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled Post',
        description: data.description || '',
        date: data.date || '2024-05-20',
        author: data.author || 'CrispBowl Editorial',
        image: data.image || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        category: data.category || 'Kitchen Tips',
        readingTime: data.readingTime || '5 min read',
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: Boolean(data.featured),
        content,
      };
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const all = getAllBlogPosts();
    return all.find(p => p.slug === slug) || null;
  } catch (e) {
    return null;
  }
}
