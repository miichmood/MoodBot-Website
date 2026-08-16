import { useState } from "react";
import { Icon } from "./Icons";
import { SectionHead } from "./Chrome";
import { Reveal } from "../lib";
import {
  ARMIES,
  RECORD_STEPS,
  PATTERN_FOLDERS,
  LANGUAGES,
  FAQS,
  BANNER_IMG,
  DEMO_VIDEO,
  MANUAL_PDF,
  DOCS_INDEX,
  REPO_URL,
} from "../data";

/* ================= ARMY REFERENCE ================= */

const KIND_STYLE: Record<string, string> = {
  troop: "border-gold/40 text-gold bg-gold/5",
  spell: "border-elixir/40 text-elixir bg-elixir/5",
  hero: "border-moss/40 text-moss bg-moss/5",
  siege: "border-sky/40 text-sky bg-sky/5",
};

export function Armies() {
  const [active, setActive] = useState(ARMIES[3].id);
  const group = ARMIES.find((a) => a.id === active)!;

  return (
    <section id="armies" className="relative max-w-7xl mx-auto px-5 pt-20 md:pt-28">
      <SectionHead
        index="05"
        eyebrow="ARMY REFERENCE"
        title={
          <>
            The troop bar must match <span className="text-gold">the group</span>
          </>
        }
        note="Composition AND visible troop-bar order. If the icons shift — heroes, Clan Castle troops — the bot taps the wrong slot."
      />

      <div className="grid lg:grid-cols-12 gap-6">
        {/* group switcher */}
        <Reveal className="lg:col-span-4">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {ARMIES.map((a) => (
              <button
                key={a.id}
                onClick={() => setActive(a.id)}
                className={`group flex items-center gap-4 px-5 py-4 rounded-lg border text-left transition-all duration-300 shrink-0 lg:shrink min-w-[150px] lg:min-w-0 ${
                  active === a.id
                    ? "border-gold bg-panel2 shadow-[0_10px_30px_-12px_rgba(245,185,66,0.45)]"
                    : "border-line bg-panel hover:border-line2 hover:-translate-y-0.5"
                }`}
              >
                <span className={`font-display text-lg transition-colors ${active === a.id ? "text-gold" : "text-fog group-hover:text-paper"}`}>
                  {a.label}
                </span>
                <span className={`hidden lg:block ml-auto text-xs transition-colors ${active === a.id ? "text-moss" : "text-dim"}`}>
                  {a.items.length} slots
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* composition board */}
        <Reveal delay={120} className="lg:col-span-8">
          <div className="h-full rounded-lg border border-line bg-panel p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 scanlines pointer-events-none opacity-60" />
            <div className="relative">
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <h3 className="font-display text-2xl text-paper">{group.label}</h3>
                <p className="font-mono text-[11px] text-dim tracking-wide">{group.note}</p>
              </div>

              {/* troop bar visualization */}
              <div className="mt-6 flex flex-wrap gap-3" key={group.id}>
                {group.items.map((it, i) => (
                  <div
                    key={it.name}
                    className="log-line card-lift flex items-center gap-3 rounded-md border bg-ink2 px-4 py-3"
                    style={{ animationDelay: `${i * 70}ms`, borderColor: "var(--color-line2)" }}
                  >
                    <span className={`inline-flex p-2 rounded ${KIND_STYLE[it.kind]}`}>
                      <Icon name={it.icon} className="w-5 h-5" />
                    </span>
                    <span>
                      <span className="block font-display text-xl text-paper leading-none tabular-nums">
                        {it.qty ?? "—"}
                        <span className="text-[10px] font-mono text-dim ml-1">×{it.name.split(" ")[0].toLowerCase()}</span>
                      </span>
                      <span className="block font-mono text-[10px] tracking-[0.14em] text-fog mt-1 uppercase">{it.name}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.16em] text-dim">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-gold/70" /> TROOPS</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-elixir/70" /> SPELLS</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-moss/70" /> HEROES</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-sky/70" /> SIEGE</span>
                <span className="ml-auto text-moss">CLAN CASTLE: EMPTY · ALWAYS</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= RECORDING ================= */

export function Recording() {
  return (
    <section id="recording" className="relative max-w-7xl mx-auto px-5 pt-20 md:pt-28">
      <SectionHead
        index="06"
        eyebrow="CUSTOM PATTERNS"
        title={
          <>
            Record one perfect attack, <span className="text-elixir">replay it forever</span>
          </>
        }
        note="REGISTRA_ATTACCO.bat captures natural timing only. Search clicks, Next, zooms and window-focus taps must stay out of the recording."
      />

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-3">
          {RECORD_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="group flex gap-4 rounded-lg border border-line bg-panel p-4 md:p-5 hover:border-elixir/50 transition-colors duration-300">
                <span className="font-mono text-xs text-elixir bg-elixir/10 border border-elixir/30 rounded px-2 py-1 h-fit shrink-0">
                  REC·{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-sm md:text-base text-paper group-hover:text-elixir transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-sm text-fog leading-relaxed mt-1">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="lg:col-span-5 space-y-4">
          <Reveal delay={150}>
            <div className="rounded-lg border border-line bg-ink2 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-panel">
                <Icon name="terminal" className="w-4 h-4 text-moss" />
                <span className="font-mono text-[11px] text-fog">where patterns live</span>
              </div>
              <pre className="p-5 font-mono text-xs leading-loose text-moss overflow-x-auto">
                {PATTERN_FOLDERS.map((l, i) => (
                  <span key={l} className={`block ${i === 0 ? "text-gold" : ""}`}>{l}</span>
                ))}
                <span className="block text-dim mt-2">  └── attack_pattern_07.json</span>
              </pre>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="rounded-lg border border-line bg-panel p-5">
              <p className="flex items-center gap-2 font-display text-sm tracking-widest text-paper mb-3">
                <Icon name="record" className="w-4 h-4 text-blood" /> CAPTURE RULES
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs text-fog">
                <div className="space-y-2">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-moss">KEEP IN</p>
                  <p>Troop selection</p>
                  <p>Deployment points</p>
                  <p>Spells &amp; heroes</p>
                  <p>Natural timing</p>
                </div>
                <div className="space-y-2">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-blood">LEAVE OUT</p>
                  <p>Multiplayer search</p>
                  <p>Next / zoom / pan</p>
                  <p>Return-to-village</p>
                  <p>Window-focus clicks</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <div className="rounded-lg border border-line2 overflow-hidden relative group">
              <video
                src={DEMO_VIDEO}
                controls
                preload="none"
                poster={BANNER_IMG}
                className="w-full aspect-video object-cover bg-ink"
              />
              <span className="absolute top-2 left-2 font-mono text-[9px] tracking-[0.2em] bg-ink/80 border border-line2 text-gold px-2 py-1 rounded-sm pointer-events-none">
                MoodBot_Demo.mp4
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= DOCS ================= */

export function Docs() {
  return (
    <section id="docs" className="relative max-w-7xl mx-auto px-5 pt-20 md:pt-28">
      <SectionHead
        index="07"
        eyebrow="DOCUMENTATION"
        title={
          <>
            One manual, <span className="text-gold">eight languages</span>, 65 pages
          </>
        }
        note="Setup, licensing, interface, armies, daily use, recording, pattern management and troubleshooting — translated in full, not summarized."
      />

      {/* banner with ken burns */}
      <Reveal>
        <figure className="relative rounded-lg border border-line2 overflow-hidden group">
          <div className="overflow-hidden max-h-[420px]">
            <img
              src={BANNER_IMG}
              alt="MoodBot V10.14 interface"
              loading="lazy"
              className="kenburns w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent pointer-events-none" />
          <figcaption className="absolute bottom-0 inset-x-0 flex flex-wrap items-center gap-4 p-5">
            <span className="font-mono text-[10px] tracking-[0.22em] text-moss bg-ink/80 border border-line2 px-3 py-1.5 rounded-sm">
              V10.14 INTERFACE — LIGHT &amp; DARK THEMES
            </span>
            <a
              href={MANUAL_PDF}
              target="_blank"
              rel="noreferrer"
              className="btn-chunk ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded bg-gold text-ink font-display text-[11px] tracking-[0.14em]"
            >
              <Icon name="doc" className="w-4 h-4" /> DOWNLOAD THE PDF
            </a>
          </figcaption>
        </figure>
      </Reveal>

      {/* language grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {LANGUAGES.map((l, i) => (
          <Reveal key={l.code} delay={i * 50}>
            <a
              href={MANUAL_PDF}
              target="_blank"
              rel="noreferrer"
              className="card-lift group flex flex-col h-full rounded-lg border border-line bg-panel p-4 hover:border-gold/60"
            >
              <span className="font-display text-2xl text-gold group-hover:text-goldhi transition-colors">{l.code}</span>
              <span className="text-sm text-paper font-medium mt-1">{l.name}</span>
              <span className="font-mono text-[10px] text-dim mt-auto pt-2 flex justify-between">
                <span>PP. {l.pages}</span>
                <Icon name="arrow" className="w-3.5 h-3.5 text-moss opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-6 rounded-lg border border-line bg-panel px-5 py-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-fog">
          <span className="text-dim tracking-[0.2em] text-[10px]">ALSO IN THE REPO</span>
          <a href={DOCS_INDEX} target="_blank" rel="noreferrer" className="link-underline hover:text-gold transition-colors">
            docs/README.md — short documentation index ↗
          </a>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="link-underline hover:text-gold transition-colors">
            README — full public overview ↗
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ================= FAQ / TROUBLESHOOTING ================= */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative max-w-7xl mx-auto px-5 pt-20 md:pt-28">
      <SectionHead
        index="08"
        eyebrow="QUICK TROUBLESHOOTING"
        title={
          <>
            When the bot <span className="text-blood">misbehaves</span>
          </>
        }
        note="Seven failure modes cover nearly every ticket. Always pair the Activity log with a screenshot of LDPlayer before asking."
      />
      <div className="grid lg:grid-cols-12 gap-8">
        <Reveal className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-28 rounded-lg border border-line bg-panel p-6">
            <Icon name="warn" className="w-8 h-8 text-gold" />
            <p className="font-display text-lg text-paper mt-4 leading-snug">
              Log first,<br />panic never.
            </p>
            <p className="text-sm text-fog leading-relaxed mt-3">
              Before closing MoodBot after an error, copy the Activity log and save it together with a
              screenshot of LDPlayer. Those two files are what support actually reads.
            </p>
            <div className="mt-5 font-mono text-[10px] text-dim space-y-1.5">
              <p className="text-moss">✓ activity_log.txt</p>
              <p className="text-moss">✓ ldplayer_state.png</p>
              <p className="text-blood">✗ “it doesn't work”</p>
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-8">
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} delay={i * 40}>
                <div className={`border-b border-line transition-colors duration-300 ${on ? "bg-panel" : ""}`}>
                  <button
                    onClick={() => setOpen(on ? null : i)}
                    className="w-full flex items-center gap-4 px-4 py-5 text-left group"
                    aria-expanded={on}
                  >
                    <span className={`font-mono text-xs shrink-0 transition-colors ${on ? "text-gold" : "text-dim"}`}>
                      E·{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`font-display text-sm md:text-base transition-colors ${on ? "text-gold" : "text-paper group-hover:text-goldhi"}`}>
                      {f.q}
                    </span>
                    <Icon
                      name="chevron"
                      className={`w-5 h-5 ml-auto shrink-0 transition-transform duration-300 ${on ? "rotate-180 text-gold" : "text-dim"}`}
                    />
                  </button>
                  <div className={`grid transition-all duration-400 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-4 pb-5 pl-[52px] text-sm text-fog leading-relaxed max-w-2xl">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */

export function Contact() {
  return (
    <section id="contact" className="relative max-w-7xl mx-auto px-5 pt-20 md:pt-28">
      <Reveal>
        <div className="relative rounded-lg border border-line2 bg-panel2 overflow-hidden">
          <div className="absolute inset-0 scanlines pointer-events-none" />
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(245,185,66,0.14), transparent 65%)" }}
          />
          <div className="relative grid md:grid-cols-2 gap-10 p-8 md:p-12">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-moss">
                <span className="text-gold">09</span>
                <span className="h-px w-10 bg-line2 inline-block" />
                AVAILABILITY &amp; SUPPORT
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-paper mt-4 leading-tight">
                Paid, proprietary,<br />
                <span className="text-gold">delivered by the creator.</span>
              </h2>
              <p className="text-fog leading-relaxed mt-4 max-w-md">
                MoodBot is not publicly downloadable from the repository — the public repo carries
                documentation only. Source code, installer, license files and private keys stay private.
                Reach out, send your HWID, receive your MB2 key.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <a
                href="https://t.me/michmood"
                target="_blank"
                rel="noreferrer"
                className="btn-chunk group flex items-center gap-5 rounded-lg border border-sky/40 bg-ink2 px-6 py-5 hover:border-sky"
              >
                <span className="p-3 rounded-md bg-sky/10 text-sky border border-sky/30">
                  <Icon name="telegram" className="w-7 h-7" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base text-paper">Telegram</span>
                  <span className="block font-mono text-xs text-fog">@michmood — fastest for keys &amp; setup help</span>
                </span>
                <Icon name="arrow" className="w-5 h-5 ml-auto text-sky opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="mailto:moodbotcoc@gmail.com"
                className="btn-chunk group flex items-center gap-5 rounded-lg border border-gold/40 bg-ink2 px-6 py-5 hover:border-gold"
              >
                <span className="p-3 rounded-md bg-gold/10 text-gold border border-gold/30">
                  <Icon name="mail" className="w-7 h-7" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base text-paper">Email</span>
                  <span className="block font-mono text-xs text-fog">moodbotcoc@gmail.com — licensing &amp; docs</span>
                </span>
                <Icon name="arrow" className="w-5 h-5 ml-auto text-gold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </a>
              <p className="font-mono text-[10px] text-dim leading-relaxed px-1">
                ⚠ Automation may violate the rules or ToS of the game or your account. Use MoodBot under
                your own responsibility. Not affiliated with Supercell.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
