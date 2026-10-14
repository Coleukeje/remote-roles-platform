import { curriculum } from "@/data/curriculum";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import LessonViewer from "./LessonViewer";

export const instant = false;

export default async function DayPage({
  params,
}: {
  params: Promise<{ weekId: string; dayId: string }>;
}) {
  const { weekId, dayId } = await params;

  const week = curriculum.find((w) => w.id === weekId);
  if (!week) notFound();

  const day = week.days.find((d) => d.id === dayId);
  if (!day) notFound();

  // Navigation
  const dayIndex = week.days.indexOf(day);
  const nextDay = week.days[dayIndex + 1];
  const weekIndex = curriculum.indexOf(week);
  const nextWeek = curriculum[weekIndex + 1];
  const prevDay = week.days[dayIndex - 1];
  const prevWeek = curriculum[weekIndex - 1];

  const nextLink = nextDay
    ? `/training/${weekId}/${nextDay.id}`
    : nextWeek
      ? `/training/${nextWeek.id}/${nextWeek.days[0].id}`
      : null;

  const prevLink = prevDay
    ? `/training/${weekId}/${prevDay.id}`
    : prevWeek
      ? `/training/${prevWeek.id}/${prevWeek.days[prevWeek.days.length - 1].id}`
      : null;

  const totalMinutes = day.lessons.reduce((s, l) => s + parseInt(l.duration), 0);

  return (
    <>
      <TopBar
        title={day.title}
        breadcrumbs={[
          { label: "Training", href: "/training" },
          { label: `Week ${week.week}`, href: "/training" },
          { label: `Day ${day.day}` },
        ]}
      />
      <div className="flex-1 overflow-y-auto">
        {/* ─── Hero ─── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-ink via-ink-light to-purple-900 px-8 py-10">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-purple-600/10 blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.15em] bg-purple-500/10 px-2.5 py-1 rounded-full">
                Week {week.week} · Day {day.day}
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-2">
              {day.title}
            </h2>
            <p className="text-base text-purple-100/70 max-w-2xl leading-relaxed">{day.description}</p>

            {/* Stats pills */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-200/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1V6L8.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                ~{totalMinutes} min
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-200/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4 6L5.5 7.5L8 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {day.lessons.length} lessons
              </span>
            </div>

            {/* Objectives */}
            {day.objectives.length > 0 && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 max-w-xl">
                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.12em] mb-2">
                  Learning Objectives
                </p>
                <ul className="space-y-1.5">
                  {day.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-purple-100/80">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0 text-purple-400">
                        <path d="M3.5 7L6 9.5L10.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ─── Lesson list ─── */}
        <LessonViewer
          lessons={day.lessons}
          nextLink={nextLink}
          prevLink={prevLink}
        />
      </div>
    </>
  );
}
