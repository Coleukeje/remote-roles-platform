"use client";

import { useState, useRef, useEffect } from "react";
import type { Lesson, QuizQuestion, YouTubeVideo, Comment, RichContentBlock } from "@/data/curriculum";
import Link from "next/link";
import RichContentRenderer from "@/components/RichContentRenderer";
import { useLessonProgress } from "@/lib/useLessonProgress";
import { useActiveLesson } from "@/components/ActiveLesson";

/* ═══════════════════════════════════════════════
   TYPE STYLING
   ═══════════════════════════════════════════════ */
const typeConfig: Record<
  string,
  { label: string; bg: string; text: string; dot: string; iconBg: string; border: string; gradient: string }
> = {
  video: {
    label: "Video",
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-500",
    iconBg: "bg-red-100 text-red-600",
    border: "border-red-200",
    gradient: "from-red-50 to-red-100/30",
  },
  slides: {
    label: "Slides",
    bg: "bg-purple-50",
    text: "text-purple-600",
    dot: "bg-purple-500",
    iconBg: "bg-purple-100 text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-50 to-purple-100/30",
  },
  reading: {
    label: "Reading",
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-500",
    iconBg: "bg-amber-100 text-amber-600",
    border: "border-amber-200",
    gradient: "from-amber-50 to-amber-100/30",
  },
  exercise: {
    label: "Exercise",
    bg: "bg-green-50",
    text: "text-green-600",
    dot: "bg-green-500",
    iconBg: "bg-green-100 text-green-600",
    border: "border-green-200",
    gradient: "from-green-50 to-green-100/30",
  },
  quiz: {
    label: "Quiz",
    bg: "bg-blue-50",
    text: "text-blue-600",
    dot: "bg-blue-500",
    iconBg: "bg-blue-100 text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-50 to-blue-100/30",
  },
  roleplay: {
    label: "Role Play",
    bg: "bg-orange-50",
    text: "text-orange-600",
    dot: "bg-orange-500",
    iconBg: "bg-orange-100 text-orange-600",
    border: "border-orange-200",
    gradient: "from-orange-50 to-orange-100/30",
  },
  download: {
    label: "Download",
    bg: "bg-teal-50",
    text: "text-teal-600",
    dot: "bg-teal-500",
    iconBg: "bg-teal-100 text-teal-600",
    border: "border-teal-200",
    gradient: "from-teal-50 to-teal-100/30",
  },
  youtube: {
    label: "Video Resources",
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-500",
    iconBg: "bg-red-100 text-red-600",
    border: "border-red-200",
    gradient: "from-red-50 to-rose-100/30",
  },
  confirmation: {
    label: "Team Confirmation",
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    dot: "bg-indigo-500",
    iconBg: "bg-indigo-100 text-indigo-600",
    border: "border-indigo-200",
    gradient: "from-indigo-50 to-indigo-100/30",
  },
  "video-upload": {
    label: "Training Video",
    bg: "bg-violet-50",
    text: "text-violet-600",
    dot: "bg-violet-500",
    iconBg: "bg-violet-100 text-violet-600",
    border: "border-violet-200",
    gradient: "from-violet-50 to-violet-100/30",
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
  youtube: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 7.5L13 10L8.5 12.5V7.5Z" fill="currentColor" />
    </svg>
  ),
  confirmation: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "video-upload": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8V12M10 8L8 10M10 8L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════
   INTERACTIVE QUIZ COMPONENT
   ═══════════════════════════════════════════════ */
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
      <div className="rounded-xl border-2 border-blue-200 bg-blue-50/50 p-4 sm:p-6 text-center">
        <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-3 ${passed ? "bg-green-100" : "bg-amber-100"}`}>
          {passed ? "\u{1F389}" : "\u{1F4DA}"}
        </div>
        <p className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-ink mb-1">
          {passed ? "Great job!" : "Keep studying!"}
        </p>
        <p className="text-sm text-muted mb-1">
          You scored <span className="font-bold text-ink">{totalCorrect}/{questions.length}</span> ({pct}%)
        </p>
        <p className="text-xs text-muted mb-4">
          {passed ? "You passed. Review any you missed below." : "You need 70% to pass. Review the material and try again."}
        </p>
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
        <button onClick={handleRetry} className="text-sm font-bold text-white bg-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-blue-200 bg-blue-50/30 overflow-hidden">
      <div className="px-4 sm:px-5 py-3 bg-blue-100/50 border-b border-blue-200 flex items-center justify-between">
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
      <div className="p-4 sm:p-5">
        <p className="text-sm font-bold text-ink mb-4">{q.question}</p>
        <div className="space-y-2 mb-4">
          {q.options.map((option, i) => {
            let style = "border-surface-dim bg-white hover:border-purple-300 cursor-pointer";
            if (isAnswered) {
              if (i === q.correctIndex) style = "border-green-400 bg-green-50 ring-1 ring-green-400";
              else if (i === answered[currentQ] && i !== q.correctIndex) style = "border-red-400 bg-red-50 ring-1 ring-red-400";
              else style = "border-surface-dim bg-white opacity-50";
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
                  isAnswered && i === q.correctIndex ? "border-green-500 bg-green-500 text-white"
                  : isAnswered && i === answered[currentQ] && i !== q.correctIndex ? "border-red-500 bg-red-500 text-white"
                  : selected === i ? "border-purple-500 bg-purple-500 text-white"
                  : "border-surface-dim text-muted"
                }`}>
                  {isAnswered && i === q.correctIndex ? "✓"
                    : isAnswered && i === answered[currentQ] && i !== q.correctIndex ? "✗"
                    : String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-ink">{option}</span>
              </button>
            );
          })}
        </div>
        {isAnswered && (
          <div className={`p-3 rounded-lg mb-4 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
            <div className="flex items-start gap-2">
              <span className="text-sm mt-0.5">{isCorrect ? "✅" : "\u{1F4A1}"}</span>
              <p className="text-xs text-ink leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        )}
        <div className="flex justify-end gap-2">
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className={`text-sm font-bold px-5 py-2.5 rounded-lg transition-all ${
                selected !== null ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" : "bg-surface-dim text-muted cursor-not-allowed"
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} className="text-sm font-bold bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              {currentQ < questions.length - 1 ? "Next Question →" : "See Results"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   YOUTUBE EMBED COMPONENT
   ═══════════════════════════════════════════════ */
function getVideoId(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]+)/,
  );
  return match ? match[1] : null;
}

