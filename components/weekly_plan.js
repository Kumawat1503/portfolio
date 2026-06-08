// ── Constants & data ─────────────────────────────────────────────────────────

var WEEKLY_STORAGE_KEY = "portfolio-weekly-v1";

var WEEK_DAYS = [
  { key: "mon", tag: "Mon", label: "Monday",    task: "Deep learning — study one new concept. Write down 3 things you don't understand.", rest: false },
  { key: "tue", tag: "Tue", label: "Tuesday",   task: "Code exercise — implement Monday's concept from scratch. No copy-paste.", rest: false },
  { key: "wed", tag: "Wed", label: "Wednesday", task: "Consolidate — debug, refine, or extend. Summarise progress in a comment or README.", rest: false },
  { key: "thu", tag: "Thu", label: "Thursday",  task: "Build — start or extend a project applying this week's concept.", rest: false },
  { key: "fri", tag: "Fri", label: "Friday",    task: "Build — push further. Write a README section or document a key decision.", rest: false },
  { key: "sat", tag: "Sat", label: "Saturday",  task: "Share — write one LinkedIn post about what you built, broke, or learned this week.", rest: false },
  { key: "sun", tag: "Sun", label: "Sunday",    task: "Review & plan — close open questions. Define next week's learning focus.", rest: true  },
];

// 8 months totalling 35 weeks
var MONTH_COUNTS = [5, 4, 4, 5, 4, 4, 5, 4];

var ALL_WEEKS = (function () {
  var list = [];
  var n = 1;
  for (var m = 0; m < MONTH_COUNTS.length; m++) {
    for (var w = 1; w <= MONTH_COUNTS[m]; w++) {
      list.push({ weekNum: n, monthIdx: m, weekInMonth: w });
      n++;
    }
  }
  return list;
})();

function wdKey(weekNum, dayKey) {
  return "w" + weekNum + "-" + dayKey;
}

function loadWeeklyStore() {
  try {
    var s = localStorage.getItem(WEEKLY_STORAGE_KEY);
    if (s) return JSON.parse(s);
  } catch (e) {}
  return { days: {}, lastWeek: 1 };
}

function saveWeeklyStore(d) {
  try { localStorage.setItem(WEEKLY_STORAGE_KEY, JSON.stringify(d)); } catch (e) {}
}

// ── WeekDayCard ───────────────────────────────────────────────────────────────

function WeekDayCard({ weekNum, day, store, onToggle, onNoteBlur }) {
  var k = wdKey(weekNum, day.key);
  var entry = store.days[k] || { done: false, note: "" };
  var [note, setNote] = React.useState(entry.note || "");

  return (
    <div
      className={"glass-card p-4 flex flex-col gap-3 border-l-2 " +
        (day.rest ? "border-l-[var(--primary-purple)]" : "border-l-[var(--primary-cyan)]")}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span className={"text-xs font-bold uppercase tracking-widest block mb-1 " +
            (day.rest ? "text-[var(--primary-purple)]" : "text-[var(--primary-cyan)]")}>
            {day.tag} · {day.label}
          </span>
          <p className={"text-xs leading-relaxed " + (entry.done ? "line-through text-gray-600" : "text-gray-300")}>
            {day.task}
          </p>
        </div>
        <button
          onClick={function () { onToggle(k); }}
          className={"flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all " +
            (entry.done
              ? "bg-[var(--primary-cyan)] border-[var(--primary-cyan)]"
              : "border-gray-600 hover:border-[var(--primary-cyan)]")}
          title={entry.done ? "Mark undone" : "Mark done"}
        >
          {entry.done && (
            <span className="icon-check text-black" style={{ fontSize: "10px" }} />
          )}
        </button>
      </div>
      <textarea
        value={note}
        onChange={function (e) { setNote(e.target.value); }}
        onBlur={function () { onNoteBlur(k, note); }}
        placeholder="Log what you did today…"
        rows={2}
        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-xs text-gray-400 placeholder-gray-600 resize-none focus:outline-none focus:border-[rgba(0,243,255,0.4)] transition-colors"
      />
    </div>
  );
}

// ── WeekPanel ─────────────────────────────────────────────────────────────────

