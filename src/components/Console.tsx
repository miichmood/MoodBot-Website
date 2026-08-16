import { useEffect, useRef, useState } from "react";
import { MoodFace, Icon } from "./Icons";
import { fmt, usePrefersReducedMotion } from "../lib";

type Tone = "ok" | "gold" | "skip" | "warn" | "info" | "elixir";
type LogLine = { id: number; t: string; msg: string; tone: Tone };
type Phase = "idle" | "search" | "attack" | "paused";
type Profile = "FAST" | "BALANCED" | "SAFE";

const TONE_CLASS: Record<Tone, string> = {
  ok: "text-moss",
  gold: "text-gold",
  skip: "text-fog",
  warn: "text-blood",
  info: "text-sky",
  elixir: "text-elixir",
};

const WAVE_LINES = [
  "Deploy wave 1 — left flank line",
  "Deploy wave 2 — right flank line",
  "Rage spell dropped @ core",
  "Freeze on Inferno — 3.2s window",
  "Heroes in · abilities held",
  "Cleanup troops sweeping corners",
  "Siege machine deployed at gate",
];

const PATTERNS = ["attack_pattern_03.json", "attack_pattern_11.json", "attack_pattern_07.json", "attack_pattern_19.json", "attack_pattern_02.json"];

const now = () => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};

