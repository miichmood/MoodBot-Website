export const REPO_URL = "https://github.com/miichmood/MoodBot-ClashOfClans";
export const MANUAL_PDF =
  "https://github.com/miichmood/MoodBot-ClashOfClans/blob/main/docs/MoodBot_V10.14_Multilingual_User_Manual.pdf";
export const DOCS_INDEX = "https://github.com/miichmood/MoodBot-ClashOfClans/blob/main/docs/README.md";
export const BANNER_IMG =
  "https://raw.githubusercontent.com/miichmood/MoodBot-ClashOfClans/main/docs/images/moodbot-v10.14-interface.png";
export const DEMO_VIDEO =
  "https://raw.githubusercontent.com/miichmood/MoodBot-ClashOfClans/main/MoodBot_Demo.mp4";

export const NAV_LINKS = [
  { label: "Console", href: "#console" },
  { label: "Features", href: "#features" },
  { label: "Attack loop", href: "#loop" },
  { label: "Setup", href: "#setup" },
  { label: "Armies", href: "#armies" },
  { label: "Recording", href: "#recording" },
  { label: "Docs", href: "#docs" },
  { label: "FAQ", href: "#faq" },
];

export const MARQUEE = [
  "V10.14 — JULY 2026",
  "8 LANGUAGES",
  "TH 1-6 → TH 13+",
  "GOLD FILTER 0 – 2.5M",
  "FAST / BALANCED / SAFE",
  "PLAYBACK 1.0× – 6.0×",
  "HWID LICENSE",
  "ADB × LDPLAYER",
  "ATTACK RECORDER",
  "WALL UPGRADES",
  "ACTIVITY LOG",
  "LIGHT + DARK THEMES",
];

export type Feature = {
  icon: string;
  title: string;
  body: string;
  tag?: string;
  span: string; // tailwind col-span classes
};

export const FEATURES: Feature[] = [
  {
    icon: "sword",
    title: "Town Hall groups, TH 1-6 → TH 13+",
    body: "Six dedicated deployment groups — th6, th7-8, th9-10, th11, th12 and th13plus — each pulling from its own folder of recorded attack_pattern*.json files.",
    tag: "CORE",
    span: "md:col-span-7",
  },
  {
    icon: "coins",
    title: "Minimum-gold filtering",
    body: "Set a floor from 0 to 2,500,000 gold. Bases below the threshold are skipped instantly — the bot only commits troops when the loot is worth it.",
    tag: "FILTER",
    span: "md:col-span-5",
  },
  {
    icon: "gauge",
    title: "Three navigation profiles",
    body: "FAST pushes the pace, BALANCED keeps rhythm, SAFE slows every transition down for fragile setups. Switch mid-session strategy without reconfiguring.",
    span: "md:col-span-4",
  },
  {
    icon: "film",
    title: "Playback 1.0× – 6.0×",
    body: "Replay recorded deployments at human tempo or sprint at 6× speed. Too many desyncs? Drop back to 1.0×–2.0× and the patterns stay pixel-true.",
    span: "md:col-span-4",
  },
  {
    icon: "record",
    title: "Built-in attack recorder",
    body: "Press Record (or run REGISTRA_ATTACCO.bat), play one perfect attack by hand, hit ESC — MoodBot stores the timing as a reusable JSON pattern.",
    tag: "NEW",
    span: "md:col-span-4",
  },
  {
    icon: "wall",
    title: "Automatic wall upgrades",
    body: "Optional module pours spare resources into walls between raids, so your loot keeps working while the bot keeps farming.",
    span: "md:col-span-5",
  },
  {
    icon: "dice",
    title: "Randomized behaviour",
    body: "Patterns are picked at random from the group folder, and optional random pauses break up session rhythm — no two runs look identical.",
    span: "md:col-span-7",
  },
  {
    icon: "log",
    title: "Session counters + Activity log",
    body: "Attacks, skips, collected loot and every ADB decision land in a detailed, timestamped Activity log — copy it straight into a support report.",
    span: "md:col-span-6",
  },
  {
    icon: "globe",
    title: "Eight languages, two themes",
    body: "The full interface ships in IT · EN · ES · FR · DE · PT · RU · TR with light and dark skins. The 65-page manual follows in every language.",
    span: "md:col-span-6",
  },
  {
    icon: "key",
    title: "Hardware-bound license",
    body: "Activation is tied to your computer's HWID and unlocked with a personal key starting with MB2. One key, one machine — no floating installs.",
    tag: "LICENSE",
    span: "md:col-span-12",
  },
];

