import { useEffect, useState } from "react";
import { Icon } from "./Icons";
import Console from "./Console";
import { SectionHead, Marquee } from "./Chrome";
import { Reveal, useCountUp, useInView, usePrefersReducedMotion, useScramble, fmt } from "../lib";
import {
  FEATURES,
  LOOP_STEPS,
  DO_RULES,
  DONT_RULES,
  REQUIREMENTS,
  SETUP_STEPS,
  REPO_URL,
  MANUAL_PDF,
} from "../data";

/* ================= HERO + LIVE CONSOLE ================= */

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const v = useCountUp(value, inView, 1200 + delay);
  return (
    <div ref={ref}>
      <p className="font-display text-2xl md:text-3xl text-gold tabular-nums">
        {fmt(v)}
        <span className="text-moss">{suffix}</span>
      </p>
      <p className="font-mono text-[10px] tracking-[0.2em] text-dim mt-1">{label}</p>
    </div>
  );
}

export function Hero() {
  const title = useScramble("MOODBOT", true, 42);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section id="console" className="relative pt-28 md:pt-36 pb-16 overflow-hidden">
      {/* ambient radar ring behind the console */}
      <div className="absolute right-[-140px] top-24 w-[560px] h-[560px] opacity-[0.16] pointer-events-none hidden lg:block" aria-hidden="true">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <g stroke="#6FE39A" fill="none" strokeWidth="1">
            <circle cx="200" cy="200" r="60" />
            <circle cx="200" cy="200" r="120" />
            <circle cx="200" cy="200" r="180" />
            <path d="M200 20v360M20 200h360" opacity="0.4" />
          </g>
          <g className="radar-sweep">
            <path d="M200 200L200 20A180 180 0 0 1 327 73z" fill="url(#sweepGrad)" />
          </g>
          <defs>
            <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6FE39A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#6FE39A" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        {/* left — pitch */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] text-moss border border-line2 rounded-full px-4 py-1.5 bg-panel/70">
              <span className="relative w-1.5 h-1.5 rounded-full bg-moss ping-dot" />
              V10.14 · MULTILINGUAL DOCS · JULY 2026
            </p>
          </Reveal>

          <h1 className="font-display mt-6 leading-none select-none">
            <span className="block text-[15vw] sm:text-7xl xl:text-[5.2rem] text-paper tracking-tight">
              {title || "\u00A0"}
            </span>
            <span className="block text-[7.5vw] sm:text-4xl xl:text-[2.6rem] text-outline tracking-tight mt-1">
              CLASH FARMING, ON AUTOPILOT
            </span>
          </h1>

          <Reveal delay={150}>
            <p className="mt-6 text-fog text-base md:text-lg leading-relaxed max-w-md">
              MoodBot drives Clash of Clans on LDPlayer through ADB — it hunts multiplayer bases,
              reads the available gold, skips anything under your floor and replays your recorded
              attack patterns while you live your life.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={MANUAL_PDF}
                target="_blank"
                rel="noreferrer"
                className="btn-chunk inline-flex items-center gap-2.5 px-6 py-3.5 rounded bg-gold text-ink font-display text-xs tracking-[0.16em] shadow-[0_12px_32px_-10px_rgba(245,185,66,0.8)]"
              >
                <Icon name="doc" className="w-4 h-4" /> OPEN THE MANUAL
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-chunk inline-flex items-center gap-2.5 px-6 py-3.5 rounded border border-line2 text-paper font-display text-xs tracking-[0.16em] hover:border-moss hover:text-moss"
              >
                <Icon name="github" className="w-4 h-4" /> VIEW ON GITHUB
              </a>
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <Stat value={8} suffix="" label="LANGUAGES" delay={0} />
              <Stat value={13} suffix="+" label="TOWN HALLS" delay={200} />
              <Stat value={2500000} suffix="" label="GOLD CEILING" delay={400} />
            </div>
          </Reveal>

          <Reveal delay={420}>
            <p className="mt-8 font-mono text-[11px] text-dim leading-relaxed max-w-md border-l-2 border-elixir/50 pl-4">
              ▸ The panel is a live simulation of a MoodBot session — press{" "}
              <span className="text-moss">START</span>, tune the gold floor, flip the toggles.
            </p>
          </Reveal>
        </div>

        {/* right — live console */}
        <div className={`lg:col-span-7 transition-all duration-1000 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Console />
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-dim px-1">
            <span>SIMULATED SESSION — NO ACCOUNTS WERE FARMED IN THE MAKING OF THIS PAGE</span>
            <span className="text-moss">ESC = stop recording</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= FEATURES BENTO ================= */

export function Features() {
  return (
    <section id="features" className="relative max-w-7xl mx-auto px-5 pt-20 md:pt-28">
      <SectionHead
        index="01"
        eyebrow="MAIN FEATURES"
        title={
          <>
            Everything a <span className="text-gold">farm session</span> needs, nothing it doesn't
          </>
        }
        note="Ten focused modules — from loot filtering to hardware-bound licensing. No plugins, no dashboards in the cloud."
      />
      <div className="grid md:grid-cols-12 gap-4">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 4) * 90} className={f.span}>
            <article className="card-lift group relative h-full rounded-lg border border-line bg-panel p-6 hover:border-gold/60 hover:bg-panel2 overflow-hidden">
              <div
                className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(245,185,66,0.18), transparent 70%)" }}
              />
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex p-2.5 rounded border border-line2 text-gold bg-ink2 group-hover:border-gold/60 group-hover:text-goldhi transition-colors duration-300">
                  <Icon name={f.icon} className="w-6 h-6" />
                </span>
                {f.tag && (
                  <span className="font-mono text-[9px] tracking-[0.24em] text-ink bg-moss px-2 py-1 rounded-sm">
                    {f.tag}
                  </span>
                )}
              </div>
              <h3 className="font-display text-base md:text-lg text-paper mt-4 leading-snug">{f.title}</h3>
              <p className="text-sm text-fog leading-relaxed mt-2">{f.body}</p>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-gold to-moss transition-all duration-500" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= ATTACK LOOP ================= */

export function LoopSection() {
  const prm = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.3, false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || prm) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % LOOP_STEPS.length), 2400);
    return () => window.clearInterval(id);
  }, [inView, prm]);

  return (
    <section id="loop" className="relative max-w-7xl mx-auto px-5 pt-20 md:pt-28">
      <SectionHead
        index="02"
        eyebrow="DAILY OPERATION"
        title={
          <>
            The five-beat <span className="text-moss">attack cycle</span>
          </>
        }
        note="Before pressing Start: one LDPlayer instance, clean HOME screen, no pop-ups, army ready, correct TH group."
      />

      <div ref={ref} className="grid lg:grid-cols-2 gap-10 items-start">
        {/* animated stepper */}
        <Reveal>
          <div className="relative rounded-lg border border-line bg-panel p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 scanlines pointer-events-none" />
            <ol className="relative space-y-1">
              {LOOP_STEPS.map((s, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={s.n}>
                    <button
                      onClick={() => setActive(i)}
                      className={`w-full text-left flex gap-4 items-start rounded-md px-3 py-3.5 transition-all duration-400 border ${
                        on ? "border-gold/60 bg-ink2" : "border-transparent hover:border-line2"
                      }`}
                      aria-current={on ? "step" : undefined}
                    >
                      <span
                        className={`font-display text-lg w-10 shrink-0 transition-colors duration-300 ${
                          on ? "text-gold" : done ? "text-moss/70" : "text-line2"
                        }`}
                      >
                        {s.n}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block font-display text-sm md:text-base transition-colors duration-300 ${
                            on ? "text-paper" : "text-fog"
                          }`}
                        >
                          {s.title}
                        </span>
                        <span
                          className={`block text-sm text-dim leading-relaxed overflow-hidden transition-all duration-500 ${
                            on ? "max-h-24 opacity-100 mt-1.5" : "max-h-0 opacity-0"
                          }`}
                        >
                          {s.body}
                        </span>
                      </span>
                      <span
                        className={`ml-auto mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300 ${
                          on ? "bg-gold ping-dot relative" : done ? "bg-moss/50" : "bg-line2"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="mt-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-dim">
              <Icon name="clock" className="w-3.5 h-3.5 text-gold" />
              CYCLE REPEATS UNTIL YOU PRESS STOP
              <span className="ml-auto text-moss">LOOT IS COUNTED ONLY AFTER RETURN HOME</span>
            </div>
          </div>
        </Reveal>

        {/* do / don't */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Reveal delay={100}>
            <div className="h-full rounded-lg border border-moss/30 bg-panel p-6">
              <p className="flex items-center gap-2 font-display text-sm tracking-widest text-moss mb-4">
                <Icon name="check" className="w-4 h-4" /> BEFORE START
              </p>
              <ul className="space-y-3">
                {DO_RULES.map((r) => (
                  <li key={r} className="flex gap-2.5 text-sm text-fog leading-snug">
                    <span className="text-moss mt-0.5 shrink-0">＋</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="h-full rounded-lg border border-blood/30 bg-panel p-6">
              <p className="flex items-center gap-2 font-display text-sm tracking-widest text-blood mb-4">
                <Icon name="cross" className="w-4 h-4" /> NEVER MID-SESSION
              </p>
              <ul className="space-y-3">
                {DONT_RULES.map((r) => (
                  <li key={r} className="flex gap-2.5 text-sm text-fog leading-snug">
                    <span className="text-blood mt-0.5 shrink-0">－</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={280} className="sm:col-span-2">
            <div className="rounded-lg border border-gold/30 bg-gradient-to-r from-panel to-panel2 p-5 flex flex-wrap items-center gap-4">
              <Icon name="warn" className="w-6 h-6 text-gold shrink-0" />
              <p className="text-sm text-fog leading-relaxed">
                <span className="text-paper font-semibold">If something goes wrong:</span> stop the bot, copy
                the Activity log and save it together with a screenshot of LDPlayer — that pair solves
                almost every support case.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= REQUIREMENTS ================= */

export function Requirements() {
  return (
    <section className="relative max-w-7xl mx-auto px-5 pt-20 md:pt-28">
      <SectionHead
        index="03"
        eyebrow="SYSTEM CHECK"
        title={
          <>
            The emulator must match <span className="text-gold">exactly</span>
          </>
        }
        note="MoodBot reads pixels and taps coordinates. Every setting below is load-bearing — the reader expects them all."
      />
      <div className="grid md:grid-cols-2 gap-x-10">
        {REQUIREMENTS.map((r, i) => (
          <Reveal key={r.k} delay={(i % 4) * 70}>
            <div className="group flex items-center gap-4 border-b border-line py-4 hover:bg-panel transition-colors duration-300 px-2 -mx-2 rounded">
              <span className="font-mono text-[10px] text-dim w-6">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-mono text-xs tracking-[0.14em] text-fog w-36 shrink-0">{r.k.toUpperCase()}</span>
              <span className="text-sm text-paper font-medium flex-1">{r.v}</span>
              <Icon
                name="check"
                className="w-4 h-4 text-moss opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= SETUP TIMELINE ================= */

export function Setup() {
  return (
    <section id="setup" className="relative max-w-7xl mx-auto px-5 pt-20 md:pt-28">
      <SectionHead
        index="04"
        eyebrow="FIRST SETUP"
        title={
          <>
            From zip file to first raid in <span className="text-moss">7 steps</span>
          </>
        }
        note="The whole onboarding fits on one screen. Most operators finish inside twenty minutes, license key included."
      />
      <ol className="relative">
        <span className="absolute left-[19px] md:left-[27px] top-2 bottom-2 w-px bg-line2" aria-hidden="true" />
        {SETUP_STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 70} as="li">
            <div className="relative flex gap-5 md:gap-8 pb-8 group">
              <span
                className={`relative z-10 shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-md border flex items-center justify-center font-display text-sm md:text-lg transition-all duration-300 ${
                  i === SETUP_STEPS.length - 1
                    ? "border-gold text-ink bg-gold shadow-[0_0_30px_-6px_rgba(245,185,66,0.7)]"
                    : "border-line2 text-gold bg-ink2 group-hover:border-gold group-hover:-translate-y-0.5"
                }`}
              >
                {i + 1}
              </span>
              <div className="pt-1 md:pt-3 min-w-0">
                <h3 className="font-display text-base md:text-xl text-paper group-hover:text-goldhi transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-sm md:text-base text-fog leading-relaxed mt-1.5 max-w-2xl">{s.body}</p>
                {i === 1 && (
                  <code className="inline-block mt-3 font-mono text-xs text-moss bg-ink2 border border-line2 px-3 py-1.5 rounded">
                    $ AVVIA_MOODBOT.bat
                  </code>
                )}
                {i === 3 && (
                  <code className="inline-block mt-3 font-mono text-xs text-gold bg-ink2 border border-line2 px-3 py-1.5 rounded tracking-wider">
                    MB2-XXXX-XXXX-XXXX-XXXX
                  </code>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export { Marquee };
