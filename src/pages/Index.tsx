import { useState } from "react";
import { Music, Library, AlertCircle } from "lucide-react";
import { GenerationForm } from "@/components/GenerationForm";
import { TrackOutput } from "@/components/TrackOutput";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerationRequest, GenerationResponse, GenerationProgress } from "@/types";
import { api } from "@/lib/api";
import { toast } from "sonner";

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [output, setOutput] = useState<GenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (request: GenerationRequest) => {
    setIsGenerating(true);
    setError(null);
    setOutput(null);
    
    // Simulate progress updates (in real app, these would come from WebSocket/SSE)
    const stages: GenerationProgress["stage"][] = [
      "planning",
      "vocals",
      "instrumental",
      "events",
      "voice_conversion",
      "mastering",
      "done"
    ];
    
    let currentStage = 0;
    const progressInterval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress({
          stage: stages[currentStage],
          message: `Processing ${stages[currentStage]}...`,
          progress: (currentStage / stages.length) * 100
        });
        currentStage++;
      }
    }, 2000);

    try {
      const result = await api.generate(request);
      clearInterval(progressInterval);
      setProgress({ stage: "done", message: "Complete!", progress: 100 });
      setOutput(result);
      toast.success("Track generated successfully!");
    } catch (err) {
      clearInterval(progressInterval);
      const message = err instanceof Error ? err.message : "Failed to generate track";
      setError(message);
      toast.error(message);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(null), 2000);
    }
  };

  const handleRemix = async (request: GenerationRequest) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await api.remix(request);
      setOutput(result);
      toast.success("Remix generated successfully!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to remix track";
      setError(message);
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-10 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                <Music className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Private Suno Generator</h1>
                <p className="text-xs text-muted-foreground">Local music generation • MICAH777X</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="generate" className="gap-2">
              <Music className="h-4 w-4" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="library" className="gap-2">
              <Library className="h-4 w-4" />
              Library
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {/* Left Column - Form */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
                  <h2 className="text-lg font-semibold mb-4">Create Your Track</h2>
                  <GenerationForm
                    onGenerate={handleGenerate}
                    onRemix={handleRemix}
                    isGenerating={isGenerating}
                  />
                </div>

                {/* Backend Connection Info */}
                <Alert className="border-muted-foreground/20">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    <strong>Backend Setup:</strong> Configure your FastAPI backend URL in .env as 
                    <code className="ml-1 px-1 py-0.5 bg-muted rounded text-xs">VITE_API_BASE_URL</code>
                  </AlertDescription>
                </Alert>
              </div>

              {/* Right Column - Output */}
              <div className="space-y-4">
                {progress && <ProgressIndicator progress={progress} />}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {output && <TrackOutput output={output} />}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="library">
            <div className="text-center py-12">
              <Library className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Library Coming Soon</h3>
              <p className="text-sm text-muted-foreground">
                Your generated tracks will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
