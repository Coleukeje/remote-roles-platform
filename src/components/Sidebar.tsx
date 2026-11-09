"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { curriculum } from "@/data/curriculum";
import { useState, useMemo, useEffect } from "react";
import { useMobileNav } from "./MobileNav";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/app/actions/auth";
import { isDayFree, isAdmin } from "@/lib/access-constants";

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

  // Fetch logged-in user info
  const [userName, setUserName] = useState("Trainee");
  const [userEmail, setUserEmail] = useState("");
  const [userInitial, setUserInitial] = useState("T");
  const [hasFullAccess, setHasFullAccess] = useState(true);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;

      const name =
        user.user_metadata?.full_name || user.email?.split("@")[0] || "Trainee";
      setUserName(name);
      setUserEmail(user.email || "");
      setUserInitial(name.charAt(0).toUpperCase());
      const admin = isAdmin(user.email ?? null);
      setShowAdminLink(admin);

      // Real completion count for the progress card
      const { count } = await supabase
        .from("lesson_progress")
        .select("lesson_id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("completed", true);

      setCompletedCount(count ?? 0);

      if (admin) {
        setHasFullAccess(true);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("access_level")
        .eq("id", user.id)
        .single();

      setHasFullAccess(profile?.access_level === "full");
    });
  }, []);

  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    curriculum.forEach((w) => {
      initial[w.id] = w.week <= 2;
    });
    return initial;
  });
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  // Weeks stay browsable so free users can see what full access opens up;
  // individual days carry the lock. Server-side gating is the real enforcement.
  function dayLocked(dayId: string) {
    return !hasFullAccess && !isDayFree(dayId);
  }

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

  const progressPct =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-[280px] sm:w-[300px] lg:w-[324px] bg-ink flex flex-col border-r border-ink-light
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
          <span className="text-xs font-bold text-purple-300">
            {completedCount} / {totalLessons}
          </span>
        </div>
        <div className="w-full h-2 bg-ink rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2.5">
          <p className="text-[10px] text-muted">
            {completedCount === 0
              ? "Complete lessons to track progress"
              : completedCount === totalLessons
                ? "Training complete — well done"
                : `${totalLessons - completedCount} lessons to go`}
          </p>
          <span className="text-[10px] font-bold text-purple-400">{progressPct}%</span>
        </div>
      </div>

      {/* ─── Quick nav ─── */}
      <div className={`mx-4 mb-3 grid gap-2 ${showAdminLink ? "grid-cols-2" : "grid-cols-1"}`}>
        <Link
          href="/training"
          className={`block text-center text-[10px] font-bold py-2 rounded-lg transition-colors ${
            pathname === "/training"
              ? "bg-purple-600/30 text-purple-300 border border-purple-500/20"
              : "bg-ink-light/40 text-muted hover:text-purple-300 border border-transparent"
          }`}
        >
          Dashboard
        </Link>
        {showAdminLink && (
          <Link
            href="/admin"
            className={`block text-center text-[10px] font-bold py-2 rounded-lg transition-colors ${
              pathname.startsWith("/admin")
                ? "bg-purple-600/30 text-purple-300 border border-purple-500/20"
                : "bg-ink-light/40 text-muted hover:text-purple-300 border border-transparent"
            }`}
          >
            Admin
          </Link>
        )}
      </div>

      {/* ─── Divider ─── */}
      <div className="h-px bg-ink-light/60 mx-4 mb-1" />

      {/* ─── Navigation ─── */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 py-2">
        {curriculum.map((week) => {
          const isLocked = week.days.every((d) => dayLocked(d.id));
          const weekOpen = expandedWeeks[week.id];
          const isActiveWeek = activeWeekDay?.weekId === week.id;
          const weekLessonCount = week.days.reduce((s, d) => s + d.lessons.length, 0);
          const weekDayCount = week.days.length;

          return (
            <div key={week.id} className="mb-1.5">
              {/* Week header */}
              <button
                onClick={() => toggleWeek(week.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-3 rounded-xl transition-colors text-left group ${
                  isLocked
                    ? "opacity-70 hover:bg-ink-light/40 border border-transparent"
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
                      Module {week.week}
                    </span>
                    {!isLocked && (
                      <span className="text-[9px] text-muted/50">
                        {weekDayCount} days &middot; {weekLessonCount} lessons
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] font-bold text-white leading-tight">
                    {week.title}
                  </p>
                  <p className="text-[10px] text-muted/60 line-clamp-1 mt-0.5">
                    {week.subtitle}
                  </p>
                </div>

                <span className="flex items-center gap-1 flex-shrink-0">
                  {isLocked && <LockIcon />}
                  <span className="text-muted group-hover:text-purple-300 transition-colors">
                    <ChevronIcon open={weekOpen} />
                  </span>
                </span>
              </button>

              {/* Day list */}
              {weekOpen && (
                <div className="ml-2 mt-0.5 space-y-0.5 border-l-2 border-ink-light/30 pl-2">
                  {week.days.map((day) => {
                    const isActiveDay = activeWeekDay?.dayId === day.id;
                    const locked = dayLocked(day.id);
                    const dayOpen = (expandedDays[day.id] || isActiveDay) && !locked;
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
                            className={`flex-1 min-w-0 flex items-start gap-2 pl-1.5 pr-1 py-2 rounded-lg transition-all text-left ${
                              isActiveDay
                                ? "bg-purple-600/25 text-purple-200"
                                : "text-purple-100/60 hover:text-purple-100 hover:bg-ink-light/30"
                            }`}
                          >
                            <span
                              className={`mt-px flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold transition-colors ${
                                isActiveDay
                                  ? "bg-purple-600 text-white"
                                  : locked
                                    ? "bg-ink-light/50 text-amber-400/70"
                                    : "bg-ink-light/80 text-purple-200/60"
                              }`}
                            >
                              {locked ? <LockIcon /> : day.day}
                            </span>
                            <div className="flex-1 min-w-0">
                              <span
                                className={`text-[12px] font-semibold leading-snug line-clamp-2 block ${
                                  locked ? "text-purple-100/40" : ""
                                }`}
                              >
                                {day.title}
                              </span>
                              <span className="text-[10px] text-muted/50 block">
                                {locked ? "Full access only" : `${lessonCount} lessons`}
                              </span>
                            </div>
                          </Link>
                          {!locked && (
                            <button
                              onClick={() => toggleDay(day.id)}
                              className="p-1.5 text-muted hover:text-purple-300 transition-colors rounded"
                            >
                              <ChevronIcon open={dayOpen} />
                            </button>
                          )}
                        </div>

                        {/* Lesson list under day */}
                        {dayOpen && (
                          <div className="ml-3 pl-2 border-l border-ink-light/30 py-1 space-y-0.5 mb-1">
                            {day.lessons.map((lesson) => (
                              <Link
                                key={lesson.id}
                                href={`/training/${week.id}/${day.id}?lesson=${lesson.id}`}
                                onClick={close}
                                className="flex items-start gap-2 py-1.5 px-1.5 rounded-md text-[11px] text-muted/80 hover:text-purple-200 hover:bg-ink-light/20 transition-colors cursor-pointer group"
                              >
                                <span
                                  className={`mt-[5px] inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${typeColors[lesson.type] || "bg-muted"}`}
                                />
                                <span className="flex-1 min-w-0 leading-snug line-clamp-2">
                                  {lesson.title}
                                </span>
                                <span className="mt-px text-[9px] text-muted/40 flex-shrink-0 tabular-nums">
                                  {lesson.duration}
                                </span>
                              </Link>
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
            <span className="text-[11px] font-bold text-white">{userInitial}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white truncate">{userName}</p>
            <p className="text-[10px] text-muted truncate">{userEmail}</p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              title="Sign out"
              className="p-1.5 text-muted hover:text-red-400 transition-colors rounded"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 2H4a2 2 0 00-2 2v8a2 2 0 002 2h2M10.5 11.5L14 8l-3.5-3.5M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
