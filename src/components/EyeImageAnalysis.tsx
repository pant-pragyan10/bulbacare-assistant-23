
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera, RefreshCw, Check, AlertCircle, Eye } from "lucide-react";
import { toast } from "sonner";

const EyeImageAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
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

  const analyzeImage = () => {
    if (!selectedFile) {
      toast.error("Please select an image first.");
      return;
    }

    setIsAnalyzing(true);

    // Simulating API call
    setTimeout(() => {
      const mockResults = {
        condition: "Conjunctivitis",
        confidence: 88.7,
        symptoms: [
          "Redness in the white of the eye", 
          "Increased tear production", 
          "Burning or itching eyes",
          "Discharge from the eye"
        ],
        recommendations: [
          "Apply cool compresses to the eyes", 
          "Avoid touching or rubbing your eyes", 
          "Use prescribed antibiotic eye drops if bacterial",
          "Consult an ophthalmologist immediately"
        ]
      };
      
      setAnalysisResult(mockResults);
      setIsAnalyzing(false);
      toast.success("Analysis completed successfully!");
    }, 3000);
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
      <div
        className={`border-2 border-dashed rounded-xl p-6 transition-all ${
          previewUrl ? "border-secondary/40" : "border-border hover:border-secondary/40"
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
                variant="secondary"
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
                    Analyze Eye
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
              <Eye className="h-10 w-10 text-secondary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Upload eye image</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Drag and drop your eye image here, or click the buttons below to
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
              <Button variant="secondary" onClick={handleCameraCapture} className="button-glow">
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
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Eye Analysis Results</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on our AI analysis
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Confidence</div>
                  <div className="text-lg font-semibold text-foreground">
                    {analysisResult.confidence}%
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Condition</div>
                <div className="text-xl font-semibold">{analysisResult.condition}</div>
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
                      <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-secondary/10 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-secondary"></div>
                      </div>
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-4 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-300">
                  This analysis is for informational purposes only and should not replace professional medical advice. Please consult an ophthalmologist for proper diagnosis and treatment.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EyeImageAnalysis;
