import Link from 'next/link';

interface CategoryItem {
  name: string;
  slug: string;
  emoji?: string;
}

interface CategoryNavProps {
  categories: (CategoryItem | string)[];
  activeCategory?: string;
}

export function CategoryNav({ categories = [], activeCategory }: CategoryNavProps) {
  const normalized = categories.map((cat) => {
    if (typeof cat === 'string') {
      return { name: cat, slug: cat.toLowerCase().replace(/\s+/g, '-') };
    }
    return {
      name: cat.name || cat.slug,
      slug: cat.slug || cat.name?.toLowerCase().replace(/\s+/g, '-'),
    };
  });

  return (
    <nav className="w-full overflow-x-auto py-4 hide-scrollbar">
      <ul className="flex space-x-3 px-4 min-w-max">
        <li>
          <Link 
            href="/recipes"
            className={`inline-block px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              !activeCategory 
                ? 'bg-[#FF6B35] text-white shadow-sm' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All Recipes
          </Link>
        </li>
        {normalized.map((category) => (
          <li key={category.slug}>
            <Link 
              href={`/category/${category.slug}`}
              className={`inline-block px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category.slug 
                  ? 'bg-[#FF6B35] text-white shadow-sm' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryNav;
