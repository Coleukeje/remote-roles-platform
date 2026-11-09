"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { curriculum } from "@/data/curriculum";
import { useState, useMemo, useEffect } from "react";
import { useMobileNav } from "./MobileNav";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/app/actions/auth";
import { isDayFree, isAdmin } from "@/lib/access-constants";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`rr-chev ${open ? "rr-chev-open" : ""}`}
    >
      <path d="M3.5 5.5L7 9l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.55 }}>
      <rect x="2.5" y="5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
      <path
        d="M4 5V3.5C4 2.4 4.9 1.5 6 1.5C7.1 1.5 8 2.4 8 3.5V5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TickIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // The open lesson lives in ?lesson=, not the path — usePathname drops it.
  const activeLessonId = searchParams.get("lesson");
  const { isOpen, close } = useMobileNav();

  const [userName, setUserName] = useState("Trainee");
  const [userEmail, setUserEmail] = useState("");
  const [userInitial, setUserInitial] = useState("T");
  const [hasFullAccess, setHasFullAccess] = useState(true);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const [doneLessons, setDoneLessons] = useState<Set<string>>(new Set());

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

      // Which lessons are finished — drives every tick and the spine fill.
      const { data: rows } = await supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", user.id)
        .eq("completed", true);

      if (rows) setDoneLessons(new Set(rows.map((r) => r.lesson_id)));

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
      initial[w.id] = w.week === 1;
    });
    return initial;
  });
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  function dayLocked(dayId: string) {
    return !hasFullAccess && !isDayFree(dayId);
  }

  function toggleWeek(weekId: string) {
    setExpandedWeeks((p) => ({ ...p, [weekId]: !p[weekId] }));
  }
  function toggleDay(dayId: string) {
    setExpandedDays((p) => ({ ...p, [dayId]: !p[dayId] }));
  }

  const activeWeekDay = useMemo(() => {
    const match = pathname.match(/\/training\/(week-\d+)\/(w\dd\d)/);
    return match ? { weekId: match[1], dayId: match[2] } : null;
  }, [pathname]);

  const allLessons = useMemo(
    () => curriculum.flatMap((w) => w.days.flatMap((d) => d.lessons)),
    [],
  );
  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter((l) => doneLessons.has(l.id)).length;
  const progressPct =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const minutesLeft = allLessons
    .filter((l) => !doneLessons.has(l.id))
    .reduce((s, l) => s + (parseInt(l.duration) || 0), 0);
  const hoursLeft = Math.round(minutesLeft / 60);

  return (
    <>
      <style>{rrStyles}</style>
      <aside
        className={`
          rr-rail fixed inset-y-0 left-0 z-50 w-[280px] sm:w-[300px] lg:w-[324px]
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:flex-shrink-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ─── Brand ─── */}
        <Link href="/training" className="rr-brand" onClick={close}>
          <span className="rr-mark">RR</span>
          <span>
            <b>Remote Roles</b>
            <i>Training Academy</i>
          </span>
        </Link>

        {/* ─── Progress ─── */}
        <div className="rr-prog">
          <div className="rr-prog-top">
            <span className="rr-prog-num">
              {completedCount}
              <span>/{totalLessons}</span>
            </span>
            <span className="rr-prog-pct">{progressPct}%</span>
          </div>
          <div className="rr-bar">
            <i style={{ width: `${progressPct}%` }} />
          </div>
          <p className="rr-prog-sub">
            {completedCount === 0
              ? "Start anywhere — your progress saves itself"
              : completedCount === totalLessons
                ? "Every lesson finished. Well done."
                : `${totalLessons - completedCount} lessons to go${
                    hoursLeft > 0 ? ` · about ${hoursLeft}h left` : ""
                  }`}
          </p>
        </div>

        {/* ─── Quick nav ─── */}
        <div className={`rr-quick ${showAdminLink ? "rr-quick-2" : ""}`}>
          <Link
            href="/training"
            onClick={close}
            className={pathname === "/training" ? "on" : ""}
          >
            Dashboard
          </Link>
          {showAdminLink && (
            <Link
              href="/admin"
              onClick={close}
              className={pathname.startsWith("/admin") ? "on" : ""}
            >
              Admin
            </Link>
          )}
        </div>

        {/* ─── Curriculum ─── */}
        <nav className="rr-nav">
          {curriculum.map((week) => {
            const weekOpen = !!expandedWeeks[week.id];
            const weekLessons = week.days.flatMap((d) => d.lessons);
            const weekDone = weekLessons.filter((l) => doneLessons.has(l.id)).length;
            const weekLocked = week.days.every((d) => dayLocked(d.id));
            const spinePct =
              weekLessons.length > 0
                ? Math.round((weekDone / weekLessons.length) * 100)
                : 0;

            return (
              <div className="rr-mod" key={week.id}>
                <button
                  className="rr-mod-head"
                  aria-expanded={weekOpen}
                  onClick={() => toggleWeek(week.id)}
                >
                  <span className="rr-mod-n">{week.week}</span>
                  <span className="rr-mod-t">
                    <b>{week.title}</b>
                    <i>
                      {week.days.length} days · {weekLessons.length} lessons
                    </i>
                  </span>
                  {weekLocked && <LockIcon />}
                  <ChevronIcon open={weekOpen} />
                </button>

                {weekOpen && (
                  <div
                    className="rr-tree"
                    style={
                      {
                        "--rr-done": `${spinePct}%`,
                      } as React.CSSProperties
                    }
                  >
                    {week.days.map((day) => {
                      const locked = dayLocked(day.id);
                      const isActiveDay = activeWeekDay?.dayId === day.id;
                      const dayOpen =
                        (expandedDays[day.id] || isActiveDay) && !locked;
                      const dayDone = day.lessons.filter((l) =>
                        doneLessons.has(l.id),
                      ).length;
                      const allDone =
                        dayDone === day.lessons.length && day.lessons.length > 0;
                      const dayMins = day.lessons.reduce(
                        (s, l) => s + (parseInt(l.duration) || 0),
                        0,
                      );

                      return (
                        <div
                          className={`rr-day ${isActiveDay ? "current" : ""}`}
                          key={day.id}
                        >
                          <div className="rr-day-line">
                            <Link
                              href={`/training/${week.id}/${day.id}`}
                              onClick={close}
                              className="rr-day-row"
                            >
                              <span
                                className={`rr-node ${
                                  allDone ? "done" : isActiveDay ? "here" : ""
                                } ${locked ? "locked" : ""}`}
                              >
                                {allDone && <TickIcon />}
                              </span>
                              <span className="rr-day-t">
                                <b>{day.title}</b>
                                <i className={isActiveDay ? "on" : ""}>
                                  {locked
                                    ? "Full access only"
                                    : dayDone > 0
                                      ? `${dayDone} of ${day.lessons.length} done`
                                      : `${day.lessons.length} lessons · ${dayMins}m`}
                                </i>
                              </span>
                            </Link>
                            {!locked && (
                              <button
                                className="rr-day-toggle"
                                onClick={() => toggleDay(day.id)}
                                aria-label={dayOpen ? "Hide lessons" : "Show lessons"}
                              >
                                <ChevronIcon open={dayOpen} />
                              </button>
                            )}
                          </div>

                          {dayOpen && (
                            <ul className="rr-lessons">
                              {day.lessons.map((lesson, li) => {
                                const done = doneLessons.has(lesson.id);
                                // With no ?lesson= param the viewer opens the
                                // first lesson, so mark that one as here too.
                                const here =
                                  isActiveDay &&
                                  (activeLessonId
                                    ? lesson.id === activeLessonId
                                    : li === 0);
                                return (
                                  <li
                                    className={`rr-lesson ${done ? "done" : ""} ${
                                      here ? "here" : ""
                                    }`}
                                    key={lesson.id}
                                  >
                                    <Link
                                      href={`/training/${week.id}/${day.id}?lesson=${lesson.id}`}
                                      onClick={close}
                                    >
                                      <span className="rr-lnode" />
                                      <span className="rr-l-t">{lesson.title}</span>
                                      <span className="rr-l-d">{lesson.duration}</span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
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

        {/* ─── Footer ─── */}
        <div className="rr-foot">
          <span className="rr-av">{userInitial}</span>
          <span className="rr-foot-t">
            <b>{userName}</b>
            <i>{userEmail}</i>
          </span>
          <form action={signOut}>
            <button type="submit" title="Sign out" className="rr-out">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 2H4a2 2 0 00-2 2v8a2 2 0 002 2h2M10.5 11.5L14 8l-3.5-3.5M14 8H6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

/* Carried over from the approved mock so the live rail matches it exactly
   rather than drifting through a re-interpretation in utility classes. */
const rrStyles = `
.rr-rail{
  --rr-ink:#130F1C;--rr-ink-2:#1B1528;--rr-ink-3:#241C35;--rr-line:#2E2442;
  --rr-text:#F3EFFA;--rr-text-2:#A396BC;--rr-text-3:#6F6389;
  --rr-violet:#A855F7;--rr-violet-dim:#7C3AED;--rr-done:#34D399;
  background:var(--rr-ink);border-right:1px solid var(--rr-line);
  display:flex;flex-direction:column;
}
.rr-brand{display:flex;align-items:center;gap:10px;padding:16px 18px 14px;text-decoration:none}
.rr-mark{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#A855F7,#6D28D9);
  display:grid;place-items:center;font-family:var(--font-display),sans-serif;font-weight:700;font-size:12px;color:#fff;flex:none}
.rr-brand b{display:block;font-family:var(--font-display),sans-serif;font-size:14px;font-weight:700;color:var(--rr-text);line-height:1.1}
.rr-brand i{display:block;font-style:normal;font-size:11px;color:var(--rr-text-3);margin-top:1px}

.rr-prog{margin:0 14px 12px;padding:14px;border-radius:14px;background:var(--rr-ink-2);border:1px solid var(--rr-line)}
.rr-prog-top{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:9px}
.rr-prog-num{font-family:var(--font-display),sans-serif;font-size:22px;font-weight:700;color:var(--rr-text);letter-spacing:-.02em}
.rr-prog-num span{font-size:13px;color:var(--rr-text-3);font-weight:600}
.rr-prog-pct{font-family:var(--font-display),sans-serif;font-size:13px;font-weight:700;color:var(--rr-violet)}
.rr-bar{height:5px;border-radius:99px;background:#2A2040;overflow:hidden}
.rr-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#7C3AED,#A855F7);transition:width .7s ease}
.rr-prog-sub{font-size:11px;color:var(--rr-text-3);margin-top:8px;line-height:1.4}

.rr-quick{display:grid;grid-template-columns:1fr;gap:8px;margin:0 14px 12px}
.rr-quick-2{grid-template-columns:1fr 1fr}
.rr-quick a{text-align:center;font-size:11px;font-weight:700;padding:8px 0;border-radius:9px;
  background:var(--rr-ink-2);color:var(--rr-text-3);text-decoration:none;border:1px solid transparent;transition:color .15s,background .15s}
.rr-quick a:hover{color:var(--rr-text-2)}
.rr-quick a.on{background:rgba(124,58,237,.22);color:#D8B4FE;border-color:rgba(168,85,247,.25)}

.rr-nav{flex:1;overflow-y:auto;padding:0 14px 20px}
.rr-nav::-webkit-scrollbar{width:8px}
.rr-nav::-webkit-scrollbar-thumb{background:#2A2040;border-radius:9px}

.rr-mod{margin-bottom:6px}
.rr-mod-head{width:100%;display:flex;align-items:center;gap:10px;padding:11px 10px;border-radius:11px;
  background:none;border:0;cursor:pointer;text-align:left;color:var(--rr-text-3)}
.rr-mod-head:hover{background:var(--rr-ink-2)}
.rr-mod-head[aria-expanded="true"]{background:var(--rr-ink-2)}
.rr-mod-n{width:22px;height:22px;flex:none;border-radius:7px;background:var(--rr-ink-3);color:var(--rr-text-2);
  font-family:var(--font-display),sans-serif;font-weight:700;font-size:11px;display:grid;place-items:center}
.rr-mod-head[aria-expanded="true"] .rr-mod-n{background:var(--rr-violet-dim);color:#fff}
.rr-mod-t{flex:1;min-width:0}
.rr-mod-t b{display:block;font-family:var(--font-display),sans-serif;font-size:13.5px;font-weight:700;color:var(--rr-text);line-height:1.25}
.rr-mod-t i{display:block;font-style:normal;font-size:11px;color:var(--rr-text-3);margin-top:2px}
.rr-chev{flex:none;transition:transform .18s}
.rr-chev-open{transform:rotate(180deg)}

.rr-tree{position:relative;margin:2px 0 8px 21px;padding-left:18px}
.rr-tree::before{content:"";position:absolute;left:0;top:4px;bottom:10px;width:2px;border-radius:2px;
  background:linear-gradient(180deg,var(--rr-violet-dim) 0%,var(--rr-violet-dim) var(--rr-done,0%),var(--rr-line) var(--rr-done,0%))}

.rr-day{position:relative}
.rr-day-line{display:flex;align-items:flex-start}
.rr-day-row{flex:1;min-width:0;display:flex;align-items:flex-start;gap:9px;padding:8px 4px 8px 0;
  border-radius:10px;text-decoration:none}
.rr-day-row:hover .rr-day-t b{color:var(--rr-text)}
.rr-node{position:absolute;left:-25px;top:11px;width:13px;height:13px;border-radius:50%;
  background:var(--rr-ink);border:2px solid var(--rr-line);display:grid;place-items:center;color:#0B0810}
.rr-node svg{width:8px;height:8px}
.rr-node.done{background:var(--rr-done);border-color:var(--rr-done)}
.rr-node.here{border-color:var(--rr-violet);background:var(--rr-violet);box-shadow:0 0 0 4px rgba(168,85,247,.18)}
.rr-node.locked{border-color:#3A2F4F;background:var(--rr-ink)}
.rr-day-t{flex:1;min-width:0}
.rr-day-t b{display:block;font-size:12.5px;font-weight:700;color:var(--rr-text-2);line-height:1.35}
.rr-day.current .rr-day-t b{color:var(--rr-text)}
.rr-day-t i{display:block;font-style:normal;font-size:10.5px;color:var(--rr-text-3);margin-top:3px}
.rr-day-t i.on{color:var(--rr-violet)}
.rr-day-toggle{flex:none;background:none;border:0;cursor:pointer;color:var(--rr-text-3);padding:9px 4px;border-radius:8px}
.rr-day-toggle:hover{color:var(--rr-text-2)}

.rr-lessons{margin:0 0 8px;padding:0;list-style:none}
.rr-lesson{position:relative}
.rr-lesson a{display:flex;align-items:flex-start;gap:9px;padding:6px 8px 6px 6px;margin-left:-6px;
  text-decoration:none;border-radius:8px;transition:background .15s}
.rr-lesson a:hover .rr-l-t{color:var(--rr-text)}
.rr-lesson.here a{background:rgba(124,58,237,.16)}
.rr-lnode{position:absolute;left:-22px;top:10px;width:7px;height:7px;border-radius:50%;background:var(--rr-line);transition:all .15s}
.rr-lesson.done .rr-lnode{background:var(--rr-done)}
.rr-lesson.here .rr-lnode{left:-24px;top:8px;width:11px;height:11px;background:var(--rr-violet);
  border:2px solid var(--rr-ink);box-shadow:0 0 0 3px rgba(168,85,247,.3)}
.rr-l-t{flex:1;min-width:0;font-size:11.5px;line-height:1.4;color:var(--rr-text-3)}
.rr-lesson.here .rr-l-t{color:#fff;font-weight:700}
.rr-l-d{flex:none;font-size:10px;color:#564C6B;font-variant-numeric:tabular-nums;margin-top:1px}
.rr-lesson.here .rr-l-d{color:#C4B5FD}

.rr-foot{border-top:1px solid var(--rr-line);padding:12px 16px;display:flex;align-items:center;gap:10px}
.rr-av{width:32px;height:32px;flex:none;border-radius:50%;background:linear-gradient(135deg,#A855F7,#6D28D9);
  display:grid;place-items:center;color:#fff;font-weight:700;font-size:12px;font-family:var(--font-display),sans-serif}
.rr-foot-t{flex:1;min-width:0}
.rr-foot-t b{display:block;font-size:12.5px;color:var(--rr-text);font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rr-foot-t i{display:block;font-style:normal;font-size:10.5px;color:var(--rr-text-3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rr-out{background:none;border:0;cursor:pointer;color:var(--rr-text-3);padding:6px;border-radius:8px}
.rr-out:hover{color:#F87171}
`;
