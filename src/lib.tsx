import {
  createElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ---------------- prefers-reduced-motion ---------------- */

export function usePrefersReducedMotion(): boolean {
  const [prm, setPrm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrm(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrm(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return prm;
}

/* ---------------- in-view observer ---------------- */

export function useInView<T extends HTMLElement>(threshold = 0.18, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);
  return { ref, inView };
}

/* ---------------- reveal wrapper ---------------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "figure";
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  return createElement(
    as,
    {
      ref,
      className: `reveal ${inView ? "is-in" : ""} ${className}`,
      style: { transitionDelay: `${delay}ms` },
    },
    children
  );
}

/* ---------------- scramble / decode text ---------------- */

const GLYPHS = "▚▞#%@$01XKRDTMB≡+<>/";

export function useScramble(text: string, play: boolean, speed = 34) {
  const prm = usePrefersReducedMotion();
  const [out, setOut] = useState(prm ? text : "");
  useEffect(() => {
    if (prm || !play) {
      setOut(text);
      return;
    }
    let frame = 0;
    const total = text.length * 3 + 8;
    const id = window.setInterval(() => {
      frame++;
      const settled = Math.floor((frame / total) * text.length * 1.35);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < settled) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setOut(next);
      if (settled >= text.length) {
        setOut(text);
        window.clearInterval(id);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, play, speed, prm]);
  return out;
}

/* ---------------- count-up ---------------- */

export function useCountUp(target: number, play: boolean, duration = 1400) {
  const prm = usePrefersReducedMotion();
  const [val, setVal] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (!play) return;
    if (prm) {
      setVal(target);
      return;
    }
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, play, duration, prm]);
  return val;
}

/* ---------------- misc ---------------- */

export const fmt = (n: number) => n.toLocaleString("en-US");

export function useNow(running: boolean) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  const reset = useMemo(() => () => setSecs(0), []);
  return { secs, reset };
}
