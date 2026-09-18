import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="text-6xl font-serif font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-8">Oops! Page not found.</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        We can't seem to find the page you're looking for. Try searching for a recipe or go back home.
      </p>
      
      <div className="w-full max-w-md mb-12">
        <SearchBar />
      </div>

      <Link 
        href="/" 
        className="bg-[#FF6B35] hover:bg-[#E85D2A] text-white px-8 py-3 rounded-full font-medium transition-colors"
      >
        Go to Homepage
      </Link>
    </main>
  );
}
