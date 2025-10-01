export const GENRE_TAGS = [
  { label: "Hip Hop", value: "hip-hop", color: "from-orange-500 to-red-500" },
  { label: "R&B", value: "rnb", color: "from-purple-500 to-pink-500" },
  { label: "Pop", value: "pop", color: "from-pink-500 to-rose-500" },
  { label: "Rock", value: "rock", color: "from-red-500 to-orange-500" },
  { label: "Electronic", value: "electronic", color: "from-cyan-500 to-blue-500" },
  { label: "Jazz", value: "jazz", color: "from-amber-500 to-yellow-500" },
  { label: "Classical", value: "classical", color: "from-indigo-500 to-purple-500" },
  { label: "Folk", value: "folk", color: "from-green-500 to-emerald-500" },
  { label: "Alternative", value: "alternative", color: "from-slate-500 to-gray-500" },
  { label: "Indie", value: "indie", color: "from-teal-500 to-cyan-500" },
];

export const MOOD_TAGS = [
  { label: "Energetic", value: "energetic", icon: "⚡" },
  { label: "Chill", value: "chill", icon: "🌊" },
  { label: "Dark", value: "dark", icon: "🌑" },
  { label: "Uplifting", value: "uplifting", icon: "☀️" },
  { label: "Melancholic", value: "melancholic", icon: "🌧️" },
  { label: "Romantic", value: "romantic", icon: "💕" },
  { label: "Aggressive", value: "aggressive", icon: "🔥" },
  { label: "Dreamy", value: "dreamy", icon: "✨" },
];

export const EXAMPLE_PROMPTS = [
  {
    title: "Chill Lo-Fi Beat",
    prompt: "lo-fi hip hop with jazzy piano, vinyl crackle, mellow drums, perfect for studying",
    tags: ["hip-hop", "jazz"],
    mood: "chill",
  },
  {
    title: "Energetic Pop Anthem",
    prompt: "upbeat pop with catchy hooks, bright synths, driving beat, stadium-ready chorus",
    tags: ["pop", "electronic"],
    mood: "energetic",
  },
  {
    title: "Dark Trap Banger",
    prompt: "dark trap with heavy 808s, eerie melody, aggressive hi-hats, drop on the hook",
    tags: ["hip-hop"],
    mood: "dark",
  },
  {
    title: "Indie Folk Ballad",
    prompt: "acoustic indie folk with fingerpicked guitar, soft vocals, gentle build-up, emotional",
    tags: ["folk", "indie"],
    mood: "melancholic",
  },
  {
    title: "Electronic Dance",
    prompt: "progressive house with euphoric build, massive drop, synth leads, festival vibes",
    tags: ["electronic"],
    mood: "uplifting",
  },
  {
    title: "Alt-Rock Anthem",
    prompt: "alternative rock with distorted guitars, powerful drums, anthemic chorus, raw energy",
    tags: ["rock", "alternative"],
    mood: "aggressive",
  },
];

export const DEFAULT_PRESETS = [
  {
    name: "Balanced",
    sliders: { weirdness: 50, style_influence: 70, audio_influence: 50 },
    icon: "⚖️",
  },
  {
    name: "Safe & Clean",
    sliders: { weirdness: 20, style_influence: 80, audio_influence: 30 },
    icon: "✨",
  },
  {
    name: "Experimental",
    sliders: { weirdness: 85, style_influence: 40, audio_influence: 70 },
    icon: "🔬",
  },
  {
    name: "Studio Quality",
    sliders: { weirdness: 30, style_influence: 90, audio_influence: 60 },
    icon: "🎚️",
  },
];
