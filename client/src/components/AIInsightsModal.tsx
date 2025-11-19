import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { Streamdown } from 'streamdown';

export interface AIInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  type: 'paradox' | 'experiment' | 'retreat';
  userTheme?: string;
  userJourneyProgress?: string;
  onInsightGenerated?: (insight: string) => void;
}

export const AIInsightsModal: React.FC<AIInsightsModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  type,
  userTheme,
  userJourneyProgress,
  onInsightGenerated,
}) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [provider, setProvider] = useState<string>('');

  useEffect(() => {
    if (isOpen && !insight && !loading) {
      generateInsight();
    }
  }, [isOpen]);

  const generateInsight = async () => {
    setLoading(true);
    setError('');
    setInsight('');

    try {
      const response = await fetch('/api/trpc/ai.generateInsight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          title,
          description,
          userTheme,
          userJourneyProgress,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate insight');
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setInsight(data.content || '');
      } else {
        setInsight(data.content);
        setProvider(data.provider);
        onInsightGenerated?.(data.content);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setInsight('');
    } finally {
      setLoading(false);
    }
  };

  const getProviderLabel = (p: string) => {
    const labels: Record<string, string> = {
      claude: 'Claude 3 Opus',
      perplexity: 'Perplexity Sonar',
      gemini: 'Gemini 2.5 Flash',
      grok: 'Grok 4',
    };
    return labels[p] || 'AI Assistant';
  };

  const getTypeLabel = (t: string) => {
    const labels: Record<string, string> = {
      paradox: 'Paradox Insight',
      experiment: 'Experiment Guidance',
      retreat: 'Retreat Reflection',
    };
    return labels[t] || 'AI Insight';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <DialogTitle>{getTypeLabel(type)}</DialogTitle>
          </div>
          <DialogDescription className="text-base font-medium text-foreground mt-2">
            {title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
              <p className="text-sm text-muted-foreground">Generating personalized insight...</p>
              <p className="text-xs text-muted-foreground">
                This may take a moment as we connect with our wisdom sources
              </p>
            </div>
          ) : error ? (
            <div className="space-y-3">
              <div className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                    Connection Note
                  </p>
                  <p className="text-sm text-amber-800 dark:text-amber-200">{error}</p>
                </div>
              </div>

              {insight && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Here's a reflection while we reconnect:
                  </p>
                  <div className="prose dark:prose-invert prose-sm max-w-none">
                    <Streamdown>{insight}</Streamdown>
                  </div>
                </div>
              )}
            </div>
          ) : insight ? (
            <div className="space-y-4">
              <div className="prose dark:prose-invert prose-sm max-w-none">
                <Streamdown>{insight}</Streamdown>
              </div>

              {provider && (
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Generated by {getProviderLabel(provider)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={generateInsight}
                    className="text-xs"
                  >
                    Regenerate
                  </Button>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="flex gap-2 justify-end pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {insight && (
            <Button
              variant="default"
              onClick={() => {
                // Could implement save to journal here
                onClose();
              }}
            >
              Save to Journal
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
