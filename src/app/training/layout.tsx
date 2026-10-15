import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import { MobileNavProvider, MobileOverlay } from "@/components/MobileNav";

function SidebarFallback() {
  return (
    <aside className="hidden lg:flex w-[300px] h-full bg-ink text-surface flex-col border-r border-ink-light">
      <div className="px-5 py-5 border-b border-ink-light">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center">
            <span className="text-white font-[family-name:var(--font-display)] text-sm font-bold">RR</span>
          </div>
          <div>
            <p className="font-[family-name:var(--font-display)] font-bold text-sm text-surface leading-tight">
              Remote Roles
            </p>
            <p className="text-[11px] text-muted leading-tight">Training Academy</p>
          </div>
        </div>
      </div>
      <div className="flex-1" />
    </aside>
  );
}

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileNavProvider>
      <div className="flex h-full">
        <MobileOverlay />
        <Suspense fallback={<SidebarFallback />}>
          <Sidebar />
        </Suspense>
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">{children}</main>
      </div>
    </MobileNavProvider>
  );
}
