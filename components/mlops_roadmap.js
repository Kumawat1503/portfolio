// ── Constants ──────────────────────────────────────────────────────────────
var MLOPS_STORAGE_KEY = "mlops-done-state";

var MLOPS_TAG_STYLES = {
  critical: "bg-red-500/20 text-red-300 border border-red-500/30",
  deep: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  accelerate: "bg-green-500/20 text-green-300 border border-green-500/30",
  skip: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
  project: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
};

var MLOPS_PRIORITY_DOT = {
  critical: "bg-[var(--primary-cyan)] shadow-[0_0_6px_rgba(0,243,255,0.6)]",
  high: "bg-[var(--primary-purple)]",
  medium: "bg-yellow-400",
  low: "bg-gray-500",
};

// ── Data ───────────────────────────────────────────────────────────────────
var MLOPS_PHASE1 = [
  {
    month: "Month 1 · Python and ML fundamentals",
    topics: [
      { id: "p1-python", priority: "critical", name: "Python for ML", sub: "NumPy, pandas, scikit-learn, matplotlib. Don't skip fundamentals. 2 weeks. Build: linear regression from scratch.", tags: [{ label: "production requirement", type: "critical" }] },
      { id: "p1-stats", priority: "critical", name: "Statistics and probability", sub: "Distributions, hypothesis testing, A/B test interpretation. Re-learn from an ML lens: what does p-value mean for your model?", tags: [{ label: "production requirement", type: "critical" }] },
      { id: "p1-sql", priority: "high", name: "SQL for ML", sub: "Window functions, query optimization, feature extraction. You'll use this to pull training data and debug feature pipelines.", tags: [{ label: "data engineering angle", type: "deep" }] },
      { id: "p1-git", priority: "medium", name: "Git and version control", sub: "ML-specific patterns: .gitignore for models/data, DVC integration, branching strategy for model experiments.", tags: [{ label: "existing skill — 1 day gap fill", type: "skip" }] },
    ],
  },
  {
    month: "Month 2 · MLOps core stack",
    topics: [
      { id: "p1-docker", priority: "critical", name: "Docker fundamentals — you know this", sub: null, tags: [{ label: "existing skill — go deeper for ML", type: "deep" }] },
      { id: "p1-fastapi", priority: "critical", name: "FastAPI — model serving", sub: null, tags: [] },
      { id: "p1-env", priority: "medium", name: "Environment management — poetry, venv", sub: "Reproducible environments. Poetry lockfiles. Why pip freeze breaks and what to do instead.", tags: [{ label: "1-2 days", type: "accelerate" }] },
    ],
  },
  {
    month: "Month 3 · Deep learning foundations",
    topics: [
      { id: "p1-nn", priority: "high", name: "Neural networks from scratch", sub: null, tags: [{ label: "judgment prerequisite", type: "deep" }] },
      { id: "p1-pytorch", priority: "critical", name: "PyTorch fundamentals", sub: "Autograd, tensors, nn.Module, training loops, GPU management. This is your production ML framework.", tags: [{ label: "production requirement", type: "critical" }] },
      { id: "p1-optim", priority: "medium", name: "Optimization algorithms", sub: "SGD, Adam, learning rate scheduling. Focus on: when does training diverge and how do I detect it in Grafana?", tags: [{ label: "ties to your Grafana edge", type: "deep" }] },
      { id: "p1-transformers", priority: "medium", name: "Transformers — just the architecture", sub: "Self-attention, positional encoding, encoder-decoder. You don't need to train them. You need to serve and monitor them.", tags: [{ label: "serving, not training", type: "accelerate" }] },
      { id: "p1-cnns", priority: null, name: "CNNs — light coverage", sub: "Conv layers, ResNet, transfer learning. Understand enough to serve a vision model.", tags: [{ label: "light coverage only", type: "skip" }] },
      { id: "p1-rnns", priority: "low", name: "RNNs — skim only", sub: "Understand vanishing gradients, LSTM/GRU. Spend 2 days max.", tags: [{ label: "superseded — minimal time", type: "skip" }] },
    ],
  },
];

