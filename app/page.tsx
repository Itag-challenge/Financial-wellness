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
      <main className="min-h-screen w-full bg-background overflow-x-hidden text-white">
        <HeroSection />
        <FeaturesSection />

        {/* Parallax About Section */}
        <section className="relative py-32 bg-background">
          <Parallax speed={-10}>
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">About FEHUR Wellness</h2>
              <p className="text-lg text-gray-100 mb-4">
                FEHUR Wellness is designed to empower you with AI-driven support for your daily life. Whether you need a quick chat, advice, or a productivity boost, our platform is here to help.
              </p>
              <p className="text-gray-200">
                Built with modern web technologies for a smooth, engaging experience.
              </p>
            </div>
          </Parallax>
        </section>

        {/* Call to Action */}
        <section className="relative py-24 bg-background">
          <Parallax speed={5}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <div className="flex-1 flex flex-col items-center mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
                  Ready to get started?
                </h2>
                <button
                  onClick={() => router.push("/chat")}
                  className="px-10 py-4 border-2 border-primary text-primary rounded-full text-lg font-semibold shadow-lg hover:bg-accent hover:text-background transition bg-transparent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  aria-label="Go to Chat"
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
