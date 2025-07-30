"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import HorizonFrameLogo from "../components/horizon-frame-logo";
import { analytics, trackSignupSuccess, trackSignupError } from "../utils/analytics";

export default function WelcomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  
  // Initialize analytics tracking
  useEffect(() => {
    analytics.init();
    analytics.trackEvent('page_view', { page: '/welcome' });
  }, []);
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    
    // Track form submission attempt
    analytics.trackEvent('form_submit', { email });
    
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          source: "website",
          location: "welcome_page" 
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus("success");
        setEmail("");
        
        // Track successful signup with our analytics system
        trackSignupSuccess(email, 'welcome_page');
        
        // Also track with Google Analytics if available
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'signup', {
            'event_category': 'engagement',
            'event_label': 'welcome_page'
          });
        }
      } else if (data.error) {
        console.error("Subscription error:", data);
        setStatus("error");
        trackSignupError(email, data.error, 'welcome_page');
      } else {
        // Unexpected response format
        console.error("Unexpected API response:", data);
        setStatus("error");
        trackSignupError(email, 'unexpected_response', 'welcome_page');
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");
      trackSignupError(email, error, 'welcome_page');
    }
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Aurora waves in background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="aurora-wave aurora-wave-1"></div>
        <div className="aurora-wave aurora-wave-2"></div>
        <div className="aurora-wave aurora-wave-3"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <HorizonFrameLogo />
        </div>
      </header>
      
      {/* Main content - with flex-grow to push footer down */}
      <main className="flex-grow relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 mb-16">
          {/* Left side - iPhone frame with screenshot */}
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <div className="relative w-[280px] h-[570px] transform rotate-[-5deg]">
              {/* iPhone frame with styling from main page */}
              <div className="absolute inset-0 bg-black rounded-[40px] shadow-xl border-4 border-gray-800 z-10"></div>
              
              {/* iPhone notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[20px] z-30"></div>
              
              {/* Screenshot inside frame - positioned to show full iOS status bar */}
              <div className="absolute inset-[4px] rounded-[36px] overflow-hidden z-20">
                <img 
                  src="/Screenshots/ProgressPage.png" 
                  alt="HorizonFrame App" 
                  className="w-full h-full object-cover object-top" 
                  style={{ marginTop: '-5px' }} /* Slight adjustment to show full status bar */
                />
              </div>
            </div>
          </div>
          
          {/* Right side - Text and email form */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-4.5xl font-bold text-white mb-4">
              Visualize your dream life, <br /> Act on it now.
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Visualize your goals and bring them to fruition,<br />
              faster than ever.
            </p>
              
            <div>
              <p className="mb-2 text-white font-medium">
                Get early access & shape HorizonFrame. Join the waitlist now.
              </p>
              <form className="flex space-x-2" onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  id="email-input"
                />
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md bg-teal-400 text-black font-semibold"
                  id="submit-button"
                >
                  Join Waitlist
                </button>
              </form>
              {status === "success" && (
                <p className="mt-2 text-green-400">Thanks—check your inbox!</p>
              )}
              {status === "error" && (
                <p className="mt-2 text-red-400">Something went wrong. Try again.</p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                No spam. Unsubscribe anytime.
              </p>
              
              {/* Testimonials section with heading */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">What Our Early Access Users Are Saying</h3>
                <div className="space-y-4">
                  <div className="mb-4">
                    <p className="text-white text-sm italic">"HorizonFrame helped me visualize my goals in a way that actually made them feel achievable."</p>
                    <p className="text-xs text-teal-400 mt-1">— Max McNally, Co-Founder of Boost Gum</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-white text-sm italic">"The perspective shift I gained from using HorizonFrame has been transformative. It's like having a coach in my pocket."</p>
                    <p className="text-xs text-teal-400 mt-1">— Anthony Laughlin, CEO of Cruise</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-white text-sm italic">"I've tried dozens of productivity apps, but HorizonFrame is the first one that actually changed how I think about my future."</p>
                    <p className="text-xs text-teal-400 mt-1">— Christopher Moelenpah, Founder of MoCurá</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer - always at bottom with mt-auto */}
      <footer className="mt-auto py-6 border-t border-gray-800 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © 2025 HorizonFrame. All rights reserved.
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
