"use client";
import { useState } from "react";
import Link from "next/link";

import HorizonFrameLogo from "./components/horizon-frame-logo";
import BottomEmailForm from "./components/bottom-email-form";

export default function Page() {
  const [email, setEmail] = useState("");
  const [bottomEmail, setBottomEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [bottomStatus, setBottomStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          source: "website",
          location: "hero_section" 
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus("success");
        setEmail("");
        // Track conversion if you have analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'signup', {
            'event_category': 'engagement',
            'event_label': 'hero_section'
          });
        }
      } else if (data.error) {
        console.error("Subscription error:", data);
        setStatus("error");
      } else {
        // Unexpected response format
        console.error("Unexpected API response:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");
    }
  }
  
  async function handleBottomSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBottomStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: bottomEmail,
          source: "website",
          location: "bottom_section" 
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setBottomStatus("success");
        setBottomEmail("");
        // Track conversion if you have analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'signup', {
            'event_category': 'engagement',
            'event_label': 'bottom_section'
          });
        }
      } else if (data.error) {
        console.error("Subscription error:", data);
        setBottomStatus("error");
      } else {
        // Unexpected response format
        console.error("Unexpected API response:", data);
        setBottomStatus("error");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setBottomStatus("error");
    }
  }
  return (
    <>
      <header className="w-full py-4 px-6 bg-gray-900 text-white flex items-center justify-between">
        <div className="flex items-center">
          <HorizonFrameLogo className="mr-4" />
          <h1 className="text-xl font-bold pl-2">HorizonFrame</h1>
        </div>
        <nav>
          <Link href="/support" className="text-white hover:text-gray-300">
            Support
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* HERO: split into two halves with Obsidian and Aurora background */}
        <section
          aria-label="Hero"
          className="flex flex-col md:flex-row min-h-screen relative overflow-hidden"
        >
          {/* Aurora background effect */}
          <div className="absolute inset-0 bg-gray-900 z-0 overflow-hidden">
            <div className="absolute inset-0 aurora-wave-1 opacity-20"></div>
            <div className="absolute inset-0 aurora-wave-2 opacity-20"></div>
          </div>
          {/* Left half: main screenshot in iPhone frame */}
          <div className="flex-1 flex flex-col items-center justify-center bg-transparent p-6 z-10">
            <div className="relative w-[280px] h-[580px] bg-black rounded-[40px] p-2 border-4 border-gray-800 overflow-hidden shadow-xl transform rotate-3">
              <div className="absolute top-0 left-0 w-full h-6 bg-black"></div> {/* iPhone notch placeholder */}
              <img
                src="/Screenshots/Today Page - Simulator Screenshot - iPhone 16 Pro Max - 2025-07-14 at 15.08.01.png"
                alt="HorizonFrame Today View - Your daily starting point"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right half: text + form left-aligned */}
          <div className="flex-1 flex items-center bg-transparent z-10">
            <div className="max-w-lg px-6">
              <h2 className="text-4xl font-extrabold text-white">
                Shift Your Frame.<br />
                Shift Your Life.
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                A system for capturing insights, shifting perspective, and staying aligned with your long-term vision.
              </p>

              <div className="mt-8">
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
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-md bg-teal-400 text-black font-semibold"
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
                  Early group limited to first 500 members.<br />
                  No spam. Unsubscribe anytime.
                </p>
              </div>
              <div className="mt-6">
                <button
                  className="px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-gray-100 transition-colors"
                  onClick={() => window.location.href = "#download"}
                >
                  Download Now
                </button>
                <p className="mt-1 text-xs text-gray-400">Coming soon to the App Store</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE SECTIONS: Today, Focus, Visualize */}
        <section
          aria-label="Discover HorizonFrame"
          className="py-16 px-6 bg-gray-900 text-white relative overflow-hidden"
        >
          {/* Aurora background effect */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 aurora-wave-1 opacity-20"></div>
            <div className="absolute inset-0 aurora-wave-2 opacity-20"></div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-12">Discover HorizonFrame</h2>

          {/* Today View */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-16 max-w-5xl mx-auto">
            <div className="flex-1 flex justify-center mb-6 md:mb-0 md:mr-10">
              <div className="relative w-[280px] h-[580px] bg-black rounded-[40px] p-2 border-4 border-gray-800 overflow-hidden shadow-xl transform -rotate-3">
                <div className="absolute top-0 left-0 w-full h-6 bg-black"></div>
                <img
                  src="/Screenshots/Today Page - Simulator Screenshot - iPhone 16 Pro Max - 2025-07-14 at 15.08.01.png"
                  alt="HorizonFrame Today View"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-left max-w-lg">
              <h3 className="text-2xl font-semibold mb-3">Today View</h3>
              <p className="text-lg text-gray-300">
                Start your day with clarity. The Today page greets you with your key insights and priorities, keeping you aligned with your vision.
              </p>
            </div>
          </div>

          {/* Focus View */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-16 max-w-5xl mx-auto">
            <div className="flex-1 flex justify-center mb-6 md:mb-0 md:ml-10 order-first md:order-last">
              <div className="relative w-[280px] h-[580px] bg-black rounded-[40px] p-2 border-4 border-gray-800 overflow-hidden shadow-xl transform rotate-3">
                <div className="absolute top-0 left-0 w-full h-6 bg-black"></div>
                <img
                  src="/Screenshots/Focus Page - Simulator Screenshot - iPhone 16 Pro Max - 2025-07-14 at 15.08.08.png"
                  alt="HorizonFrame Focus View"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-left max-w-lg md:order-first">
              <h3 className="text-2xl font-semibold mb-3">Focus Mode</h3>
              <p className="text-lg text-gray-300">
                Zero in on what matters. Focus mode helps you dive deep into a single task or thought, minimizing distractions.
              </p>
            </div>
          </div>

          {/* Visualize View */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-16 max-w-5xl mx-auto">
            <div className="flex-1 flex justify-center mb-6 md:mb-0 md:mr-10">
              <div className="relative w-[280px] h-[580px] bg-black rounded-[40px] p-2 border-4 border-gray-800 overflow-hidden shadow-xl transform -rotate-2">
                <div className="absolute top-0 left-0 w-full h-6 bg-black"></div>
                <img
                  src="/Screenshots/Visualize Page - Simulator Screenshot - iPhone 16 Pro Max - 2025-07-14 at 15.08.59.png"
                  alt="HorizonFrame Visualize View"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-left max-w-lg">
              <h3 className="text-2xl font-semibold mb-3">Visualize Insights</h3>
              <p className="text-lg text-gray-300">
                See the bigger picture. Visualize connects your insights over time, helping you spot patterns and shift perspectives.
              </p>
            </div>
          </div>
        </section>

        {/* ONBOARDING SECTION: Side by Side Screenshots */}
        <section
          aria-label="Onboarding Experience"
          className="py-16 px-6 bg-gray-900 text-white relative overflow-hidden"
        >
          {/* Aurora background effect */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 aurora-wave-1 opacity-20"></div>
            <div className="absolute inset-0 aurora-wave-2 opacity-20"></div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-12">Get Started in Minutes</h2>
          <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Our intuitive onboarding process helps you set up your frame, capture your first insights, and align with your vision.
          </p>
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center w-[280px] mb-6">
              <div className="relative w-[280px] h-[580px] bg-black rounded-[40px] p-2 border-4 border-gray-800 overflow-hidden shadow-lg transform rotate-1">
                <div className="absolute top-0 left-0 w-full h-6 bg-black"></div>
                <img
                  src="/Screenshots/Onboarding 1 -Simulator Screenshot - iPhone 16 Pro Max - 2025-07-14 at 15.07.49.png"
                  alt="HorizonFrame Onboarding Step 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-sm text-gray-400">Step 1: Welcome</p>
            </div>
            <div className="flex flex-col items-center w-[280px] mb-6">
              <div className="relative w-[280px] h-[580px] bg-black rounded-[40px] p-2 border-4 border-gray-800 overflow-hidden shadow-lg transform -rotate-1">
                <div className="absolute top-0 left-0 w-full h-6 bg-black"></div>
                <img
                  src="/Screenshots/Onboarding 2 - Simulator Screenshot - iPhone 16 Pro Max - 2025-07-14 at 15.07.52.png"
                  alt="HorizonFrame Onboarding Step 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-sm text-gray-400">Step 2: Set Your Frame</p>
            </div>
            <div className="flex flex-col items-center w-[280px] mb-6">
              <div className="relative w-[280px] h-[580px] bg-black rounded-[40px] p-2 border-4 border-gray-800 overflow-hidden shadow-lg transform rotate-2">
                <div className="absolute top-0 left-0 w-full h-6 bg-black"></div>
                <img
                  src="/Screenshots/Onboarding 3 - Simulator Screenshot - iPhone 16 Pro Max - 2025-07-14 at 15.07.55.png"
                  alt="HorizonFrame Onboarding Step 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-sm text-gray-400">Step 3: Capture Insights</p>
            </div>
          </div>
        </section>

        {/* SUBSCRIPTION INCENTIVE */}
        <section
          aria-label="Early Access Incentive"
          className="py-16 px-6 bg-gray-900 text-white relative"
        >
          {/* Background with z-index control */}
          <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
            <div className="absolute inset-0 aurora-wave-1 opacity-20"></div>
            <div className="absolute inset-0 aurora-wave-2 opacity-20"></div>
          </div>
          
          {/* Content with higher z-index */}
          <div className="max-w-3xl mx-auto text-center" style={{ position: 'relative', zIndex: 10 }}>
            <h2 className="text-3xl font-bold mb-6">Be Among the First to Transform Your Perspective</h2>
            <p className="text-lg text-gray-300 mb-6">
              Join our waitlist today and get <span className="font-semibold text-teal-400">20% off your first subscription</span> when HorizonFrame launches.
            </p>
            
            {/* Separate component for the bottom form */}
            <BottomEmailForm />
          </div>
        </section>
      </main>

      <footer className="w-full py-4 px-6 bg-gray-900 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} HorizonFrame. All rights reserved.
      </footer>
    </>
  );
}