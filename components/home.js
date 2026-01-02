function Hero() {
  const [displayText, setDisplayText] = React.useState("");
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [phase, setPhase] = React.useState("typing"); // 'typing', 'pausing', 'clearing'

  const phrases = React.useMemo(
    () => [
      { text: "Hi, I'm Kashish.", style: "text-white font-bold" },
      { text: "debugging_till_dawn.py", style: "text-white font-mono" },
    ],
    [],
  );

  React.useEffect(() => {
    const currentPhrase = phrases[phraseIndex].text;

    if (phase === "typing") {
      if (displayText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 75);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, switch to pausing
        setPhase("pausing");
      }
    } else if (phase === "pausing") {
      const timeout = setTimeout(() => {
        setPhase("clearing");
      }, 2000); // Wait 2s to read
      return () => clearTimeout(timeout);
    } else if (phase === "clearing") {
      setDisplayText(""); // Disappear immediately

      const timeout = setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setPhase("typing");
      }, 1000); // Wait 1s while empty
      return () => clearTimeout(timeout);
    }
  }, [displayText, phase, phraseIndex, phrases]);

  return (
    <section
      className="min-h-screen flex items-center justify-center relative pt-20"
      data-name="hero"
      data-file="components/Hero.js"
    >
      {/* Glowing Orb Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--primary-purple)] opacity-10 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-6 text-center z-10">
        <div className="inline-block px-4 py-2 mb-6 rounded-full border border-[var(--primary-cyan)]/30 bg-[var(--primary-cyan)]/5 backdrop-blur-sm">
          <span className="text-[var(--primary-cyan)] text-sm font-mono">
            System.init(State.READY)
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Building AI that scales
          </span>
        </h1>

        <div className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed min-h-[80px] flex flex-col items-center justify-center">
          <div className="w-full min-h-[40px]">
            <span className={phrases[phraseIndex].style}>{displayText}</span>
            <span className="animate-pulse text-[var(--primary-cyan)]">|</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="btn-glow px-8 py-4 bg-[var(--primary-cyan)] text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all flex items-center gap-2"
          >
            View Projects
            <div className="icon-arrow-right text-lg"></div>
          </a>
          <a
            href="#"
            className="px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2 backdrop-blur-sm group"
          >
            Download CV
            <div className="icon-download text-lg group-hover:translate-y-1 transition-transform"></div>
          </a>
        </div>

        <div className="mt-16 flex justify-center gap-8">
          {[
            { icon: "icon-github", href: "#", label: "GitHub" },
            { icon: "icon-linkedin", href: "#", label: "LinkedIn" },
            {
              icon: "icon-mail",
              href: "mailto:contact@kashish.ai",
              label: "Email",
            },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              className="text-gray-400 hover:text-[var(--primary-cyan)] transition-colors hover:scale-110 transform duration-200"
              aria-label={social.label}
            >
              <div className={`${social.icon} text-2xl`}></div>
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        <div className="icon-chevron-down text-2xl"></div>
      </div>
    </section>
  );
}
