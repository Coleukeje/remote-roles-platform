"use client";

import { useState } from "react";
import { curriculum } from "@/data/curriculum";
import type { QuizQuestion } from "@/data/curriculum";
import Link from "next/link";

/* ─── Mock data — in production these come from Supabase ─── */
type Trainee = {
  id: string;
  name: string;
  email: string;
  unlockedWeeks: string[];
  completedLessons: number;
  lastActive: string;
};

const mockTrainees: Trainee[] = [
  {
    id: "1",
    name: "Thelma Okafor",
    email: "thelma@remoteroles.online",
    unlockedWeeks: ["week-1", "week-2"],
    completedLessons: 18,
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Stuart Mensah",
    email: "stuart@remoteroles.online",
    unlockedWeeks: ["week-1"],
    completedLessons: 8,
    lastActive: "Yesterday",
  },
  {
    id: "3",
    name: "New Trainee",
    email: "new@remoteroles.online",
    unlockedWeeks: ["week-1"],
    completedLessons: 0,
    lastActive: "Never",
  },
];

const totalLessons = curriculum.reduce(
  (s, w) => s + w.days.reduce((sd, d) => sd + d.lessons.length, 0),
  0,
);

// Gather all quizzes from curriculum
function getAllQuizzes() {
  const quizzes: { weekTitle: string; dayTitle: string; lessonTitle: string; lessonId: string; questions: QuizQuestion[] }[] = [];
  curriculum.forEach((week) => {
    week.days.forEach((day) => {
      day.lessons.forEach((lesson) => {
        if (lesson.type === "quiz" && lesson.quiz && lesson.quiz.length > 0) {
          quizzes.push({
            weekTitle: `Week ${week.week}`,
            dayTitle: `Day ${day.day}: ${day.title}`,
            lessonTitle: lesson.title,
            lessonId: lesson.id,
            questions: lesson.quiz,
          });
        }
      });
    });
  });
  return quizzes;
}

// Gather all role plays from curriculum
function getAllRolePlays() {
  const roleplays: { weekTitle: string; dayTitle: string; lessonTitle: string; lessonId: string; content: string }[] = [];
  curriculum.forEach((week) => {
    week.days.forEach((day) => {
      day.lessons.forEach((lesson) => {
        if (lesson.type === "roleplay" && lesson.content) {
          roleplays.push({
            weekTitle: `Week ${week.week}`,
            dayTitle: `Day ${day.day}: ${day.title}`,
            lessonTitle: lesson.title,
            lessonId: lesson.id,
            content: lesson.content,
          });
        }
      });
    });
  });
  return roleplays;
}

// Gather all downloads
function getAllDownloads() {
  const downloads: { weekTitle: string; dayTitle: string; lessonTitle: string; file: string }[] = [];
  curriculum.forEach((week) => {
    week.days.forEach((day) => {
      day.lessons.forEach((lesson) => {
        if (lesson.downloadFile) {
          downloads.push({
            weekTitle: `Week ${week.week}`,
            dayTitle: `Day ${day.day}: ${day.title}`,
            lessonTitle: lesson.title,
            file: lesson.downloadFile,
          });
        }
      });
    });
  });
  return downloads;
}

type Tab = "trainees" | "quizzes" | "roleplays" | "downloads" | "content";

