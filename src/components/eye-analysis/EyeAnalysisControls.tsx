
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface EyeAnalysisControlsProps {
  eyePreview: string | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
  onReset: () => void;
}

const EyeAnalysisControls = ({ 
  eyePreview, 
  isAnalyzing, 
  onAnalyze, 
  onReset 
}: EyeAnalysisControlsProps) => {
  return (
    <div className="flex justify-center mt-6">
      {eyePreview ? (
        <div className="space-x-3">
          <Button variant="outline" onClick={onReset}>
            Start Over
          </Button>
          <Button 
            onClick={onAnalyze} 
            disabled={isAnalyzing}
            className="button-glow"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Eye
              </>
            )}
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Please upload an eye image to proceed with analysis
        </p>
      )}
    </div>
  );
};

export default EyeAnalysisControls;
