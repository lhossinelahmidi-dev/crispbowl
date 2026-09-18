'use client';

import { useState } from 'react';

interface RecipeContentProps {
  recipe: {
    title: string;
    prepTime?: number | string;
    cookTime?: number | string;
    totalTime?: number | string;
    servings?: number | string;
    difficulty?: string;
    ingredients?: string[];
    instructions?: string[];
    tags?: string[];
    nutrition?: {
      calories?: number | string;
      protein?: string;
      fat?: string;
      carbs?: string;
    };
    [key: string]: any;
  };
}

export function RecipeContent({ recipe }: RecipeContentProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  
  const parseMins = (val: any) => {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const match = String(val).match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const prep = parseMins(recipe.prepTime);
  const cook = parseMins(recipe.cookTime);
  const totalDisplay = recipe.totalTime || `${prep + cook || 20} mins`;

  const toggleIngredient = (index: number) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <button 
        onClick={() => document.getElementById('recipe-start')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-[#FF6B35] text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-600 transition-colors z-50 md:hidden"
      >
        Jump to Recipe
      </button>

      {/* Info Bar */}
      <div id="recipe-start" className="flex flex-wrap gap-6 bg-[#F7C59F]/20 p-6 rounded-2xl mb-10 justify-between items-center text-sm font-medium text-[#2D3436]">
        <div className="flex flex-col"><span className="text-gray-500 uppercase text-xs">Prep Time</span>{recipe.prepTime ? (String(recipe.prepTime).includes('min') ? recipe.prepTime : `${recipe.prepTime} mins`) : '10 mins'}</div>
        <div className="flex flex-col"><span className="text-gray-500 uppercase text-xs">Cook Time</span>{recipe.cookTime ? (String(recipe.cookTime).includes('min') ? recipe.cookTime : `${recipe.cookTime} mins`) : '15 mins'}</div>
        <div className="flex flex-col"><span className="text-gray-500 uppercase text-xs">Total Time</span>{totalDisplay}</div>
        <div className="flex flex-col"><span className="text-gray-500 uppercase text-xs">Servings</span>{recipe.servings || 4}</div>
        <div className="flex flex-col"><span className="text-gray-500 uppercase text-xs">Difficulty</span>{recipe.difficulty || 'Easy'}</div>
        <button onClick={handlePrint} className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          Print
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <h3 className="font-serif text-2xl font-bold mb-6 text-[#2D3436]">Ingredients</h3>
          <ul className="space-y-3">
            {(recipe.ingredients || []).map((ingredient, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id={`ingredient-${idx}`}
                  checked={!!checkedIngredients[idx]}
                  onChange={() => toggleIngredient(idx)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#FF6B35] focus:ring-[#FF6B35] cursor-pointer"
                />
                <label 
                  htmlFor={`ingredient-${idx}`}
                  className={`cursor-pointer select-none text-gray-700 ${checkedIngredients[idx] ? 'line-through opacity-50' : ''}`}
                >
                  {ingredient}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-serif text-2xl font-bold mb-6 text-[#2D3436]">Instructions</h3>
          <div className="space-y-8">
            {(recipe.instructions || []).map((instruction, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {recipe.nutrition && (
        <div className="mt-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <h4 className="font-serif font-bold text-xl mb-4 text-[#2D3436]">Nutrition Information</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <span className="block text-gray-500 text-sm mb-1">Calories</span>
              <span className="font-bold text-lg text-[#2D3436]">{recipe.nutrition.calories || recipe.calories || '350 kcal'}</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <span className="block text-gray-500 text-sm mb-1">Protein</span>
              <span className="font-bold text-lg text-[#2D3436]">{recipe.nutrition.protein || '12g'}</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <span className="block text-gray-500 text-sm mb-1">Fat</span>
              <span className="font-bold text-lg text-[#2D3436]">{recipe.nutrition.fat || '10g'}</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <span className="block text-gray-500 text-sm mb-1">Carbs</span>
              <span className="font-bold text-lg text-[#2D3436]">{recipe.nutrition.carbs || '30g'}</span>
            </div>
          </div>
        </div>
      )}

      {recipe.tags && recipe.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {recipe.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeContent;

