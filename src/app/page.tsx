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
  );
}
