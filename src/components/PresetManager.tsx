import { useState } from "react";
import { Save, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePresets, Preset } from "@/hooks/usePresets";
import { toast } from "sonner";
import { DEFAULT_PRESETS } from "@/lib/constants";

interface PresetManagerProps {
  currentSettings: Omit<Preset, "id" | "created_at" | "name">;
  onLoadPreset: (preset: Preset) => void;
}

export const PresetManager = ({ currentSettings, onLoadPreset }: PresetManagerProps) => {
  const { presets, savePreset, deletePreset } = usePresets();
  const [presetName, setPresetName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (!presetName.trim()) {
      toast.error("Please enter a preset name");
      return;
    }
    
    savePreset({
      ...currentSettings,
      name: presetName,
    });
    
    toast.success(`Preset "${presetName}" saved!`);
    setPresetName("");
    setIsOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    deletePreset(id);
    toast.success(`Preset "${name}" deleted`);
  };

  const handleLoadDefault = (preset: typeof DEFAULT_PRESETS[0]) => {
    onLoadPreset({
      id: "default",
      name: preset.name,
      style_prompt: currentSettings.style_prompt,
      lyrics: currentSettings.lyrics,
      exclusions: currentSettings.exclusions,
      sliders: preset.sliders,
      moments_dsl: currentSettings.moments_dsl,
      target_seconds: currentSettings.target_seconds,
      tags: currentSettings.tags,
      created_at: new Date().toISOString(),
    });
    toast.success(`Applied "${preset.name}" preset`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground/80">Presets</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="rounded-xl">
              <Save className="h-3.5 w-3.5 mr-1.5" />
              Save Current
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card/95 backdrop-blur-xl border-border/50 rounded-3xl">
            <DialogHeader>
              <DialogTitle>Save Preset</DialogTitle>
              <DialogDescription>
                Save your current settings as a preset for quick access later
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Preset name..."
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              className="rounded-xl"
            />
            <DialogFooter>
              <Button onClick={handleSave} className="rounded-xl">Save Preset</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Default Presets */}
      <div className="grid grid-cols-2 gap-2">
        {DEFAULT_PRESETS.map((preset) => (
          <Button
            key={preset.name}
            variant="outline"
            size="sm"
            onClick={() => handleLoadDefault(preset)}
            className="justify-start h-auto py-3 rounded-xl border-border/30 hover:bg-muted/50"
          >
            <span className="mr-2 text-lg">{preset.icon}</span>
            <span className="text-xs font-medium">{preset.name}</span>
          </Button>
        ))}
      </div>

      {/* User Presets */}
      {presets.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground">Your Presets</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {presets.map((preset) => (
              <Card
                key={preset.id}
                className="group bg-card/50 border-border/30 hover:border-primary/30 transition-all"
              >
                <CardContent className="p-3 flex items-center justify-between gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLoadPreset(preset)}
                    className="flex-1 justify-start h-auto py-2 hover:bg-transparent"
                  >
                    <Upload className="h-3 w-3 mr-2 text-primary" />
                    <span className="text-xs font-medium truncate">{preset.name}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(preset.id, preset.name)}
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