export const LOOP_STEPS = [
  {
    n: "01",
    title: "Opens multiplayer search",
    body: "MoodBot taps through to the matchmaking screen exactly like a player would — same route, same timing, driven over ADB.",
  },
  {
    n: "02",
    title: "Reads Available Loot",
    body: "The gold figure on screen is read and compared against your configured minimum-gold threshold.",
  },
  {
    n: "03",
    title: "Skips — or deploys",
    body: "Below the floor? Next base. Above it? A random attack_pattern*.json from the selected TH group is replayed at your playback speed.",
  },
  {
    n: "04",
    title: "Waits out the battle",
    body: "Troops, spells, heroes and abilities land on their recorded timings. MoodBot waits for the battle to resolve on its own.",
  },
  {
    n: "05",
    title: "Confirms return home",
    body: "The attack only counts after the return to the HOME screen is confirmed — counters, loot totals and the Activity log update, then the cycle restarts.",
  },
];

export const DO_RULES = [
  "Keep exactly one LDPlayer instance open",
  "Stay on a clean HOME screen, standard scenery",
  "Prepare the army that matches the selected group",
  "Leave the Clan Castle empty",
  "Watch the Activity log during the first runs",
];

export const DONT_RULES = [
  "Touch mouse or keyboard inside LDPlayer mid-session",
  "Change zoom, resolution, DPI or game language",
  "Swap scenery or troop-bar order while running",
  "Record Next / search / zoom actions into patterns",
  "Leave pop-ups open before pressing Start",
];

export const REQUIREMENTS = [
  { k: "Operating system", v: "Windows" },
  { k: "Emulator", v: "LDPlayer — one running instance only" },
  { k: "Resolution", v: "1600 × 900" },
  { k: "DPI", v: "240" },
  { k: "ADB", v: "Local ADB connection enabled" },
  { k: "Game language", v: "Clash of Clans must stay in English" },
  { k: "Game state", v: "Standard scenery · clean HOME · no pop-ups" },
  { k: "Clan Castle", v: "Empty — extra troops shift troop-bar icons" },
];

export const SETUP_STEPS = [
  {
    title: "Extract the package",
    body: "Unpack the complete MoodBot package into a local, writable folder — not Program Files.",
  },
  {
    title: "Launch AVVIA_MOODBOT.bat",
    body: "The bat file boots the interface and runs the first hardware check.",
  },
  {
    title: "Copy your HWID",
    body: "At first launch MoodBot displays your machine's HWID. Copy it and send it to the MoodBot creator.",
  },
  {
    title: "Activate with your MB2 key",
    body: "Paste the complete personal key — it always begins with MB2 — to bind the license to your hardware.",
  },
  {
    title: "Configure LDPlayer",
    body: "Set 1600 × 900 at 240 DPI and enable the local ADB connection. These exact numbers are non-negotiable.",
  },
  {
    title: "Prepare the game",
    body: "Start Clash of Clans in English, train the correct army for your group and empty the Clan Castle.",
  },
  {
    title: "First test run",
    body: "Run the first session on the SAFE profile at 1.0×–1.5× and watch the Activity log the whole way.",
  },
];

export type ArmyGroup = {
  id: string;
  label: string;
  note: string;
  items: { icon: string; name: string; qty?: string; kind: "troop" | "spell" | "hero" | "siege" }[];
};

