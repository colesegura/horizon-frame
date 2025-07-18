import Link from "next/link";

export default function PrivacyPolicy() {
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
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="mb-4">
              Last Updated: July 18, 2025
            </p>
            <p>
              At HorizonFrame ("we," "our," or "us"), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application ("App") and website ("Site").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Email addresses when you sign up for our waitlist or newsletter.</li>
              <li><strong>Usage Data:</strong> Information about how you use our App and Site, including interaction patterns and feature usage.</li>
              <li><strong>Device Information:</strong> Information about your device, including device type, operating system, and unique device identifiers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our App and Site</li>
              <li>Send you updates about HorizonFrame, including early access opportunities</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our App</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors who provide services on our behalf, such as email delivery and analytics.</li>
              <li><strong>Legal Requirements:</strong> If required to do so by law or in response to valid requests by public authorities.</li>
            </ul>
            <p className="mt-4">
              We will not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to opt-out of certain data sharing</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at privacy@horizonframeapp.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Children&apos;s Privacy</h2>
            <p>
              Our App and Site are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@horizonframeapp.com.
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
