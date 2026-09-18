'use client';

import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="bg-[#F7C59F]/20 py-16 px-4 rounded-3xl mx-4 my-12">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D3436] mb-4">
          Get Weekly Recipes
        </h2>
        <p className="text-gray-600 mb-8">
          Join 10,000+ home cooks and get our best recipes delivered to your inbox every Sunday.
        </p>

        {status === 'success' ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-xl inline-block font-medium">
            Thanks for subscribing! Check your inbox soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
              required
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#2D3436] text-[#FAFAFA] font-semibold py-3 px-8 rounded-full hover:bg-black transition-colors shadow-md disabled:opacity-70 whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
export default Newsletter;
