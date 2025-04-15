
import { useState } from "react";
import { toast } from "sonner";
import { detectDiseaseFromImage, getDiseaseInfo } from "@/utils/geminiApi";

export const useEyeAnalysis = () => {
  const [eyeFile, setEyeFile] = useState<File | null>(null);
  const [eyePreview, setEyePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [noEyeDetected, setNoEyeDetected] = useState(false);

  const handleFileSelected = (file: File) => {
    setEyeFile(file);
    setEyePreview(URL.createObjectURL(file));
    setAnalysisResult(null);
    setNoEyeDetected(false);
  };

  const resetAnalysis = () => {
    setEyeFile(null);
    setEyePreview(null);
    setAnalysisResult(null);
    setNoEyeDetected(false);
  };

  const analyzeImage = async () => {
    if (!eyeFile) {
      toast.error("Please select an eye image.");
      return;
    }

    setIsAnalyzing(true);
    setNoEyeDetected(false);

    try {
      // Use the updated eye-specific prompt
      const result = await detectDiseaseFromImage(eyeFile, 'eye');
      
      // Check if no eye was detected
      if (result.toLowerCase().includes("no eye detected")) {
        setNoEyeDetected(true);
        setAnalysisResult(null);
        toast.error("No eye detected in the image. Please upload a clearer eye image.");
      } else {
        // Get detailed information about the condition
        const info = getDiseaseInfo(result, 'eye');

        setAnalysisResult({
          condition: result,
          symptoms: info.symptoms,
          recommendations: info.recommendations
        });

        toast.success("Analysis completed successfully!");
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    eyeFile,
    eyePreview,
    isAnalyzing,
    analysisResult,
    noEyeDetected,
    handleFileSelected,
    resetAnalysis,
    analyzeImage
  };
};
