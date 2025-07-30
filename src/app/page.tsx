"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/welcome");
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <p className="text-white">Redirecting to welcome page...</p>
    </div>
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

      <footer className="w-full py-4 px-6 bg-gray-900 text-sm text-gray-500">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            &copy; {new Date().getFullYear()} HorizonFrame. All rights reserved.
          </div>
          <div className="mt-2 md:mt-0 flex space-x-4">
            <Link href="/privacy" className="text-gray-400 hover:text-gray-300">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-gray-300">Terms of Service</Link>
            <Link href="/support" className="text-gray-400 hover:text-gray-300">Support</Link>
          </div>
        </div>
      </footer>
    </>
>>>>>>> main
  );
}
