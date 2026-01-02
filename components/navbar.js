function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Timeline", id: "timeline" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#030014]/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
      data-name="navbar"
      data-file="components/Navbar.js"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a
          href="#"
          className="text-2xl font-bold font-['Space_Grotesk'] tracking-tighter hover:text-[var(--primary-cyan)] transition-colors"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Kashish<span className="text-[var(--primary-cyan)]"></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-gray-300 hover:text-[var(--primary-cyan)] transition-colors text-sm uppercase tracking-widest font-medium"
            >
              {link.name}
            </button>
          ))}
          <a
            href="#contact"
            className="px-6 py-2 border border-[var(--primary-cyan)] text-[var(--primary-cyan)] rounded-full hover:bg-[var(--primary-cyan)] hover:text-black transition-all duration-300 text-sm font-bold"
          >
            About
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <div className="icon-x text-2xl"></div>
          ) : (
            <div className="icon-menu text-2xl"></div>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#030014] border-b border-white/10 py-4 px-6 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-left text-gray-300 hover:text-[var(--primary-cyan)] py-2"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
