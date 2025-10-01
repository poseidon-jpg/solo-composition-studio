import { Download, FileJson, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioPlayer } from "./AudioPlayer";
import { GenerationResponse, Timeline } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TrackOutputProps {
  output: GenerationResponse;
  timeline?: Timeline;
  metrics?: { lufs: number; true_peak: number };
}

export const TrackOutput = ({ output, timeline, metrics }: TrackOutputProps) => {
  const handleDownload = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  return (
    <div className="space-y-5 animate-slide-up">
      {/* Audio Player */}
      <Card className="border-primary/20 shadow-glow bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl overflow-hidden rounded-3xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            🎵 Generated Track
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AudioPlayer
            src={output.paths.mix_wav}
            title="Final Mix"
            onDownload={() => handleDownload(output.paths.mix_wav, "track.wav")}
          />
        </CardContent>
      </Card>

      {/* Download Options */}
      <Card className="bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            💾 Download
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(output.paths.mix_wav, "track.wav")}
              className="justify-start h-11 border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 rounded-xl"
            >
              <Download className="mr-2 h-3.5 w-3.5" />
              <span className="font-medium">WAV 48kHz</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(output.paths.mix_flac, "track.flac")}
              className="justify-start h-11 border-border/50 hover:bg-secondary/10 hover:border-secondary/30 transition-all duration-300 rounded-xl"
            >
              <Download className="mr-2 h-3.5 w-3.5" />
              <span className="font-medium">FLAC</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(output.paths.acapella_wav, "acapella.wav")}
              className="justify-start h-11 border-border/50 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 rounded-xl"
            >
              <Download className="mr-2 h-3.5 w-3.5" />
              <span className="font-medium">Acapella</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(output.paths.instrumental_wav, "instrumental.wav")}
              className="justify-start h-11 border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 rounded-xl"
            >
              <Download className="mr-2 h-3.5 w-3.5" />
              <span className="font-medium">Instrumental</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card className="bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            📊 Metadata
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="seed" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-10 bg-muted/30 backdrop-blur-sm p-1 rounded-xl">
              <TabsTrigger value="seed" className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-medium text-xs">
                Seed
              </TabsTrigger>
              <TabsTrigger value="timeline" className="rounded-lg data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary font-medium text-xs">
                Timeline
              </TabsTrigger>
              <TabsTrigger value="metrics" className="rounded-lg data-[state=active]:bg-accent/20 data-[state=active]:text-accent font-medium text-xs">
                Metrics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="seed" className="space-y-3 mt-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
                <Hash className="h-5 w-5 text-primary" />
                <code className="text-sm font-mono font-semibold text-foreground">{output.seed}</code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use this seed to reproduce the exact same generation
              </p>
            </TabsContent>
            
            <TabsContent value="timeline" className="space-y-3 mt-4">
              {timeline ? (
                <div className="p-4 bg-muted/30 backdrop-blur-sm rounded-2xl border border-border/30">
                  <pre className="text-xs overflow-x-auto text-foreground/80">
                    {JSON.stringify(timeline, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Timeline data not available</p>
              )}
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-3 mt-4">
              {metrics ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl border border-secondary/20">
                    <div className="text-xs text-muted-foreground font-medium mb-1">LUFS</div>
                    <div className="text-2xl font-bold font-mono text-secondary">{metrics.lufs.toFixed(1)}</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/20">
                    <div className="text-xs text-muted-foreground font-medium mb-1">True Peak</div>
                    <div className="text-2xl font-bold font-mono text-accent">{metrics.true_peak.toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground font-medium">dBTP</div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Metrics data not available</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
