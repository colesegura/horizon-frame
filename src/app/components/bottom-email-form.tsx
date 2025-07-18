"use client";
import { useState } from "react";

export default function BottomEmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }
    
    setStatus("loading");
    setErrorMessage("");
    
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          source: "website",
          location: "bottom_section",
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus("success");
        setEmail("");
        
        // Track conversion if analytics is available
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'signup', {
            'event_category': 'engagement',
            'event_label': 'bottom_section'
          });
        }
      } else if (data.error) {
        console.error("Subscription error:", data);
        setErrorMessage(data.error.message || "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        // Unexpected response format
        console.error("Unexpected API response:", data);
        setErrorMessage("Something went wrong with your subscription. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }
  
  return (
    <div className="w-full">
      <form className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2 max-w-md mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="Your email"
          className={`flex-1 px-4 py-2 rounded-md border ${status === "error" ? "border-red-500" : "border-gray-600"} bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-400`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          aria-label="Email address"
          aria-describedby={status === "error" ? "email-error" : undefined}
        />
        <button
          type="submit"
          className={`px-6 py-2 rounded-md ${status === "loading" ? "bg-gray-600" : "bg-teal-400 hover:bg-teal-500"} text-black font-semibold transition-colors`}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </button>
      </form>
      
      <div className="mt-3 min-h-[24px] text-center" aria-live="polite">
        {status === "success" && (
          <div className="flex items-center justify-center text-green-400">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p>Thanks for joining! Check your inbox soon for updates.</p>
          </div>
        )}
        
        {status === "error" && (
          <div className="flex items-center justify-center text-red-400" id="email-error">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p>{errorMessage || "Something went wrong. Please try again."}</p>
          </div>
        )}
      </div>
      
      {status === "success" && (
        <p className="mt-2 text-sm text-teal-400 text-center">
          You&apos;ll be among the first to know when HorizonFrame launches and receive your 20% discount!  
        </p>
      )}
    </div>
  );
}
