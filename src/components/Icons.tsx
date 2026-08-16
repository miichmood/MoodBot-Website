import type { ReactNode } from "react";

type IconProps = { name: string; className?: string };

/** Hand-drawn 24×24 stroke icon set — one visual voice across the site. */
export function Icon({ name, className = "w-6 h-6" }: IconProps) {
  const paths: Record<string, ReactNode> = {
    sword: (
      <>
        <path d="M4 20l3.5-3.5" />
        <path d="M6 14.5L14.5 6l3.5-1-1 3.5L8.5 17z" />
        <path d="M5 19l-1.5 1.5" />
        <path d="M14.5 6l3.5 3.5" />
      </>
    ),
    coins: (
      <>
        <ellipse cx="12" cy="7" rx="7" ry="3" />
        <path d="M5 7v5c0 1.66 3.13 3 7 3s7-1.34 7-3V7" />
        <path d="M5 12v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" />
      </>
    ),
    gauge: (
      <>
        <path d="M4 14a8 8 0 1 1 16 0" />
        <path d="M12 14l4-5" />
        <path d="M3 18h18" />
      </>
    ),
    film: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4" />
      </>
    ),
    record: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      </>
    ),
    wall: (
      <>
        <path d="M3 8h18M3 13h18M3 18h18" />
        <path d="M7 8v5M15 8v5M11 13v5M19 13v5M5 3v5M13 3v5" />
      </>
    ),
    dice: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="9" cy="15" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
    log: (
      <>
        <path d="M5 4h14v16H5z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c-3 2.6-3 14.4 0 17M12 3.5c3 2.6 3 14.4 0 17" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="14" r="4.5" />
        <path d="M11.5 10.5L20 2M17 5l2.5 2.5M14.5 7.5l2 2" />
      </>
    ),
    check: <path d="M4 12.5l5 5L20 6.5" />,
    cross: <path d="M6 6l12 12M18 6L6 18" />,
    warn: (
      <>
        <path d="M12 3L2.5 20h19z" />
        <path d="M12 9.5v4.5" />
        <circle cx="12" cy="17" r="0.4" fill="currentColor" />
      </>
    ),
    chevron: <path d="M6 9l6 6 6-6" />,
    play: <path d="M7 4.5l12 7.5-12 7.5z" />,
    stop: <rect x="6" y="6" width="12" height="12" rx="1" />,
    pause: <path d="M8 5v14M16 5v14" />,
    terminal: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 9l3.5 3L7 15M12.5 15.5H17" />
      </>
    ),
    radar: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 12l6-6" />
        <circle cx="15" cy="9" r="0.5" fill="currentColor" />
      </>
    ),
    crown: (
      <>
        <path d="M4 18h16M4 18l-1-9 5 4 4-7 4 7 5-4-1 9z" />
      </>
    ),
    bolt: <path d="M13 2L5 13.5h5L10 22l9-11.5h-5.5z" />,
    freeze: (
      <>
        <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
        <path d="M12 3l-2 2.5M12 3l2 2.5M12 21l-2-2.5M12 21l2-2.5" />
      </>
    ),
    rage: (
      <>
        <path d="M12 3c1 3-4 4.5-4 9a4 4 0 0 0 8 0c0-2-1-3.5-1-3.5S17 10 17 13" />
        <path d="M7 17c1.5 2.5 3 4 5 4s3.5-1.5 5-4" />
      </>
    ),
    heal: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 8v8M8 12h8" />
      </>
    ),
    balloon: (
      <>
        <circle cx="12" cy="9.5" r="6" />
        <path d="M12 15.5v2M9.5 21l2.5-3.5 2.5 3.5" />
      </>
    ),
    dragon: (
      <>
        <path d="M4 16c0-6 4-10 9-10 3 0 5 1.5 6 4l1 4-3-1c.5 4-2 7-7 7-3 0-5-1.5-6-4z" />
        <circle cx="14.5" cy="9.5" r="0.6" fill="currentColor" />
      </>
    ),
    giant: (
      <>
        <path d="M7 21V8a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v13" />
        <path d="M7 12h10M7 16h10" />
      </>
    ),
    breaker: (
      <>
        <circle cx="11" cy="13" r="6.5" />
        <path d="M14.5 8L18 4.5M18 4.5l1.5 1.5M18 4.5L16.5 3" />
      </>
    ),
    barb: (
      <>
        <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z" />
        <path d="M8.5 11l2 2-2 2M15.5 11l-2 2 2 2" />
      </>
    ),
    archer: (
      <>
        <path d="M6 3v18" />
        <path d="M6 3c7 1 7 17 0 18" />
        <path d="M6 12h13M16 8.5L19.5 12 16 15.5" />
      </>
    ),
    siege: (
      <>
        <path d="M3 17h18M5 17V9l7-4 7 4v8" />
        <path d="M9 17v-5h6v5" />
        <circle cx="7" cy="19" r="1.4" />
        <circle cx="17" cy="19" r="1.4" />
      </>
    ),
    telegram: <path d="M21 4L3 11l6 2.5L11.5 20l3-4.5L20 17zM9 13.5L21 4" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 7l8.5 6 8.5-6" />
      </>
    ),
    github: (
      <>
        <path d="M9 20.5v-3c-3.5 1-4.5-1.5-4.5-1.5M15 20.5v-3.2c2-.2 3.5-1.5 3.5-4.3 0-1.3-.4-2.2-1-2.9.2-.8.4-2-.2-3.3 0 0-1-.3-3.3 1.2a11 11 0 0 0-6 0C5.7 6.5 4.7 6.8 4.7 6.8c-.6 1.3-.4 2.5-.2 3.3-.6.7-1 1.6-1 2.9 0 2.8 1.5 4.1 3.5 4.3" />
        <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5" />
      </>
    ),
    arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
    doc: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4M9 12h6M9 16h6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.warn}
    </svg>
  );
}

