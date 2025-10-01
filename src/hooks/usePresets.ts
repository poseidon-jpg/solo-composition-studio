import { useState, useEffect } from "react";

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

const STORAGE_KEY = "music_generator_presets";

export const usePresets = () => {
  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPresets(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load presets:", e);
      }
    }
  }, []);

  const savePreset = (preset: Omit<Preset, "id" | "created_at">) => {
    const newPreset: Preset = {
      ...preset,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    const updated = [...presets, newPreset];
    setPresets(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newPreset;
  };

  const deletePreset = (id: string) => {
    const updated = presets.filter((p) => p.id !== id);
    setPresets(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const loadPreset = (id: string) => {
    return presets.find((p) => p.id === id);
  };

  return {
    presets,
    savePreset,
    deletePreset,
    loadPreset,
  };
};
