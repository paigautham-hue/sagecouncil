import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { getSagePortrait } from "@/lib/sagePortraits";

interface Sage {
  id: string;
  name: string;
  tradition: string;
  era: string;
  bio?: string;
  keyTeachings?: string[];
}

interface SageQuickViewProps {
  sage: Sage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SageQuickView({ sage, open, onOpenChange }: SageQuickViewProps) {
  if (!sage) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={getSagePortrait(sage.id)}
              alt={sage.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-accent"
            />
            <div>
              <DialogTitle className="text-2xl font-bold">{sage.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">{sage.tradition} • {sage.era}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {sage.bio && (
            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm text-foreground/80">{sage.bio}</p>
            </div>
          )}

          {sage.keyTeachings && sage.keyTeachings.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Key Teachings</h3>
              <ul className="list-disc list-inside space-y-1">
                {sage.keyTeachings.map((teaching, index) => (
                  <li key={index} className="text-sm text-foreground/80">{teaching}</li>
                ))}
              </ul>
            </div>
          )}

          <Link href={`/sage/${sage.id}`}>
            <Button className="w-full" onClick={() => onOpenChange(false)}>
              Learn More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
