
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface AnalysisButtonProps {
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

const AnalysisButton = ({ isAnalyzing, onAnalyze }: AnalysisButtonProps) => {
  return (
    <Button 
      size="sm" 
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
          Analyze Skin
        </>
      )}
    </Button>
  );
};

export default AnalysisButton;
