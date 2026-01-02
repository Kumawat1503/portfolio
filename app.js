// Important: DO NOT remove this `ErrorBoundary` component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "ErrorBoundary caught an error:",
      error,
      errorInfo.componentStack,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">System Malfunction</h1>
            <p className="text-gray-400 mb-4">Neural link interrupted.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700"
            >
              Reboot System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    return (
      <div
        className="min-h-screen text-white overflow-x-hidden selection:bg-[var(--primary-cyan)] selection:text-black"
        data-name="app"
        data-file="app.js"
      >
        <ParticleBackground />
        <Navbar />
        <Hero />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("App component error:", error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
