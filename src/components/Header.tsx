"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { categories } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-xl bg-[#FF6B35] flex items-center justify-center text-white text-base font-serif font-black tracking-wider shadow-sm group-hover:bg-[#e85d2a] transition-colors">
                CB
              </span>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FF6B35]">
                  Crisp<span className="text-[#2D3436]">Bowl</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400 -mt-1 hidden sm:inline">
                  Tested Recipes
                </span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-semibold text-sm">Home</Link>
            <Link href="/recipes" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-semibold text-sm">All Recipes</Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-semibold text-sm">Blog</Link>
            <div className="relative group" onMouseEnter={() => setIsCategoriesOpen(true)} onMouseLeave={() => setIsCategoriesOpen(false)}>
              <button className="text-gray-700 hover:text-[#FF6B35] transition-colors font-semibold text-sm inline-flex items-center gap-1">
                Categories
                <svg className="h-4 w-4 text-gray-400 group-hover:text-[#FF6B35] transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-2xl p-2 mt-1 border border-gray-100 z-50">
                  {categories.map((cat) => (
                    <Link key={cat.slug} href={`/category/${cat.slug}`} className="block px-3.5 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B35] rounded-xl transition-colors font-medium">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/about" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-semibold text-sm">About Us</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/recipes" 
              className="p-2.5 text-gray-500 hover:text-[#FF6B35] hover:bg-orange-50 rounded-full transition-all focus:outline-none" 
              aria-label="Search recipes"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </Link>
            <div className="md:hidden ml-2">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-accent hover:text-primary transition-colors focus:outline-none">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link href="/" className="block px-3 py-3 rounded-md text-base font-medium text-accent hover:bg-secondary/20 hover:text-primary">Home</Link>
            <Link href="/recipes" className="block px-3 py-3 rounded-md text-base font-medium text-accent hover:bg-secondary/20 hover:text-primary">Recipes</Link>
            <Link href="/blog" className="block px-3 py-3 rounded-md text-base font-medium text-accent hover:bg-secondary/20 hover:text-primary">Blog & Guides</Link>
            <div className="px-3 py-3">
              <div className="text-base font-medium text-accent mb-2">Categories</div>
              <div className="grid grid-cols-2 gap-2 pl-4">
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/category/${cat.slug}`} className="block py-1 text-sm text-gray-600 hover:text-primary">
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/about" className="block px-3 py-3 rounded-md text-base font-medium text-accent hover:bg-secondary/20 hover:text-primary">About</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