const rnd = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function Console() {
  const prm = usePrefersReducedMotion();
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [profile, setProfile] = useState<Profile>("SAFE");
  const [speed, setSpeed] = useState(1.5);
  const [minGold, setMinGold] = useState(350_000);
  const [rndPause, setRndPause] = useState(true);
  const [walls, setWalls] = useState(false);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [counters, setCounters] = useState({ attacks: 0, skips: 0, gold: 0, elixir: 0, uptime: 0 });

  const cfg = useRef({ profile, speed, minGold, rndPause, walls });
  cfg.current = { profile, speed, minGold, rndPause, walls };

  const timer = useRef<number | null>(null);
  const idSeq = useRef(0);
  const battleTick = useRef(0);
  const currentLoot = useRef({ gold: 0, elixir: 0, pattern: PATTERNS[0] });
  const logBox = useRef<HTMLDivElement | null>(null);
  const uptimeRef = useRef<number | null>(null);

  const push = (msg: string, tone: Tone = "ok") => {
    idSeq.current += 1;
    const line: LogLine = { id: idSeq.current, t: now(), msg, tone };
    setLogs((prev) => [...prev.slice(-48), line]);
  };

  useEffect(() => {
    const box = logBox.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [logs]);

  /* uptime ticker */
  useEffect(() => {
    if (running && !paused) {
      uptimeRef.current = window.setInterval(
        () => setCounters((c) => ({ ...c, uptime: c.uptime + 1 })),
        1000
      );
    }
    return () => {
      if (uptimeRef.current) window.clearInterval(uptimeRef.current);
    };
  }, [running, paused]);

  const intervalMs = () => Math.min(1500, Math.max(380, Math.round(1500 - cfg.current.speed * 185)));

  const schedule = (fn: () => void, ms?: number) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, ms ?? intervalMs());
  };

  const doSearch = () => {
    setPhase("search");
    push("Multiplayer search opened — scanning bases…", "info");
    schedule(doRead);
  };

  const doRead = () => {
    const gold = rnd(120_000, 1_950_000);
    const elixir = Math.round(gold * rnd(55, 95) * 0.01);
    const { minGold } = cfg.current;
    if (gold < minGold) {
      push(`Available loot read: ${fmt(gold)} gold — under ${fmt(minGold)} floor`, "skip");
      setCounters((c) => ({ ...c, skips: c.skips + 1 }));
      push("Base skipped — pressing Next", "skip");
      if (cfg.current.rndPause && Math.random() < 0.22) {
        push(`Random pause — idling ${rnd(2, 5)}s to break rhythm`, "info");
      }
      schedule(doSearch, intervalMs() + rnd(250, 900));
      return;
    }
    currentLoot.current = {
      gold,
      elixir,
      pattern: PATTERNS[rnd(0, PATTERNS.length - 1)],
    };
    push(`Loot locked: ${fmt(gold)} gold · ${fmt(elixir)} elixir — target met`, "gold");
    push(`Replaying ${currentLoot.current.pattern} (${cfg.current.profile} · ${cfg.current.speed.toFixed(1)}×)`, "gold");
    battleTick.current = 0;
    setPhase("attack");
    schedule(doBattle);
  };

  const doBattle = () => {
    battleTick.current += 1;
    const line = WAVE_LINES[rnd(0, WAVE_LINES.length - 1)];
    push(line, "ok");
    if (battleTick.current < 3) {
      schedule(doBattle, Math.max(300, intervalMs() - 150));
      return;
    }
    const { gold, elixir } = currentLoot.current;
    push(`Battle finished — loot collected: ${fmt(gold)} gold / ${fmt(elixir)} elixir`, "elixir");
    if (cfg.current.walls && Math.random() < 0.3) {
      push(`Wall segment #${rnd(10, 64)} upgraded → level ${rnd(11, 15)}`, "elixir");
    }
    setCounters((c) => ({
      ...c,
      attacks: c.attacks + 1,
      gold: c.gold + gold,
      elixir: c.elixir + elixir,
    }));
    push("Return to HOME confirmed — cycle logged ✓", "ok");
    schedule(doSearch, intervalMs() + 300);
  };

  const start = () => {
    if (running) return;
    setRunning(true);
    setPaused(false);
    setCounters({ attacks: 0, skips: 0, gold: 0, elixir: 0, uptime: 0 });
    setLogs([]);
    const { profile, speed, minGold } = cfg.current;
    push("MOODBOT V10.14 — session started", "gold");
    push("ADB link OK · LDPlayer instance #1 · 1600×900 · 240 DPI", "info");
    push(`Profile ${profile} · playback ${speed.toFixed(1)}× · min gold ${fmt(minGold)}`, "info");
    schedule(doSearch, 700);
  };

  const stop = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setRunning(false);
    setPaused(false);
    setPhase("idle");
    push("Session stopped by operator", "warn");
  };

  const togglePause = () => {
    if (!running) return;
    setPaused((p) => {
      const next = !p;
      if (next) {
        if (timer.current) window.clearTimeout(timer.current);
        push("Paused — ADB channel held open", "warn");
      } else {
        push("Resumed — cycle continues", "info");
        schedule(battleTick.current > 0 && phase === "attack" ? doBattle : doSearch, 500);
      }
      return next;
    });
  };

  /* auto-demo on mount (skipped for reduced-motion users) */
  const booted = useRef(false);
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    push("MOODBOT V10.14 — interface ready", "gold");
    push("License MB2-····-···· bound to HWID · OK", "info");
    push("Waiting for operator — press START to simulate a session", "skip");
    if (!prm) {
      const t = window.setTimeout(start, 1400);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const face: "idle" | "hunt" | "fight" | "loot" =
    phase === "attack" ? "fight" : phase === "search" ? "hunt" : paused ? "idle" : "idle";

  const mm = String(Math.floor(counters.uptime / 60)).padStart(2, "0");
  const ss = String(counters.uptime % 60).padStart(2, "0");

  const statusLabel =
    phase === "attack" ? "DEPLOYING" : phase === "search" ? "HUNTING" : paused ? "PAUSED" : running ? "READY" : "STANDBY";

  return (
    <div className="relative rounded-lg border border-line2 bg-panel shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* terminal header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-line bg-ink2">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blood/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-gold/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-moss/80" />
        </div>
        <p className="font-mono text-[11px] text-fog tracking-wider truncate">
          moodbot_v10.14 — AVVIA_MOODBOT.bat
        </p>
        <span className="ml-auto flex items-center gap-2 font-mono text-[10px] text-moss">
          <span className={`relative w-1.5 h-1.5 rounded-full bg-moss ${running && !paused ? "ping-dot" : ""}`} />
          ADB LINK
        </span>
      </div>

      {/* status strip */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-line bg-panel2">
        <MoodFace mood={face} className="w-12 h-12 shrink-0" />
        <div className="min-w-0">
          <p className="font-display text-sm tracking-widest text-paper flex items-center gap-2">
            {statusLabel}
            <span className={`inline-block w-2 h-2 rounded-sm ${phase === "attack" ? "bg-gold" : phase === "search" ? "bg-moss" : paused ? "bg-blood" : "bg-line2"}`} />
          </p>
          <p className="font-mono text-[11px] text-fog truncate">
            LDPlayer · 1600×900 · 240 DPI · CoC English
          </p>
        </div>
        <p className="ml-auto font-mono text-lg text-gold tabular-nums shrink-0">
          {mm}:{ss}
        </p>
      </div>

      {/* controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-4 py-4 border-b border-line">
        <div>
          <p className="font-mono text-[10px] text-dim tracking-[0.18em] mb-1.5">PROFILE</p>
          <div className="flex border border-line2 rounded overflow-hidden">
            {(["FAST", "BALANCED", "SAFE"] as Profile[]).map((p) => (
              <button
                key={p}
                onClick={() => setProfile(p)}
                className={`flex-1 py-1.5 font-mono text-[10px] tracking-wide transition-colors duration-200 ${
                  profile === p ? "bg-gold text-ink font-bold" : "text-fog hover:text-paper hover:bg-panel2"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] text-dim tracking-[0.18em] mb-1.5 flex justify-between">
            <span>PLAYBACK</span>
            <span className="text-gold">{speed.toFixed(1)}×</span>
          </p>
          <input
            type="range"
            min={1}
            max={6}
            step={0.5}
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full mt-2"
            aria-label="Playback speed"
          />
        </div>
        <div>
          <p className="font-mono text-[10px] text-dim tracking-[0.18em] mb-1.5 flex justify-between">
            <span>MIN GOLD</span>
            <span className="text-gold">{minGold >= 1_000_000 ? `${(minGold / 1_000_000).toFixed(2)}M` : fmt(minGold)}</span>
          </p>
          <input
            type="range"
            min={0}
            max={2_500_000}
            step={50_000}
            value={minGold}
            onChange={(e) => setMinGold(parseInt(e.target.value))}
            className="w-full mt-2"
            aria-label="Minimum gold"
          />
        </div>
      </div>

      {/* toggles + transport */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3 border-b border-line bg-ink2">
        <button
          onClick={() => setRndPause((v) => !v)}
          className="flex items-center gap-2 group"
          aria-pressed={rndPause}
        >
          <span className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 flex ${rndPause ? "bg-moss/90 justify-end" : "bg-line2 justify-start"}`} style={{ height: 18 }}>
            <span className="w-3.5 h-3.5 rounded-full bg-ink transition-transform" />
          </span>
          <span className="font-mono text-[10px] tracking-wider text-fog group-hover:text-paper transition-colors">RANDOM PAUSES</span>
        </button>
        <button
          onClick={() => setWalls((v) => !v)}
          className="flex items-center gap-2 group"
          aria-pressed={walls}
        >
          <span className={`w-8 rounded-full p-0.5 transition-colors duration-200 flex ${walls ? "bg-elixir/90 justify-end" : "bg-line2 justify-start"}`} style={{ height: 18 }}>
            <span className="w-3.5 h-3.5 rounded-full bg-ink transition-transform" />
          </span>
          <span className="font-mono text-[10px] tracking-wider text-fog group-hover:text-paper transition-colors">WALL UPGRADES</span>
        </button>
        <div className="ml-auto flex gap-2">
          <button
            onClick={start}
            disabled={running}
            className="btn-chunk flex items-center gap-1.5 px-4 py-2 font-display text-[11px] tracking-widest rounded bg-moss text-ink disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:transform-none shadow-[0_6px_20px_-6px_rgba(111,227,154,0.6)]"
          >
            <Icon name="play" className="w-3.5 h-3.5" /> START
          </button>
          <button
            onClick={togglePause}
            disabled={!running}
            className="btn-chunk flex items-center gap-1.5 px-3 py-2 font-display text-[11px] tracking-widest rounded border border-line2 text-fog hover:text-paper hover:border-gold disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:transform-none"
          >
            <Icon name="pause" className="w-3.5 h-3.5" /> {paused ? "RESUME" : "PAUSE"}
          </button>
          <button
            onClick={stop}
            disabled={!running}
            className="btn-chunk flex items-center gap-1.5 px-3 py-2 font-display text-[11px] tracking-widest rounded border border-blood/50 text-blood hover:bg-blood hover:text-ink disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:transform-none"
          >
            <Icon name="stop" className="w-3.5 h-3.5" /> STOP
          </button>
        </div>
      </div>

      {/* counters */}
      <div className="grid grid-cols-4 divide-x divide-line border-b border-line bg-panel">
        {[
          { label: "ATTACKS", value: fmt(counters.attacks), cls: "text-moss" },
          { label: "SKIPPED", value: fmt(counters.skips), cls: "text-fog" },
          { label: "GOLD", value: counters.gold >= 1_000_000 ? `${(counters.gold / 1_000_000).toFixed(2)}M` : fmt(counters.gold), cls: "text-gold" },
          { label: "ELIXIR", value: counters.elixir >= 1_000_000 ? `${(counters.elixir / 1_000_000).toFixed(2)}M` : fmt(counters.elixir), cls: "text-elixir" },
        ].map((c) => (
          <div key={c.label} className="px-3 py-2.5 text-center">
            <p className="font-mono text-[9px] tracking-[0.2em] text-dim">{c.label}</p>
            <p className={`font-mono text-sm sm:text-base font-bold tabular-nums ${c.cls}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* activity log */}
      <div className="relative">
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div ref={logBox} className="h-56 md:h-64 overflow-y-auto px-4 py-3 font-mono text-[11px] leading-relaxed bg-ink">
          {logs.map((l) => (
            <p key={l.id} className="log-line flex gap-2 whitespace-nowrap">
              <span className="text-dim shrink-0">[{l.t}]</span>
              <span className={TONE_CLASS[l.tone]}>{l.msg}</span>
            </p>
          ))}
          {!running && logs.length > 0 && (
            <p className="caret text-dim">&nbsp;</p>
          )}
        </div>
      </div>
    </div>
  );
}
