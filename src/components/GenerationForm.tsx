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
    <div className="space-y-6">
      {/* Style Prompt */}
      <div className="space-y-2">
        <Label htmlFor="style-prompt" className="text-base">
          Describe your music <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="style-prompt"
          placeholder="alt-rap with organic drums, airy falsetto hooks, drop on the hook, stutter 'never' 3x"
          value={stylePrompt}
          onChange={(e) => setStylePrompt(e.target.value)}
          rows={3}
          className="resize-none bg-input border-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      {/* Lyrics */}
      <div className="space-y-2">
        <Label htmlFor="lyrics" className="text-base">
          Lyrics (optional)
        </Label>
        <Textarea
          id="lyrics"
          placeholder="Enter your lyrics here..."
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          rows={4}
          className="resize-none bg-input border-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      {/* Exclusions */}
      <div className="space-y-2">
        <Label htmlFor="exclusions" className="text-base">
          Exclude styles
        </Label>
        <Input
          id="exclusions"
          placeholder="e.g., trap, autotune, electronic"
          value={exclusions}
          onChange={(e) => setExclusions(e.target.value)}
          className="bg-input border-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      {/* Sliders */}
      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Weirdness</Label>
            <span className="text-sm text-muted-foreground">{weirdness[0]}%</span>
          </div>
          <Slider
            value={weirdness}
            onValueChange={setWeirdness}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Style Influence</Label>
            <span className="text-sm text-muted-foreground">{styleInfluence[0]}%</span>
          </div>
          <Slider
            value={styleInfluence}
            onValueChange={setStyleInfluence}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Audio Influence</Label>
            <span className="text-sm text-muted-foreground">{audioInfluence[0]}%</span>
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
      <Accordion type="single" collapsible className="border border-border rounded-lg">
        <AccordionItem value="advanced" className="border-0">
          <AccordionTrigger className="px-4 hover:bg-muted/50">
            Advanced Options
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="moments-dsl">Moments DSL</Label>
              <Textarea
                id="moments-dsl"
                placeholder="DROP Hook1 bar:1 len:1.0s; STUTTER word:&quot;never&quot; at:Verse1 bar:9 beat:1 reps:3"
                value={momentsDsl}
                onChange={(e) => setMomentsDsl(e.target.value)}
                rows={3}
                className="resize-none bg-input border-border focus:border-primary focus:ring-primary/20 font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-seconds">Target Length (seconds)</Label>
              <Input
                id="target-seconds"
                type="number"
                min={30}
                max={90}
                value={targetSeconds}
                onChange={(e) => setTargetSeconds(Number(e.target.value))}
                className="bg-input border-border focus:border-primary focus:ring-primary/20"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          onClick={handleGenerate}
          disabled={!stylePrompt.trim() || isGenerating}
          className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-medium"
          size="lg"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          Generate
        </Button>
        <Button
          onClick={handleRemix}
          disabled={!stylePrompt.trim() || isGenerating}
          variant="outline"
          className="flex-1 border-primary/50 hover:bg-primary/10"
          size="lg"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Remix
        </Button>
      </div>
    </div>
  );
};