var MLOPS_PHASE2 = [
  {
    month: "Month 4 · GenAI and embeddings",
    topics: [
      { id: "p2-embeddings", priority: "high", name: "Embeddings — how they work and fail", sub: "Word2Vec, BERT, sentence embeddings. Key for XAI/fairness — embeddings encode bias.", tags: [{ label: "XAI angle", type: "deep" }] },
      { id: "p2-vectordb", priority: "high", name: "Vector databases", sub: null, tags: [{ label: "2025 hot topic", type: "deep" }] },
      { id: "p2-llms", priority: "medium", name: "LLMs — architecture and serving", sub: "GPT, BERT, LLaMA families. Focus on serving efficiently. Skip training theory.", tags: [{ label: "serving focus only", type: "accelerate" }] },
      { id: "p2-prompt", priority: "medium", name: "Prompt engineering", sub: "Chain-of-thought, system prompts, output formatting. 3 days max.", tags: [{ label: "fast — you already do this", type: "accelerate" }] },
      { id: "p2-llmcost", priority: "high", name: "LLM cost mathematics", sub: "Token pricing, request cost estimation, scaling math. Critical for FinTech/e-commerce.", tags: [{ label: "fintech/ecommerce angle", type: "deep" }] },
      { id: "p2-rag", priority: "medium", name: "RAG — architecture only", sub: null, tags: [{ label: "awareness, not deep mastery", type: "skip" }] },
      { id: "p2-finetune", priority: "low", name: "Fine-tuning LLMs — skim", sub: null, tags: [{ label: "superseded — minimal time", type: "skip" }] },
    ],
  },
  {
    month: "Month 4.5 · Advanced MLOps — experiment tracking",
    topics: [
      { id: "p2-mlflow", priority: "critical", name: "MLflow / experiment tracking", sub: "Parameter logging, metric tracking, model versioning, comparison dashboards. Build a dashboard in MLflow + add to Grafana.", tags: [{ label: "production critical", type: "critical" }] },
      { id: "p2-registry", priority: "high", name: "Model registry", sub: "Versioning strategies, promotion to production, rollback. How do you know which model is running in prod right now?", tags: [{ label: "production critical", type: "deep" }] },
      { id: "p2-dvc", priority: "high", name: "Data versioning with DVC", sub: null, tags: [{ label: "reproducibility anchor", type: "deep" }] },
    ],
  },
  {
    month: "Month 5 · System design and production ML",
    topics: [
      { id: "p2-monitoring", priority: "critical", name: "Monitoring and observability — YOUR unfair advantage", sub: "Connect your Grafana expertise to ML: latency histograms, prediction distributions, feature drift dashboards.", tags: [{ label: "unique differentiator", type: "critical" }] },
      { id: "p2-drift", priority: "critical", name: "Model drift detection", sub: null, tags: [{ label: "core MLOps skill", type: "critical" }] },
      { id: "p2-sysdesign", priority: "critical", name: "System design for ML — scalability and pipelines", sub: null, tags: [{ label: "interview critical", type: "critical" }] },
      { id: "p2-logging", priority: "high", name: "Logging and debugging — structured logs, distributed tracing", sub: null, tags: [{ label: "production debugging", type: "deep" }] },
      { id: "p2-caching", priority: "high", name: "Caching strategies — semantic caching", sub: "Exact match, semantic caching, fuzzy caching, cache invalidation. High-impact for LLM cost reduction.", tags: [{ label: "fintech cost angle", type: "deep" }] },
      { id: "p2-api", priority: "high", name: "API design for ML systems", sub: "RESTful, rate limiting, auth, versioning, batch endpoints.", tags: [{ label: "production serving", type: "deep" }] },
      { id: "p2-hybrid", priority: null, name: "Hybrid architecture design + fallback chains", sub: "Rules vs ML vs LLMs, tiered routing, circuit breaker patterns.", tags: [{ label: "resilience design", type: "deep" }] },
      { id: "p2-scaling", priority: "medium", name: "Load balancing and scaling", sub: "Horizontal vs. vertical, auto-scaling, traffic management.", tags: [{ label: "builds on cloud knowledge", type: "accelerate" }] },
    ],
  },
];

