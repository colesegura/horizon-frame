"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import HorizonFrameLogo from "../components/horizon-frame-logo";
import { analytics, trackSignupSuccess, trackSignupError } from "../utils/analytics";

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Initialize analytics tracking
  useEffect(() => {
    analytics.trackEvent('page_view', { page: '/welcome' });
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('loading');
    setErrorMessage('');
    
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setSubmitStatus('success');
      setEmail('');
      
      // Track successful signup with our analytics system
      if (typeof trackSignupSuccess === 'function') {
        trackSignupSuccess(email, 'welcome_page');
      }
      
      // Also track with Google Analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'signup', {
          'event_category': 'engagement',
          'event_label': 'welcome_page'
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      if (typeof trackSignupError === 'function') {
        trackSignupError(email, error, 'welcome_page');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Reset status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  }
  
  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Aurora waves in background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="aurora-wave-1"></div>
        <div className="aurora-wave-2"></div>
        <div className="aurora-wave-3"></div>
      </div>
      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <HorizonFrameLogo />
        </div>
      </header>
      
      {/* Main content area with flex layout */}
      <main className="flex-1 flex items-center relative z-10 container mx-auto px-4">
        <div className="flex flex-col md:flex-row w-full">
          {/* Left side - Giant phone mockup */}
          <div className="md:w-3/5 relative">
            {/* Mobile-first design with larger image on small screens */}
            <div className="w-[120%] mx-auto mb-8 md:mb-0 md:absolute md:left-[-25%] md:bottom-[-15%] md:w-[150%]">
              <img 
                src="/Screenshots/RotatoProgressPage.png" 
                alt="HorizonFrame App Mockup" 
                className="w-full h-auto transform rotate-[-5deg] max-w-none" 
              />
            </div>
          </div>
          
          {/* Right side - Text content */}
          <div className="md:w-2/5 z-10 md:pl-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Visualize your dream life, <br /> Act on it now.
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Visualize your goals and bring them to fruition, faster than ever.
              </p>
              
              {/* Email signup form */}
              <div className="mb-6">
                <p className="text-white mb-3">Get early access & shape HorizonFrame. Join the waitlist now.</p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 flex-grow"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>
                
                {submitStatus === 'success' && (
                  <p className="text-teal-400 mt-2">✓ You're on the waitlist! Check your email.</p>
                )}
                
                {submitStatus === 'error' && (
                  <p className="text-red-400 mt-2">Error: {errorMessage}</p>
                )}
                
                <p className="text-xs text-gray-500 mt-2">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
              
              {/* Testimonials section */}
              <div className="mt-6 pt-4 border-t border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-3">What Our Early Access Users Are Saying</h3>
                <div className="space-y-3">
                  <div className="mb-3">
                    <p className="text-white text-sm italic">"HorizonFrame helped me visualize my goals in a way that actually made them feel achievable."</p>
                    <p className="text-xs text-teal-400 mt-1">— Max McNally, Co-Founder of Boost Gum</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-white text-sm italic">"The perspective shift I gained from using HorizonFrame has been transformative. It's like having a coach in my pocket."</p>
                    <p className="text-xs text-teal-400 mt-1">— Anthony Laughlin, CEO of Cruise</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer - always at bottom */}
      <footer className="relative z-10 py-3 border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-2 md:mb-0">
              <p className="text-sm text-gray-500">
                &copy; 2025 HorizonFrame. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-sm text-gray-500 hover:text-white">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-white">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
