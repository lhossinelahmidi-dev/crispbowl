import { getRecipeBySlug, getAllRecipes } from '@/lib/recipes'
import RecipeContent from '@/components/RecipeContent'
import RecipeSchema from '@/components/RecipeSchema'
import Breadcrumbs from '@/components/Breadcrumbs'
import RecipeCard from '@/components/RecipeCard'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes()
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipe = await getRecipeBySlug(params.slug)
  if (!recipe) {
    return { title: 'Recipe Not Found' }
  }

  const title = `${recipe.title} | CrispBowl`
  const url = `https://crispbowl.com/recipes/${recipe.slug}`

  return {
    title,
    description: recipe.description,
    keywords: recipe.tags.join(', '),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: recipe.description,
      url,
      type: 'article',
      publishedTime: recipe.date,
      authors: [recipe.author],
      images: [
        {
          url: recipe.image,
          width: 1200,
          height: 630,
          alt: `Finished ${recipe.title} recipe`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: recipe.description,
      images: [recipe.image],
    },
  }
}

export default async function RecipePage({ params }: Props) {
  const recipe = await getRecipeBySlug(params.slug)

  if (!recipe) {
    notFound()
  }

  const allRecipes = await getAllRecipes()
  const relatedRecipes = allRecipes
    .filter((r) => r.category === recipe.category && r.slug !== recipe.slug)
    .slice(0, 3)

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Recipes', url: '/recipes' },
    { label: recipe.category, url: `/category/${recipe.category.toLowerCase().replace(/\s+/g, '-')}` },
    { label: recipe.title, url: `/recipes/${recipe.slug}` }
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-white">
      <RecipeSchema recipe={recipe} />
      <Breadcrumbs items={breadcrumbs} />

      <article>
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{recipe.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{recipe.description}</p>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FF6B35] text-white font-bold text-lg shadow-sm">
              {recipe.author ? recipe.author.charAt(0) : 'C'}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{recipe.author || 'CrispBowl Kitchen'}</p>
              <p className="text-sm text-gray-500">Published {new Date(recipe.date || '2024-01-01').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <a href="#recipe-start" className="bg-[#FF6B35] text-white px-6 py-2 rounded-full font-medium hover:bg-[#e85d2a] transition-colors">Jump to Recipe</a>
          </div>
        </header>

        <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-2xl overflow-hidden">
          <Image src={recipe.image} alt={`Finished ${recipe.title} recipe`} fill className="object-cover" priority />
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <h2>About this Recipe</h2>
          <p>{recipe.description} Discover how easy it is to make this delicious meal at home. Perfect for any occasion and packed with flavor!</p>
        </div>

        <RecipeContent recipe={recipe} />
      </article>

      {relatedRecipes.length > 0 && (
        <section className="mt-16 pt-16 border-t border-gray-100">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Related Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedRecipes.map((related) => (
              <RecipeCard key={related.slug} {...related} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
