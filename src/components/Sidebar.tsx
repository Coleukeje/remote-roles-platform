"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { curriculum } from "@/data/curriculum";
import { useState, useMemo } from "react";
import { useMobileNav } from "./MobileNav";

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

const typeColors: Record<string, string> = {
  video: "bg-red-500",
  slides: "bg-purple-500",
  reading: "bg-amber-500",
  exercise: "bg-green-500",
  quiz: "bg-blue-500",
  roleplay: "bg-orange-500",
  download: "bg-teal-500",
  youtube: "bg-red-600",
  confirmation: "bg-indigo-500",
  "video-upload": "bg-pink-500",
};

const typeLabels: Record<string, string> = {
  video: "Video",
  slides: "Slides",
  reading: "Reading",
  exercise: "Exercise",
  quiz: "Quiz",
  roleplay: "Role Play",
  download: "Download",
  youtube: "YouTube",
  confirmation: "Confirmation",
  "video-upload": "Video Upload",
};

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useMobileNav();

  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    curriculum.forEach((w) => {
      initial[w.id] = w.week <= 2;
    });
    return initial;
  });
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  // Mock unlocked state
  const [unlockedWeeks] = useState<Set<string>>(new Set(["week-1", "week-2", "week-3"]));

  function toggleWeek(weekId: string) {
    setExpandedWeeks((prev) => ({ ...prev, [weekId]: !prev[weekId] }));
  }

  function toggleDay(dayId: string) {
    setExpandedDays((prev) => ({ ...prev, [dayId]: !prev[dayId] }));
  }

  const activeWeekDay = useMemo(() => {
    const match = pathname.match(/\/training\/(week-\d+)\/(w\dd\d)/);
    return match ? { weekId: match[1], dayId: match[2] } : null;
  }, [pathname]);

  const totalLessons = curriculum.reduce(
    (s, w) => s + w.days.reduce((sd, d) => sd + d.lessons.length, 0),
    0,
  );

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-[280px] sm:w-[300px] bg-ink flex flex-col border-r border-ink-light
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:flex-shrink-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
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
      <div className="mx-4 mb-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-ink-light/60 p-4 border border-purple-500/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-purple-300/80 uppercase tracking-[0.15em]">
            Overall Progress
          </span>
          <span className="text-xs font-bold text-purple-300">0 / {totalLessons}</span>
        </div>
        <div className="w-full h-2 bg-ink rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-700"
            style={{ width: "0%" }}
          />
        </div>
        <div className="flex items-center justify-between mt-2.5">
          <p className="text-[10px] text-muted">Complete lessons to track progress</p>
          <span className="text-[10px] font-bold text-purple-400">0%</span>
        </div>
      </div>

      {/* ─── Quick nav ─── */}
      <div className="mx-4 mb-3 flex gap-2">
        <Link
          href="/training"
          className={`flex-1 text-center text-[10px] font-bold py-2 rounded-lg transition-colors ${
            pathname === "/training"
              ? "bg-purple-600/30 text-purple-300 border border-purple-500/20"
              : "bg-ink-light/40 text-muted hover:text-purple-300 border border-transparent"
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/admin"
          className="flex-1 text-center text-[10px] font-bold py-2 rounded-lg bg-ink-light/40 text-muted hover:text-purple-300 transition-colors border border-transparent"
        >
          Admin
        </Link>
      </div>

      {/* ─── Divider ─── */}
      <div className="h-px bg-ink-light/60 mx-4 mb-1" />

      {/* ─── Navigation ─── */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 py-2">
        {curriculum.map((week) => {
          const isLocked = !unlockedWeeks.has(week.id);
          const weekOpen = expandedWeeks[week.id] && !isLocked;
          const isActiveWeek = activeWeekDay?.weekId === week.id;
          const weekLessonCount = week.days.reduce((s, d) => s + d.lessons.length, 0);
          const weekDayCount = week.days.length;

          return (
            <div key={week.id} className="mb-1.5">
              {/* Week header */}
              <button
                onClick={() => !isLocked && toggleWeek(week.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-3 rounded-xl transition-colors text-left group ${
                  isLocked
                    ? "opacity-50 cursor-not-allowed"
                    : isActiveWeek
                      ? "bg-purple-700/20 border border-purple-500/15"
                      : "hover:bg-ink-light/40 border border-transparent"
                }`}
              >
                {/* Week icon */}
                <div className="w-9 h-9 rounded-lg bg-ink-light/80 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{week.icon}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-purple-400 uppercase tracking-[0.14em]">
                      Week {week.week}
                    </span>
                    {!isLocked && (
                      <span className="text-[9px] text-muted/50">
                        {weekDayCount} days &middot; {weekLessonCount} lessons
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] font-bold text-white leading-tight truncate">
                    {week.title}
                  </p>
                  <p className="text-[10px] text-muted/60 truncate mt-0.5">
                    {week.subtitle}
                  </p>
                </div>

                {isLocked ? (
                  <LockIcon />
                ) : (
                  <span className="text-muted group-hover:text-purple-300 transition-colors">
                    <ChevronIcon open={weekOpen} />
                  </span>
                )}
              </button>

              {/* Day list */}
              {weekOpen && (
                <div className="ml-3 mt-0.5 space-y-0.5 border-l-2 border-ink-light/30 pl-3">
                  {week.days.map((day) => {
                    const isActiveDay = activeWeekDay?.dayId === day.id;
                    const dayOpen = expandedDays[day.id] || isActiveDay;
                    const lessonCount = day.lessons.length;

                    // Get unique lesson type counts for this day
                    const typeCounts: Record<string, number> = {};
                    day.lessons.forEach((l) => {
                      typeCounts[l.type] = (typeCounts[l.type] || 0) + 1;
                    });

                    return (
                      <div key={day.id}>
                        {/* Day row */}
                        <div className="flex items-center">
                          <Link
                            href={`/training/${week.id}/${day.id}`}
                            onClick={close}
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
                            <div className="flex-1 min-w-0">
                              <span className="text-[12px] font-semibold truncate block">
                                {day.title}
                              </span>
                              <span className="text-[10px] text-muted/50 block">
                                {lessonCount} lessons
                              </span>
                            </div>
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
                          <div className="ml-5 pl-3 border-l border-ink-light/30 py-1 space-y-0.5 mb-1">
                            {day.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center gap-2 py-1.5 px-2 rounded-md text-[11px] text-muted/80 hover:text-purple-200 hover:bg-ink-light/20 transition-colors cursor-default group"
                              >
                                <span
                                  className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${typeColors[lesson.type] || "bg-muted"}`}
                                />
                                <span className="truncate flex-1">{lesson.title}</span>
                                <span className="text-[9px] text-muted/40 flex-shrink-0 tabular-nums hidden group-hover:inline">
                                  {typeLabels[lesson.type] || lesson.type}
                                </span>
                                <span className="text-[9px] text-muted/40 flex-shrink-0 tabular-nums group-hover:hidden">
                                  {lesson.duration}
                                </span>
                              </div>
                            ))}

                            {/* Day type summary */}
                            <div className="flex flex-wrap gap-1 pt-1.5 mt-1 border-t border-ink-light/20">
                              {Object.entries(typeCounts).map(([type, count]) => (
                                <span
                                  key={type}
                                  className="inline-flex items-center gap-1 text-[9px] text-muted/50 bg-ink-light/30 px-1.5 py-0.5 rounded"
                                >
                                  <span className={`w-1 h-1 rounded-full ${typeColors[type] || "bg-muted"}`} />
                                  {count} {typeLabels[type] || type}
                                </span>
                              ))}
                            </div>
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
