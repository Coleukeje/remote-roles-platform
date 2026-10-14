"use client";

import { useState } from "react";
import type { Lesson } from "@/data/curriculum";
import Link from "next/link";

/* ─── Type styling ─── */
const typeConfig: Record<
  string,
  { label: string; bg: string; text: string; dot: string; iconBg: string }
> = {
  video: {
    label: "Video",
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-500",
    iconBg: "bg-red-100 text-red-600",
  },
  slides: {
    label: "Slides",
    bg: "bg-purple-50",
    text: "text-purple-600",
    dot: "bg-purple-500",
    iconBg: "bg-purple-100 text-purple-600",
  },
  reading: {
    label: "Reading",
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-500",
    iconBg: "bg-amber-100 text-amber-600",
  },
  exercise: {
    label: "Exercise",
    bg: "bg-green-50",
    text: "text-green-600",
    dot: "bg-green-500",
    iconBg: "bg-green-100 text-green-600",
  },
  quiz: {
    label: "Quiz",
    bg: "bg-blue-50",
    text: "text-blue-600",
    dot: "bg-blue-500",
    iconBg: "bg-blue-100 text-blue-600",
  },
};

const typeIcons: Record<string, React.ReactNode> = {
  video: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M8 6.5L14 10L8 13.5V6.5Z" fill="currentColor" />
    </svg>
  ),
  slides: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 17H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 14V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  reading: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 3H8C9.1 3 10 3.9 10 5V17C10 15.9 9.1 15 8 15H4V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 3H12C10.9 3 10 3.9 10 5V17C10 15.9 10.9 15 12 15H16V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  exercise: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M14.5 3L17 5.5L8.5 14L5 15L6 11.5L14.5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  quiz: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8C12 9.1 11.1 10 10 10V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="13.5" r="0.75" fill="currentColor" />
    </svg>
  ),
};

const placeholders: Record<string, string> = {
  video: "Video content will be available once uploaded by your trainer.",
  slides: "Slide deck will be embedded here once published.",
  reading: "Reading material will appear here.",
  exercise: "Exercise instructions and workspace will load here.",
  quiz: "Quiz questions will appear here when ready.",
};

export default function LessonViewer({
  lessons,
  nextLink,
  prevLink,
}: {
  lessons: Lesson[];
  nextLink: string | null;
  prevLink: string | null;
}) {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  function toggleComplete(lessonId: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      return next;
    });
  }

  const progress =
    lessons.length > 0 ? Math.round((completed.size / lessons.length) * 100) : 0;

  return (
    <div className="px-8 py-6 max-w-4xl">
      {/* ─── Progress bar ─── */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 bg-surface-dim rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-bold text-muted tabular-nums w-10 text-right">
          {progress}%
        </span>
      </div>

      {/* ─── Lessons ─── */}
      <div className="space-y-3">
        {lessons.map((lesson, index) => {
          const config = typeConfig[lesson.type] || typeConfig.reading;
          const isComplete = completed.has(lesson.id);
          const isActive = activeLesson === lesson.id;

          return (
            <div
              key={lesson.id}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                isActive
                  ? "border-purple-300 shadow-md shadow-purple-100/50"
                  : "border-surface-dim hover:border-purple-200/60"
              }`}
            >
              {/* Lesson row */}
              <button
                onClick={() => setActiveLesson(isActive ? null : lesson.id)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                {/* Check circle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComplete(lesson.id);
                  }}
                  className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                    isComplete
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-surface-dim text-muted hover:border-purple-300 hover:text-purple-500"
                  }`}
                >
                  {isComplete ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7.5L5.5 10L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold transition-colors ${
                      isComplete ? "text-muted line-through" : "text-ink"
                    }`}
                  >
                    {lesson.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                      {config.label}
                    </span>
                    <span className="text-xs text-muted">{lesson.duration}</span>
                  </div>
                </div>

                {/* Expand chevron */}
                <div
                  className={`text-muted transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </button>

              {/* Expanded content */}
              {isActive && (
                <div className="px-4 pb-5 pt-0">
                  <div className="ml-[52px] bg-surface-dim rounded-xl p-8 flex flex-col items-center justify-center min-h-[220px]">
                    <div
                      className={`w-12 h-12 rounded-xl ${config.iconBg} flex items-center justify-center mb-4`}
                    >
                      {typeIcons[lesson.type]}
                    </div>
                    <p className="text-sm font-bold text-ink mb-1">{lesson.title}</p>
                    {lesson.description && (
                      <p className="text-xs text-muted text-center max-w-sm mb-1">
                        {lesson.description}
                      </p>
                    )}
                    <p className="text-xs text-muted/60 text-center max-w-sm italic">
                      {placeholders[lesson.type]}
                    </p>
                    <button
                      onClick={() => toggleComplete(lesson.id)}
                      className={`mt-5 text-xs font-bold px-5 py-2.5 rounded-lg transition-all duration-200 ${
                        isComplete
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-600/20"
                      }`}
                    >
                      {isComplete ? "Completed ✓" : "Mark as Complete"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ─── Navigation ─── */}
      <div className="mt-8 flex items-center justify-between">
        {prevLink ? (
          <Link
            href={prevLink}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-purple-600 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Previous Day
          </Link>
        ) : (
          <span />
        )}

        {nextLink && progress === 100 && (
          <Link
            href={nextLink}
            className="inline-flex items-center gap-2 bg-purple-600 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20"
          >
            Continue to Next Day
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
        )}

        {nextLink && progress < 100 && (
          <span className="text-xs text-muted italic">
            Complete all lessons to continue
          </span>
        )}
      </div>
    </div>
  );
}
