import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { getSagePortrait } from '@/lib/sagePortraits';
import { ProgressiveImage } from '@/components/ProgressiveImage';

interface QuoteCardProps {
  quote: string;
  teacherName: string;
  teacherId: string;
  showActions?: boolean;
}

export function QuoteCard({ quote, teacherName, teacherId, showActions = true }: QuoteCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0a0f',
        scale: 2, // Higher resolution
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `${teacherName.replace(/\s+/g, '-')}-quote.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download quote card:', error);
    }
  };

  const handleShare = async () => {
    const shareText = `"${quote}" - ${teacherName}\n\nFrom Council of Sages`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Quote from ${teacherName}`,
          text: shareText,
          url: window.location.origin,
        });
      } catch (error) {
        // User cancelled or share failed
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText);
      alert('Quote copied to clipboard!');
    }
  };

  const portraitUrl = getSagePortrait(teacherName);

  return (
    <div className="space-y-4">
      {/* The card that will be captured */}
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl p-8 md:p-12"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0f 100%)',
          boxShadow: '0 0 60px rgba(212, 175, 55, 0.15)',
        }}
      >
        {/* Cosmic background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Quote */}
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-foreground">
              "{quote}"
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-r from-primary via-transparent to-transparent" />
          </div>

          {/* Teacher info */}
          <div className="flex items-center justify-center gap-4">
            {portraitUrl && (
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                <div className="relative w-16 h-16 rounded-full border-2 border-primary/50 overflow-hidden">
                  <ProgressiveImage
                    src={portraitUrl}
                    alt={teacherName}
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
            <div className="text-center">
              <div className="font-semibold text-xl text-foreground">{teacherName}</div>
              <div className="text-sm text-muted-foreground">Council of Sages</div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-primary/40"
                style={{
                  animation: `pulse ${2 + i * 0.2}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/50">
          councilof sages.com
        </div>
      </div>

      {/* Action buttons */}
      {showActions && (
        <div className="flex gap-2 justify-center">
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      )}
    </div>
  );
}
