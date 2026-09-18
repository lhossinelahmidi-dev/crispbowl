import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts } from '@/lib/blog';
import { BlogCard } from '@/components/BlogCard';
import { Newsletter } from '@/components/Newsletter';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Kitchen Blog & Guides | CrispBowl',
  description: 'Practical kitchen guides, meal prep strategies, ingredient storage tips, and honest culinary stories from the CrispBowl kitchen.',
  alternates: {
    canonical: 'https://crispbowl.com/blog',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const featuredPost = posts.find(p => p.featured) || posts[0];

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block bg-orange-100/80 text-[#FF6B35] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Articles, Tips & Stories
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            The CrispBowl Kitchen Journal
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Essential kitchen equipment guides, realistic meal prep routines, and pantry hacks to help you cook with confidence.
          </p>
        </div>

        {/* Featured Post Hero Card */}
        {featuredPost && (
          <div className="mb-16">
            <Link 
              href={`/blog/${featuredPost.slug}`}
              className="group block bg-gray-50 rounded-3xl overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 relative h-72 sm:h-96 w-full overflow-hidden">
                  <Image 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FF6B35] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow">
                      Featured Guide
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-5 p-8 sm:p-10 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-semibold text-gray-400">
                    <span className="text-[#FF6B35] uppercase">{featuredPost.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {featuredPost.readingTime}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold">
                    <span className="text-gray-500">By {featuredPost.author}</span>
                    <span className="text-[#FF6B35] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                      Read Full Guide <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-8 pb-3 border-b border-gray-100">
            All Articles & Tips ({posts.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

      </div>

      <Newsletter />
    </div>
  );
}
