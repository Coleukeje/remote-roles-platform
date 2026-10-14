"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { curriculum } from "@/data/curriculum";
import { useState, useMemo } from "react";

/* ─── Tiny icons ─── */
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
      fill="none"
    >
      <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-50">
      <rect x="2.5" y="5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M4 5V3.5C4 2.4 4.9 1.5 6 1.5V1.5C7.1 1.5 8 2.4 8 3.5V5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill="#10B981" />
      <path d="M3.5 6.3L5 7.8L8.5 4.2" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const typeColors: Record<string, string> = {
  video: "bg-red-500",
  slides: "bg-purple-500",
  reading: "bg-amber-500",
  exercise: "bg-green-500",
  quiz: "bg-blue-500",
};

export default function Sidebar() {
  const pathname = usePathname();

  // Which weeks/days are expanded
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    curriculum.forEach((w) => {
      initial[w.id] = w.week <= 2; // First two weeks open by default
    });
    return initial;
  });
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  // Mock unlocked state — in production this comes from Supabase
  // Only week-1 is unlocked by default; admin unlocks the rest
  const [unlockedWeeks] = useState<Set<string>>(new Set(["week-1", "week-2", "week-3"]));

  function toggleWeek(weekId: string) {
    setExpandedWeeks((prev) => ({ ...prev, [weekId]: !prev[weekId] }));
  }

  function toggleDay(dayId: string) {
    setExpandedDays((prev) => ({ ...prev, [dayId]: !prev[dayId] }));
  }

  // Figure out which day is currently active from the URL
  const activeWeekDay = useMemo(() => {
    const match = pathname.match(/\/training\/(week-\d+)\/(w\dd\d)/);
    return match ? { weekId: match[1], dayId: match[2] } : null;
  }, [pathname]);

  // Lesson stats
  const totalLessons = curriculum.reduce(
    (s, w) => s + w.days.reduce((sd, d) => sd + d.lessons.length, 0),
    0,
  );

  return (
    <aside className="w-[280px] h-full bg-ink flex flex-col border-r border-ink-light flex-shrink-0">
      {/* ─── Logo ─── */}
      <div className="px-5 pt-5 pb-4">
        <Link href="/training" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-900/30">
            <span className="text-white font-[family-name:var(--font-display)] text-sm font-bold tracking-tight">
              RR
            </span>
          </div>
          <div>
            <p className="font-[family-name:var(--font-display)] font-bold text-[15px] text-white leading-tight">
              Remote Roles
            </p>
            <p className="text-[11px] text-purple-300/70 leading-tight">Training Academy</p>
          </div>
        </Link>
      </div>

      {/* ─── Progress card ─── */}
      <div className="mx-4 mb-3 rounded-xl bg-ink-light/60 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-purple-300/80 uppercase tracking-[0.15em]">
            Overall Progress
          </span>
          <span className="text-xs font-bold text-purple-300">0 / {totalLessons}</span>
        </div>
        <div className="w-full h-1.5 bg-ink rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-700"
            style={{ width: "0%" }}
          />
        </div>
        <p className="text-[10px] text-muted mt-2">Complete lessons to track your progress</p>
      </div>

      {/* ─── Divider ─── */}
      <div className="h-px bg-ink-light/60 mx-4 mb-1" />

      {/* ─── Navigation ─── */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 py-2">
        {curriculum.map((week) => {
          const isLocked = !unlockedWeeks.has(week.id);
          const weekOpen = expandedWeeks[week.id] && !isLocked;
          const isActiveWeek = activeWeekDay?.weekId === week.id;

          return (
            <div key={week.id} className="mb-1">
              {/* Week header */}
              <button
                onClick={() => !isLocked && toggleWeek(week.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors text-left group ${
                  isLocked
                    ? "opacity-50 cursor-not-allowed"
                    : isActiveWeek
                      ? "bg-purple-700/20"
                      : "hover:bg-ink-light/40"
                }`}
              >
                {/* Week icon */}
                <span className="text-base flex-shrink-0">{week.icon}</span>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.12em]">
                    Week {week.week}
                  </span>
                  <p className="text-[13px] font-bold text-white leading-tight truncate">
                    {week.title}
                  </p>
                </div>

                {isLocked ? (
                  <LockIcon />
                ) : (
                  <span className="text-muted">
                    <ChevronIcon open={weekOpen} />
                  </span>
                )}
              </button>

              {/* Day list */}
              {weekOpen && (
                <div className="ml-4 mt-0.5 space-y-0.5">
                  {week.days.map((day) => {
                    const isActiveDay = activeWeekDay?.dayId === day.id;
                    const dayOpen = expandedDays[day.id] || isActiveDay;

                    return (
                      <div key={day.id}>
                        {/* Day row */}
                        <div className="flex items-center">
                          <Link
                            href={`/training/${week.id}/${day.id}`}
                            className={`flex-1 flex items-center gap-2.5 pl-2 pr-1 py-2 rounded-lg transition-all text-left ${
                              isActiveDay
                                ? "bg-purple-600/25 text-purple-200"
                                : "text-purple-100/60 hover:text-purple-100 hover:bg-ink-light/30"
                            }`}
                          >
                            <span
                              className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold transition-colors ${
                                isActiveDay
                                  ? "bg-purple-600 text-white"
                                  : "bg-ink-light/80 text-purple-200/60"
                              }`}
                            >
                              {day.day}
                            </span>
                            <span className="text-[12.5px] font-semibold truncate flex-1">
                              {day.title}
                            </span>
                          </Link>
                          <button
                            onClick={() => toggleDay(day.id)}
                            className="p-1.5 text-muted hover:text-purple-300 transition-colors rounded"
                          >
                            <ChevronIcon open={dayOpen} />
                          </button>
                        </div>

                        {/* Lesson list under day */}
                        {dayOpen && (
                          <div className="ml-5 pl-3 border-l border-ink-light/40 py-1 space-y-0.5 mb-1">
                            {day.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center gap-2 py-1 px-2 rounded-md text-[11px] text-muted/80 hover:text-purple-200 hover:bg-ink-light/20 transition-colors cursor-default"
                              >
                                <span
                                  className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${typeColors[lesson.type] || "bg-muted"}`}
                                />
                                <span className="truncate flex-1">{lesson.title}</span>
                                <span className="text-[10px] text-muted/50 flex-shrink-0 tabular-nums">
                                  {lesson.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ─── User footer ─── */}
      <div className="px-4 py-3 border-t border-ink-light/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center ring-2 ring-purple-500/20">
            <span className="text-[11px] font-bold text-white">T</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white truncate">Trainee</p>
            <p className="text-[10px] text-muted truncate">trainee@remoteroles.online</p>
          </div>
          <button className="p-1 text-muted hover:text-purple-300 transition-colors rounded">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="4" r="1.2" fill="currentColor" />
              <circle cx="8" cy="8" r="1.2" fill="currentColor" />
              <circle cx="8" cy="12" r="1.2" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
