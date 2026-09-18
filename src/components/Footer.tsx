'use client';

import Link from "next/link";
import { categories, siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-accent text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="space-y-4">
            <Link href="/" className="font-serif text-3xl font-bold text-secondary inline-block">
              {siteConfig.name}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {siteConfig.description}. We bring you the best recipes for every occasion, from quick breakfasts to hearty dinners.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors" aria-label="Pinterest">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors" aria-label="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-secondary transition-colors text-sm">Home</Link></li>
              <li><Link href="/recipes" className="text-gray-400 hover:text-secondary transition-colors text-sm">All Recipes</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-secondary transition-colors text-sm">Kitchen Blog & Guides</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-secondary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-secondary transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-white">Categories</h3>
            <ul className="space-y-2 grid grid-cols-2 gap-x-4">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-gray-400 hover:text-secondary transition-colors text-sm">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-4 text-white">Stay Fresh</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe for the latest recipes directly in your inbox.</p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-sm border border-gray-700 placeholder-gray-500"
                required
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-secondary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-secondary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
