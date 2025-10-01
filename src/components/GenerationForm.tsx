import { useState } from "react";
import { Wand2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GenerationRequest } from "@/types";

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

  const handleGenerate = () => {
    if (!stylePrompt.trim()) return;
    onGenerate(buildRequest());
  };

  const handleRemix = () => {
    if (!stylePrompt.trim()) return;
    onRemix(buildRequest());
  };

  return (
    <div className="space-y-7">
      {/* Style Prompt */}
      <div className="space-y-3">
        <Label htmlFor="style-prompt" className="text-base font-medium flex items-center gap-2">
          ✨ Describe your music <span className="text-accent text-xs">*</span>
        </Label>
        <Textarea
          id="style-prompt"
          placeholder="alt-rap with organic drums, airy falsetto hooks, drop on the hook..."
          value={stylePrompt}
          onChange={(e) => setStylePrompt(e.target.value)}
          rows={3}
          className="resize-none bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/10 transition-all duration-300 rounded-xl"
        />
      </div>

      {/* Lyrics */}
      <div className="space-y-3">
        <Label htmlFor="lyrics" className="text-base font-medium flex items-center gap-2">
          🎤 Lyrics
          <span className="text-xs text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id="lyrics"
          placeholder="Enter your lyrics here..."
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          rows={4}
          className="resize-none bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/10 transition-all duration-300 rounded-xl"
        />
      </div>

      {/* Exclusions */}
      <div className="space-y-3">
        <Label htmlFor="exclusions" className="text-base font-medium flex items-center gap-2">
          🚫 Exclude styles
        </Label>
        <Input
          id="exclusions"
          placeholder="e.g., trap, autotune, electronic"
          value={exclusions}
          onChange={(e) => setExclusions(e.target.value)}
          className="bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/10 transition-all duration-300 rounded-xl"
        />
      </div>

      {/* Sliders */}
      <div className="space-y-6 pt-2">
        <div className="space-y-3 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/10">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">🎨 Weirdness</Label>
            <span className="text-sm font-semibold text-primary px-2.5 py-0.5 bg-primary/10 rounded-full">{weirdness[0]}%</span>
          </div>
          <Slider
            value={weirdness}
            onValueChange={setWeirdness}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-3 p-4 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-2xl border border-secondary/10">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">🎭 Style Influence</Label>
            <span className="text-sm font-semibold text-secondary px-2.5 py-0.5 bg-secondary/10 rounded-full">{styleInfluence[0]}%</span>
          </div>
          <Slider
            value={styleInfluence}
            onValueChange={setStyleInfluence}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-3 p-4 bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl border border-accent/10">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">🎵 Audio Influence</Label>
            <span className="text-sm font-semibold text-accent px-2.5 py-0.5 bg-accent/10 rounded-full">{audioInfluence[0]}%</span>
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

      {/* Advanced Options */}
      <Accordion type="single" collapsible className="border border-border/50 rounded-2xl overflow-hidden bg-card/30 backdrop-blur-sm">
        <AccordionItem value="advanced" className="border-0">
          <AccordionTrigger className="px-5 py-4 hover:bg-muted/30 transition-colors text-sm font-medium">
            ⚙️ Advanced Options
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 space-y-4">
            <div className="space-y-3">
              <Label htmlFor="moments-dsl" className="text-sm font-medium">Moments DSL</Label>
              <Textarea
                id="moments-dsl"
                placeholder="DROP Hook1 bar:1 len:1.0s; STUTTER word:&quot;never&quot; at:Verse1 bar:9 beat:1 reps:3"
                value={momentsDsl}
                onChange={(e) => setMomentsDsl(e.target.value)}
                rows={3}
                className="resize-none bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/10 font-mono text-xs transition-all duration-300 rounded-xl"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="target-seconds" className="text-sm font-medium">Target Length (seconds)</Label>
              <Input
                id="target-seconds"
                type="number"
                min={30}
                max={90}
                value={targetSeconds}
                onChange={(e) => setTargetSeconds(Number(e.target.value))}
                className="bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/10 transition-all duration-300 rounded-xl"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-2">
        <Button
          onClick={handleGenerate}
          disabled={!stylePrompt.trim() || isGenerating}
          className="flex-1 h-14 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 hover:scale-[1.02] text-primary-foreground font-semibold text-base shadow-soft transition-all duration-300 rounded-2xl"
          size="lg"
        >
          <Wand2 className="mr-2 h-5 w-5" />
          Generate
        </Button>
        <Button
          onClick={handleRemix}
          disabled={!stylePrompt.trim() || isGenerating}
          variant="outline"
          className="flex-1 h-14 border-2 border-primary/30 hover:bg-primary/10 hover:scale-[1.02] hover:border-primary/50 font-semibold text-base transition-all duration-300 rounded-2xl backdrop-blur-sm"
          size="lg"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Remix
        </Button>
      </div>
    </div>
  );
};
