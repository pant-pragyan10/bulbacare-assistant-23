
import { useState } from "react";
import { toast } from "sonner";
import { detectDiseaseFromImage, getDiseaseInfo } from "@/utils/geminiApi";

interface AnalysisResult {
  condition: string;
  symptoms: string[];
  recommendations: string[];
  description: string;
}

export const useSkinAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setAnalysisResult(null);
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first.");
      return;
    }

    setIsAnalyzing(true);

    try {
      // Call the Gemini API
      const conditionName = await detectDiseaseFromImage(selectedFile);
      
      // Get detailed information about the condition
      const info = getDiseaseInfo(conditionName, 'skin');

      setAnalysisResult({
        condition: conditionName,
        description: info.description,
        symptoms: info.symptoms,
        recommendations: info.recommendations
      });

      toast.success("Analysis completed successfully!");
    } catch (error) {
      console.error("Analysis failed:", error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    selectedFile,
    previewUrl,
    isAnalyzing,
    analysisResult,
    handleFileSelected,
    resetAnalysis,
    analyzeImage
  };
};
