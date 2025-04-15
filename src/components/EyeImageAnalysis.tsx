
import { Label } from "@/components/ui/label";
import { useEyeAnalysis } from "@/hooks/useEyeAnalysis";
import EyeImageUploader from "./eye-analysis/EyeImageUploader";
import EyeAnalysisControls from "./eye-analysis/EyeAnalysisControls";
import EyeNoDetectionWarning from "./eye-analysis/EyeNoDetectionWarning";
import EyeAnalysisResults from "./eye-analysis/EyeAnalysisResults";

const EyeImageAnalysis = () => {
  const {
    eyePreview,
    isAnalyzing,
    analysisResult,
    noEyeDetected,
    handleFileSelected,
    resetAnalysis,
    analyzeImage
  } = useEyeAnalysis();

  return (
    <div className="space-y-6">
      <div className="max-w-md mx-auto">
        {/* Eye Upload */}
        <div>
          <Label className="mb-2 block">Eye Image</Label>
          <EyeImageUploader 
            eyePreview={eyePreview} 
            onFileSelected={handleFileSelected}
            resetPreview={resetAnalysis}
          />
        </div>
      </div>

      {/* Analysis Button */}
      <EyeAnalysisControls 
        eyePreview={eyePreview}
        isAnalyzing={isAnalyzing}
        onAnalyze={analyzeImage}
        onReset={resetAnalysis}
      />

      {/* No Eye Detected Message */}
      {noEyeDetected && <EyeNoDetectionWarning />}

      {/* Results Section */}
      {analysisResult && <EyeAnalysisResults analysisResult={analysisResult} />}
    </div>
  );
};

export default EyeImageAnalysis;