/** MoodBot mascot — a shield with a face whose expression changes with bot state. */
export function MoodFace({
  mood,
  className = "w-14 h-14",
}: {
  mood: "idle" | "hunt" | "fight" | "loot";
  className?: string;
}) {
  const eyes =
    mood === "loot" ? (
      <>
        <path d="M30 44l4-4 4 4-4 4z" fill="#F5B942" stroke="none" />
        <path d="M58 44l4-4 4 4-4 4z" fill="#F5B942" stroke="none" />
      </>
    ) : (
      <>
        <circle cx="34" cy="44" r={mood === "hunt" ? 3.4 : 3} fill="#6FE39A" />
        <circle cx="62" cy="44" r={mood === "hunt" ? 3.4 : 3} fill="#6FE39A" />
      </>
    );
  const mouth =
    mood === "fight" ? (
      <path d="M30 56c6 10 30 10 36 0l-6 1-4-3-4 3-4-3-4 3-4-3-4 3z" fill="#F5B942" stroke="none" />
    ) : mood === "loot" ? (
      <path d="M31 55c6 9 28 9 34 0" stroke="#F5B942" strokeWidth="4" fill="none" strokeLinecap="round" />
    ) : mood === "hunt" ? (
      <path d="M34 58h28" stroke="#F5B942" strokeWidth="4" strokeLinecap="round" />
    ) : (
      <path d="M36 58c3 3 21 3 24 0" stroke="#F5B942" strokeWidth="4" fill="none" strokeLinecap="round" />
    );
  return (
    <svg viewBox="0 0 96 104" className={className} aria-hidden="true">
      <path
        d="M48 4l36 12v27c0 24-16 40-36 47-20-7-36-23-36-47V16z"
        fill="#101B15"
        stroke="#2F4A3A"
        strokeWidth="3"
      />
      <path
        d="M48 12l29 9.6V43c0 19.4-12.8 32.6-29 38.6-16.2-6-29-19.2-29-38.6V21.6z"
        fill="none"
        stroke={mood === "fight" ? "#F5B942" : "#23382C"}
        strokeWidth="2"
      />
      {eyes}
      {mouth}
    </svg>
  );
}

/** Wordmark: shield + MOODBOT in display face. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#console" className={`flex items-center gap-2.5 group ${className}`}>
      <span className="relative inline-flex">
        <MoodFace mood="idle" className="w-9 h-9 transition-transform duration-300 group-hover:-rotate-6" />
      </span>
      <span className="font-display text-lg tracking-wide text-paper">
        MOOD<span className="text-gold">BOT</span>
      </span>
      <span className="font-mono text-[10px] px-1.5 py-0.5 border border-line2 text-moss rounded-sm">
        V10.14
      </span>
    </a>
  );
}
