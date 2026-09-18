import Link from 'next/link'
import Image from 'next/image'
import { Hero } from '@/components/Hero'
import RecipeCard from '@/components/RecipeCard'
import { Newsletter } from '@/components/Newsletter'
import { getAllRecipes, getCategories } from '@/lib/recipes'
import { getAllBlogPosts } from '@/lib/blog'
import { BlogCard } from '@/components/BlogCard'

export default async function Home() {
  const recipes = await getAllRecipes()
  const blogPosts = getAllBlogPosts().slice(0, 3)
  const trendingRecipes = recipes.slice(0, 3)
  const quickRecipes = recipes.filter(r => r.prepTime + r.cookTime <= 30).slice(0, 3)
  const dinnerRecipes = recipes.filter(r => r.category.toLowerCase() === 'dinner').slice(0, 3)
  const categories = await getCategories()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "CrispBowl - Fresh Recipes, Bold Flavors",
    "description": "Discover fresh recipes and bold flavors on CrispBowl.",
    "url": "https://crispbowl.com"
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://crispbowl.com"
    }]
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }} />
      
      <h1 className="sr-only">CrispBowl - Fresh Recipes and Bold Flavors</h1>
      
      {/* 1. Magazine Editorial Hero */}
      <Hero />
      
      {/* 2. Popular Categories (Clean Text Design, No Emojis) */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">Explore</span>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mt-1">Popular Categories</h2>
          </div>
          <Link href="/recipes" className="text-sm font-semibold text-[#FF6B35] hover:underline flex items-center gap-1">
            Browse All Categories <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
          {categories.slice(0, 6).map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/category/${cat.slug}`}
              className="group p-5 rounded-2xl bg-gray-50/90 hover:bg-[#FF6B35] border border-gray-200/70 text-left transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between h-28"
            >
              <div className="font-serif font-bold text-gray-900 text-lg group-hover:text-white transition-colors">
                {cat.name}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 group-hover:text-orange-100 transition-colors font-medium">
                <span>{cat.description || "Fresh recipes"}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trending Now (Featured Grid) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">What's Cooking</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mt-1">Trending Recipes Right Now</h2>
          </div>
          <Link href="/recipes" className="hidden sm:inline-flex text-sm font-semibold text-[#FF6B35] hover:underline items-center gap-1">
            View All ({recipes.length}) <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} {...recipe} />
          ))}
        </div>
      </section>

      {/* 4. Meet The Kitchen (E-E-A-T Trust Section) */}
      <section className="my-12 bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-white py-14 border-y border-orange-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-orange-100 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#FF6B35] flex-shrink-0 flex items-center justify-center text-white text-3xl font-serif font-black shadow-md">
              CB
            </div>
            <div className="flex-1 text-center md:text-left space-y-3">
              <span className="bg-orange-100 text-[#FF6B35] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Behind The Blog
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome to CrispBowl Test Kitchen
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                We believe that incredible food doesn’t require culinary school or expensive gadgets. Every recipe here is developed, tested multiple times, and tweaked until it’s foolproof.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs font-semibold text-gray-700">
                <span className="flex items-center gap-1 text-emerald-600">✔ Real pantry ingredients</span>
                <span className="flex items-center gap-1 text-emerald-600">✔ Exact cook times</span>
                <span className="flex items-center gap-1 text-emerald-600">✔ Step-by-step instructions</span>
              </div>
            </div>
            <Link 
              href="/about" 
              className="bg-[#2D3436] hover:bg-black text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors whitespace-nowrap shadow"
            >
              Read Our Story →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Weeknight Dinners That Deliver */}
      {dinnerRecipes.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">Dinner Ideas</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mt-1">Weeknight Dinners That Deliver</h2>
            </div>
            <Link href="/category/dinner" className="text-sm font-semibold text-[#FF6B35] hover:underline flex items-center gap-1">
              All Dinners <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dinnerRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} {...recipe} />
            ))}
          </div>
        </section>
      )}

      {/* 6. From The Blog (Kitchen Tips & Guides) */}
      {blogPosts.length > 0 && (
        <section className="py-16 bg-gray-50/70 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">Knowledge & Guides</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mt-1">From The Kitchen Journal</h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-[#FF6B35] hover:underline flex items-center gap-1">
                Read All Articles <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Newsletter Subscription */}
      <Newsletter />
    </div>
  )
}
