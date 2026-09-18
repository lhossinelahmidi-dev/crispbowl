import { RecipeCard } from '@/components/RecipeCard'
import { SearchBar } from '@/components/SearchBar'
import { CategoryNav } from '@/components/CategoryNav'
import { getAllRecipes, getCategories } from '@/lib/recipes'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Recipes | CrispBowl',
  description: 'Browse all delicious and tested recipes on CrispBowl.',
}

export default async function RecipesPage() {
  const recipes = await getAllRecipes()
  const categories = await getCategories()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8 text-center">All Recipes</h1>
      
      <div className="max-w-2xl mx-auto mb-10">
        <SearchBar recipes={recipes} />
      </div>
      
      <div className="mb-12">
        <CategoryNav categories={categories} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </main>
  )
}
