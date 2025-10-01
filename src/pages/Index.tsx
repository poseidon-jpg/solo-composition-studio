import { useState } from "react";
import { Music, Library, AlertCircle, Lightbulb } from "lucide-react";
import { GenerationForm } from "@/components/GenerationForm";
import { TrackOutput } from "@/components/TrackOutput";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { ExamplePrompts } from "@/components/ExamplePrompts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { GenerationRequest, GenerationResponse, GenerationProgress } from "@/types";
import { api } from "@/lib/api";
import { toast } from "sonner";

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [output, setOutput] = useState<GenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("generate");

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
      setActiveTab("output");
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
      setActiveTab("output");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to remix track";
      setError(message);
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleSelect = (prompt: string, tags: string[], mood: string) => {
    // This would ideally pass data back to the form, but for now just show a toast
    toast.success("Example loaded! Scroll up to see it in the form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10">
      {/* Header - Gradient bar */}
      <header className="border-b border-border/30 backdrop-blur-xl sticky top-0 z-50 bg-gradient-to-r from-cyan-950/60 via-purple-950/60 to-pink-950/60">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative p-3 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-2xl shadow-lg animate-float">
                <Music className="h-7 w-7 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Music Studio
                </h1>
                <p className="text-xs text-muted-foreground font-medium">Create, experiment, inspire ✨</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-10 h-14 bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-xl border border-border/50 p-1.5 rounded-3xl shadow-lg">
            <TabsTrigger 
              value="generate" 
              className="gap-2 rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-black data-[state=active]:shadow-lg font-bold transition-all duration-300"
            >
              <Music className="h-4 w-4" />
              Create
            </TabsTrigger>
            <TabsTrigger 
              value="output" 
              className="gap-2 rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-black data-[state=active]:shadow-lg font-bold transition-all duration-300"
            >
              <Music className="h-4 w-4" />
              Output
            </TabsTrigger>
            <TabsTrigger 
              value="library" 
              className="gap-2 rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-black data-[state=active]:shadow-lg font-bold transition-all duration-300"
            >
              <Library className="h-4 w-4" />
              Library
            </TabsTrigger>
          </TabsList>

          {/* GENERATE TAB */}
          <TabsContent value="generate" className="space-y-8">
            <div className="grid lg:grid-cols-[1fr_400px] gap-8 max-w-[1800px] mx-auto">
              {/* Left Column - Form (2/3 width) */}
              <div className="space-y-6">
                {/* Hero Card */}
                <Card className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-[2rem] overflow-hidden shadow-2xl">
                  <CardContent className="p-8">
                    <div className="mb-8 text-center">
                      <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        ✨ Create Your Masterpiece
                      </h2>
                      <p className="text-muted-foreground">
                        Describe your vision, fine-tune the details, and let AI bring it to life
                      </p>
                    </div>
                    <GenerationForm
                      onGenerate={handleGenerate}
                      onRemix={handleRemix}
                      isGenerating={isGenerating}
                    />
                  </CardContent>
                </Card>

                {/* Backend Connection Info */}
                <Alert className="border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl">
                  <AlertCircle className="h-4 w-4 text-cyan-400" />
                  <AlertDescription className="text-xs">
                    <strong>Backend Setup:</strong> Configure your FastAPI backend URL in .env as 
                    <code className="ml-1 px-2 py-1 bg-background/50 rounded-lg text-xs font-mono">VITE_API_BASE_URL</code>
                  </AlertDescription>
                </Alert>
              </div>

              {/* Right Column - Inspiration (1/3 width) */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 backdrop-blur-xl border border-purple-500/20 rounded-[2rem] overflow-hidden shadow-xl sticky top-24">
                  <CardContent className="p-6">
                    <ExamplePrompts onSelect={handleExampleSelect} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* OUTPUT TAB */}
          <TabsContent value="output" className="space-y-8">
            <div className="max-w-5xl mx-auto space-y-6">
              {progress && <ProgressIndicator progress={progress} />}
              
              {error && (
                <Alert variant="destructive" className="rounded-2xl">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {output && <TrackOutput output={output} />}
              
              {!progress && !error && !output && (
                <Card className="bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-rose-500/10 backdrop-blur-sm border border-orange-500/20 rounded-[2rem] shadow-xl">
                  <CardContent className="p-16 text-center">
                    <div className="inline-block p-6 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-3xl mb-6 animate-float">
                      <Music className="h-16 w-16 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Ready to Create</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      Your generated track will appear here with all the details, downloads, and visualizations
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/20">
                      <Lightbulb className="h-4 w-4 text-orange-400" />
                      <span className="text-sm text-muted-foreground">
                        Switch to <strong className="text-foreground">Create</strong> tab to get started
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* LIBRARY TAB */}
          <TabsContent value="library">
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-[2rem] shadow-xl">
              <CardContent className="p-20 text-center">
                <div className="inline-block p-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-[2rem] mb-8 animate-float">
                  <Library className="h-20 w-20 text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Library Coming Soon
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Your generated tracks will appear here. Each track will be saved with its unique seed, 
                  settings, and metadata for easy remixing and organization.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
                  <div className="p-4 bg-background/30 rounded-2xl border border-border/30">
                    <div className="text-2xl font-bold text-purple-400">🎵</div>
                    <div className="text-xs text-muted-foreground mt-2">Track History</div>
                  </div>
                  <div className="p-4 bg-background/30 rounded-2xl border border-border/30">
                    <div className="text-2xl font-bold text-pink-400">🔖</div>
                    <div className="text-xs text-muted-foreground mt-2">Favorites</div>
                  </div>
                  <div className="p-4 bg-background/30 rounded-2xl border border-border/30">
                    <div className="text-2xl font-bold text-fuchsia-400">📊</div>
                    <div className="text-xs text-muted-foreground mt-2">Analytics</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
