import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioPlayer } from "./AudioPlayer";
import { TimelineVisualizer } from "./TimelineVisualizer";
import { GenerationResponse, Timeline } from "@/types";
import { Badge } from "@/components/ui/badge";

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
    <div className="space-y-6 animate-slide-up">
      {/* Audio Player - Orange/Pink gradient */}
      <Card className="border-orange-500/30 shadow-lg bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-rose-500/10 backdrop-blur-xl overflow-hidden rounded-[2rem]">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            🎵 Generated Track
            <Badge className="ml-auto bg-gradient-to-r from-orange-500 to-pink-500 text-black">
              New
            </Badge>
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Download Options - Green gradient */}
        <Card className="bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-3xl overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              💾 Download Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button
                variant="outline"
                onClick={() => handleDownload(output.paths.mix_wav, "track.wav")}
                className="justify-start h-12 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 rounded-xl group"
              >
                <Download className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm">WAV 48kHz</div>
                  <div className="text-xs text-muted-foreground">Lossless quality</div>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDownload(output.paths.mix_flac, "track.flac")}
                className="justify-start h-12 border-teal-500/30 hover:bg-teal-500/20 hover:border-teal-500/50 transition-all duration-300 rounded-xl group"
              >
                <Download className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm">FLAC</div>
                  <div className="text-xs text-muted-foreground">Compressed lossless</div>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDownload(output.paths.acapella_wav, "acapella.wav")}
                className="justify-start h-12 border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 rounded-xl group"
              >
                <Download className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm">Acapella</div>
                  <div className="text-xs text-muted-foreground">Vocals only</div>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDownload(output.paths.instrumental_wav, "instrumental.wav")}
                className="justify-start h-12 border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300 rounded-xl group"
              >
                <Download className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm">Instrumental</div>
                  <div className="text-xs text-muted-foreground">Music only</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Metadata - Purple gradient */}
        <Card className="bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-fuchsia-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              🔢 Track Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 rounded-2xl border border-purple-500/30">
                <div className="text-xs text-muted-foreground mb-1">Seed</div>
                <code className="text-lg font-mono font-bold text-purple-300">{output.seed}</code>
              </div>
              
              {metrics && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30">
                    <div className="text-xs text-muted-foreground font-medium mb-1">LUFS</div>
                    <div className="text-2xl font-bold font-mono text-cyan-300">{metrics.lufs.toFixed(1)}</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl border border-pink-500/30">
                    <div className="text-xs text-muted-foreground font-medium mb-1">Peak</div>
                    <div className="text-2xl font-bold font-mono text-pink-300">{metrics.true_peak.toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground font-medium">dBTP</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Visualizer */}
      {timeline && <TimelineVisualizer timeline={timeline} />}
    </div>
  );
};
