import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { EXAMPLE_PROMPTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ExamplePromptsProps {
  onSelect: (prompt: string, tags: string[], mood: string) => void;
}

export const ExamplePrompts = ({ onSelect }: ExamplePromptsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          Get Inspired
        </h3>
      </div>
      
      <div className="grid gap-3">
        {EXAMPLE_PROMPTS.map((example, idx) => (
          <Card
            key={idx}
            className={cn(
              "group cursor-pointer transition-all duration-300 hover:scale-[1.02] border-border/30 bg-gradient-to-br overflow-hidden",
              idx % 3 === 0 && "from-primary/5 to-secondary/5 hover:border-primary/30",
              idx % 3 === 1 && "from-secondary/5 to-accent/5 hover:border-secondary/30",
              idx % 3 === 2 && "from-accent/5 to-primary/5 hover:border-accent/30"
            )}
            onClick={() => onSelect(example.prompt, example.tags, example.mood)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold text-sm">{example.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {example.prompt}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-background/50 rounded-full border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Use
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
