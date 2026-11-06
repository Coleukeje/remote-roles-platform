"use client";

import type { RichContentBlock } from "@/data/curriculum";

/* ═══════════════════════════════════════════════
   CALLOUT STYLES
   ═══════════════════════════════════════════════ */
const calloutStyles: Record<
  string,
  { icon: string; bg: string; border: string; title: string; titleColor: string; textColor: string }
> = {
  "key-takeaway": {
    icon: "💡",
    bg: "bg-amber-50",
    border: "border-amber-300",
    title: "Key Takeaway",
    titleColor: "text-amber-800",
    textColor: "text-amber-900/80",
  },
  "pro-tip": {
    icon: "⚡",
    bg: "bg-purple-50",
    border: "border-purple-300",
    title: "Pro Tip",
    titleColor: "text-purple-800",
    textColor: "text-purple-900/80",
  },
  "common-mistake": {
    icon: "⚠️",
    bg: "bg-red-50",
    border: "border-red-300",
    title: "Common Mistake",
    titleColor: "text-red-800",
    textColor: "text-red-900/80",
  },
  remember: {
    icon: "📌",
    bg: "bg-blue-50",
    border: "border-blue-300",
    title: "Remember",
    titleColor: "text-blue-800",
    textColor: "text-blue-900/80",
  },
  warning: {
    icon: "🚫",
    bg: "bg-red-50",
    border: "border-red-400",
    title: "Warning",
    titleColor: "text-red-800",
    textColor: "text-red-900/80",
  },
  example: {
    icon: "📋",
    bg: "bg-green-50",
    border: "border-green-300",
    title: "Example",
    titleColor: "text-green-800",
    textColor: "text-green-900/80",
  },
  definition: {
    icon: "📖",
    bg: "bg-indigo-50",
    border: "border-indigo-300",
    title: "Definition",
    titleColor: "text-indigo-800",
    textColor: "text-indigo-900/80",
  },
};

/* ═══════════════════════════════════════════════
   HIGHLIGHT BOX COLORS
   ═══════════════════════════════════════════════ */
const highlightColors: Record<
  string,
  { bg: string; border: string; title: string; text: string }
> = {
  purple: {
    bg: "bg-gradient-to-br from-purple-50 to-purple-100/50",
    border: "border-purple-200",
    title: "text-purple-900",
    text: "text-purple-800/80",
  },
  blue: {
    bg: "bg-gradient-to-br from-blue-50 to-blue-100/50",
    border: "border-blue-200",
    title: "text-blue-900",
    text: "text-blue-800/80",
  },
  green: {
    bg: "bg-gradient-to-br from-green-50 to-green-100/50",
    border: "border-green-200",
    title: "text-green-900",
    text: "text-green-800/80",
  },
  amber: {
    bg: "bg-gradient-to-br from-amber-50 to-amber-100/50",
    border: "border-amber-200",
    title: "text-amber-900",
    text: "text-amber-800/80",
  },
  red: {
    bg: "bg-gradient-to-br from-red-50 to-red-100/50",
    border: "border-red-200",
    title: "text-red-900",
    text: "text-red-800/80",
  },
};

/* ═══════════════════════════════════════════════
   INDIVIDUAL BLOCK RENDERERS
   ═══════════════════════════════════════════════ */

function HeadingBlock({ level, text }: { level: 1 | 2 | 3; text: string }) {
  if (level === 1) {
    return (
      <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-ink mt-8 mb-3 first:mt-0">
        {text}
      </h2>
    );
  }
  if (level === 2) {
    return (
      <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-ink mt-6 mb-2 first:mt-0">
        {text}
      </h3>
    );
  }
  return (
    <h4 className="font-[family-name:var(--font-display)] text-base font-bold text-ink mt-5 mb-2 first:mt-0">
      {text}
    </h4>
  );
}

