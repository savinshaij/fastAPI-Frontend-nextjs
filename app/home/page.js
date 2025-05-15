"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);
      setUser({
        name: decoded.sub?.name || "User",
        email: decoded.sub?.email,
        picture: decoded.sub?.picture
      });
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      router.replace("/login");
    }
  }, [router]);

  if (!user) {
    return (
      <div className="bg-neutral-900 h-screen w-full flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

 
  let picture_url = user.picture || "";
  if (picture_url === "null" || !picture_url) {
    picture_url = "/user.png"; 
  } else {
    picture_url = picture_url.split('=')[0];
  }

  return (
    <div className="bg-neutral-900 font-sans h-screen w-full flex flex-row justify-center items-center">
      <div className="card w-96 mx-auto bg-neutral-800 shadow-xl hover:shadow rounded-xl">
        <img
          className="w-32 mx-auto rounded-full -mt-20 border-8 border-neutral-900"
          src={picture_url}
          alt="avatar"
        />
        <div className="text-center mt-2 text-3xl font-medium text-white">{user.name || "User"}</div>
        <div className="text-center mt-2 font-light text-sm text-neutral-400">{user.email || "user@example.com"}</div>
        <div className="px-6 text-center mt-2 font-light text-sm text-neutral-400">
          <p>{"Fetched token and decoded successfully"}</p>
        </div>
        
        <hr className="mt-8 border-neutral-700" />
        <div className="flex p-4 justify-center">
          <button
            className="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-purple-600 transition"
            onClick={() => {
              localStorage.removeItem("token");
              router.replace("/login");
            }}
          >
            Clear Cache & Logout
          </button>
        </div>
      </div>
    </div>
  );
}
