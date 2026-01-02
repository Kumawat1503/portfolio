function Projects() {
  const [filter, setFilter] = React.useState("All");

  const projects = [
    {
      title: "Neural Style Transfer",
      desc: "Deep learning model that merges artistic style with content images using VGG19 architecture.",
      tech: ["PyTorch", "Python", "CNN"],
      category: "Computer Vision",
      metrics: "Loss: < 0.05",
      github: "#",
      demo: "#",
    },
    {
      title: "AWS AutoScaler Bot",
      desc: "Intelligent resource management system for EC2 instances based on predictive traffic analysis.",
      tech: ["AWS Lambda", "Python", "Boto3"],
      category: "AWS/Cloud",
      metrics: "Cost Saving: 35%",
      github: "#",
      demo: "#",
    },
    {
      title: "Sentiment Analyzer",
      desc: "Real-time NLP pipeline processing customer feedback with transformer-based models.",
      tech: ["HuggingFace", "FastAPI", "React"],
      category: "NLP",
      metrics: "Accuracy: 94%",
      github: "#",
      demo: "#",
    },
    {
      title: "LeetCode Tracker",
      desc: "Discord bot that gamifies LeetCode progress for study groups with daily challenges.",
      tech: ["Go", "PostgreSQL", "Discord API"],
      category: "Backend",
      metrics: "Users: 500+",
      github: "#",
      demo: "#",
    },
    {
      title: "Object Detection API",
      desc: "Scalable YOLOv8 microservice deployed on Kubernetes for real-time video analysis.",
      tech: ["YOLO", "Docker", "K8s"],
      category: "Computer Vision",
      metrics: "FPS: 45+",
      github: "#",
      demo: "#",
    },
    {
      title: "Predictive Maintenance",
      desc: "Time-series forecasting for industrial equipment failure prediction.",
      tech: ["TensorFlow", "Pandas", "Scikit-learn"],
      category: "ML/AI",
      metrics: "Precision: 0.89",
      github: "#",
      demo: "#",
    },
  ];

  const categories = ["All", "Computer Vision", "NLP", "AWS/Cloud", "ML/AI"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category === filter ||
            (filter === "ML/AI" &&
              !["Computer Vision", "NLP", "AWS/Cloud"].includes(p.category)),
        );

  return (
    <section
      id="projects"
      className="py-24 relative"
      data-name="projects"
      data-file="components/Projects.js"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-[var(--primary-cyan)]">Projects</span>
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mt-6 md:mt-0 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  filter === cat
                    ? "bg-[var(--primary-purple)] text-white shadow-[0_0_15px_rgba(188,19,254,0.4)]"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="glass-card group hover:-translate-y-2 transition-transform duration-300 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--primary-purple)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="icon-folder text-4xl text-[var(--primary-cyan)]/80 mb-4 group-hover:text-[var(--primary-cyan)] transition-colors"></div>
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    <a
                      href={project.github}
                      className="text-gray-400 hover:text-white"
                    >
                      <div className="icon-github text-xl"></div>
                    </a>
                    <a
                      href={project.demo}
                      className="text-gray-400 hover:text-white"
                    >
                      <div className="icon-external-link text-xl"></div>
                    </a>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--primary-cyan)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                  {project.desc}
                </p>

                <div className="mb-6 bg-white/5 rounded p-3 border border-white/5">
                  <p className="text-xs text-[var(--primary-purple)] font-bold uppercase tracking-wider mb-1">
                    Key Metric
                  </p>
                  <p className="text-white font-mono">{project.metrics}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono px-2 py-1 rounded bg-[var(--primary-cyan)]/10 text-[var(--primary-cyan)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
