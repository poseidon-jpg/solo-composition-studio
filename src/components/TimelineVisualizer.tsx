import { Timeline } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineVisualizerProps {
  timeline: Timeline;
}

const sectionColors: Record<string, string> = {
  Intro: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
  Verse1: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  Hook1: "from-orange-500/20 to-amber-500/20 border-orange-500/30",
  Verse2: "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
  Hook2: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
  Outro: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
};

export const TimelineVisualizer = ({ timeline }: TimelineVisualizerProps) => {
  const totalBars = timeline.sections.reduce((sum, section) => sum + section.bars, 0);

  return (
    <Card className="bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold flex items-center gap-2">
          🎼 Song Structure
        </CardTitle>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>{timeline.bpm} BPM</span>
          {timeline.key_guess && <span>• {timeline.key_guess}</span>}
          <span>• {totalBars} bars</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Visual Timeline */}
        <div className="relative h-16 bg-muted/20 rounded-xl overflow-hidden">
          {timeline.sections.map((section, idx) => {
            const width = (section.bars / totalBars) * 100;
            return (
              <div
                key={idx}
                className={cn(
                  "absolute h-full top-0 border-l-2 bg-gradient-to-r transition-all hover:brightness-125",
                  sectionColors[section.name] || "from-gray-500/20 to-gray-600/20 border-gray-500/30"
                )}
                style={{
                  left: `${(section.start_bar / totalBars) * 100}%`,
                  width: `${width}%`,
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <span className="text-xs font-bold text-foreground/80">{section.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Details */}
        <div className="grid grid-cols-2 gap-2">
          {timeline.sections.map((section, idx) => (
            <div
              key={idx}
              className={cn(
                "p-3 rounded-xl bg-gradient-to-br border",
                sectionColors[section.name] || "from-gray-500/20 to-gray-600/20 border-gray-500/30"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold">{section.name}</span>
                <span className="text-xs text-muted-foreground">{section.bars} bars</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-background/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    style={{ width: `${section.energy * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {Math.round(section.energy * 100)}%
                </span>
              </div>
              {section.events.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {section.events.map((event, eidx) => (
                    <span
                      key={eidx}
                      className="text-xs px-2 py-0.5 bg-background/40 rounded-full"
                    >
                      {event.type}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
