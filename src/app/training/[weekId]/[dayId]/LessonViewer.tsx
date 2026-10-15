"use client";

import { useState } from "react";
import type { Lesson, QuizQuestion } from "@/data/curriculum";
import Link from "next/link";

/* ─── Type styling ─── */
const typeConfig: Record<
  string,
  { label: string; bg: string; text: string; dot: string; iconBg: string; border: string }
> = {
  video: {
    label: "Video",
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-500",
    iconBg: "bg-red-100 text-red-600",
    border: "border-red-200",
  },
  slides: {
    label: "Slides",
    bg: "bg-purple-50",
    text: "text-purple-600",
    dot: "bg-purple-500",
    iconBg: "bg-purple-100 text-purple-600",
    border: "border-purple-200",
  },
  reading: {
    label: "Reading",
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-500",
    iconBg: "bg-amber-100 text-amber-600",
    border: "border-amber-200",
  },
  exercise: {
    label: "Exercise",
    bg: "bg-green-50",
    text: "text-green-600",
    dot: "bg-green-500",
    iconBg: "bg-green-100 text-green-600",
    border: "border-green-200",
  },
  quiz: {
    label: "Quiz",
    bg: "bg-blue-50",
    text: "text-blue-600",
    dot: "bg-blue-500",
    iconBg: "bg-blue-100 text-blue-600",
    border: "border-blue-200",
  },
  roleplay: {
    label: "Role Play",
    bg: "bg-orange-50",
    text: "text-orange-600",
    dot: "bg-orange-500",
    iconBg: "bg-orange-100 text-orange-600",
    border: "border-orange-200",
  },
  download: {
    label: "Download",
    bg: "bg-teal-50",
    text: "text-teal-600",
    dot: "bg-teal-500",
    iconBg: "bg-teal-100 text-teal-600",
    border: "border-teal-200",
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
  roleplay: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 17C3 14.8 4.8 13 7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 17C17 14.8 15.2 13 13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  download: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3V13M10 13L6 9M10 13L14 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 15V16C4 16.6 4.4 17 5 17H15C15.6 17 16 16.6 16 16V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ─── Interactive Quiz Component ─── */
function QuizBlock({ questions }: { questions: QuizQuestion[] }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const q = questions[currentQ];
  const isAnswered = currentQ in answered;
  const isCorrect = answered[currentQ] === q.correctIndex;
  const totalCorrect = Object.entries(answered).filter(
    ([i]) => questions[Number(i)].correctIndex === answered[Number(i)],
  ).length;

  function handleSubmit() {
    if (selected === null) return;
    setAnswered((prev) => ({ ...prev, [currentQ]: selected }));
  }

  function handleNext() {
    setSelected(null);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  }

  function handleRetry() {
    setCurrentQ(0);
    setSelected(null);
    setAnswered({});
    setShowResult(false);
  }

  if (showResult) {
    const pct = Math.round((totalCorrect / questions.length) * 100);
    const passed = pct >= 70;
    return (
      <div className="rounded-xl border-2 border-blue-200 bg-blue-50/50 p-6 text-center">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-3 ${passed ? "bg-green-100" : "bg-amber-100"}`}>
          {passed ? "\u{1F389}" : "\u{1F4DA}"}
        </div>
        <p className="font-[family-name:var(--font-display)] text-xl font-bold text-ink mb-1">
          {passed ? "Great job!" : "Keep studying!"}
        </p>
        <p className="text-sm text-muted mb-1">
          You scored <span className="font-bold text-ink">{totalCorrect}/{questions.length}</span> ({pct}%)
        </p>
        <p className="text-xs text-muted mb-4">
          {passed ? "You passed. Review any you missed below." : "You need 70% to pass. Review the material and try again."}
        </p>

        {/* Show all answers */}
        <div className="text-left space-y-3 mb-5">
          {questions.map((question, i) => {
            const userAns = answered[i];
            const correct = userAns === question.correctIndex;
            return (
              <div key={question.id} className={`p-3 rounded-lg border ${correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                <div className="flex items-start gap-2">
                  <span className={`mt-0.5 flex-shrink-0 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${correct ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {correct ? "✓" : "✗"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-ink">{question.question}</p>
                    {!correct && (
                      <p className="text-[11px] text-muted mt-1">
                        Correct answer: <span className="font-semibold text-green-700">{question.options[question.correctIndex]}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRetry}
          className="text-sm font-bold text-white bg-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-blue-200 bg-blue-50/30 overflow-hidden">
      {/* Quiz header */}
      <div className="px-5 py-3 bg-blue-100/50 border-b border-blue-200 flex items-center justify-between">
        <span className="text-xs font-bold text-blue-700">
          Question {currentQ + 1} of {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i in answered
                  ? answered[i] === questions[i].correctIndex
                    ? "bg-green-500"
                    : "bg-red-400"
                  : i === currentQ
                    ? "bg-blue-600"
                    : "bg-blue-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm font-bold text-ink mb-4">{q.question}</p>

        <div className="space-y-2 mb-4">
          {q.options.map((option, i) => {
            let style = "border-surface-dim bg-white hover:border-purple-300 cursor-pointer";

            if (isAnswered) {
              if (i === q.correctIndex) {
                style = "border-green-400 bg-green-50 ring-1 ring-green-400";
              } else if (i === answered[currentQ] && i !== q.correctIndex) {
                style = "border-red-400 bg-red-50 ring-1 ring-red-400";
              } else {
                style = "border-surface-dim bg-white opacity-50";
              }
            } else if (selected === i) {
              style = "border-purple-500 bg-purple-50 ring-1 ring-purple-500";
            }

            return (
              <button
                key={i}
                onClick={() => !isAnswered && setSelected(i)}
                disabled={isAnswered}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${style}`}
              >
                <span className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  isAnswered && i === q.correctIndex
                    ? "border-green-500 bg-green-500 text-white"
                    : isAnswered && i === answered[currentQ] && i !== q.correctIndex
                      ? "border-red-500 bg-red-500 text-white"
                      : selected === i
                        ? "border-purple-500 bg-purple-500 text-white"
                        : "border-surface-dim text-muted"
                }`}>
                  {isAnswered && i === q.correctIndex
                    ? "✓"
                    : isAnswered && i === answered[currentQ] && i !== q.correctIndex
                      ? "✗"
                      : String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-ink">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation after answering */}
        {isAnswered && (
          <div className={`p-3 rounded-lg mb-4 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
            <div className="flex items-start gap-2">
              <span className="text-sm mt-0.5">{isCorrect ? "✅" : "\u{1F4A1}"}</span>
              <p className="text-xs text-ink leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className={`text-sm font-bold px-5 py-2.5 rounded-lg transition-all ${
                selected !== null
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                  : "bg-surface-dim text-muted cursor-not-allowed"
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="text-sm font-bold bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              {currentQ < questions.length - 1 ? "Next Question →" : "See Results"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Content renderer — handles bullet points ─── */
function ContentBlock({ content }: { content: string }) {
  const sections = content.split("\n\n");

  return (
    <div className="space-y-4">
      {sections.map((section, i) => {
        const lines = section.split("\n");

        // Check if this is a heading-like line (e.g. "Key Principles:")
        if (lines.length === 1 && lines[0].endsWith(":")) {
          return (
            <p key={i} className="text-sm font-bold text-ink">
              {lines[0]}
            </p>
          );
        }

        // Check if this section has bullet points
        const hasBullets = lines.some((l) => l.startsWith("•") || l.startsWith("- "));

        if (hasBullets) {
          const heading = lines[0].endsWith(":") ? lines[0] : null;
          const bullets = lines.filter((l) => l.startsWith("•") || l.startsWith("- "));
          const nonBullets = lines.filter(
            (l) => !l.startsWith("•") && !l.startsWith("- ") && l !== heading,
          );

          return (
            <div key={i}>
              {heading && (
                <p className="text-sm font-bold text-ink mb-2">{heading}</p>
              )}
              {nonBullets.length > 0 && (
                <p className="text-sm text-ink/80 leading-relaxed mb-2">
                  {nonBullets.join(" ")}
                </p>
              )}
              <ul className="space-y-1.5">
                {bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-ink/80">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                    <span className="leading-relaxed">{bullet.replace(/^[•\-]\s*/, "")}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        // Check if this is a numbered list
        const hasNumbers = lines.some((l) => /^\d+\.\s/.test(l));

        if (hasNumbers) {
          const heading = !(/^\d+\.\s/.test(lines[0])) ? lines[0] : null;
          const items = lines.filter((l) => /^\d+\.\s/.test(l));

          return (
            <div key={i}>
              {heading && (
                <p className="text-sm font-bold text-ink mb-2">{heading}</p>
              )}
              <ol className="space-y-1.5">
                {items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex-shrink-0 flex items-center justify-center text-[11px] font-bold">
                      {j + 1}
                    </span>
                    <span className="leading-relaxed">{item.replace(/^\d+\.\s*/, "")}</span>
                  </li>
                ))}
              </ol>
            </div>
          );
        }

        // Check for DO / DON'T style headers
        if (lines[0] === "DO:" || lines[0] === "DON'T:" || lines[0] === "DON’T:") {
          const isDont = lines[0].startsWith("DON");
          return (
            <div key={i}>
              <p className={`text-sm font-bold mb-2 ${isDont ? "text-red-600" : "text-green-600"}`}>
                {lines[0]}
              </p>
              <ul className="space-y-1.5">
                {lines.slice(1).filter((l) => l.trim()).map((line, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-ink/80">
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDont ? "bg-red-400" : "bg-green-400"}`} />
                    <span className="leading-relaxed">{line.replace(/^[•\-]\s*/, "").replace(/^"/, "“").replace(/"$/, "”")}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={i} className="text-sm text-ink/80 leading-relaxed">
            {section}
          </p>
        );
      })}
    </div>
  );
}

/* ─── Main Component ─── */
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
                  ? `${config.border} shadow-md`
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
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                      {config.label}
                    </span>
                    <span className="text-xs text-muted">{lesson.duration}</span>
                    {lesson.meetingNote && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        Live Meeting
                      </span>
                    )}
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
                  <div className="ml-[52px]">
                    {/* Meeting note banner */}
                    {lesson.meetingNote && (
                      <div className="mb-4 flex items-start gap-3 p-3 rounded-lg bg-indigo-50 border border-indigo-200">
                        <span className="text-lg flex-shrink-0 mt-0.5">{"\u{1F4F9}"}</span>
                        <div>
                          <p className="text-xs font-bold text-indigo-800 mb-0.5">Live Training Component</p>
                          <p className="text-xs text-indigo-700 leading-relaxed">{lesson.meetingNote}</p>
                        </div>
                      </div>
                    )}

                    {/* Download type — prominent download button */}
                    {lesson.type === "download" && lesson.downloadFile && (
                      <div className="rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 border-2 border-teal-200 p-6 flex flex-col items-center justify-center">
                        <div className="w-14 h-14 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-3">
                          {typeIcons.download}
                        </div>
                        <p className="text-sm font-bold text-ink mb-1">{lesson.title}</p>
                        {lesson.description && (
                          <p className="text-xs text-muted text-center max-w-sm mb-4">
                            {lesson.description}
                          </p>
                        )}
                        <a
                          href={`/downloads/${lesson.downloadFile}`}
                          download
                          className="inline-flex items-center gap-2 bg-teal-600 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 2V10M8 10L4.5 6.5M8 10L11.5 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 12V13C3 13.6 3.4 14 4 14H12C12.6 14 13 13.6 13 13V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          Download {lesson.downloadFile}
                        </a>
                      </div>
                    )}

                    {/* Quiz type — interactive quiz */}
                    {lesson.type === "quiz" && lesson.quiz && lesson.quiz.length > 0 && (
                      <div>
                        {lesson.content && (
                          <div className="mb-4">
                            <ContentBlock content={lesson.content} />
                          </div>
                        )}
                        <QuizBlock questions={lesson.quiz} />
                      </div>
                    )}

                    {/* Role play type */}
                    {lesson.type === "roleplay" && (
                      <div>
                        <div className="rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                              {typeIcons.roleplay}
                            </div>
                            <p className="text-sm font-bold text-orange-800">Role Play Exercise</p>
                          </div>
                          {lesson.content && <ContentBlock content={lesson.content} />}
                        </div>
                      </div>
                    )}

                    {/* Regular content types (video, slides, reading, exercise) */}
                    {lesson.type !== "download" && lesson.type !== "quiz" && lesson.type !== "roleplay" && (
                      <div className="rounded-xl bg-surface-dim/60 border border-surface-dim p-6">
                        {/* Type header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center`}>
                            {typeIcons[lesson.type]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-ink">{lesson.title}</p>
                            {lesson.description && (
                              <p className="text-xs text-muted">{lesson.description}</p>
                            )}
                          </div>
                        </div>

                        {/* Real content */}
                        {lesson.content ? (
                          <ContentBlock content={lesson.content} />
                        ) : (
                          <p className="text-xs text-muted/60 text-center italic py-4">
                            Content will be available once uploaded by your trainer.
                          </p>
                        )}

                        {/* Download file if present on non-download types */}
                        {lesson.downloadFile && (
                          <div className="mt-4 pt-4 border-t border-surface-dim">
                            <a
                              href={`/downloads/${lesson.downloadFile}`}
                              download
                              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M7 2V9M7 9L4 6M7 9L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 11V12C3 12.4 3.3 12.7 3.7 12.7H10.3C10.7 12.7 11 12.4 11 12V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                              Download: {lesson.downloadFile}
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Mark complete button */}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => toggleComplete(lesson.id)}
                        className={`text-xs font-bold px-5 py-2.5 rounded-lg transition-all duration-200 ${
                          isComplete
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-600/20"
                        }`}
                      >
                        {isComplete ? "Completed ✓" : "Mark as Complete"}
                      </button>
                    </div>
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