function WeekPanel({ weekNum, store, onToggle, onNoteBlur }) {
  var meta = ALL_WEEKS[weekNum - 1];
  var doneCount = WEEK_DAYS.filter(function (d) {
    return (store.days[wdKey(weekNum, d.key)] || {}).done;
  }).length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
            Month {meta.monthIdx + 1} &middot; Week {meta.weekInMonth} of {MONTH_COUNTS[meta.monthIdx]}
          </p>
          <h3 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Week {weekNum}
          </h3>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-sm text-gray-400">
            {doneCount}<span className="text-gray-600">/7</span>
          </span>
          <div className="w-24 bg-[rgba(255,255,255,0.05)] rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: (doneCount / 7 * 100) + "%",
                background: "linear-gradient(to right, var(--primary-cyan), var(--primary-purple))"
              }}
            />
          </div>
          {doneCount === 7 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(0,243,255,0.1)] text-[var(--primary-cyan)] border border-[rgba(0,243,255,0.3)] whitespace-nowrap">
              Done
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {WEEK_DAYS.map(function (day) {
          return (
            <WeekDayCard
              key={wdKey(weekNum, day.key)}
              weekNum={weekNum}
              day={day}
              store={store}
              onToggle={onToggle}
              onNoteBlur={onNoteBlur}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── WeeklyPlan ────────────────────────────────────────────────────────────────

function WeeklyPlan() {
  var [store, setStore] = React.useState(loadWeeklyStore);
  var [selectedWeek, setSelectedWeek] = React.useState(function () {
    return loadWeeklyStore().lastWeek || 1;
  });
  var [openMonths, setOpenMonths] = React.useState(function () {
    var initial = loadWeeklyStore().lastWeek || 1;
    return new Set([ALL_WEEKS[initial - 1].monthIdx]);
  });

  function toggleMonth(idx) {
    setOpenMonths(function (prev) {
      var next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  }

  function selectWeek(w) {
    setSelectedWeek(w);
    setStore(function (prev) {
      var next = Object.assign({}, prev, { lastWeek: w });
      saveWeeklyStore(next);
      return next;
    });
    setOpenMonths(function (prev) {
      var next = new Set(prev);
      next.add(ALL_WEEKS[w - 1].monthIdx);
      return next;
    });
  }

  function toggleDay(k) {
    setStore(function (prev) {
      var entry = prev.days[k] || { done: false, note: "" };
      var next = Object.assign({}, prev, {
        days: Object.assign({}, prev.days, {
          [k]: Object.assign({}, entry, { done: !entry.done })
        })
      });
      saveWeeklyStore(next);
      return next;
    });
  }

  function saveNote(k, value) {
    setStore(function (prev) {
      var entry = prev.days[k] || { done: false, note: "" };
      if (entry.note === value) return prev;
      var next = Object.assign({}, prev, {
        days: Object.assign({}, prev.days, {
          [k]: Object.assign({}, entry, { note: value })
        })
      });
      saveWeeklyStore(next);
      return next;
    });
  }

  var totalDays = 245;
  var doneDays = Object.values(store.days).filter(function (d) { return d && d.done; }).length;
  var doneWeeks = ALL_WEEKS.filter(function (w) {
    return WEEK_DAYS.every(function (d) {
      return (store.days[wdKey(w.weekNum, d.key)] || {}).done;
    });
  }).length;
  var pct = Math.round(doneDays / totalDays * 100);

  return (
    <section
      id="weekly-plan"
      className="py-24 relative"
      data-name="weekly-plan"
      data-file="components/weekly_plan.js"
    >
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Weekly{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(to right, var(--primary-cyan), var(--primary-purple))" }}
            >
              Tracker
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl text-sm leading-relaxed mt-3">
            8-month journey — 35 weeks, 245 days. Log every day, track every week.
          </p>
        </div>

        {/* Stats bar */}
        <div className="glass-card p-5 mb-8">
          <div className="flex flex-wrap gap-8 mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Days Logged</p>
              <p className="text-2xl font-bold text-[var(--primary-cyan)]">
                {doneDays}<span className="text-sm text-gray-600 font-normal">/{totalDays}</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Weeks Complete</p>
              <p className="text-2xl font-bold text-[var(--primary-purple)]">
                {doneWeeks}<span className="text-sm text-gray-600 font-normal">/35</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Overall</p>
              <p className="text-2xl font-bold text-white">
                {pct}<span className="text-sm text-gray-600 font-normal">%</span>
              </p>
            </div>
          </div>
          <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: pct + "%",
                background: "linear-gradient(to right, var(--primary-cyan), var(--primary-purple))"
              }}
            />
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <aside className="lg:w-52 flex-shrink-0">
            <div className="glass-card divide-y divide-[rgba(255,255,255,0.05)] lg:sticky lg:top-24 max-h-[75vh] overflow-y-auto">
              {MONTH_COUNTS.map(function (count, mIdx) {
                var monthWeeks = ALL_WEEKS.filter(function (w) { return w.monthIdx === mIdx; });
                var mDone = monthWeeks.filter(function (w) {
                  return WEEK_DAYS.every(function (d) {
                    return (store.days[wdKey(w.weekNum, d.key)] || {}).done;
                  });
                }).length;
                var open = openMonths.has(mIdx);

                return (
                  <div key={mIdx}>
                    <button
                      onClick={function () { toggleMonth(mIdx); }}
                      className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[rgba(255,255,255,0.04)]"
                      style={{ color: open ? "var(--primary-cyan)" : "#6b7280" }}
                    >
                      <span>Month {mIdx + 1}</span>
                      <div className="flex items-center gap-2 normal-case tracking-normal font-normal">
                        <span style={{ color: mDone === count ? "var(--primary-cyan)" : "#374151" }}>
                          {mDone}/{count}
                        </span>
                        <span
                          className={"icon-chevron-" + (open ? "up" : "down")}
                          style={{ fontSize: "12px" }}
                        />
                      </div>
                    </button>
                    {open && (
                      <div className="pb-1">
                        {monthWeeks.map(function (w) {
                          var wDone = WEEK_DAYS.filter(function (d) {
                            return (store.days[wdKey(w.weekNum, d.key)] || {}).done;
                          }).length;
                          var isSelected = selectedWeek === w.weekNum;
                          return (
                            <button
                              key={w.weekNum}
                              onClick={function () { selectWeek(w.weekNum); }}
                              className={"w-full flex items-center justify-between px-4 py-2 text-xs transition-all " +
                                (isSelected
                                  ? "bg-[rgba(0,243,255,0.08)] text-[var(--primary-cyan)]"
                                  : "text-gray-500 hover:text-gray-300 hover:bg-[rgba(255,255,255,0.03)]")}
                            >
                              <span>Week {w.weekNum}</span>
                              <span style={{ color: wDone === 7 ? "var(--primary-cyan)" : "#374151", fontSize: "10px" }}>
                                {wDone === 7 ? "✓" : wDone + "/7"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Week panel */}
          <main className="flex-1 min-w-0">
            <WeekPanel
              key={selectedWeek}
              weekNum={selectedWeek}
              store={store}
              onToggle={toggleDay}
              onNoteBlur={saveNote}
            />
          </main>

        </div>
      </div>
    </section>
  );
}
