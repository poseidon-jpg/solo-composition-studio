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
    <div className="space-y-4 animate-slide-up">
      {/* Audio Player */}
      <Card className="border-primary/20 shadow-glow">
        <CardHeader>
          <CardTitle className="text-lg">Generated Track</CardTitle>
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
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Download</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(output.paths.mix_wav, "track.wav")}
              className="justify-start"
            >
              <Download className="mr-2 h-3 w-3" />
              WAV 48kHz
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(output.paths.mix_flac, "track.flac")}
              className="justify-start"
            >
              <Download className="mr-2 h-3 w-3" />
              FLAC
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(output.paths.acapella_wav, "acapella.wav")}
              className="justify-start"
            >
              <Download className="mr-2 h-3 w-3" />
              Acapella
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(output.paths.instrumental_wav, "instrumental.wav")}
              className="justify-start"
            >
              <Download className="mr-2 h-3 w-3" />
              Instrumental
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="seed" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="seed">Seed</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="seed" className="space-y-2">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <code className="text-sm font-mono">{output.seed}</code>
              </div>
              <p className="text-xs text-muted-foreground">
                Use this seed to reproduce the exact same generation
              </p>
            </TabsContent>
            
            <TabsContent value="timeline" className="space-y-2">
              {timeline ? (
                <div className="p-3 bg-muted rounded-md">
                  <pre className="text-xs overflow-x-auto">
                    {JSON.stringify(timeline, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Timeline data not available</p>
              )}
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-2">
              {metrics ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded-md">
                    <div className="text-xs text-muted-foreground">LUFS</div>
                    <div className="text-lg font-mono">{metrics.lufs.toFixed(1)}</div>
                  </div>
                  <div className="p-3 bg-muted rounded-md">
                    <div className="text-xs text-muted-foreground">True Peak</div>
                    <div className="text-lg font-mono">{metrics.true_peak.toFixed(1)} dBTP</div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Metrics data not available</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