function ImageBlock({
  src,
  alt,
  caption,
  aspect,
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "wide" | "square" | "banner";
}) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "banner"
        ? "aspect-[3/1]"
        : "aspect-[16/9]";

  // Cap the rendered height so a full-width 16:9 image doesn't eat most of a
  // desktop screen. On narrow screens the aspect ratio still governs.
  const maxHeight =
    aspect === "square"
      ? "max-h-[340px]"
      : aspect === "banner"
        ? "max-h-[220px]"
        : "max-h-[400px]";

  return (
    <figure className="my-6 -mx-1 sm:mx-0">
      <div
        className={`relative ${aspectClass} ${maxHeight} w-full mx-auto overflow-hidden rounded-xl sm:rounded-2xl bg-surface-dim`}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-muted text-center italic px-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function CalloutBlock({
  style,
  title,
  content,
}: {
  style: string;
  title?: string;
  content: string;
}) {
  const cfg = calloutStyles[style] || calloutStyles["remember"];

  return (
    <div
      className={`my-5 rounded-xl ${cfg.bg} border-l-4 ${cfg.border} px-4 sm:px-5 py-4`}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0 mt-0.5">{cfg.icon}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold ${cfg.titleColor} mb-1`}>
            {title || cfg.title}
          </p>
          <p className={`text-sm ${cfg.textColor} leading-relaxed`}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

function ListBlock({
  style,
  items,
}: {
  style: "bullet" | "numbered" | "check";
  items: string[];
}) {
  if (style === "numbered") {
    return (
      <ol className="my-4 space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-ink/80">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold mt-0.5">
              {i + 1}
            </span>
            <span className="leading-relaxed flex-1">{item}</span>
          </li>
        ))}
      </ol>
    );
  }

  if (style === "check") {
    return (
      <ul className="my-4 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-ink/80">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="flex-shrink-0 mt-0.5 text-green-500"
            >
              <rect
                x="1"
                y="1"
                width="16"
                height="16"
                rx="4"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <path
                d="M5.5 9L7.5 11L12.5 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="leading-relaxed flex-1">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  // Default: bullet
  return (
    <ul className="my-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-ink/80">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
          <span className="leading-relaxed flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DividerBlock() {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-purple-300" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
    </div>
  );
}

function StatsBlock({
  items,
}: {
  items: { value: string; label: string; icon?: string }[];
}) {
  return (
    <div
      className={`my-6 grid gap-3 ${
        items.length === 2
          ? "grid-cols-2"
          : items.length === 3
            ? "grid-cols-3"
            : "grid-cols-2 sm:grid-cols-4"
      }`}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl p-4 text-center"
        >
          {item.icon && <span className="text-2xl mb-1 block">{item.icon}</span>}
          <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-ink">
            {item.value}
          </p>
          <p className="text-xs text-muted mt-0.5">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

function QuoteBlock({
  text,
  attribution,
}: {
  text: string;
  attribution?: string;
}) {
  return (
    <blockquote className="my-6 relative pl-5 border-l-4 border-purple-300 py-1">
      <p className="text-base sm:text-lg text-ink/80 italic leading-relaxed">
        &ldquo;{text}&rdquo;
      </p>
      {attribution && (
        <cite className="block mt-2 text-sm text-muted not-italic">
          — {attribution}
        </cite>
      )}
    </blockquote>
  );
}

function DoDontBlock({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* DO */}
      <div className="rounded-xl bg-green-50 border border-green-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6L5 8.5L9.5 3.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="text-sm font-bold text-green-800">DO</p>
        </div>
        <ul className="space-y-2">
          {dos.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-green-800/80"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* DON'T */}
      <div className="rounded-xl bg-red-50 border border-red-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 3L9 9M9 3L3 9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <p className="text-sm font-bold text-red-800">DON&apos;T</p>
        </div>
        <ul className="space-y-2">
          {donts.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-red-800/80"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ColumnsBlock({
  columns,
}: {
  columns: { title: string; content: string; icon?: string }[];
}) {
  return (
    <div
      className={`my-6 grid gap-4 ${
        columns.length === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-3"
      }`}
    >
      {columns.map((col, i) => (
        <div
          key={i}
          className="rounded-xl bg-white border border-surface-dim p-4 sm:p-5 hover:shadow-md transition-shadow"
        >
          {col.icon && <span className="text-2xl mb-2 block">{col.icon}</span>}
          <p className="font-[family-name:var(--font-display)] text-sm font-bold text-ink mb-1.5">
            {col.title}
          </p>
          <p className="text-sm text-ink/70 leading-relaxed">{col.content}</p>
        </div>
      ))}
    </div>
  );
}

function StepsBlock({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <div className="my-6 space-y-0">
      {items.map((step, i) => (
        <div key={i} className="flex gap-4">
          {/* Timeline */}
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-purple-600/30">
              {i + 1}
            </div>
            {i < items.length - 1 && (
              <div className="w-0.5 flex-1 bg-gradient-to-b from-purple-300 to-purple-100 my-1" />
            )}
          </div>

          {/* Content */}
          <div className={`flex-1 ${i < items.length - 1 ? "pb-5" : "pb-1"}`}>
            <p className="text-sm font-bold text-ink">{step.title}</p>
            <p className="text-sm text-ink/70 leading-relaxed mt-0.5">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function HighlightBoxBlock({
  title,
  content,
  color = "purple",
}: {
  title: string;
  content: string;
  color?: string;
}) {
  const cfg = highlightColors[color] || highlightColors.purple;

  return (
    <div
      className={`my-6 rounded-xl ${cfg.bg} border ${cfg.border} p-5 sm:p-6`}
    >
      <p
        className={`font-[family-name:var(--font-display)] text-base font-bold ${cfg.title} mb-2`}
      >
        {title}
      </p>
      <p className={`text-sm ${cfg.text} leading-relaxed`}>{content}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN RENDERER
   Detects string (legacy) vs RichContentBlock[]
   ═══════════════════════════════════════════════ */

function RenderBlock({ block, index }: { block: RichContentBlock; index: number }) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock key={index} level={block.level} text={block.text} />;
    case "paragraph":
      return (
        <p key={index} className="text-sm sm:text-[15px] text-ink/80 leading-relaxed my-3">
          {block.text}
        </p>
      );
    case "image":
      return (
        <ImageBlock
          key={index}
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          aspect={block.aspect}
        />
      );
    case "callout":
      return (
        <CalloutBlock
          key={index}
          style={block.style}
          title={block.title}
          content={block.content}
        />
      );
    case "list":
      return <ListBlock key={index} style={block.style} items={block.items} />;
    case "divider":
      return <DividerBlock key={index} />;
    case "stats":
      return <StatsBlock key={index} items={block.items} />;
    case "quote":
      return (
        <QuoteBlock
          key={index}
          text={block.text}
          attribution={block.attribution}
        />
      );
    case "do-dont":
      return <DoDontBlock key={index} dos={block.dos} donts={block.donts} />;
    case "columns":
      return <ColumnsBlock key={index} columns={block.columns} />;
    case "steps":
      return <StepsBlock key={index} items={block.items} />;
    case "highlight-box":
      return (
        <HighlightBoxBlock
          key={index}
          title={block.title}
          content={block.content}
          color={block.color}
        />
      );
    default:
      return null;
  }
}

export default function RichContentRenderer({
  blocks,
}: {
  blocks: RichContentBlock[];
}) {
  return (
    <div className="rich-content">
      {blocks.map((block, i) => (
        <RenderBlock key={i} block={block} index={i} />
      ))}
    </div>
  );
}
