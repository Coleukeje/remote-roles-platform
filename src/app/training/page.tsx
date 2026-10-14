import { curriculum, totalLessons, totalDuration } from "@/data/curriculum";
import Link from "next/link";
import TopBar from "@/components/TopBar";

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white border border-surface-dim rounded-xl p-4 text-center">
      <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink">{value}</p>
      <p className="text-xs text-muted mt-0.5">{label}</p>
    </div>
  );
}

export default function TrainingHome() {
  const lessons = totalLessons();
  const duration = totalDuration();
  const weeks = curriculum.length;
  const days = curriculum.reduce((s, w) => s + w.days.length, 0);

  return (
    <>
      <TopBar title="Training Dashboard" subtitle="Your learning journey" />
      <div className="flex-1 overflow-y-auto">
        {/* ─── Hero banner ─── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-ink via-ink-light to-purple-900 px-8 py-10">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-600/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-purple-500/8 blur-xl" />

          <div className="relative z-10">
            <p className="text-[11px] font-bold text-purple-400 uppercase tracking-[0.15em] mb-2">
              Welcome Back
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-2">
              Your Training Journey
            </h2>
            <p className="text-purple-100/80 text-[15px] max-w-xl mb-6 leading-relaxed">
              Master remote work, build rapport, and become a top-performing cold caller.
              Each week builds on the last — complete them in order for the best results.
            </p>
            <Link
              href={`/training/${curriculum[0].id}/${curriculum[0].days[0].id}`}
              className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-purple-50 transition-colors shadow-lg shadow-black/20"
            >
              Start Learning
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* ─── Stats strip ─── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard value={`${weeks}`} label="Weeks" />
            <StatCard value={`${days}`} label="Training Days" />
            <StatCard value={`${lessons}`} label="Total Lessons" />
            <StatCard value={duration} label="Total Duration" />
          </div>

          {/* ─── Week cards ─── */}
          <div className="space-y-6">
            {curriculum.map((week) => {
              const weekLessons = week.days.reduce((s, d) => s + d.lessons.length, 0);
              const weekMins = week.days.reduce(
                (s, d) => s + d.lessons.reduce((ls, l) => ls + parseInt(l.duration), 0),
                0,
              );

              return (
                <div
                  key={week.id}
                  className="bg-white border border-surface-dim rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Week header */}
                  <div className="bg-gradient-to-r from-ink to-ink-light p-6 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{week.icon}</span>
                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.12em]">
                          Week {week.week}
                        </span>
                      </div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                        {week.title}
                      </h3>
                      <p className="text-sm text-purple-100/70 mt-1 max-w-lg">{week.description}</p>
                    </div>
                    <div className="flex gap-3 flex-shrink-0 ml-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-white">{weekLessons}</p>
                        <p className="text-[10px] text-purple-300/60 uppercase">Lessons</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-white">{weekMins}m</p>
                        <p className="text-[10px] text-purple-300/60 uppercase">Duration</p>
                      </div>
                    </div>
                  </div>

                  {/* Day rows */}
                  <div className="divide-y divide-surface-dim">
                    {week.days.map((day) => {
                      const dayMins = day.lessons.reduce((s, l) => s + parseInt(l.duration), 0);

                      return (
                        <Link
                          key={day.id}
                          href={`/training/${week.id}/${day.id}`}
                          className="flex items-center gap-4 px-6 py-4 hover:bg-purple-50/50 transition-colors group"
                        >
                          {/* Day number */}
                          <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-surface-dim group-hover:bg-purple-100 flex items-center justify-center text-sm font-bold text-muted group-hover:text-purple-600 transition-colors">
                            {day.day}
                          </span>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-ink">{day.title}</p>
                            <p className="text-xs text-muted truncate mt-0.5">{day.description}</p>
                          </div>

                          {/* Meta */}
                          <div className="hidden sm:flex items-center gap-3 flex-shrink-0 text-xs text-muted">
                            <span>{day.lessons.length} lessons</span>
                            <span className="w-px h-3 bg-surface-dim" />
                            <span>{dayMins} min</span>
                          </div>

                          {/* Arrow */}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            className="text-muted/40 group-hover:text-purple-500 transition-colors flex-shrink-0"
                          >
                            <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
