"use client";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";
const SplineWrapper = dynamic(() => import('./components/ui/SplineWrapper'), { ssr: false });
import AnimatedText from "./components/ui/AnimatedText";
import HeroSection from "@/components/HeroSection"; // Ensure case sensitivity matches the file system
import FeaturesSection from "./components/FeaturesSection";

export default function Home() {
  const router = useRouter();

  return (
    <ParallaxProvider>
      <main className="min-h-screen w-full bg-zinc-900 overflow-x-hidden">
        <HeroSection />
        <FeaturesSection />

        {/* Parallax About Section */}
        <section className="relative py-32 bg-zinc-900">
          <Parallax speed={-10}>
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-cyan-400 mb-6">About FEHUR Wellness</h2>
              <p className="text-lg text-zinc-300 mb-4">
                FEHUR Wellness is designed to empower you with AI-driven support for your daily life. Whether you need a quick chat, advice, or a productivity boost, our platform is here to help.
              </p>
              <p className="text-zinc-400">
                Built with modern web technologies for a smooth, engaging experience.
              </p>
            </div>
          </Parallax>
        </section>

        {/* Call to Action */}
        <section className="relative py-24 bg-zinc-900">
          <Parallax speed={5}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <div className="flex-1 flex flex-col items-center mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6 text-center">
                  Ready to get started?
                </h2>
                <button
                  onClick={() => router.push("/chat")}
                  className="px-10 py-4 border border-cyan-400 text-cyan-400 rounded-full text-lg font-semibold shadow-lg hover:bg-cyan-900 hover:text-cyan-200 transition bg-transparent"
                >
                  Go to Chat
                </button>
              </div>
              <div className="flex-1 flex justify-center items-center min-w-[320px] min-h-[240px]">
                <SplineWrapper
                  scene="https://prod.spline.design/ANAcgbQHVMg3sgkC/scene.splinecode"
                  style={{ width: '100%', maxWidth: 480, height: 360 }}
                />
              </div>
            </div>
          </Parallax>
        </section>
      </main>
    </ParallaxProvider>
  );
}
