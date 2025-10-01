import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Tag {
  label: string;
  value: string;
  color?: string;
  icon?: string;
}

interface StyleTagsProps {
  tags: Tag[];
  selected: string[];
  onToggle: (value: string) => void;
  title: string;
}

export const StyleTags = ({ tags, selected, onToggle, title }: StyleTagsProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground/80">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selected.includes(tag.value);
          return (
            <Badge
              key={tag.value}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all duration-300 px-4 py-2 text-sm font-medium rounded-xl",
                isSelected
                  ? `bg-gradient-to-r ${tag.color || "from-primary to-secondary"} text-black hover:opacity-90 hover:scale-105 shadow-md`
                  : "hover:bg-muted/50 hover:scale-105 border-border/50"
              )}
              onClick={() => onToggle(tag.value)}
            >
              {tag.icon && <span className="mr-1.5">{tag.icon}</span>}
              {tag.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};
