"use client";
import { useState } from "react";
import Link from "next/link";

import HorizonFrameLogo from "./components/horizon-frame-logo";

export default function Page() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  }
  return (
    <>
      <header className="w-full py-4 px-6 bg-black text-white flex items-center justify-between">
        <h1 className="text-xl font-bold">HorizonFrame</h1>
        <nav>
          <Link href="/support" className="text-white hover:text-gray-300">
            Support
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* HERO: split into two halves */}
        <section
          aria-label="Hero"
          className="flex flex-col md:flex-row min-h-screen"
        >
          {/* Left half: logo centered */}
          <div className="flex-1 flex items-center justify-center bg-gray-900">
            <HorizonFrameLogo className="w-48 h-48" />
          </div>

          {/* Right half: text + form left-aligned */}
          <div className="flex-1 flex items-center bg-gray-800">
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
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-4 px-6 bg-black text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HorizonFrame. All rights reserved.
      </footer>
    </>
  );
}