/**
 * Click-to-load video card.
 *
 * The previous version mounted a real YouTube iframe for every video as soon
 * as the lesson opened — three players loading several hundred KB each, and
 * YouTube receiving a view of every trainee who opened the page whether or
 * not they pressed play. This shows YouTube's own thumbnail instead and only
 * swaps in the player on click, which is both markedly faster and quieter.
 */
function VideoCard({
  video,
  index,
  total,
}: {
  video: YouTubeVideo;
  index: number;
  total: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const videoId = getVideoId(video.url);

  if (!videoId) {
    return (
      <div className="rounded-2xl border border-surface-dim bg-white p-4">
        <p className="text-sm font-bold text-ink">{video.title}</p>
        {video.description && (
          <p className="text-xs text-muted mt-1 leading-relaxed">{video.description}</p>
        )}
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-red-600 hover:text-red-700"
        >
          Watch on YouTube
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    );
  }

  // maxres doesn't exist for every upload; hq always does.
  const thumb = thumbFailed
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="group rounded-2xl border border-surface-dim bg-white overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative w-full bg-ink" style={{ paddingBottom: "56.25%" }}>
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${video.title}`}
            className="absolute inset-0 w-full h-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt=""
              onError={() => setThumbFailed(true)}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/20 transition-opacity group-hover:from-ink/70" />

            {/* Step number — these are meant to be watched in order */}
            <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-white tracking-wide">
              {index + 1} of {total}
            </span>

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center w-16 h-11 rounded-xl bg-red-600 shadow-lg transition-transform duration-200 group-hover:scale-110">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
            </span>

            <span className="absolute bottom-3 left-3 right-3 text-left text-[13px] font-bold text-white leading-snug line-clamp-2">
              {video.title}
            </span>
          </button>
        )}
      </div>

      <div className="p-4">
        {video.description && (
          <p className="text-xs text-muted leading-relaxed">{video.description}</p>
        )}
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] font-semibold text-muted hover:text-red-600 transition-colors"
        >
          Open on YouTube
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function YouTubeSection({ videos }: { videos: YouTubeVideo[] }) {
  return (
    <div className="space-y-4">
      {videos.map((video, i) => (
        <VideoCard key={video.url} video={video} index={i} total={videos.length} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MEETING CONFIRMATION COMPONENT
   ═══════════════════════════════════════════════ */
function ConfirmationBlock({
  text,
  confirmed,
  onToggle,
}: {
  text: string;
  confirmed: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`rounded-xl border-2 p-4 sm:p-5 transition-all duration-300 ${
      confirmed
        ? "border-green-300 bg-green-50/50"
        : "border-indigo-200 bg-indigo-50/30"
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          confirmed ? "bg-green-100 text-green-600" : "bg-indigo-100 text-indigo-600"
        }`}>
          {confirmed ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9L7.5 12.5L14 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9H15M9 3V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <p className={`text-sm font-bold ${confirmed ? "text-green-700" : "text-indigo-800"}`}>
          {confirmed ? "Meeting Confirmed" : "Team Meeting Required"}
        </p>
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="mt-0.5 flex-shrink-0">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={onToggle}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            confirmed
              ? "bg-green-500 border-green-500"
              : "border-indigo-300 group-hover:border-indigo-500 bg-white"
          }`}>
            {confirmed && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm text-ink/80 leading-relaxed select-none">{text}</span>
      </label>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VIDEO UPLOAD PLACEHOLDER COMPONENT
   ═══════════════════════════════════════════════ */
function VideoUploadBlock() {
  return (
    <div className="rounded-xl border-2 border-dashed border-violet-300 bg-violet-50/30 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
      <div className="w-14 h-14 rounded-xl bg-violet-100 text-violet-500 flex items-center justify-center mb-3">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="6" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 11V17M14 11L11 14M14 11L17 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-sm font-bold text-violet-700 mb-1">Training Video</p>
      <p className="text-xs text-violet-500/80 max-w-xs leading-relaxed">
        Your trainer will upload a video walkthrough here. Check back after your live meeting for the recording.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   COMMENTS SECTION COMPONENT
   ═══════════════════════════════════════════════ */
function CommentsSection({ lessonId }: { lessonId: string }) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "demo-1",
      name: "Marcus T.",
      text: "This module really helped me understand the basics. The cold calling tips are practical and easy to follow.",
      date: "2024-10-15",
    },
    {
      id: "demo-2",
      name: "Aisha R.",
      text: "Going straight to business instead of asking permission was a game changer. My callback rate improved immediately.",
      date: "2024-11-02",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `${lessonId}-${Date.now()}`,
      name: "Trainee",
      text: newComment.trim(),
      date: new Date().toISOString().split("T")[0],
    };
    setComments((prev) => [comment, ...prev]);
    setNewComment("");
    setShowForm(false);
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  return (
    <div className="mt-6 pt-6 border-t border-surface-dim">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-muted">
            <path d="M3 3H15V12H8L4.5 15V12H3V3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
          <p className="text-sm font-bold text-ink">
            Trainee Comments <span className="text-xs font-normal text-muted ml-1">({comments.length})</span>
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Comment"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 rounded-xl bg-purple-50/50 border border-purple-200">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts on this lesson..."
            rows={3}
            className="w-full text-sm border border-purple-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 resize-none placeholder:text-muted/50"
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                newComment.trim()
                  ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                  : "bg-surface-dim text-muted cursor-not-allowed"
              }`}
            >
              Post Comment
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-xs font-bold text-purple-600">
                {c.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-ink">{c.name}</span>
                <span className="text-[10px] text-muted">{formatDate(c.date)}</span>
              </div>
              <p className="text-xs text-ink/70 leading-relaxed mt-0.5">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   LEGACY CONTENT RENDERER — handles flat text strings
   ═══════════════════════════════════════════════ */
function LegacyContentRenderer({ content }: { content: string }) {
  const sections = content.split("\n\n");

  return (
    <div className="space-y-4">
      {sections.map((section, i) => {
        const lines = section.split("\n");

        if (lines.length === 1 && lines[0].endsWith(":")) {
          return (
            <p key={i} className="text-sm font-bold text-ink">
              {lines[0]}
            </p>
          );
        }

        const hasBullets = lines.some((l) => l.startsWith("•") || l.startsWith("- "));

        if (hasBullets) {
          const heading = lines[0].endsWith(":") ? lines[0] : null;
          const bullets = lines.filter((l) => l.startsWith("•") || l.startsWith("- "));
          const nonBullets = lines.filter(
            (l) => !l.startsWith("•") && !l.startsWith("- ") && l !== heading,
          );

          return (
            <div key={i}>
              {heading && <p className="text-sm font-bold text-ink mb-2">{heading}</p>}
              {nonBullets.length > 0 && (
                <p className="text-sm text-ink/80 leading-relaxed mb-2">{nonBullets.join(" ")}</p>
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

        const hasNumbers = lines.some((l) => /^\d+\.\s/.test(l));

        if (hasNumbers) {
          const heading = !(/^\d+\.\s/.test(lines[0])) ? lines[0] : null;
          const items = lines.filter((l) => /^\d+\.\s/.test(l));

          return (
            <div key={i}>
              {heading && <p className="text-sm font-bold text-ink mb-2">{heading}</p>}
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

        // Detect response patterns like "→" in objection handling
        if (lines.some((l) => l.startsWith("→") || l.startsWith("->"))) {
          return (
            <div key={i} className="space-y-1">
              {lines.map((line, j) => {
                if (line.startsWith("→") || line.startsWith("->")) {
                  return (
                    <p key={j} className="text-sm text-green-700 leading-relaxed pl-4 border-l-2 border-green-300 italic">
                      {line.replace(/^[→\->]+\s*/, "")}
                    </p>
                  );
                }
                return (
                  <p key={j} className="text-sm text-ink font-semibold">
                    {line}
                  </p>
                );
              })}
            </div>
          );
        }

        return (
          <p key={i} className="text-sm text-ink/80 leading-relaxed">
            {section}
          </p>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SMART CONTENT BLOCK — routes to rich or legacy
   ═══════════════════════════════════════════════ */
function ContentBlock({ content }: { content: string | RichContentBlock[] }) {
  if (Array.isArray(content)) {
    return <RichContentRenderer blocks={content} />;
  }
  return <LegacyContentRenderer content={content} />;
}

/* ═══════════════════════════════════════════════
   HERO IMAGE BANNER — shown at top of lesson
   ═══════════════════════════════════════════════ */
function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full aspect-[2.4/1] lg:aspect-[4/1] max-h-[200px] sm:max-h-[240px] overflow-hidden rounded-xl sm:rounded-2xl bg-surface-dim mb-6 -mt-1">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT — Full Page Content View
   ═══════════════════════════════════════════════ */
export default function LessonViewer({
  lessons,
  nextLink,
  prevLink,
  activeLessonId,
}: {
  lessons: Lesson[];
  nextLink: string | null;
  prevLink: string | null;
  activeLessonId?: string;
}) {
  // Progress is loaded from and written back to Supabase, so ticking a
  // lesson survives a refresh and follows the trainee across devices.
  const { completed, confirmed, toggleComplete, toggleConfirm } =
    useLessonProgress();
  const { setActiveLessonId } = useActiveLesson();
  const [expandedLesson, setExpandedLesson] = useState<string>(
    activeLessonId || lessons[0]?.id || ""
  );
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Publish whichever lesson is open — on first paint and on every change —
  // so the sidebar highlights it even when the page was loaded directly.
  useEffect(() => {
    if (expandedLesson) setActiveLessonId(expandedLesson);
  }, [expandedLesson, setActiveLessonId]);

  // Sync with URL changes when clicking sidebar lessons
  useEffect(() => {
    if (activeLessonId) {
      setExpandedLesson(activeLessonId);
      setTimeout(() => {
        const el = sectionRefs.current[activeLessonId];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [activeLessonId]);

  const progress =
    lessons.length > 0 ? Math.round((completed.size / lessons.length) * 100) : 0;

  // Lesson-level navigation: Next walks through the lessons in this day, then
  // rolls over to the next day once you're on the last one.
  const activeIndex = Math.max(
    0,
    lessons.findIndex((l) => l.id === expandedLesson),
  );
  const prevLesson = lessons[activeIndex - 1];
  const nextLesson = lessons[activeIndex + 1];

  const completedCount = lessons.filter((l) => completed.has(l.id)).length;
  const minutesLeft = lessons
    .filter((l) => !completed.has(l.id))
    .reduce((s, l) => s + (parseInt(l.duration) || 0), 0);

  // How far the reader has scrolled through the lesson they're on (0–100).
  // Drives the fill behind the active row in the right rail, so the rail
  // shows depth into the lesson, not just which lesson is open.
  const rootRef = useRef<HTMLDivElement>(null);
  const [readPct, setReadPct] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // The page scrolls in a container, not the window — walk up to find it.
    let el: HTMLElement | null = root.parentElement;
    while (el && el.scrollHeight <= el.clientHeight) el = el.parentElement;
    const scroller: HTMLElement | Window = el ?? window;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const section = sectionRefs.current[expandedLesson];
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const scrollable = rect.height - viewH;

      // Short lessons that fit on screen count as fully read once visible.
      const pct =
        scrollable <= 0
          ? rect.bottom <= viewH + 8
            ? 100
            : 0
          : Math.min(100, Math.max(0, (-rect.top / scrollable) * 100));

      setReadPct(pct);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [expandedLesson]);

  function goToLesson(id: string) {
    setExpandedLesson(id);
    // Tell the sidebar too, so both panels move together.
    setActiveLessonId(id);
    setTimeout(() => {
      sectionRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  const arrowRight = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const arrowLeft = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  const nextBtnClass =
    "inline-flex items-center gap-2 bg-purple-600 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20";
  const backBtnClass =
    "inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-purple-600 transition-colors";

  return (
    // Two columns on desktop: the lesson in a readable-width column, and a
    // sticky rail showing where you are in the day. Below lg it collapses
    // to a single column and the rail is dropped (the sidebar covers it).
    // Content and rail travel as a pair inside one centred, capped row.
    // The content column flexes with min-w-0 and the rail is flex-none, so
    // the group shrinks on narrow screens instead of pushing the rail
    // off the right edge.
    <div
      ref={rootRef}
      className="px-4 sm:px-6 lg:px-8 py-6"
    >
      <div className="mx-auto flex max-w-[1040px] gap-8 items-start">
      <div className="min-w-0 flex-1">
      {/* ─── Progress bar ─── */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-2.5 bg-surface-dim rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-bold text-muted tabular-nums w-10 text-right">
          {progress}%
        </span>
      </div>

      {/* ─── Single active lesson ─── */}
      {(() => {
        const activeIndex = lessons.findIndex((l) => l.id === expandedLesson);
        const lesson = activeIndex >= 0 ? lessons[activeIndex] : lessons[0];
        const index = activeIndex >= 0 ? activeIndex : 0;
        if (!lesson) return null;
        const config = typeConfig[lesson.type] || typeConfig.reading;
        const isComplete = completed.has(lesson.id);
        const isConfirmed = confirmed.has(lesson.id);

        return (
          <section
            key={lesson.id}
            ref={(el) => { sectionRefs.current[lesson.id] = el; }}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
              isComplete ? "border-green-200 bg-green-50/20" : "border-surface-dim bg-white"
            }`}
          >
            {/* Section header */}
            <div
              className={`px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r ${config.gradient} border-b ${config.border}`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${config.iconBg} flex items-center justify-center`}>
                  {typeIcons[lesson.type] || typeIcons.reading}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-muted/60 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
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
                  <h3 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-ink leading-tight">
                    {lesson.title}
                  </h3>
                  {lesson.description && (
                    <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">{lesson.description}</p>
                  )}
                </div>
                {/* Completion indicator */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleComplete(lesson.id)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
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
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Section content — always visible for the active lesson */}
            <div className="px-4 sm:px-6 py-5 sm:py-6">
                {/* Hero image */}
                {lesson.heroImage && (
                  <HeroImage src={lesson.heroImage} alt={lesson.title} />
                )}

                {/* Meeting note banner */}
                {lesson.meetingNote && (
                  <div className="mb-5 flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                    <span className="text-lg flex-shrink-0 mt-0.5">{"\u{1F4F9}"}</span>
                    <div>
                      <p className="text-xs font-bold text-indigo-800 mb-0.5">Live Training Component</p>
                      <p className="text-xs text-indigo-700 leading-relaxed">{lesson.meetingNote}</p>
                    </div>
                  </div>
                )}

                {/* ─── TYPE: Download ─── */}
                {lesson.type === "download" && lesson.downloadFile && (
                  <div className="rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 border-2 border-teal-200 p-5 sm:p-6 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-3">
                      {typeIcons.download}
                    </div>
                    <p className="text-sm font-bold text-ink mb-1">{lesson.title}</p>
                    {lesson.content && (
                      <div className="max-w-lg mb-5 text-center">
                        <p className="text-xs text-muted leading-relaxed line-clamp-3">{typeof lesson.content === "string" ? lesson.content.split("\n")[0] : ""}</p>
                      </div>
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
                    {lesson.content && (
                      <div className="mt-5 pt-5 border-t border-teal-200 w-full">
                        <ContentBlock content={lesson.content} />
                      </div>
                    )}
                  </div>
                )}

                {/* ─── TYPE: Quiz ─── */}
                {lesson.type === "quiz" && lesson.quiz && lesson.quiz.length > 0 && (
                  <div>
                    {lesson.content && (
                      <div className="mb-5">
                        <ContentBlock content={lesson.content} />
                      </div>
                    )}
                    <QuizBlock questions={lesson.quiz} />
                  </div>
                )}

                {/* ─── TYPE: Role Play ─── */}
                {lesson.type === "roleplay" && (
                  <div className="rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                        {typeIcons.roleplay}
                      </div>
                      <p className="text-sm font-bold text-orange-800">Role Play Exercise</p>
                    </div>
                    {lesson.content && <ContentBlock content={lesson.content} />}
                  </div>
                )}

                {/* ─── TYPE: YouTube ─── */}
                {lesson.type === "youtube" && (
                  <div>
                    {lesson.content && (
                      <div className="mb-5">
                        <ContentBlock content={lesson.content} />
                      </div>
                    )}
                    {lesson.videos && lesson.videos.length > 0 && (
                      <YouTubeSection videos={lesson.videos} />
                    )}
                  </div>
                )}

                {/* ─── TYPE: Confirmation ─── */}
                {lesson.type === "confirmation" && (
                  <div>
                    {lesson.content && (
                      <div className="mb-5">
                        <ContentBlock content={lesson.content} />
                      </div>
                    )}
                    {lesson.requiresConfirmation && lesson.confirmationText && (
                      <ConfirmationBlock
                        text={lesson.confirmationText}
                        confirmed={isConfirmed}
                        onToggle={() => toggleConfirm(lesson.id)}
                      />
                    )}
                  </div>
                )}

                {/* ─── TYPE: Video Upload ─── */}
                {lesson.type === "video-upload" && (
                  <div>
                    {lesson.content && (
                      <div className="mb-5">
                        <ContentBlock content={lesson.content} />
                      </div>
                    )}
                    <VideoUploadBlock />
                  </div>
                )}

                {/* ─── Default content types (video, slides, reading, exercise) ─── */}
                {!["download", "quiz", "roleplay", "youtube", "confirmation", "video-upload"].includes(lesson.type) && (
                  <div>
                    {lesson.content ? (
                      <ContentBlock content={lesson.content} />
                    ) : (
                      <p className="text-xs text-muted/60 text-center italic py-6">
                        Content will be available once uploaded by your trainer.
                      </p>
                    )}
                  </div>
                )}

                {/* Inline confirmation for non-confirmation types that need it */}
                {lesson.type !== "confirmation" && lesson.requiresConfirmation && lesson.confirmationText && (
                  <div className="mt-5">
                    <ConfirmationBlock
                      text={lesson.confirmationText}
                      confirmed={isConfirmed}
                      onToggle={() => toggleConfirm(lesson.id)}
                    />
                  </div>
                )}

                {/* Download link for non-download types */}
                {lesson.type !== "download" && lesson.downloadFile && (
                  <div className="mt-5 pt-4 border-t border-surface-dim">
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

                {/* Comments section — available on slides and key content types */}
                {["slides", "reading", "youtube"].includes(lesson.type) && (
                  <CommentsSection lessonId={lesson.id} />
                )}

                {/* Mark complete */}
                <div className="mt-5 pt-4 border-t border-surface-dim flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    {isComplete ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Completed
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-surface-dim" />
                        Not completed
                      </>
                    )}
                  </div>
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
            </section>
          );
      })()}

      {/* ─── Navigation ─── */}
      <div className="mt-10 pt-6 border-t border-surface-dim flex items-center justify-between gap-4">
        {/* Back: previous lesson, else previous day */}
        {prevLesson ? (
          <button onClick={() => goToLesson(prevLesson.id)} className={backBtnClass}>
            {arrowLeft}
            Back
          </button>
        ) : prevLink ? (
          <Link href={prevLink} className={backBtnClass}>
            {arrowLeft}
            Previous Day
          </Link>
        ) : (
          <span />
        )}

        <span className="hidden sm:block text-xs text-muted tabular-nums">
          Lesson {activeIndex + 1} of {lessons.length}
        </span>

        {/* Next: next lesson, else next day */}
        {nextLesson ? (
          <button onClick={() => goToLesson(nextLesson.id)} className={nextBtnClass}>
            Next
            {arrowRight}
          </button>
        ) : nextLink ? (
          <Link href={nextLink} className={nextBtnClass}>
            Next Day
            {arrowRight}
          </Link>
        ) : (
          <span className="text-xs text-muted italic">End of training</span>
        )}
      </div>
      </div>

      {/* ─── Right rail: where you are in this day ─── */}
      <aside className="hidden lg:block w-60 flex-none sticky top-6">
        <div className="rounded-2xl border border-surface-dim bg-white p-4">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.12em]">
              In this day
            </p>
            <span className="text-[10px] font-bold text-purple-600 tabular-nums">
              {completedCount}/{lessons.length}
            </span>
          </div>

          <ol className="space-y-0.5">
            {lessons.map((l, i) => {
              const isActive = l.id === expandedLesson;
              const isDone = completed.has(l.id);

              return (
                <li key={l.id}>
                  <button
                    onClick={() => goToLesson(l.id)}
                    className={`relative w-full overflow-hidden text-left flex items-start gap-2.5 px-2.5 py-2 rounded-lg transition-colors group ${
                      isActive
                        ? "border border-purple-200"
                        : "border border-transparent hover:bg-surface-dim/50"
                    }`}
                  >
                    {/* Reading fill — tracks how far into this lesson you've
                        scrolled. Sits behind the row content. */}
                    {isActive && (
                      <>
                        <span
                          aria-hidden
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-100 to-purple-50"
                          style={{ width: `${readPct}%` }}
                        />
                        {/* Leading edge, so the boundary reads as a position */}
                        <span
                          aria-hidden
                          className="absolute inset-y-0 w-px bg-purple-400/70"
                          style={{ left: `${readPct}%` }}
                        />
                        {/* Left accent marks which row is open regardless of fill */}
                        <span
                          aria-hidden
                          className="absolute left-0 inset-y-1 w-[3px] rounded-full bg-purple-600"
                        />
                      </>
                    )}

                    {/* Status dot */}
                    <span
                      className={`relative z-10 mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                        isDone
                          ? "bg-green-500 text-white"
                          : isActive
                            ? "bg-purple-600 text-white ring-4 ring-purple-600/15"
                            : "bg-surface-dim text-muted"
                      }`}
                    >
                      {isDone ? (
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2.5 6L5 8.5L9.5 3.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>

                    <span className="relative z-10 min-w-0 flex-1">
                      <span
                        className={`block text-[12px] leading-snug ${
                          isActive
                            ? "font-bold text-purple-900"
                            : isDone
                              ? "font-medium text-muted"
                              : "font-medium text-ink"
                        }`}
                      >
                        {l.title}
                      </span>
                      <span className="block text-[10px] text-muted mt-0.5">
                        {isActive ? (
                          <>
                            {typeConfig[l.type]?.label || l.type} &middot;{" "}
                            <span className="font-bold text-purple-700 tabular-nums">
                              {Math.round(readPct)}% read
                            </span>
                          </>
                        ) : (
                          <>
                            {typeConfig[l.type]?.label || l.type} &middot; {l.duration}
                          </>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Time remaining in this day */}
          {minutesLeft > 0 && (
            <p className="mt-3 pt-3 border-t border-surface-dim text-[10px] text-muted">
              About{" "}
              <span className="font-bold text-ink">{minutesLeft} min</span> left
              in this day
            </p>
          )}
        </div>
      </aside>
      </div>
    </div>
  );
}
