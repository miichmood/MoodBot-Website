import { useState } from "react";

const steps = ["Select a troop", "Deploy at the edge", "Cast toward the center"];
const groups = ["TH 1–6", "TH 7–8", "TH 9–10", "TH 11", "TH 12", "TH 13+"];

export default function RecorderDemo({ group = "TH 13+" }: { group?: string }) {
  const [townHall, setTownHall] = useState(group);
  const [recording, setRecording] = useState(false);
  const [count, setCount] = useState(0);
  const [saved, setSaved] = useState(false);

  function reset() {
    setRecording(false);
    setCount(0);
    setSaved(false);
  }

  return (
    <div className="demo-recorder">
      <header className="demo-recorder-head">
        <div><h3>Record an attack</h3><p>Capture a deployment for the selected Town Hall group.</p></div>
        <label className="demo-picker">Town Hall group
          <select value={townHall} onChange={event => { setTownHall(event.target.value); reset(); }} disabled={recording}>
            {groups.map(value => <option key={value}>{value}</option>)}
          </select>
        </label>
      </header>
      <div className="demo-timeline" aria-label="Sample deployment actions">
        {steps.map((step, index) => (
          <button key={step} type="button" disabled={!recording || index !== count}
            onClick={() => setCount(value => value + 1)}>
            <span className={index < count ? "demo-done" : ""} aria-hidden="true">{index < count ? "✓" : index + 1}</span>
            {step}
          </button>
        ))}
      </div>
      <div className="demo-transport">
        <span role="status">{saved ? `Sample preset saved for ${townHall}.` : `${count} actions recorded`}</span>
        <div>
          <button type="button" className="demo-button" onClick={reset} disabled={!recording && !saved}>Reset</button>
          {recording ?
            <button type="button" className="demo-button demo-primary" disabled={count === 0}
              onClick={() => { setRecording(false); setSaved(true); }}>Stop and save</button> :
            <button type="button" className="demo-button demo-primary"
              onClick={() => { reset(); setRecording(true); }}>Start recording</button>}
        </div>
      </div>
    </div>
  );
}
