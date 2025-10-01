export interface Preset {
  id: string;
  name: string;
  style_prompt: string;
  lyrics?: string;
  exclusions?: string;
  sliders: {
    weirdness: number;
    style_influence: number;
    audio_influence: number;
  };
  moments_dsl?: string;
  target_seconds: number;
  tags: string[];
  created_at: string;
}

export interface TimelineSection {
  name: "Intro" | "Verse1" | "Hook1" | "Verse2" | "Hook2" | "Outro";
  bars: number;
  energy: number;
  start_bar: number;
  end_bar: number;
  events: TimelineEvent[];
}

export interface TimelineEvent {
  type: "drop" | "stutter" | "mute" | "unmute" | "reverse" | "tapestop" | "fill_short" | "fill_long";
  bar?: number;
  beat?: number;
  word?: string;
  repeats?: number;
}

export interface Timeline {
  bpm: number;
  beats_per_bar: number;
  sample_rate_model: number;
  key_guess?: string;
  sections: TimelineSection[];
  accents: Array<{ beat: string; strength: number }>;
  mutes: Array<{ range: string; targets: string[] }>;
}

export interface GenerationRequest {
  style_prompt: string;
  lyrics?: string;
  exclusions?: string;
  sliders: {
    weirdness: number;
    style_influence: number;
    audio_influence: number;
  };
  moments_dsl?: string;
  target_seconds: number;
  seed?: number;
}

export interface GenerationResponse {
  paths: {
    mix_wav: string;
    mix_flac: string;
    acapella_wav: string;
    instrumental_wav: string;
  };
  timeline_path: string;
  metrics_path: string;
  seed: number;
}

export interface TrackMetadata {
  id: string;
  style_prompt: string;
  lyrics?: string;
  seed: number;
  duration: number;
  created_at: string;
  thumbnail?: string;
  timeline?: Timeline;
  metrics?: {
    lufs: number;
    true_peak: number;
  };
}

export interface GenerationProgress {
  stage: "planning" | "vocals" | "instrumental" | "events" | "voice_conversion" | "mastering" | "done";
  message: string;
  progress: number;
}
