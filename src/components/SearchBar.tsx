'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface RecipeResult {
  title: string;
  slug: string;
  category: string;
  tags: string[];
}

interface SearchBarProps {
  recipes?: RecipeResult[];
}

export function SearchBar({ recipes = [] }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredRecipes = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      recipe.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 5); // Limit to 5 results
  }, [query, recipes]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search recipes, ingredients, tags..."
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] bg-white shadow-sm transition-all"
        />
        <svg 
          className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {filteredRecipes.length > 0 ? (
            <ul className="py-2">
              {filteredRecipes.map(recipe => (
                <li key={recipe.slug}>
                  <Link 
                    href={`/recipes/${recipe.slug}`}
                    className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-[#2D3436]">{recipe.title}</div>
                    <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                      {recipe.category}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No recipes found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default SearchBar;
