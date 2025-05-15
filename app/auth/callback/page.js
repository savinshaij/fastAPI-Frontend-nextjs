"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="h-screen flex justify-center items-center text-white text-lg">
      Redirecting to your dashboard...
    </div>
  );
}