export default function AdminPage() {
  const [trainees, setTrainees] = useState<Trainee[]>(mockTrainees);
  const [selected, setSelected] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("trainees");
  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);
  const [expandedRoleplay, setExpandedRoleplay] = useState<string | null>(null);

  const quizzes = getAllQuizzes();
  const roleplays = getAllRolePlays();
  const downloads = getAllDownloads();

  function toggleWeekAccess(traineeId: string, weekId: string) {
    setTrainees((prev) =>
      prev.map((t) => {
        if (t.id !== traineeId) return t;
        const has = t.unlockedWeeks.includes(weekId);
        return {
          ...t,
          unlockedWeeks: has
            ? t.unlockedWeeks.filter((w) => w !== weekId)
            : [...t.unlockedWeeks, weekId],
        };
      }),
    );
  }

  function unlockAllWeeks(traineeId: string) {
    setTrainees((prev) =>
      prev.map((t) => {
        if (t.id !== traineeId) return t;
        return { ...t, unlockedWeeks: curriculum.map((w) => w.id) };
      }),
    );
  }

  const selectedTrainee = trainees.find((t) => t.id === selected);

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "trainees", label: "Trainees", count: trainees.length },
    { id: "quizzes", label: "Quizzes", count: quizzes.length },
    { id: "roleplays", label: "Role Plays", count: roleplays.length },
    { id: "downloads", label: "Downloads", count: downloads.length },
    { id: "content", label: "Content" },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* ─── Top bar ─── */}
      <header className="h-14 bg-white border-b border-surface-dim flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/training" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <span className="text-white font-[family-name:var(--font-display)] text-xs font-bold">RR</span>
            </div>
            <span className="font-[family-name:var(--font-display)] font-bold text-sm text-ink">
              Admin Panel
            </span>
          </Link>
        </div>
        <Link
          href="/training"
          className="text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors"
        >
          &larr; Back to Training
        </Link>
      </header>

      <div className="max-w-6xl mx-auto p-8">
        {/* ─── Stats ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-surface-dim rounded-xl p-5">
            <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-1">Total Trainees</p>
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-ink">{trainees.length}</p>
          </div>
          <div className="bg-white border border-surface-dim rounded-xl p-5">
            <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-1">Active This Week</p>
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-green-600">
              {trainees.filter((t) => t.lastActive !== "Never").length}
            </p>
          </div>
          <div className="bg-white border border-surface-dim rounded-xl p-5">
            <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-1">Avg. Progress</p>
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-purple-600">
              {Math.round(
                trainees.reduce((s, t) => s + (t.completedLessons / totalLessons) * 100, 0) /
                  trainees.length,
              )}%
            </p>
          </div>
          <div className="bg-white border border-surface-dim rounded-xl p-5">
            <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-1">Total Content</p>
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-ink">{totalLessons}</p>
            <p className="text-[10px] text-muted mt-0.5">lessons across {curriculum.length} weeks</p>
          </div>
        </div>

        {/* ─── Tabs ─── */}
        <div className="flex gap-1 mb-6 bg-surface-dim/50 p-1 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-ink shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id
                    ? "bg-purple-100 text-purple-700"
                    : "bg-surface-dim text-muted"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── Trainees Tab ─── */}
        {activeTab === "trainees" && (
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
                  Trainees
                </h2>
                <button className="text-xs font-bold text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  + Invite Trainee
                </button>
              </div>

              <div className="bg-white border border-surface-dim rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-dim">
                      <th className="text-left text-[10px] font-bold text-muted uppercase tracking-wider px-5 py-3">
                        Trainee
                      </th>
                      <th className="text-left text-[10px] font-bold text-muted uppercase tracking-wider px-5 py-3">
                        Progress
                      </th>
                      <th className="text-left text-[10px] font-bold text-muted uppercase tracking-wider px-5 py-3">
                        Access
                      </th>
                      <th className="text-left text-[10px] font-bold text-muted uppercase tracking-wider px-5 py-3">
                        Last Active
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-dim">
                    {trainees.map((trainee) => {
                      const pct = Math.round((trainee.completedLessons / totalLessons) * 100);
                      const isSelected = selected === trainee.id;

                      return (
                        <tr
                          key={trainee.id}
                          onClick={() => setSelected(isSelected ? null : trainee.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? "bg-purple-50" : "hover:bg-surface-dim/50"
                          }`}
                        >
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="text-xs font-bold text-purple-600">
                                  {trainee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-ink">{trainee.name}</p>
                                <p className="text-[11px] text-muted">{trainee.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-1.5 bg-surface-dim rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-xs font-semibold text-muted">{pct}%</span>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex gap-1">
                              {curriculum.map((week) => (
                                <span
                                  key={week.id}
                                  className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${
                                    trainee.unlockedWeeks.includes(week.id)
                                      ? "bg-green-100 text-green-700"
                                      : "bg-surface-dim text-muted/50"
                                  }`}
                                >
                                  {week.week}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-xs text-muted">{trainee.lastActive}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detail panel */}
            {selectedTrainee && (
              <div className="w-80 flex-shrink-0">
                <div className="bg-white border border-surface-dim rounded-xl p-5 sticky top-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-base font-bold text-purple-600">
                        {selectedTrainee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{selectedTrainee.name}</p>
                      <p className="text-xs text-muted">{selectedTrainee.email}</p>
                    </div>
                  </div>

                  <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-3">
                    Module Access
                  </p>
                  <div className="space-y-2">
                    {curriculum.map((week) => {
                      const isUnlocked = selectedTrainee.unlockedWeeks.includes(week.id);
                      return (
                        <div
                          key={week.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-surface-dim"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{week.icon}</span>
                            <div>
                              <p className="text-xs font-semibold text-ink">Week {week.week}</p>
                              <p className="text-[10px] text-muted">{week.title}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleWeekAccess(selectedTrainee.id, week.id)}
                            className={`relative w-10 h-5 rounded-full transition-colors ${
                              isUnlocked ? "bg-green-500" : "bg-surface-dim"
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                                isUnlocked ? "left-5.5" : "left-0.5"
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => unlockAllWeeks(selectedTrainee.id)}
                    className="w-full mt-4 py-2 text-xs font-bold text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    Unlock All Modules
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Quizzes Tab ─── */}
        {activeTab === "quizzes" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
                Quiz Management
              </h2>
              <button className="text-xs font-bold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                + Create Quiz
              </button>
            </div>

            <div className="space-y-3">
              {quizzes.map((quiz) => {
                const isExpanded = expandedQuiz === quiz.lessonId;
                return (
                  <div key={quiz.lessonId} className="bg-white border border-surface-dim rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedQuiz(isExpanded ? null : quiz.lessonId)}
                      className="w-full flex items-center gap-4 p-4 text-left hover:bg-surface-dim/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M8 8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8C12 9.1 11.1 10 10 10V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <circle cx="10" cy="13.5" r="0.75" fill="currentColor" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-ink">{quiz.lessonTitle}</p>
                        <p className="text-[11px] text-muted">
                          {quiz.weekTitle} &middot; {quiz.dayTitle}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                        {quiz.questions.length} questions
                      </span>
                      <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        className={`text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-surface-dim px-4 py-4">
                        <div className="space-y-3">
                          {quiz.questions.map((q, i) => (
                            <div key={q.id} className="p-4 bg-surface-dim/40 rounded-lg">
                              <div className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-ink mb-2">{q.question}</p>
                                  <div className="space-y-1.5">
                                    {q.options.map((opt, j) => (
                                      <div
                                        key={j}
                                        className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
                                          j === q.correctIndex
                                            ? "bg-green-50 border border-green-200 text-green-800 font-semibold"
                                            : "bg-white border border-surface-dim text-ink/70"
                                        }`}
                                      >
                                        <span className="font-bold text-[10px]">{String.fromCharCode(65 + j)}.</span>
                                        {opt}
                                        {j === q.correctIndex && (
                                          <span className="ml-auto text-green-600 text-[10px] font-bold">&check; Correct</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                                    <p className="text-[11px] text-amber-800">
                                      <span className="font-bold">Explanation:</span> {q.explanation}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 mt-4 pt-3 border-t border-surface-dim">
                          <button className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                            Edit Questions
                          </button>
                          <button className="text-xs font-bold text-muted bg-surface-dim px-4 py-2 rounded-lg hover:bg-surface-dim/80 transition-colors">
                            Add Question
                          </button>
                          <button className="text-xs font-bold text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors ml-auto">
                            Delete Quiz
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Role Plays Tab ─── */}
        {activeTab === "roleplays" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
                Role Play Scenarios
              </h2>
              <button className="text-xs font-bold text-white bg-orange-600 px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                + Create Scenario
              </button>
            </div>

            <div className="space-y-3">
              {roleplays.map((rp) => {
                const isExpanded = expandedRoleplay === rp.lessonId;
                return (
                  <div key={rp.lessonId} className="bg-white border border-surface-dim rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedRoleplay(isExpanded ? null : rp.lessonId)}
                      className="w-full flex items-center gap-4 p-4 text-left hover:bg-surface-dim/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="7" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="13" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M3 17C3 14.8 4.8 13 7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M17 17C17 14.8 15.2 13 13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-ink">{rp.lessonTitle}</p>
                        <p className="text-[11px] text-muted">
                          {rp.weekTitle} &middot; {rp.dayTitle}
                        </p>
                      </div>
                      <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        className={`text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-surface-dim px-4 py-4">
                        <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-200/50">
                          <p className="text-sm text-ink/80 whitespace-pre-line leading-relaxed">
                            {rp.content}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-4 pt-3 border-t border-surface-dim">
                          <button className="text-xs font-bold text-orange-600 bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors">
                            Edit Scenario
                          </button>
                          <button className="text-xs font-bold text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors ml-auto">
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Downloads Tab ─── */}
        {activeTab === "downloads" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
                Downloadable Resources
              </h2>
              <button className="text-xs font-bold text-white bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                + Upload File
              </button>
            </div>

            <div className="bg-white border border-surface-dim rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-dim">
                    <th className="text-left text-[10px] font-bold text-muted uppercase tracking-wider px-5 py-3">File</th>
                    <th className="text-left text-[10px] font-bold text-muted uppercase tracking-wider px-5 py-3">Location</th>
                    <th className="text-left text-[10px] font-bold text-muted uppercase tracking-wider px-5 py-3">Lesson</th>
                    <th className="text-left text-[10px] font-bold text-muted uppercase tracking-wider px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-dim">
                  {downloads.map((dl, i) => (
                    <tr key={i} className="hover:bg-surface-dim/30 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M7 2V9M7 9L4 6M7 9L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M3 11V12H11V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="text-sm font-semibold text-ink">{dl.file}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs text-muted">{dl.weekTitle} &middot; {dl.dayTitle}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs text-muted">{dl.lessonTitle}</span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button className="text-[11px] font-bold text-teal-600 hover:text-teal-700 transition-colors">
                            Replace
                          </button>
                          <button className="text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors">
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── Content Tab ─── */}
        {activeTab === "content" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
                Curriculum Overview
              </h2>
            </div>

            <div className="space-y-4">
              {curriculum.map((week) => (
                <div key={week.id} className="bg-white border border-surface-dim rounded-xl overflow-hidden">
                  <div className="px-5 py-4 bg-surface-dim/30 border-b border-surface-dim">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{week.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-ink">Week {week.week}: {week.title}</p>
                        <p className="text-xs text-muted">{week.subtitle} &middot; {week.days.length} days &middot; {week.days.reduce((s, d) => s + d.lessons.length, 0)} lessons</p>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-surface-dim">
                    {week.days.map((day) => {
                      const typeCounts: Record<string, number> = {};
                      day.lessons.forEach((l) => {
                        typeCounts[l.type] = (typeCounts[l.type] || 0) + 1;
                      });
                      const typeColorMap: Record<string, string> = {
                        video: "bg-red-100 text-red-700",
                        slides: "bg-purple-100 text-purple-700",
                        reading: "bg-amber-100 text-amber-700",
                        exercise: "bg-green-100 text-green-700",
                        quiz: "bg-blue-100 text-blue-700",
                        roleplay: "bg-orange-100 text-orange-700",
                        download: "bg-teal-100 text-teal-700",
                      };
                      const typeLabelMap: Record<string, string> = {
                        video: "Video", slides: "Slides", reading: "Reading",
                        exercise: "Exercise", quiz: "Quiz", roleplay: "Role Play", download: "Download",
                      };

                      return (
                        <div key={day.id} className="px-5 py-3 flex items-center gap-4">
                          <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {day.day}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-ink">{day.title}</p>
                            <p className="text-xs text-muted truncate">{day.description}</p>
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
                            {Object.entries(typeCounts).map(([type, count]) => (
                              <span
                                key={type}
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${typeColorMap[type] || "bg-surface-dim text-muted"}`}
                              >
                                {count} {typeLabelMap[type] || type}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
