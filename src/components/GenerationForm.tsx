import { useState, useEffect } from "react";
import { Wand2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GenerationRequest } from "@/types";
import { StyleTags } from "./StyleTags";
import { PresetManager } from "./PresetManager";
import { GENRE_TAGS, MOOD_TAGS } from "@/lib/constants";
import { Preset } from "@/hooks/usePresets";

interface GenerationFormProps {
  onGenerate: (request: GenerationRequest) => void;
  onRemix: (request: GenerationRequest) => void;
  isGenerating: boolean;
}

export const GenerationForm = ({ onGenerate, onRemix, isGenerating }: GenerationFormProps) => {
  const [stylePrompt, setStylePrompt] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [weirdness, setWeirdness] = useState([50]);
  const [styleInfluence, setStyleInfluence] = useState([70]);
  const [audioInfluence, setAudioInfluence] = useState([50]);
  const [momentsDsl, setMomentsDsl] = useState("");
  const [targetSeconds, setTargetSeconds] = useState(30);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const buildRequest = (): GenerationRequest => ({
    style_prompt: stylePrompt,
    lyrics: lyrics || undefined,
    exclusions: exclusions || undefined,
    sliders: {
      weirdness: weirdness[0] / 100,
      style_influence: styleInfluence[0] / 100,
      audio_influence: audioInfluence[0] / 100,
    },
    moments_dsl: momentsDsl || undefined,
    target_seconds: targetSeconds,
  });

  const getCurrentSettings = () => ({
    style_prompt: stylePrompt,
    lyrics,
    exclusions,
    sliders: {
      weirdness: weirdness[0],
      style_influence: styleInfluence[0],
      audio_influence: audioInfluence[0],
    },
    moments_dsl: momentsDsl,
    target_seconds: targetSeconds,
    tags: [...selectedGenres, ...selectedMoods],
  });

  const handleLoadPreset = (preset: Preset) => {
    setStylePrompt(preset.style_prompt);
    setLyrics(preset.lyrics || "");
    setExclusions(preset.exclusions || "");
    setWeirdness([preset.sliders.weirdness]);
    setStyleInfluence([preset.sliders.style_influence]);
    setAudioInfluence([preset.sliders.audio_influence]);
    setMomentsDsl(preset.moments_dsl || "");
    setTargetSeconds(preset.target_seconds);
    
    // Load tags
    const genres = preset.tags.filter(t => GENRE_TAGS.some(g => g.value === t));
    const moods = preset.tags.filter(t => MOOD_TAGS.some(m => m.value === t));
    setSelectedGenres(genres);
    setSelectedMoods(moods);
  };

  const handleGenreToggle = (value: string) => {
    setSelectedGenres((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleMoodToggle = (value: string) => {
    setSelectedMoods((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleGenerate = () => {
    if (!stylePrompt.trim()) return;
    onGenerate(buildRequest());
  };

  const handleRemix = () => {
    if (!stylePrompt.trim()) return;
    onRemix(buildRequest());
  };

  return (
    <div className="space-y-8">
      {/* Preset Manager Section - Purple gradient */}
      <div className="p-5 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-fuchsia-500/10 rounded-3xl border border-purple-500/20">
        <PresetManager
          currentSettings={getCurrentSettings()}
          onLoadPreset={handleLoadPreset}
        />
      </div>

      {/* Style Tags Section - Cyan/Blue gradient */}
      <div className="p-5 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-3xl border border-cyan-500/20 space-y-5">
        <StyleTags
          tags={GENRE_TAGS}
          selected={selectedGenres}
          onToggle={handleGenreToggle}
          title="🎸 Genres"
        />
        <StyleTags
          tags={MOOD_TAGS}
          selected={selectedMoods}
          onToggle={handleMoodToggle}
          title="😊 Mood"
        />
      </div>

      {/* Main Inputs Section - Green gradient */}
      <div className="p-6 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 rounded-3xl border border-emerald-500/20 space-y-6">
        <div className="space-y-3">
          <Label htmlFor="style-prompt" className="text-base font-semibold flex items-center gap-2">
            ✨ Describe your music <span className="text-accent text-xs">*</span>
          </Label>
          <Textarea
            id="style-prompt"
            placeholder="lo-fi hip hop with jazzy piano, vinyl crackle, mellow drums..."
            value={stylePrompt}
            onChange={(e) => setStylePrompt(e.target.value)}
            rows={3}
            className="resize-none bg-background/50 backdrop-blur-sm border-emerald-500/30 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all duration-300 rounded-2xl"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="lyrics" className="text-base font-semibold flex items-center gap-2">
            🎤 Lyrics
            <span className="text-xs text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Textarea
            id="lyrics"
            placeholder="Enter your lyrics here..."
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            rows={4}
            className="resize-none bg-background/50 backdrop-blur-sm border-emerald-500/30 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all duration-300 rounded-2xl"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="exclusions" className="text-base font-semibold flex items-center gap-2">
            🚫 Exclude styles
          </Label>
          <Input
            id="exclusions"
            placeholder="e.g., trap, autotune, electronic"
            value={exclusions}
            onChange={(e) => setExclusions(e.target.value)}
            className="bg-background/50 backdrop-blur-sm border-emerald-500/30 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all duration-300 rounded-2xl"
          />
        </div>
      </div>

      {/* Sliders Section - Orange/Amber gradient */}
      <div className="p-6 bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 rounded-3xl border border-orange-500/20 space-y-6">
        <h3 className="text-base font-bold flex items-center gap-2">
          🎛️ Fine Tune
        </h3>

        <div className="space-y-4 p-5 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl border border-red-500/20">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-semibold">🎨 Weirdness</Label>
            <span className="text-sm font-bold text-orange-400 px-3 py-1 bg-orange-500/20 rounded-full">{weirdness[0]}%</span>
          </div>
          <Slider
            value={weirdness}
            onValueChange={setWeirdness}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-4 p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-semibold">🎭 Style Influence</Label>
            <span className="text-sm font-bold text-purple-400 px-3 py-1 bg-purple-500/20 rounded-full">{styleInfluence[0]}%</span>
          </div>
          <Slider
            value={styleInfluence}
            onValueChange={setStyleInfluence}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-4 p-5 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-semibold">🎵 Audio Influence</Label>
            <span className="text-sm font-bold text-cyan-400 px-3 py-1 bg-cyan-500/20 rounded-full">{audioInfluence[0]}%</span>
          </div>
          <Slider
            value={audioInfluence}
            onValueChange={setAudioInfluence}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Advanced Options - Dark gradient */}
      <Accordion type="single" collapsible className="border border-border/50 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/50 to-gray-900/50 backdrop-blur-sm">
        <AccordionItem value="advanced" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 transition-colors text-sm font-semibold">
            ⚙️ Advanced Options
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <Label htmlFor="moments-dsl" className="text-sm font-semibold">Moments DSL</Label>
              <Textarea
                id="moments-dsl"
                placeholder="DROP Hook1 bar:1 len:1.0s; STUTTER word:&quot;never&quot; at:Verse1 bar:9 beat:1 reps:3"
                value={momentsDsl}
                onChange={(e) => setMomentsDsl(e.target.value)}
                rows={3}
                className="resize-none bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/10 font-mono text-xs transition-all duration-300 rounded-2xl"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="target-seconds" className="text-sm font-semibold">Target Length (seconds)</Label>
              <Input
                id="target-seconds"
                type="number"
                min={30}
                max={90}
                value={targetSeconds}
                onChange={(e) => setTargetSeconds(Number(e.target.value))}
                className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/10 transition-all duration-300 rounded-2xl"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons - Gradient */}
      <div className="flex gap-4 pt-2">
        <Button
          onClick={handleGenerate}
          disabled={!stylePrompt.trim() || isGenerating}
          className="flex-1 h-16 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:opacity-90 hover:scale-[1.02] text-white font-bold text-base shadow-lg transition-all duration-300 rounded-2xl"
          size="lg"
        >
          <Wand2 className="mr-2 h-5 w-5" />
          Generate
        </Button>
        <Button
          onClick={handleRemix}
          disabled={!stylePrompt.trim() || isGenerating}
          variant="outline"
          className="flex-1 h-16 border-2 border-purple-500/40 hover:bg-purple-500/20 hover:scale-[1.02] hover:border-purple-500/60 font-bold text-base transition-all duration-300 rounded-2xl backdrop-blur-sm"
          size="lg"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Remix
        </Button>
      </div>
    </div>
  );
};
