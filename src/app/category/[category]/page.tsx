import { notFound } from 'next/navigation'
import RecipeCard from '@/components/RecipeCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getRecipesByCategory, getCategories } from '@/lib/recipes'
import { Metadata } from 'next'

interface Props {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === params.category)
  
  if (!category) {
    return { title: 'Category Not Found' }
  }

  const title = `${category.name} Recipes | CrispBowl`
  const description = `Explore our delicious collection of ${category.name.toLowerCase()} recipes. Easy, flavorful, and tested in our kitchen.`
  const url = `https://crispbowl.com/category/${params.category}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === params.category)

  if (!category) {
    notFound()
  }

  const recipes = await getRecipesByCategory(category.slug)

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Recipes', url: '/recipes' },
    { label: category.name, url: `/category/${category.slug}` }
  ]

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4 capitalize">
          {category.name} Recipes
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our collection of {recipes.length} delicious {category.name.toLowerCase()} recipes. Find your new favorite dish today!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} {...recipe} />
        ))}
      </div>
      
      {recipes.length >= 6 && (
        <div className="text-center">
          <button className="bg-white border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white px-8 py-3 rounded-full font-medium transition-colors">
            Load More Recipes
          </button>
        </div>
      )}
    </main>
  )
}
