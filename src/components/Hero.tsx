import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-orange-50/70 via-white to-white py-12 md:py-20 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Search */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-orange-100/80 text-[#FF6B35] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>Tested & Perfected Recipes</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15] tracking-tight">
              Fresh Recipes, <br className="hidden sm:inline" />
              <span className="text-[#FF6B35] italic">Bold</span> Flavors, Zero Stress.
            </h1>

            <p className="text-gray-600 text-lg sm:text-xl font-normal leading-relaxed max-w-xl">
              Foolproof, delicious meals crafted for real home cooks. Explore quick 20-minute dinners, comforting weekend classics, and vibrant morning bowls.
            </p>

            {/* Prominent Search Bar */}
            <form 
              action="/recipes" 
              method="GET"
              className="relative max-w-lg flex items-center bg-white rounded-full p-2 border-2 border-orange-100 shadow-md focus-within:border-[#FF6B35] focus-within:ring-2 focus-within:ring-orange-100 transition-all"
            >
              <div className="pl-4 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="q"
                placeholder="Search pancakes, tagine, pasta, soup..."
                className="w-full px-3 py-2 text-sm text-gray-800 bg-transparent focus:outline-none placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-[#FF6B35] hover:bg-[#e85d2a] text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all shadow-sm whitespace-nowrap"
              >
                Find Recipe
              </button>
            </form>

            {/* Social Proof Tags */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500 font-bold text-sm">★★★★★</span>
                <span>4.9/5 from 1,200+ Reviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500">✔</span>
                <span>100% Tested In Our Kitchen</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Recipe Hero Card */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Decorative background glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-300 to-amber-300 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-700"></div>

              <Link 
                href="/recipes/moroccan-beef-tagine" 
                className="relative block bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80"
                    alt="Authentic Moroccan Beef Tagine with Prunes"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#FF6B35] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Featured Recipe
                    </span>
                    <span className="bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      2h 20m
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="text-amber-400 text-xs mb-1 font-semibold">
                      ★★★★★ (4.9 / 5 • 340+ Reviews)
                    </div>
                    <h2 className="font-serif text-2xl font-bold leading-tight group-hover:text-orange-200 transition-colors">
                      Authentic Moroccan Beef Tagine with Prunes
                    </h2>
                    <p className="text-gray-200 text-xs mt-1.5 line-clamp-2">
                      Tender braised beef simmering in rich aromatic warm spices, golden almonds, and sweet prunes.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
