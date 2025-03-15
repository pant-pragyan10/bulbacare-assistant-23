
import { useState } from "react";
import { toast } from "sonner";
import { getSkinDiseasePrediction, diseaseInfo } from "@/utils/huggingFaceApi";

interface AnalysisResult {
  condition: string;
  confidence: number;
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
      // Call the Hugging Face API
      const prediction = await getSkinDiseasePrediction(selectedFile);
      
      const conditionName = prediction.label;
      const info = diseaseInfo[conditionName] || {
        description: "Information not available for this condition.",
        symptoms: ["Not specified"],
        recommendations: ["Consult a healthcare professional for more information."]
      };

      setAnalysisResult({
        condition: conditionName,
        confidence: prediction.confidence,
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
