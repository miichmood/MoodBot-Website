import { useState } from "react";

const screens = [
  { name: "Overview", image: "overview-rc32.png", description: "Set loot filters, wall upgrades and the Town Hall group." },
  { name: "Activity", image: "activity-rc32.png", description: "Review session events and copy the log for troubleshooting." },
  { name: "Recorder", image: "recorder-rc32.png", description: "Record a deployment and save the preset for the selected Town Hall group." },
];

export default function Console() {
  const [selected, setSelected] = useState(0);
  const screen = screens[selected];
  const base = import.meta.env.BASE_URL;

  return (
    <figure className="rc32-preview overflow-hidden rounded-lg border border-line2 bg-panel">
      <div role="group" aria-label="MoodBot screenshots" className="flex flex-wrap gap-1 border-b border-line bg-ink2 p-2">
        {screens.map((view, index) => (
          <button key={view.name} type="button" aria-pressed={index === selected} onClick={() => setSelected(index)}
            className={`flex-1 rounded px-3 py-2 font-mono text-xs ${index === selected ? "bg-gold text-ink" : "text-fog hover:text-paper"}`}>
            {view.name}
          </button>
        ))}
      </div>
      <div className="grid min-h-[355px] place-items-center p-5 sm:min-h-[505px]">
        <img key={screen.image} src={`${base}media/${screen.image}`} alt={`MoodBot RC32 ${screen.name}`} className="max-h-[465px] w-auto max-w-full rounded-md border border-line2 shadow-xl" />
      </div>
      <figcaption aria-live="polite" className="border-t border-line px-4 py-3 text-sm text-fog">{screen.description}</figcaption>
    </figure>
  );
}
