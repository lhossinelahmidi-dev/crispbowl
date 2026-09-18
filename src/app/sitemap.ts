import { MetadataRoute } from 'next'
import { getAllRecipes, getCategories } from '@/lib/recipes'
import { getAllBlogPosts } from '@/lib/blog'

const BASE_URL = 'https://crispbowl.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = await getAllRecipes()
  const categories = await getCategories()
  const blogPosts = getAllBlogPosts()

  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]

  const recipeRoutes = recipes.map((recipe) => ({
    url: `${BASE_URL}/recipes/${recipe.slug}`,
    lastModified: new Date(recipe.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryRoutes = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...recipeRoutes, ...categoryRoutes, ...blogRoutes]
}
