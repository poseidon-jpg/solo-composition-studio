import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { GenerationProgress } from "@/types";

interface ProgressIndicatorProps {
  progress: GenerationProgress;
}

const stageLabels: Record<GenerationProgress["stage"], string> = {
  planning: "Planning composition...",
  vocals: "Generating vocals...",
  instrumental: "Generating instrumental...",
  events: "Applying DSP events...",
  voice_conversion: "Converting voice...",
  mastering: "Mastering audio...",
  done: "Complete!",
};

export const ProgressIndicator = ({ progress }: ProgressIndicatorProps) => {
  return (
    <div className="space-y-4 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-xl border border-primary/20 rounded-3xl animate-slide-up shadow-glow">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <div className="absolute inset-0 animate-pulse-glow rounded-full" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{stageLabels[progress.stage]}</p>
          {progress.message && (
            <p className="text-xs text-muted-foreground mt-0.5">{progress.message}</p>
          )}
        </div>
        <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
          {Math.round(progress.progress)}%
        </span>
      </div>
      <Progress value={progress.progress} className="h-2" />
    </div>
  );
};
