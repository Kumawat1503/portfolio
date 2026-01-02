function Footer() {
  return (
    <footer
      className="py-8 text-center border-t border-white/5 bg-black"
      data-name="footer"
      data-file="components/Footer.js"
    >
      <p className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Kashish. Built with{" "}
        <span className="text-[var(--primary-cyan)]">React</span> &{" "}
        <span className="text-[var(--primary-purple)]">Neural Networks</span>.
      </p>
    </footer>
  );
}
