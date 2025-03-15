
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera, RefreshCw, Check, AlertCircle, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import HuggingFaceApiKeyInput from "./HuggingFaceApiKeyInput";
import { getSkinDiseasePrediction, diseaseInfo } from "@/utils/huggingFaceApi";

interface AnalysisResult {
  condition: string;
  confidence: number;
  symptoms: string[];
  recommendations: string[];
  description: string;
}

const SkinImageAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setAnalysisResult(null);
      } else {
        toast.error("Please select an image file.");
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setAnalysisResult(null);
      } else {
        toast.error("Please drop an image file.");
      }
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first.");
      return;
    }

    if (!localStorage.getItem("hf_api_key")) {
      toast.error("Please enter your Hugging Face API key.");
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
      toast.error("Analysis failed. Please try again or check your API key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <HuggingFaceApiKeyInput />
      
      <div
        className={`border-2 border-dashed rounded-xl p-6 transition-all ${
          previewUrl ? "border-primary/40" : "border-border hover:border-primary/40"
        } bg-background/50`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />

        {previewUrl ? (
          <div className="space-y-4">
            <div className="aspect-square max-h-[400px] mx-auto overflow-hidden rounded-lg">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex justify-center space-x-3">
              <Button variant="outline" size="sm" onClick={resetAnalysis}>
                Change Image
              </Button>
              <Button 
                size="sm" 
                onClick={analyzeImage} 
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
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <ImageIcon className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Upload skin image</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Drag and drop your skin image here, or click the buttons below to
                upload a file or take a photo.
              </p>
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
              <Button onClick={handleCameraCapture} className="button-glow">
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
            </div>
          </div>
        )}
      </div>

      {analysisResult && (
        <Card className="animate-slide-in-bottom">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Skin Analysis Results</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on our AI analysis
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Confidence</div>
                  <div className="text-lg font-semibold text-foreground">
                    {analysisResult.confidence.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Condition</div>
                <div className="text-xl font-semibold">{analysisResult.condition}</div>
                <p className="text-sm mt-1 text-muted-foreground">
                  {analysisResult.description}
                </p>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Common Symptoms</div>
                <ul className="space-y-1.5">
                  {analysisResult.symptoms.map((symptom: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-mint-100 dark:bg-mint-900 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-mint-500"></div>
                      </div>
                      <span className="text-sm">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Recommendations</div>
                <ul className="space-y-1.5">
                  {analysisResult.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-4 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-300">
                  This analysis is for informational purposes only and should not replace professional medical advice. Please consult a healthcare provider for proper diagnosis and treatment.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkinImageAnalysis;
