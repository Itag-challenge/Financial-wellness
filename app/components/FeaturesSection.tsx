import { Parallax } from "react-scroll-parallax";

const FeaturesSection = () => {
  return (
    <section className="relative py-32 bg-zinc-900">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        <Parallax speed={-10}>
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="#00ffe7" strokeWidth="4" />
              <rect x="20" y="28" width="24" height="8" rx="2" fill="#00ffe7" />
            </svg>
            <h2 className="text-xl font-bold mb-2 text-cyan-400">Chat History</h2>
            <p className="text-zinc-300 text-center">
              Instantly revisit your past conversations. Your chats are always saved and accessible.
            </p>
          </div>
        </Parallax>
        <Parallax speed={0}>
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="#6366f1" strokeWidth="4" />
              <path d="M32 16v32M16 32h32" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <h2 className="text-xl font-bold mb-2 text-cyan-400">AI-Powered</h2>
            <p className="text-zinc-300 text-center">
              Get intelligent, context-aware responses tailored to your needs and goals.
            </p>
          </div>
        </Parallax>
        <Parallax speed={10}>
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" fill="none">
              <rect x="8" y="8" width="48" height="48" rx="12" stroke="#7dd3fc" strokeWidth="4" />
              <rect x="20" y="20" width="24" height="24" rx="6" fill="#7dd3fc" />
            </svg>
            <h2 className="text-xl font-bold mb-2 text-cyan-400">Productivity</h2>
            <p className="text-zinc-300 text-center">
              Tools and insights to help you stay organized, focused, and well-balanced.
            </p>
          </div>
        </Parallax>
      </div>
    </section>
  );
};

export default FeaturesSection;
