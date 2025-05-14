import { Parallax } from "react-scroll-parallax";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center bg-zinc-900">
      <Parallax speed={-20}>
        <h1 className="text-5xl md:text-7xl font-extrabold text-cyan-400 mb-6 tracking-tight">
          FEHUR Wellness
        </h1>
      </Parallax>
      <Parallax speed={-10}>
        <p className="text-xl md:text-2xl text-zinc-300 mb-10 max-w-2xl mx-auto">
          Your AI-powered companion for financial wellness, productivity, and growth.
        </p>
      </Parallax>
      <Parallax speed={10}>
        <svg
          className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-60"
          width="600"
          height="120"
          viewBox="0 0 600 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="300" cy="60" rx="300" ry="60" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient
              id="paint0_radial"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(0 60 -300 0 300 60)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00ffe7" stopOpacity="0.3" />
              <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </Parallax>
    </section>
  );
};

export default HeroSection;
