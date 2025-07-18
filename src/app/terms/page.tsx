import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="w-full py-4 px-6 bg-black text-white flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">HorizonFrame</Link>
        <nav>
          <Link href="/support" className="text-white hover:text-gray-300">
            Support
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="mb-4">
              Last Updated: July 18, 2025
            </p>
            <p>
              Welcome to HorizonFrame. These Terms of Service ("Terms") govern your use of the HorizonFrame mobile application ("App") and website ("Site"). By using our App or Site, you agree to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Use of Our Services</h2>
            <p className="mb-4">By using our App and Site, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use our services only for lawful purposes and in accordance with these Terms</li>
              <li>Not use our services in any way that violates applicable laws or regulations</li>
              <li>Not attempt to interfere with the proper functioning of our App or Site</li>
              <li>Not attempt to access areas of our App or Site that you are not authorized to access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Account Registration</h2>
            <p>
              When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="mb-4">
              The App, Site, and all content, features, and functionality thereof, including but not limited to all information, software, text, displays, images, video, and audio, are owned by HorizonFrame or its licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our App or Site without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">User Content</h2>
            <p className="mb-4">
              Our App may allow you to create, upload, or share content. You retain ownership of any intellectual property rights you hold in that content, but you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute it in any media.
            </p>
            <p>
              You represent and warrant that you own or control all rights in and to the content you share and that such content does not violate these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
            <p>
              YOUR USE OF THE APP AND SITE IS AT YOUR SOLE RISK. THE APP AND SITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, HORIZONFRAME SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE APP OR SITE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at terms@horizonframeapp.com.
            </p>
          </section>
        </div>
      </main>

      <footer className="w-full py-4 px-6 bg-black text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HorizonFrame. All rights reserved.
      </footer>
    </div>
  );
}
