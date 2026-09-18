import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { categories as defaultCategories } from './constants';

export interface CategoryInfo {
  name: string;
  slug: string;
  description?: string;
}

export interface RecipeFrontmatter {
  title: string;
  datePublished: string;
  date: string;
  author: string;
  description: string;
  image: string;
  category: string;
  cuisine: string;
  prepTime: number;
  cookTime: number;
  totalTime: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  calories: string | number;
  featured: boolean;
  nutrition: {
    calories: number | string;
    protein: string;
    fat: string;
    carbs: string;
  };
}

export interface Recipe extends RecipeFrontmatter {
  slug: string;
  content: string;
}

const recipesDirectory = path.join(process.cwd(), 'src/content/recipes');

const parseMins = (val: any, fallback = 15): number => {
  if (typeof val === 'number') return val;
  if (!val) return fallback;
  const match = String(val).match(/\d+/);
  return match ? parseInt(match[0], 10) : fallback;
};

export function getAllRecipes(): Recipe[] {
  if (!fs.existsSync(recipesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(recipesDirectory);
  
  const recipes: Recipe[] = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(recipesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const prepTime = parseMins(data.prepTime, 10);
      const cookTime = parseMins(data.cookTime, 15);
      const datePublished = data.datePublished || data.date || '2024-01-01';

      return {
        slug,
        title: data.title || 'Delicious Recipe',
        description: data.description || '',
        image: data.image || '/placeholder.svg',
        category: data.category || 'Dinner',
        cuisine: data.cuisine || 'International',
        author: data.author || 'CrispBowl Kitchen',
        datePublished,
        date: data.date || datePublished,
        prepTime,
        cookTime,
        totalTime: data.totalTime || `${prepTime + cookTime} mins`,
        servings: Number(data.servings) || 4,
        difficulty: data.difficulty || 'Easy',
        ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
        instructions: Array.isArray(data.instructions) ? data.instructions : [],
        tags: Array.isArray(data.tags) ? data.tags : [],
        calories: data.calories || 350,
        featured: Boolean(data.featured),
        nutrition: {
          calories: data.nutrition?.calories || data.calories || 350,
          protein: data.nutrition?.protein || '12g',
          fat: data.nutrition?.fat || '10g',
          carbs: data.nutrition?.carbs || '30g',
        },
        content,
      };
    });

  return recipes.sort((a, b) => (new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()));
}

export function getRecipeBySlug(slug: string): Recipe | null {
  try {
    const all = getAllRecipes();
    const found = all.find(r => r.slug === slug);
    return found || null;
  } catch (e) {
    return null;
  }
}

export function getRecipesByCategory(categorySlug: string): Recipe[] {
  const recipes = getAllRecipes();
  const slugLower = categorySlug.toLowerCase().replace(/\s+/g, '-');
  return recipes.filter(recipe => {
    const rCat = (recipe.category || '').toLowerCase().replace(/\s+/g, '-');
    return rCat === slugLower || (recipe.tags || []).some(t => t.toLowerCase().replace(/\s+/g, '-') === slugLower);
  });
}

export function getCategories(): CategoryInfo[] {
  return defaultCategories;
}

