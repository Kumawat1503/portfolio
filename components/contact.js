function Contact() {
  const [status, setStatus] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      e.target.reset();
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24"
      data-name="contact"
      data-file="components/Contact.js"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary-cyan)] opacity-5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Let's{" "}
              <span className="text-[var(--primary-purple)]">Connect</span>
            </h2>
            <p className="text-gray-400">
              Interested in collaborating on AI projects? Send me a message.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="icon-map-pin text-[var(--primary-cyan)] text-2xl mt-1"></div>
                <div>
                  <h4 className="text-white font-bold mb-1">Location</h4>
                  <p className="text-gray-400">Kota, Rajasthan, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="icon-mail text-[var(--primary-cyan)] text-2xl mt-1"></div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email</h4>
                  <a
                    href="mailto:kashkumawat9@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    kashkumawat9@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-sm text-gray-500 mb-4">Connect on Socials</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/kashish-kumawat-539757226/"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                  >
                    <div className="icon-linkedin"></div>
                  </a>
                  <a
                    href="https://github.com/Kumawat1503"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                  >
                    <div className="icon-github"></div>
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary-cyan)] transition-colors placeholder-gray-600"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary-cyan)] transition-colors placeholder-gray-600"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary-cyan)] transition-colors placeholder-gray-600"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  status === "success"
                    ? "bg-green-500 text-white"
                    : "bg-[var(--primary-purple)] text-white hover:bg-[var(--primary-purple)]/80 hover:shadow-[0_0_20px_rgba(188,19,254,0.4)]"
                }`}
                disabled={status === "success" || status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <div className="icon-loader animate-spin"></div> Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <div className="icon-check"></div> Message Sent
                  </>
                ) : (
                  <>
                    Send Message <div className="icon-send"></div>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
