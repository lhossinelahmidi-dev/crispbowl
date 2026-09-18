import { Newsletter } from '@/components/Newsletter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | CrispBowl',
  description: 'Learn more about CrispBowl and the people behind the recipes.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-serif font-bold text-gray-900 mb-8 text-center">About CrispBowl</h1>
        
        <div className="prose prose-lg mx-auto text-gray-700">
          <p className="lead text-2xl text-orange-500 font-serif mb-8 text-center italic">
            "Bringing joy to your kitchen, one delicious bowl at a time."
          </p>
          
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="mb-4">
              Welcome to CrispBowl! We believe that good food shouldn't be complicated. Our passion is creating
              approachable, vibrant, and flavor-packed recipes that make you excited to cook. Whether you are a 
              seasoned home chef or just starting your culinary journey, you will find something here to satisfy your cravings.
            </p>
            <p>
              We focus on fresh ingredients, clever shortcuts, and reliable techniques that ensure your dishes 
              turn out perfectly every time. From comforting weeknight dinners to show-stopping desserts, 
              we've got your menu covered.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">The Author</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-48 h-48 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-gray-400 overflow-hidden">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="mb-4">
                  Hi, I'm the face behind CrispBowl! I started this blog to share my love for cooking with the world. 
                  My culinary background comes from years of learning from my family, traveling to taste new cuisines, 
                  and countless hours of kitchen experiments.
                </p>
                <p>
                  When I'm not developing recipes, you can find me exploring local farmers' markets, reading cookbooks 
                  like novels, or trying to perfect my sourdough bread technique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
    </main>
  )
}