var MLOPS_PHASE3 = [
  {
    month: "Month 6-7 · Advanced production",
    topics: [
      { id: "p3-cicd", priority: "critical", name: "CI/CD for ML — automated testing and deployment", sub: "GitHub Actions for ML, automated model testing, canary releases. Your first full pipeline: train to deploy to monitor.", tags: [{ label: "flagship project component", type: "critical" }] },
      { id: "p3-ab", priority: "critical", name: "A/B testing frameworks", sub: null, tags: [{ label: "XAI/fairness angle", type: "critical" }] },
      { id: "p3-shap", priority: "critical", name: "Model interpretability — SHAP and LIME", sub: null, tags: [{ label: "second differentiation", type: "critical" }] },
      { id: "p3-incident", priority: null, name: "Incident response and post-mortems", sub: null, tags: [{ label: "signal of seniority", type: "deep" }] },
      { id: "p3-batch", priority: "high", name: "Batch processing and pipelines — Airflow/Prefect", sub: "Batch inference, orchestration. Build a scheduled batch pipeline for one of your projects.", tags: [{ label: "batch pipeline project", type: "project" }] },
      { id: "p3-terraform", priority: null, name: "Infrastructure as code — Terraform basics", sub: "Cloud resource management, IaC versioning.", tags: [{ label: "builds on cloud experience", type: "accelerate" }] },
      { id: "p3-cost", priority: "high", name: "Cost optimization — quantization, distillation, batching", sub: "INT8/INT4 quantization, dynamic model selection. Critical for FinTech where inference cost directly hits margin.", tags: [{ label: "fintech margin impact", type: "deep" }] },
    ],
  },
  {
    month: "Month 7-8 · Data pipelines and serving at scale",
    topics: [
      { id: "p3-kafka", priority: "medium", name: "Streaming data — Kafka basics", sub: null, tags: [{ label: "conceptual understanding", type: "accelerate" }] },
      { id: "p3-features", priority: "medium", name: "Feature engineering in production — feature stores", sub: "Online vs. offline features, feature monitoring, pipeline validation.", tags: [] },
      { id: "p3-eval", priority: "medium", name: "Model evaluation in production", sub: null, tags: [{ label: "human judgment territory", type: "deep" }] },
      { id: "p3-multimodel", priority: "medium", name: "Multi-model serving strategies", sub: "Model ensembling, routing strategies, graceful transitions.", tags: [{ label: "zero-downtime deployments", type: "deep" }] },
      { id: "p3-security", priority: "medium", name: "Security for ML systems", sub: "Model security, adversarial attacks, data privacy. Your cybersecurity interest makes this a second specialization angle.", tags: [{ label: "cybersecurity intersection", type: "deep" }] },
      { id: "p3-dataquality", priority: "low", name: "Data quality pipelines", sub: "Missing data, outlier detection, data validation, augmentation, orchestration.", tags: [{ label: "completes the picture", type: "accelerate" }] },
    ],
  },
];

