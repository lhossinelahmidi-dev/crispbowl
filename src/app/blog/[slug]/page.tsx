import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BlogCard } from '@/components/BlogCard';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post Not Found | CrispBowl' };
  }

  const title = `${post.title} | CrispBowl Blog`;
  const url = `https://crispbowl.com/blog/${params.slug}`;

  return {
    title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' },
    { label: post.title, url: `/blog/${post.slug}` },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: [post.image],
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CrispBowl',
      logo: {
        '@type': 'ImageObject',
        url: 'https://crispbowl.com/placeholder.svg'
      }
    }
  };

  const contentSections = post.content
    .split('\n\n')
    .filter(p => p.trim().length > 0);

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="max-w-3xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />

        <header className="my-8">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#FF6B35] mb-3">
            <span>{post.category}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 font-normal flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900 leading-[1.2] tracking-tight mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {post.description}
          </p>

          <div className="flex items-center gap-3.5 py-4 border-y border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B35] text-white flex items-center justify-center font-serif font-black text-sm shadow-sm">
              CB
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">{post.author}</div>
              <div className="text-xs text-gray-400">
                Published {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        </header>

        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden mb-12 shadow-md">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Body */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
          {contentSections.map((section, idx) => {
            const clean = section.trim();
            if (clean.startsWith('### ')) {
              return (
                <h3 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-3">
                  {clean.replace('### ', '')}
                </h3>
              );
            }
            if (clean.startsWith('## ')) {
              return (
                <h2 key={idx} className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100">
                  {clean.replace('## ', '')}
                </h2>
              );
            }
            if (clean.startsWith('- ')) {
              const items = clean.split('\n').filter(i => i.trim().startsWith('- '));
              return (
                <ul key={idx} className="space-y-2 list-disc pl-6 text-gray-700 my-4">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item.replace(/^- \*\*|^- /, '').replace(/\*\*:/, ':')}</li>
                  ))}
                </ul>
              );
            }
            if (/^\d+\./.test(clean)) {
              const items = clean.split('\n').filter(i => /^\d+\./.test(i.trim()));
              return (
                <ol key={idx} className="space-y-2.5 list-decimal pl-6 text-gray-700 my-4">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item.replace(/^\d+\.\s*/, '')}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={idx} className="text-gray-700 text-lg leading-relaxed mb-4">
                {clean}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-gray-100 text-gray-600 font-medium px-3 py-1 rounded-full hover:bg-orange-50 hover:text-[#FF6B35] transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Continue Reading
              </h2>
              <Link href="/blog" className="text-sm font-semibold text-[#FF6B35] hover:underline">
                All Guides →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map(p => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
