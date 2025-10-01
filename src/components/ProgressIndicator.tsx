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
    <div className="space-y-3 p-4 bg-card border border-border rounded-lg animate-slide-up">
      <div className="flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <div className="flex-1">
          <p className="text-sm font-medium">{stageLabels[progress.stage]}</p>
          {progress.message && (
            <p className="text-xs text-muted-foreground">{progress.message}</p>
          )}
        </div>
        <span className="text-sm text-muted-foreground">{Math.round(progress.progress)}%</span>
      </div>
      <Progress value={progress.progress} className="h-1.5" />
    </div>
  );
};
