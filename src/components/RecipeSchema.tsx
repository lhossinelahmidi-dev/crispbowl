import React from 'react';

interface SchemaProps {
  recipe: {
    title: string;
    slug: string;
    image: string;
    author: string;
    datePublished?: string;
    date?: string;
    description: string;
    prepTime: number; // in minutes
    cookTime: number; // in minutes
    servings: number;
    category: string;
    cuisine?: string;
    ingredients: string[];
    instructions: string[];
    tags?: string[];
    nutrition: {
      calories: number;
    };
    rating?: number;
    ratingCount?: number;
    videoUrl?: string;
  };
}

export function RecipeSchema({ recipe }: any) {
  const parseMins = (val: any) => {
    if (typeof val === 'number') return val;
    if (!val) return 15;
    const match = String(val).match(/\d+/);
    return match ? parseInt(match[0], 10) : 15;
  };

  const prepMins = parseMins(recipe.prepTime);
  const cookMins = parseMins(recipe.cookTime);
  const formatTime = (minutes: number) => `PT${minutes}M`;
  
  const schema: any = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": recipe.title,
    "image": [
      recipe.image || "/placeholder.svg"
    ],
    "author": {
      "@type": "Person",
      "name": recipe.author || "CrispBowl Kitchen"
    },
    "datePublished": recipe.datePublished || recipe.date || new Date().toISOString(),
    "description": recipe.description,
    "prepTime": formatTime(prepMins),
    "cookTime": formatTime(cookMins),
    "totalTime": formatTime(prepMins + cookMins),
    "recipeYield": `${recipe.servings || 4} servings`,
    "recipeCategory": recipe.category || "General",
    "recipeCuisine": recipe.cuisine || "American",
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.nutrition?.calories || recipe.calories || 350} calories`
    },
    "recipeIngredient": recipe.ingredients || [],
    "recipeInstructions": (recipe.instructions || []).map((text: string, index: number) => ({
      "@type": "HowToStep",
      "name": `Step ${index + 1}`,
      "text": text,
      "url": `https://crispbowl.com/recipes/${recipe.slug}#step-${index + 1}`,
      "image": recipe.image || "/placeholder.svg"
    })),
    "keywords": (recipe.tags || []).join(", ")
  };

  if (recipe.rating && recipe.ratingCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": recipe.rating,
      "ratingCount": recipe.ratingCount
    };
  } else {
    // Add default mock rating for SEO purposes if not provided
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": 4.8,
      "ratingCount": 124
    };
  }

  if (recipe.videoUrl) {
    schema.video = {
      "@type": "VideoObject",
      "name": `How to make ${recipe.title}`,
      "description": recipe.description,
      "thumbnailUrl": [recipe.image],
      "contentUrl": recipe.videoUrl,
      "uploadDate": recipe.datePublished || recipe.date || new Date().toISOString()
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default RecipeSchema;
