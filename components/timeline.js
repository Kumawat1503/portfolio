function Timeline() {
  const timeline = [
    {
      year: "2025 - Present",
      role: "MLOps Engineer",
      company: "Aftershoot",
      desc: "Building and maintaining ML infrastructure, model serving pipelines, and observability systems.",
    },
    {
      year: "2024",
      role: "ML Engineer Intern",
      company: "YouDataAI",
      desc: "Worked on machine learning models and data pipelines.",
    },
    {
      year: "2021 - 2025",
      role: "B.Tech, Electrical Engineering",
      company: "IIT Delhi",
      desc: "Studied Electrical Engineering with strong coursework in CS and ML. Built several side projects spanning systems programming and machine learning.",
    },
  ];

  const routine = [
    { time: "5:00 - 6:00 AM", task: "Deep Work: ML Research", icon: "icon-book-open" },
    { time: "6:00 - 7:00 AM", task: "LeetCode", icon: "icon-code" },
    { time: "7:00 - 8:00 AM", task: "Communication", icon: "icon-message-circle" },
    { time: "8:00 - 9:00 AM", task: "Gym", icon: "icon-activity" },
    { time: "9:00 - 10:00 AM", task: "Ready", icon: "icon-sun" },
    { time: "10:00 AM - 6:00 PM", task: "Office Hours", icon: "icon-briefcase" },
    { time: "9:00 - 10:00 PM", task: "System Design", icon: "icon-layers" },
    { time: "10:00 - 10:30 PM", task: "Journal", icon: "icon-file-text" },
  ];

  return (
    <section
      id="timeline"
      className="py-24 relative overflow-hidden"
      data-name="timeline"
      data-file="components/Timeline.js"
    >
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--primary-cyan)] to-transparent opacity-20"></div>

      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Journey & <span className="text-[var(--primary-cyan)]">Routine</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Career Timeline */}
          <div className="relative border-l border-white/10 ml-4 lg:ml-0 pl-8 lg:pl-12 space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[41px] lg:-left-[57px] top-2 w-5 h-5 rounded-full bg-[var(--bg-dark)] border-2 border-[var(--primary-cyan)] shadow-[0_0_10px_var(--primary-cyan)]"></div>
                <span className="text-[var(--primary-cyan)] font-mono text-sm mb-2 block">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  {item.role}
                </h3>
                <p className="text-gray-400 text-sm mb-2">{item.company}</p>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Daily Routine */}
          <div className="glass-card p-8 bg-gradient-to-b from-white/5 to-transparent">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="icon-clock text-[var(--primary-purple)]"></div>
              Daily Protocol
            </h3>
            <div className="space-y-6">
              {routine.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--primary-purple)] group-hover:text-white transition-colors duration-300">
                    <div className={`${item.icon} text-xl`}></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-mono">
                      {item.time}
                    </p>
                    <p className="text-white font-medium">{item.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