export const ARMIES: ArmyGroup[] = [
  {
    id: "th1-6",
    label: "TH 1-6",
    note: "Classic giant-beatdown economy raid",
    items: [
      { icon: "giant", name: "Giants", qty: "20", kind: "troop" },
      { icon: "breaker", name: "Wall Breakers", qty: "5", kind: "troop" },
      { icon: "barb", name: "Barbarians", qty: "20", kind: "troop" },
      { icon: "archer", name: "Archers", qty: "20", kind: "troop" },
      { icon: "heal", name: "Heal spells", qty: "2", kind: "spell" },
    ],
  },
  {
    id: "th7-8",
    label: "TH 7-8",
    note: "Straight dragon smash, rage the core",
    items: [
      { icon: "dragon", name: "Dragons", qty: "10", kind: "troop" },
      { icon: "rage", name: "Rage", qty: "3", kind: "spell" },
      { icon: "bolt", name: "Lightning", qty: "1", kind: "spell" },
      { icon: "crown", name: "Hero", qty: "1", kind: "hero" },
    ],
  },
  {
    id: "th9-10",
    label: "TH 9-10",
    note: "Balloon-led drags with freeze support",
    items: [
      { icon: "balloon", name: "Balloons", qty: "8", kind: "troop" },
      { icon: "dragon", name: "Dragons", qty: "10", kind: "troop" },
      { icon: "rage", name: "Rage", qty: "4", kind: "spell" },
      { icon: "freeze", name: "Freeze", qty: "3", kind: "spell" },
      { icon: "crown", name: "Heroes", qty: "2", kind: "hero" },
    ],
  },
  {
    id: "th11",
    label: "TH 11",
    note: "E-drag core with balloon opener",
    items: [
      { icon: "balloon", name: "Balloons", qty: "8", kind: "troop" },
      { icon: "edrag", name: "Electro Dragons", qty: "8", kind: "troop" },
      { icon: "rage", name: "Rage", qty: "4", kind: "spell" },
      { icon: "freeze", name: "Freeze", qty: "3", kind: "spell" },
      { icon: "crown", name: "Heroes", qty: "3", kind: "hero" },
    ],
  },
  {
    id: "th12",
    label: "TH 12",
    note: "TH 11 composition plus a siege machine",
    items: [
      { icon: "balloon", name: "Balloons", qty: "8", kind: "troop" },
      { icon: "edrag", name: "Electro Dragons", qty: "8", kind: "troop" },
      { icon: "rage", name: "Rage", qty: "4", kind: "spell" },
      { icon: "freeze", name: "Freeze", qty: "3", kind: "spell" },
      { icon: "crown", name: "Heroes", qty: "3", kind: "hero" },
      { icon: "siege", name: "Siege machine", qty: "1", kind: "siege" },
    ],
  },
  {
    id: "th13plus",
    label: "TH 13+",
    note: "Full endgame package — four heroes, one siege",
    items: [
      { icon: "balloon", name: "Balloons", qty: "8", kind: "troop" },
      { icon: "edrag", name: "Electro Dragons", qty: "10", kind: "troop" },
      { icon: "rage", name: "Rage", qty: "4", kind: "spell" },
      { icon: "freeze", name: "Freeze", qty: "3", kind: "spell" },
      { icon: "crown", name: "Heroes", qty: "4", kind: "hero" },
      { icon: "siege", name: "Siege machine", qty: "1", kind: "siege" },
    ],
  },
];

export const RECORD_STEPS = [
  { title: "Stop MoodBot", body: "Keep LDPlayer pinned at 1600 × 900 and 240 DPI before anything else." },
  { title: "Prepare the exact army", body: "The army that will use the new pattern must be trained and in the bar." },
  { title: "Open an enemy base manually", body: "Leave the base ready for deployment — no search screens, no Next button." },
  { title: "Press Record", body: "Hit Record in the interface or run REGISTRA_ATTACCO.bat from the package folder." },
  { title: "Select the group", body: "Pick th6, th7-8, th9-10, th11, th12 or th13plus — the file lands in that folder." },
  { title: "Play the attack naturally", body: "Record only troop selection, deployment points, spells, heroes, abilities and natural timing." },
  { title: "Press ESC to finish", body: "The pattern is saved as attack_pattern*.json, ready for random selection in sessions." },
];

export const PATTERN_FOLDERS = [
  "patterns/",
  "├── th6/",
  "├── th7-8/",
  "├── th9-10/",
  "├── th11/",
  "├── th12/",
  "└── th13plus/",
];

export const LANGUAGES = [
  { code: "IT", name: "Italiano", pages: "2 – 9" },
  { code: "EN", name: "English", pages: "10 – 17" },
  { code: "ES", name: "Español", pages: "18 – 25" },
  { code: "FR", name: "Français", pages: "26 – 33" },
  { code: "DE", name: "Deutsch", pages: "34 – 41" },
  { code: "PT", name: "Português", pages: "42 – 49" },
  { code: "RU", name: "Русский", pages: "50 – 57" },
  { code: "TR", name: "Türkçe", pages: "58 – 65" },
];

export const FAQS = [
  {
    q: "MoodBot can't find LDPlayer",
    a: "Open only one emulator instance, make sure Clash of Clans is fully started inside it, then reopen MoodBot. Multiple instances confuse the ADB target.",
  },
  {
    q: "ADB reports unavailable",
    a: "Enable the local ADB connection in LDPlayer settings, restart the emulator and wait for it to load completely before launching MoodBot again.",
  },
  {
    q: "Pattern missing for my group",
    a: "Select the correct Town Hall group and verify that at least one attack_pattern*.json file exists inside the matching patterns/ subfolder.",
  },
  {
    q: "Gold is read incorrectly",
    a: "The reader expects English, 1600 × 900, 240 DPI, the standard scenery and no overlays. Any deviation shifts the pixels it samples.",
  },
  {
    q: "The wrong troop icon gets clicked",
    a: "Check the army composition, the troop-bar order and your heroes — and make sure the Clan Castle is empty so extra troops don't shift the icons.",
  },
  {
    q: "Patterns run too fast",
    a: "Reduce playback to 1.0×–2.0×, or record the pattern again with longer natural pauses between deployments.",
  },
  {
    q: "The bot is stuck in a battle",
    a: "Stop MoodBot, return to HOME manually, close any pop-up and restart the session in SAFE mode. Save the Activity log and a screenshot before closing anything.",
  },
];
