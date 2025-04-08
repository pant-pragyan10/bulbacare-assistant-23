
import { useSkinAnalysis } from "@/hooks/useSkinAnalysis";
import ImageUploader from "./skin-analysis/ImageUploader";
import AnalysisButton from "./skin-analysis/AnalysisButton";
import ResultsDisplay from "./skin-analysis/ResultsDisplay";

const SkinImageAnalysis = () => {
  const {
    previewUrl,
    isAnalyzing,
    analysisResult,
    handleFileSelected,
    resetAnalysis,
    analyzeImage
  } = useSkinAnalysis();

  // Transform the analysisResult to the format expected by ResultsDisplay
  const formattedResults = analysisResult ? [
    {
      label: analysisResult.condition,
      description: analysisResult.description,
      symptoms: analysisResult.symptoms,
      recommendations: analysisResult.recommendations
    }
  ] : null;

  return (
    <div className="space-y-6">
      <ImageUploader 
        previewUrl={previewUrl} 
        onFileSelected={handleFileSelected} 
        resetAnalysis={resetAnalysis} 
      />
      
      {previewUrl && (
        <div className="flex justify-center">
          <AnalysisButton isAnalyzing={isAnalyzing} onAnalyze={analyzeImage} />
        </div>
      )}

      <ResultsDisplay results={formattedResults} isLoading={isAnalyzing} />
    </div>
  );
};

export default SkinImageAnalysis;
