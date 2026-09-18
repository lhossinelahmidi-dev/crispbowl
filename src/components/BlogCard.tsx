import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="h-full flex flex-col group">
      <Link 
        href={`/blog/${post.slug}`} 
        className="block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100/80 flex flex-col h-full transform hover:-translate-y-1.5"
      >
        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
          
          <div className="absolute top-4 left-4 flex gap-1.5">
            <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#FF6B35] shadow-sm uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 bg-black/65 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{post.readingTime}</span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="text-xs text-gray-400 mb-2 font-medium">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>

          <h3 className="font-serif text-xl font-bold text-gray-900 mb-2.5 line-clamp-2 group-hover:text-[#FF6B35] transition-colors leading-snug">
            {post.title}
          </h3>

          <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow">
            {post.description}
          </p>

          <div className="flex items-center justify-between text-xs font-semibold pt-4 border-t border-gray-100 mt-auto">
            <span className="text-gray-400">{post.author}</span>
            <span className="text-[#FF6B35] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Read Article <span>→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default BlogCard;