var MLOPS_PROJECTS = [
  {
    id: "proj1",
    phase: "Month 2.5",
    phaseStyle: { color: "var(--primary-cyan)", border: "1px solid rgba(0,243,255,0.4)", background: "rgba(0,243,255,0.08)" },
    name: "ML model API with monitoring dashboard",
    desc: "Build a fraud detection FastAPI service, containerise it, and wire up a Grafana dashboard for real-time monitoring. Deploy to Cloud Run free tier.",
    deliverables: [
      "GitHub repo with Dockerfile, FastAPI app, Grafana dashboard JSON export",
      "Live public URL (Cloud Run free tier)",
      "LinkedIn post about the Grafana dashboard you built",
    ],
    skills: ["FastAPI", "Docker", "Grafana", "Cloud Run", "scikit-learn"],
  },
  {
    id: "proj2",
    phase: "Month 4.5",
    phaseStyle: { color: "#93c5fd", border: "1px solid rgba(147,197,253,0.4)", background: "rgba(147,197,253,0.08)" },
    name: "Full ML experiment tracking system",
    desc: "Build an end-to-end experiment tracking pipeline: DVC for data versioning, MLflow for metric tracking, Grafana for comparison dashboards.",
    deliverables: [
      "MLflow server + DVC pipeline in a public repo",
      "Grafana dashboard comparing 3+ model experiments",
      "LinkedIn post about the 3 things you had to debug",
    ],
    skills: ["MLflow", "DVC", "Grafana", "PyTorch", "Python"],
  },
  {
    id: "proj3",
    phase: "Month 5",
    phaseStyle: { color: "#d8b4fe", border: "1px solid rgba(216,180,254,0.4)", background: "rgba(216,180,254,0.08)" },
    name: "Production LLM serving system",
    desc: "Build a cost-aware LLM serving layer with semantic caching, request batching, and drift detection. Target: FinTech use case.",
    deliverables: [
      "FastAPI LLM gateway with semantic caching layer",
      "Cost tracking dashboard (tokens/request, daily spend)",
      "Grafana alerts for latency spikes and cache miss rates",
    ],
    skills: ["FastAPI", "Redis", "OpenAI API", "Grafana", "Docker"],
  },
  {
    id: "proj4",
    phase: "Month 6-7",
    phaseStyle: { color: "#fdba74", border: "1px solid rgba(253,186,116,0.4)", background: "rgba(253,186,116,0.08)" },
    name: "End-to-end MLOps pipeline with CI/CD",
    desc: "The flagship project. Full pipeline from training to serving: GitHub Actions CI/CD, automated model testing, canary deploys, SHAP explainability endpoint, and a complete Grafana observability stack.",
    deliverables: [
      "Complete GitHub repo with CI/CD pipeline running",
      "Live model API with SHAP endpoint for explanations",
      "Grafana dashboard with training metrics, serving metrics, and drift detection",
      "2-minute Loom walkthrough video for LinkedIn",
    ],
    skills: ["GitHub Actions", "PyTorch", "SHAP", "Grafana", "Docker", "FastAPI", "DVC"],
  },
];

var MLOPS_WEEK1 = [
  { day: "Day 1", task: "Set up Python environment. Install poetry, create a project. Run a NumPy exercise from scratch.", rest: false },
  { day: "Day 2", task: "Read FastAPI source code for 1 hour. Write down 3 things you don't understand. Ask AI to explain only those 3.", rest: false },
  { day: "Day 3", task: "Set up GitHub repo mlops-journey. Write a README with your goal. Push it publicly. Post on LinkedIn.", rest: false },
  { day: "Day 4", task: "Linear regression from scratch in NumPy. No sklearn. Predict house prices. Check if your loss curve converges.", rest: false },
  { day: "Day 5", task: "Dockerize your linear regression script. Write a Dockerfile. Build and run locally. Debug one issue that comes up.", rest: false },
  { day: "Day 6", task: "Write your first public post: Day 6 of my MLOps journey. Here is the one thing I broke and fixed today. Post on LinkedIn.", rest: false },
  { day: "Day 7", task: "Rest. Review what you built. Write 3 questions you still have. These become your Day 8 agenda.", rest: true },
];

var MLOPS_RHYTHM = [
  { days: "Mon-Wed", activity: "Deep learning session (2-3 hrs). One new concept, one code exercise." },
  { days: "Thu-Fri", activity: "Build or extend a project. Apply what you learned this week." },
  { days: "Saturday", activity: "Write one LinkedIn post about what you built, broke, or learned." },
  { days: "Sunday", activity: "Review and plan next week. Read one blog post or paper abstract." },
];

