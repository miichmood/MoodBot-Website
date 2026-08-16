import { useEffect, useState, type ReactNode } from "react";
import { Icon, Logo } from "./Icons";
import { MARQUEE, NAV_LINKS, REPO_URL, MANUAL_PDF } from "../data";
import { Reveal } from "../lib";

/* ---------------- sticky nav ---------------- */

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled ? "bg-ink/90 backdrop-blur-md border-line py-2.5" : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center gap-6">
        <Logo />
        <nav className="hidden lg:flex items-center gap-6 ml-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline font-mono text-[11px] tracking-[0.14em] text-fog hover:text-paper transition-colors"
            >
              {l.label.toUpperCase()}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-chunk hidden sm:flex items-center gap-2 px-3.5 py-2 rounded border border-line2 font-mono text-[11px] text-fog hover:text-paper hover:border-gold"
          >
            <Icon name="github" className="w-4 h-4" />
            <span className="hidden md:inline">miichmood/MoodBot</span>
            <span className="text-gold">★ 4</span>
          </a>
          <a
            href={MANUAL_PDF}
            target="_blank"
            rel="noreferrer"
            className="btn-chunk hidden md:flex items-center gap-2 px-4 py-2 rounded bg-gold text-ink font-display text-[11px] tracking-widest shadow-[0_8px_24px_-8px_rgba(245,185,66,0.7)]"
          >
            <Icon name="doc" className="w-4 h-4" /> USER MANUAL
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 border border-line2 rounded text-fog hover:text-paper"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-line bg-ink/95 backdrop-blur-md px-5 py-4 grid grid-cols-2 gap-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-mono text-xs tracking-[0.14em] text-fog hover:text-gold py-1.5"
            >
              {l.label.toUpperCase()}
            </a>
          ))}
          <a href={MANUAL_PDF} target="_blank" rel="noreferrer" className="font-mono text-xs tracking-[0.14em] text-gold py-1.5">
            USER MANUAL ↗
          </a>
        </nav>
      )}
    </header>
  );
}

/* ---------------- spec marquee ---------------- */

export function Marquee() {
  const row = (key: string) => (
    <div key={key} className="flex items-center shrink-0" aria-hidden={key === "b"}>
      {MARQUEE.map((m, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 py-3 font-mono text-[11px] tracking-[0.22em] text-fog whitespace-nowrap">{m}</span>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-gold/70" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.4L12 16.9 5.8 21.5l2.4-7.4L2 9.6h7.6z" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative border-y border-line bg-ink2 overflow-hidden">
      <div className="marquee-track flex w-max">{row("a")}{row("b")}</div>
    </div>
  );
}

/* ---------------- section heading ---------------- */

export function SectionHead({
  index,
  eyebrow,
  title,
  note,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  note?: string;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-moss mb-3">
            <span className="text-gold">{index}</span>
            <span className="h-px w-10 bg-line2 inline-block" />
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-paper max-w-2xl">{title}</h2>
        </div>
        {note && (
          <p className="font-mono text-xs text-dim max-w-xs leading-relaxed border-l-2 border-gold/50 pl-4">{note}</p>
        )}
      </div>
    </Reveal>
  );
}

/* ---------------- footer ---------------- */

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink2 mt-24">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-fog leading-relaxed max-w-xs">
              Clash of Clans automation for Windows, LDPlayer and ADB. This site documents the public
              repository — the software itself is proprietary and license-activated.
            </p>
          </div>
          <div className="font-mono text-xs space-y-2.5 text-fog">
            <p className="text-dim tracking-[0.22em] text-[10px] mb-4">REPOSITORY</p>
            {[
              { label: "github.com/miichmood/MoodBot-ClashOfClans", href: REPO_URL },
              { label: "Multilingual user manual (PDF)", href: MANUAL_PDF },
              { label: "Documentation index", href: "https://github.com/miichmood/MoodBot-ClashOfClans/blob/main/docs/README.md" },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="block link-underline w-fit hover:text-gold transition-colors">
                {l.label} ↗
              </a>
            ))}
          </div>
          <div className="font-mono text-xs space-y-2.5 text-fog">
            <p className="text-dim tracking-[0.22em] text-[10px] mb-4">SUPPORT</p>
            <a href="https://t.me/michmood" target="_blank" rel="noreferrer" className="flex items-center gap-2 link-underline w-fit hover:text-gold transition-colors">
              <Icon name="telegram" className="w-4 h-4 text-sky" /> Telegram · @michmood
            </a>
            <a href="mailto:moodbotcoc@gmail.com" className="flex items-center gap-2 link-underline w-fit hover:text-gold transition-colors">
              <Icon name="mail" className="w-4 h-4 text-gold" /> moodbotcoc@gmail.com
            </a>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-line text-[11px] font-mono text-dim leading-relaxed space-y-2">
          <p>
            ⚠ Automation may violate the rules or Terms of Service applicable to the game or your account.
            Use MoodBot under your own responsibility.
          </p>
          <p>
            This project is not affiliated with, endorsed by or sponsored by Supercell. Clash of Clans is a
            trademark of Supercell Oy.
          </p>
          <p className="text-line2 pt-2">MOODBOT V10.14 · docs refreshed July 2026 · © miichmood</p>
        </div>
      </div>
    </footer>
  );
}
