function Skills() {
  const skills = [
    { name: "Python", level: 95, color: "#3776AB" },
    { name: "PyTorch / TensorFlow", level: 90, color: "#EE4C2C" },
    { name: "AWS Services", level: 85, color: "#FF9900" },
    { name: "Go (Golang)", level: 75, color: "#00ADD8" },
    { name: "C++", level: 80, color: "#00599C" },
    { name: "Pandas / NumPy", level: 92, color: "#150458" },
  ];

  const achievements = [
    { number: "500+", label: "LeetCode Problems", icon: "icon-code" },
    { number: "15+", label: "ML Projects", icon: "icon-brain" },
    { number: "3", label: "Hackathon Wins", icon: "icon-trophy" },
    {
      number: "AWS",
      label: "Certified Solutions Architect",
      icon: "icon-cloud",
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 bg-[#050510]"
      data-name="skills"
      data-file="components/Skills.js"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skills Bars */}
          <div>
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-[var(--primary-purple)]">Skills</span>
            </h2>
            <div className="space-y-8">
              {skills.map((skill, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="font-mono font-bold text-gray-200">
                      {skill.name}
                    </span>
                    <span className="text-[var(--primary-cyan)] font-mono">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_currentColor]"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: "var(--primary-cyan)",
                        boxShadow: "0 0 5px var(--primary-cyan)",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Cards */}
          <div>
            <h2 className="text-4xl font-bold mb-8 lg:text-right">
              Milestones
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors border-white/5"
                >
                  <div
                    className={`${item.icon} text-4xl text-[var(--primary-purple)] mb-4`}
                  ></div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {item.number}
                  </h3>
                  <p className="text-gray-400 text-sm font-mono uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Mini Terminal */}
            <div className="mt-8 bg-black border border-gray-800 rounded-lg p-4 font-mono text-sm shadow-2xl">
              <div className="flex gap-2 mb-4 border-b border-gray-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-gray-300 space-y-2">
                <p>
                  <span className="text-green-400">➜</span>{" "}
                  <span className="text-blue-400">~</span> current_focus
                </p>
                <p className="pl-4 text-gray-400">
                  "Reinforcement Learning & LLM Fine-tuning"
                </p>
                <p>
                  <span className="text-green-400">➜</span>{" "}
                  <span className="text-blue-400">~</span> location
                </p>
                <p className="pl-4 text-gray-400">"Kota, Rajasthan, India"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
