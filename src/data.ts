export const REPO_URL = "https://github.com/miichmood/MoodBot-ClashOfClans";
export const MANUAL_PDF = `${import.meta.env.BASE_URL}media/MoodBot_V10.21_RC32_Manuale_Interattivo.pdf`;
export const DOCS_INDEX = `${REPO_URL}/blob/main/docs/README.md`;
export const BANNER_IMG = `${import.meta.env.BASE_URL}media/moodbot-rc32.png`;

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
  "V10.21 RC32",
  "8 LANGUAGES",
  "TH 1-6 → TH 13+",
  "GOLD · ELIXIR · DARK ELIXIR",
  "HERO & TROOP RESERVES",
  "STORAGE-AWARE TARGETS",
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
    title: "Three loot filters",
    body: "Set a minimum for gold, elixir or dark elixir. A base must meet every active threshold. The reader also handles displayed 2× and 3× loot bonuses.",
    tag: "FILTER",
    span: "md:col-span-5",
  },
  {
    icon: "gauge",
    title: "Unused troops and heroes",
    body: "After replay, MoodBot checks for unused cards. It tries deployment points near the edge for recognized troops, heroes and reinforcements, and aims spells toward the center.",
    span: "md:col-span-4",
  },
  {
    icon: "film",
    title: "Changes to the troop bar",
    body: "If the visible cards no longer match the preset slots, MoodBot can deploy the cards it recognizes directly. The resulting attack can differ from the preset.",
    span: "md:col-span-4",
  },
  {
    icon: "record",
    title: "Built-in attack recorder",
    body: "Open Record from the Windows app. Start, deploy in LDPlayer, then choose Stop and save. The interface uses the selected language.",
    tag: "NEW",
    span: "md:col-span-4",
  },
  {
    icon: "wall",
    title: "Automatic wall upgrades",
    body: "Enable periodic wall checks with a default reserve of 50,000 gold. With walls disabled, confirmed storage capacity guides target selection and ends the session when all storages are full.",
    span: "md:col-span-5",
  },
  {
    icon: "dice",
    title: "Recorded patterns and pauses",
    body: "MoodBot can choose a saved pattern from the selected group and take optional pauses between cycles at the village.",
    span: "md:col-span-7",
  },
  {
    icon: "log",
    title: "Session counters + Activity log",
    body: "Track attacks, searches and wall upgrades. The Activity tab shows recognized states and recovery messages, and has a Copy button for support.",
    span: "md:col-span-6",
  },
  {
    icon: "globe",
    title: "Eight languages, two themes",
    body: "MoodBot offers light and dark themes and eight interface languages. The interactive 33-page guide includes screenshots in each language.",
    span: "md:col-span-6",
  },
  {
    icon: "key",
    title: "Hardware-bound license",
    body: "Activate with your personal MB3 code or .mblic file. Open Subscription to check the plan, expiry date or renew.",
    tag: "LICENSE",
    span: "md:col-span-12",
  },
];

export const LOOP_STEPS = [
  {
    n: "01",
    title: "Opens multiplayer search",
    body: "MoodBot opens multiplayer matchmaking over the local ADB connection.",
  },
  {
    n: "02",
    title: "Reads Available Loot",
    body: "Available loot is compared with the active gold, elixir and dark elixir filters.",
  },
  {
    n: "03",
    title: "Skips — or deploys",
    body: "MoodBot skips bases that miss a threshold. For a matching base, it can load a recorded preset for the selected Town Hall group.",
  },
  {
    n: "04",
    title: "Waits out the battle",
    body: "MoodBot checks remaining cards, requests 4× battle speed if the game offers it, then waits for the result.",
  },
  {
    n: "05",
    title: "Confirms return home",
    body: "MoodBot confirms the return to the village before continuing. It can recover from recognized connection prompts and handle recognized rewards.",
  },
];

export const DO_RULES = [
  "Keep exactly one LDPlayer instance open",
  "Stay on a clean HOME screen, standard scenery",
  "Prepare the army that matches the selected group",
  "Record the pattern with the army you intend to use",
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
    title: "Activate your license",
    body: "Paste the personal MB3 code or import the .mblic file you received for that computer.",
  },
  {
    title: "Configure LDPlayer",
    body: "Set 1600 × 900 at 240 DPI and enable the local ADB connection. These exact numbers are non-negotiable.",
  },
  {
    title: "Prepare the game",
    body: "Start Clash of Clans in English, prepare the army for your group and open the village.",
  },
  {
    title: "First test run",
    body: "Choose your Town Hall group and loot thresholds, then monitor the Activity log on your first run.",
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
  { title: "Select the group", body: "Pick the Town Hall group in Overview. MoodBot stores the preset in that group’s folder." },
  { title: "Open an enemy base manually", body: "Leave the base ready for deployment — no search screens, no Next button." },
  { title: "Press Record", body: "Open Record in MoodBot and choose Start when the battle is ready." },
  { title: "Play the attack naturally", body: "Record only troop selection, deployment points, spells, heroes, abilities and natural timing." },
  { title: "Choose Stop and save", body: "The pattern is saved as attack_pattern*.json, ready for random selection in sessions." },
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
  { code: "IT", name: "Italiano", page: 2 },
  { code: "EN", name: "English", page: 6 },
  { code: "ES", name: "Español", page: 10 },
  { code: "FR", name: "Français", page: 14 },
  { code: "DE", name: "Deutsch", page: 18 },
  { code: "PT", name: "Português", page: 22 },
  { code: "RU", name: "Русский", page: 26 },
  { code: "TR", name: "Türkçe", page: 30 },
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
    a: "Compare the troop-bar order with the recorded army. If it has changed, record a fresh preset and check Activity for cards MoodBot could not confirm.",
  },
  {
    q: "A recorded pattern misses cards",
    a: "Record the pattern again with the current army and zoom. RC32 checks recognized leftovers, but some cards or terrain may still be missed.",
  },
  {
    q: "The bot is stuck in a battle",
    a: "Stop MoodBot, return to the village and close any open dialog. Save the Activity log before restarting.",
  },
];
