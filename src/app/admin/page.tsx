"use client";

import { useState } from "react";
import { curriculum } from "@/data/curriculum";
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

export default function AdminPage() {
  const [trainees, setTrainees] = useState<Trainee[]>(mockTrainees);
  const [selected, setSelected] = useState<string | null>(null);

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
          ← Back to Training
        </Link>
      </header>

      <div className="max-w-6xl mx-auto p-8">
        {/* ─── Stats ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
              )}
              %
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          {/* ─── Trainee list ─── */}
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

          {/* ─── Detail panel ─── */}
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
      </div>
    </div>
  );
}
