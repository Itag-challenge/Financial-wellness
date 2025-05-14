"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import Spline from "@splinetool/react-spline";

export default function Home() {
  const router = useRouter();

  const handleStartChat = () => {
    router.push("/chat");
  };

  return (
    <>
      <Head>
        <title>Fehur </title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main
        className="min-h-screen text-white flex items-center justify-between px-8 relative overflow-hidden"
        style={{
          fontFamily: "'Poppins', sans-serif",
          background: "linear-gradient(90deg, #000000 40%, #1f012f 100%)",
        }}
      >
        {/* Nav */}
        <nav
          className="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-10"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <h2 className="text-2xl font-semibold">Powered by Fehur</h2>
        </nav>

        {/* Hero Section on Left */}
        <header className="z-10 max-w-md space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Here to help with
            <br /> financial literacy
          </h1>
          <button
            onClick={handleStartChat}
            className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            Enter Chat
          </button>
        </header>
        <div className="absolute top-0 right-0 h-full w-1/2 z-0 pointer-events-none">
          <Spline
            scene="https://prod.spline.design/pUEX2ATzirvdjJ2f/scene.splinecode"
            style={{ background: 'transparent' }}
          />
        </div>
      </main>
    </>
  );
}