// ── Sub-components ─────────────────────────────────────────────────────────
function MLOpsLegend() {
  var dots = [
    { label: "Critical", cls: "bg-[var(--primary-cyan)]", textCls: "text-[var(--primary-cyan)]" },
    { label: "High", cls: "bg-[var(--primary-purple)]", textCls: "text-[var(--primary-purple)]" },
    { label: "Medium", cls: "bg-yellow-400", textCls: "text-yellow-400" },
    { label: "Low", cls: "bg-gray-500", textCls: "text-gray-400" },
  ];
  var tagEntries = Object.entries(MLOPS_TAG_STYLES);
  return (
    <div className="flex flex-wrap gap-3 mb-6 text-xs">
      {dots.map(function(d) {
        return (
          <div key={d.label} className="flex items-center gap-1.5">
            <div className={"w-2 h-2 rounded-full " + d.cls} />
            <span className={d.textCls}>{d.label}</span>
          </div>
        );
      })}
      <span className="text-gray-600 mx-1">|</span>
      {tagEntries.map(function(entry) {
        return (
          <span key={entry[0]} className={"text-xs px-2 py-0.5 rounded-full font-medium " + entry[1]}>
            {entry[0]}
          </span>
        );
      })}
    </div>
  );
}

function MLOpsTopicRow(props) {
  var topic = props.topic;
  var done = props.done;
  var toggle = props.toggle;
  var isDone = !!done[topic.id];
  var dotCls = topic.priority ? MLOPS_PRIORITY_DOT[topic.priority] : "";
  return (
    <div
      onClick={function() { toggle(topic.id); }}
      className={"flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/5 " + (isDone ? "opacity-40" : "")}
    >
      <div className="flex-shrink-0 mt-1.5">
        {topic.priority ? (
          <div className={"w-2 h-2 rounded-full " + dotCls} />
        ) : (
          <div className="w-2 h-2 rounded-full" />
        )}
      </div>
      <div className={"flex-shrink-0 w-4 h-4 rounded border mt-0.5 flex items-center justify-center transition-all duration-200 " + (isDone ? "bg-[var(--primary-cyan)] border-[var(--primary-cyan)]" : "border-white/30")}>
        {isDone && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className={"text-sm font-medium leading-snug " + (isDone ? "line-through text-gray-500" : "text-white")}>
          {topic.name}
        </div>
        {topic.sub && (
          <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{topic.sub}</div>
        )}
        {topic.tags && topic.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {topic.tags.map(function(tag, i) {
              var tagCls = MLOPS_TAG_STYLES[tag.type] || MLOPS_TAG_STYLES.skip;
              return (
                <span key={i} className={"text-xs px-2 py-0.5 rounded-full font-medium " + tagCls}>
                  {tag.label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function MLOpsPhasePanel(props) {
  var phases = props.phases;
  var done = props.done;
  var toggle = props.toggle;
  var allIds = phases.reduce(function(acc, block) {
    block.topics.forEach(function(t) { acc.push(t.id); });
    return acc;
  }, []);
  var completedCount = allIds.filter(function(id) { return done[id]; }).length;
  var pct = allIds.length ? Math.round((completedCount / allIds.length) * 100) : 0;
  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Progress</span>
          <span className="text-[var(--primary-cyan)] font-medium">{pct}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: pct + "%", background: "linear-gradient(to right, var(--primary-cyan), var(--primary-purple))" }}
          />
        </div>
      </div>
      {phases.map(function(block, i) {
        return (
          <div key={i} className="mb-6">
            <div className="text-xs font-semibold text-[var(--primary-cyan)] uppercase tracking-widest mb-3 px-1">
              {block.month}
            </div>
            <div className="glass-card divide-y divide-white/5">
              {block.topics.map(function(topic) {
                return <MLOpsTopicRow key={topic.id} topic={topic} done={done} toggle={toggle} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MLOpsProjectsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {MLOPS_PROJECTS.map(function(proj) {
        return (
          <div key={proj.id} className="glass-card p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold text-white leading-snug">{proj.name}</div>
              <span className="flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full" style={proj.phaseStyle}>
                {proj.phase}
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{proj.desc}</p>
            <div className="space-y-1.5">
              {proj.deliverables.map(function(d, i) {
                return (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                    <span className="text-[var(--primary-cyan)] flex-shrink-0">›</span>
                    <span>{d}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {proj.skills.map(function(s, i) {
                return (
                  <span key={i} className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                    {s}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MLOpsWeek1Panel() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {MLOPS_WEEK1.map(function(d, i) {
          return (
            <div key={i} className={"glass-card p-4 " + (d.rest ? "opacity-60" : "")}>
              <div className={"text-xs font-bold uppercase tracking-widest mb-2 " + (d.rest ? "text-gray-500" : "text-[var(--primary-cyan)]")}>
                {d.day}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{d.task}</p>
            </div>
          );
        })}
      </div>
      <div className="glass-card p-5">
        <div className="text-xs font-semibold text-[var(--primary-cyan)] uppercase tracking-widest mb-4">
          Weekly rhythm for the full 6-8 months
        </div>
        <div className="space-y-3">
          {MLOPS_RHYTHM.map(function(row, i) {
            return (
              <div key={i} className="flex gap-4 text-xs">
                <span className="font-medium text-white min-w-[80px] flex-shrink-0">{row.days}</span>
                <span className="text-gray-400">{row.activity}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
function MLOpsRoadmap() {
  var loadDone = function() {
    try {
      var stored = localStorage.getItem(MLOPS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  };

  var stateArr = React.useState(loadDone);
  var activeTabArr = React.useState("phase1");
  var done = stateArr[0];
  var setDone = stateArr[1];
  var activeTab = activeTabArr[0];
  var setActiveTab = activeTabArr[1];

  var toggle = function(id) {
    var next = Object.assign({}, done);
    next[id] = !done[id];
    setDone(next);
    try {
      localStorage.setItem(MLOPS_STORAGE_KEY, JSON.stringify(next));
    } catch (e) {}
  };

  var tabs = [
    { id: "phase1", label: "Phase 1", sublabel: "Foundation - Months 1-3" },
    { id: "phase2", label: "Phase 2", sublabel: "Compression - Months 4-5" },
    { id: "phase3", label: "Phase 3", sublabel: "Ownership - Months 6-8" },
    { id: "projects", label: "Projects", sublabel: "4 portfolio pieces" },
    { id: "week1", label: "Week 1", sublabel: "Day-by-day plan" },
  ];

  return (
    <section
      id="mlops-roadmap"
      className="py-24 relative"
      data-name="mlops-roadmap"
      data-file="components/mlops_roadmap.js"
    >
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            MLOps{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(to right, var(--primary-cyan), var(--primary-purple))" }}
            >
              Journey
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl text-sm leading-relaxed mt-3">
            8-month structured path from ML foundations to production MLOps. Click any topic to mark it done.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap mb-8 pb-1">
          {tabs.map(function(tab) {
            var isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={function() { setActiveTab(tab.id); }}
                className="flex flex-col items-start px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border flex-shrink-0"
                style={isActive ? { borderColor: "var(--primary-cyan)", color: "var(--primary-cyan)", background: "rgba(0,243,255,0.08)" } : { borderColor: "rgba(255,255,255,0.1)", color: "#9ca3af" }}
              >
                <span>{tab.label}</span>
                <span className="text-xs opacity-60 font-normal">{tab.sublabel}</span>
              </button>
            );
          })}
        </div>

        {(activeTab === "phase1" || activeTab === "phase2" || activeTab === "phase3") && (
          <MLOpsLegend />
        )}

        {activeTab === "phase1" && <MLOpsPhasePanel phases={MLOPS_PHASE1} done={done} toggle={toggle} />}
        {activeTab === "phase2" && <MLOpsPhasePanel phases={MLOPS_PHASE2} done={done} toggle={toggle} />}
        {activeTab === "phase3" && <MLOpsPhasePanel phases={MLOPS_PHASE3} done={done} toggle={toggle} />}
        {activeTab === "projects" && <MLOpsProjectsPanel />}
        {activeTab === "week1" && <MLOpsWeek1Panel />}
      </div>
    </section>
  );
}
