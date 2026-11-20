import { useEffect, useState } from "react";
import RecorderDemo from "./RecorderDemo";

const views = ["Overview", "Activity", "Recorder"] as const;
const resources = ["Gold", "Elixir", "Dark elixir"] as const;
const baseLoot = [840000, 560000, 12300];
const defaults = [600000, 350000, 10000];
const format = new Intl.NumberFormat("en-US");

export default function Console() {
  const [view, setView] = useState<(typeof views)[number]>("Overview");
  const [active, setActive] = useState([true, true, false]);
  const [limits, setLimits] = useState(defaults);
  const [log, setLog] = useState<string[]>([]);
  const [sample, setSample] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [attacks, setAttacks] = useState(0);
  const [searches, setSearches] = useState(0);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (!running || sample.length === 0) return;
    const timer = window.setTimeout(() => {
      const [line, ...remaining] = sample;
      setLog(items => [...items, line]);
      setSample(remaining);
      if (line.startsWith("Search opened")) setSearches(value => value + 1);
      if (line.startsWith("Village confirmed")) setAttacks(value => value + 1);
      if (remaining.length === 0) setRunning(false);
    }, 580);
    return () => window.clearTimeout(timer);
  }, [running, sample]);

  function startSample() {
    if (sample.length > 0) { setRunning(true); return; }
    const passed = active.every((enabled, index) => !enabled || baseLoot[index] >= limits[index]);
    const readings = baseLoot.map((value, index) => `${format.format(value)} ${resources[index].toLowerCase()}`).join(" · ");
    setLog([]);
    setCopied("");
    setSample([
      "Search opened in the multiplayer preview.",
      `Available loot · ${readings}`,
      ...(passed ? ["Loot requirements met. Loading the recorded preset.", "Deployment replayed. Checking remaining cards.", "Village confirmed. Attack added to the session."]
        : ["Base skipped. One or more active thresholds were not met."]),
    ]);
    setRunning(true);
  }

  function reset() {
    setRunning(false);
    setSample([]);
    setLog([]);
    setAttacks(0);
    setSearches(0);
    setCopied("");
  }

  async function copyLog() {
    try {
      await navigator.clipboard.writeText(log.join("\n"));
      setCopied("Activity copied.");
    } catch { setCopied("Copy unavailable. Select the log text to copy it."); }
  }

  const busy = running || sample.length > 0;
  return (
    <section className="rc32-preview demo-console" aria-label="Interactive MoodBot preview">
      <header className="demo-titlebar"><span>MoodBot control center</span><span>Interactive preview</span></header>
      <div className="demo-tabs" role="group" aria-label="Preview sections">
        {views.map(item => <button key={item} type="button" aria-pressed={view === item} onClick={() => setView(item)}>{item}</button>)}
      </div>
      <div className="demo-view" hidden={view === "Recorder"}>
        {view === "Overview" && <>
          <h3>Session settings</h3>
          <p>Set loot thresholds and run a sample search.</p>
          <fieldset className="demo-filters" disabled={busy}>
            <legend className="sr-only">Minimum loot filters</legend>
            {resources.map((resource, index) => (
              <div key={resource}>
                <label><input type="checkbox" checked={active[index]}
                  onChange={() => setActive(items => items.map((item, position) => index === position ? !item : item))} /> {resource}</label>
                <input type="number" aria-label={`Minimum ${resource.toLowerCase()}`} min="0" step="1000" value={limits[index]}
                  disabled={!active[index]} onChange={event => {
                    const value = Math.max(0, Number(event.target.value));
                    setLimits(items => items.map((item, position) => index === position ? value : item));
                  }} />
              </div>
            ))}
          </fieldset>
          <div className="demo-counters"><div><strong>{attacks}</strong><span>Attacks</span></div><div><strong>{searches}</strong><span>Searches</span></div></div>
        </>}
        {view === "Activity" && <>
          <h3>Activity log</h3>
          <p>Review the search, loot decision and return to the village.</p>
          <ul className="demo-log" aria-live="polite">
            {log.length ? log.map((line, index) => <li key={`${index}-${line}`}>{line}</li>) : <li>Start a sample session to see events here.</li>}
          </ul>
          <div className="demo-transport"><span role="status">{copied}</span><div>
            <button type="button" className="demo-button" onClick={copyLog} disabled={log.length === 0}>Copy</button>
            <button type="button" className="demo-button" onClick={() => { setLog([]); setCopied(""); }} disabled={log.length === 0}>Clear</button>
          </div></div>
        </>}
      </div>
      <div className="demo-view" hidden={view !== "Recorder"}><RecorderDemo /></div>
      {view !== "Recorder" && <footer className="demo-transport demo-footer">
        <span role="status">{running ? "Running sample" : busy ? "Sample paused" : "Ready"}</span>
        <div><button type="button" className="demo-button" onClick={reset}>Reset</button>
          {running ? <button type="button" className="demo-button demo-primary" onClick={() => setRunning(false)}>Pause</button> :
            <button type="button" className="demo-button demo-primary" onClick={startSample} disabled={!active.some(Boolean)}>{busy ? "Resume" : "Run sample"}</button>}
        </div>
      </footer>}
    </section>
  );
}
