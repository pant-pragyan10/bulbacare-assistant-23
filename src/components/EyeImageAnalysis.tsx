
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera, RefreshCw, Check, AlertCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { getEyeDiseasePrediction, eyeDiseaseInfo } from "@/utils/eyeDiseaseApi";
import { Label } from "@/components/ui/label";

const EyeImageAnalysis = () => {
  const [leftEyeFile, setLeftEyeFile] = useState<File | null>(null);
  const [rightEyeFile, setRightEyeFile] = useState<File | null>(null);
  const [leftEyePreview, setLeftEyePreview] = useState<string | null>(null);
  const [rightEyePreview, setRightEyePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const leftEyeInputRef = useRef<HTMLInputElement>(null);
  const rightEyeInputRef = useRef<HTMLInputElement>(null);

  const handleLeftEyeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.type.startsWith("image/")) {
        setLeftEyeFile(file);
        setLeftEyePreview(URL.createObjectURL(file));
        setAnalysisResult(null);
      } else {
        toast.error("Please select an image file for the left eye.");
      }
    }
  };

  const handleRightEyeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.type.startsWith("image/")) {
        setRightEyeFile(file);
        setRightEyePreview(URL.createObjectURL(file));
        setAnalysisResult(null);
      } else {
        toast.error("Please select an image file for the right eye.");
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleLeftEyeDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    if (file) {
      if (file.type.startsWith("image/")) {
        setLeftEyeFile(file);
        setLeftEyePreview(URL.createObjectURL(file));
        setAnalysisResult(null);
      } else {
        toast.error("Please drop an image file for the left eye.");
      }
    }
  };

  const handleRightEyeDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    if (file) {
      if (file.type.startsWith("image/")) {
        setRightEyeFile(file);
        setRightEyePreview(URL.createObjectURL(file));
        setAnalysisResult(null);
      } else {
        toast.error("Please drop an image file for the right eye.");
      }
    }
  };

  const handleLeftEyeCapture = () => {
    if (leftEyeInputRef.current) {
      leftEyeInputRef.current.setAttribute("capture", "environment");
      leftEyeInputRef.current.click();
      setTimeout(() => {
        if (leftEyeInputRef.current) {
          leftEyeInputRef.current.removeAttribute("capture");
        }
      }, 1000);
    }
  };

  const handleRightEyeCapture = () => {
    if (rightEyeInputRef.current) {
      rightEyeInputRef.current.setAttribute("capture", "environment");
      rightEyeInputRef.current.click();
      setTimeout(() => {
        if (rightEyeInputRef.current) {
          rightEyeInputRef.current.removeAttribute("capture");
        }
      }, 1000);
    }
  };

  const analyzeImages = async () => {
    if (!leftEyeFile || !rightEyeFile) {
      toast.error("Please select both left and right eye images.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const prediction = await getEyeDiseasePrediction({
        leftImageFile: leftEyeFile,
        rightImageFile: rightEyeFile
      });
      
      const conditionName = prediction.condition;
      const info = eyeDiseaseInfo[conditionName] || eyeDiseaseInfo["Diabetic Retinopathy"];

      setAnalysisResult({
        condition: conditionName,
        confidence: prediction.confidence,
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

  const resetAnalysis = () => {
    setLeftEyeFile(null);
    setRightEyeFile(null);
    setLeftEyePreview(null);
    setRightEyePreview(null);
    setAnalysisResult(null);
    if (leftEyeInputRef.current) {
      leftEyeInputRef.current.value = "";
    }
    if (rightEyeInputRef.current) {
      rightEyeInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Eye Upload */}
        <div>
          <Label className="mb-2 block">Left Eye Image</Label>
          <div
            className={`border-2 border-dashed rounded-xl p-4 transition-all ${
              leftEyePreview ? "border-secondary/40" : "border-border hover:border-secondary/40"
            } bg-background/50`}
            onDragOver={handleDragOver}
            onDrop={handleLeftEyeDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleLeftEyeChange}
              className="hidden"
              ref={leftEyeInputRef}
            />

            {leftEyePreview ? (
              <div className="space-y-4">
                <div className="aspect-square max-h-[200px] mx-auto overflow-hidden rounded-lg">
                  <img
                    src={leftEyePreview}
                    alt="Left Eye Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setLeftEyeFile(null);
                      setLeftEyePreview(null);
                      if (leftEyeInputRef.current) {
                        leftEyeInputRef.current.value = "";
                      }
                    }}
                  >
                    Change Image
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload left eye image
                </p>
                <div className="flex justify-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => leftEyeInputRef.current?.click()}
                  >
                    <Upload className="mr-1 h-3 w-3" />
                    Upload
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={handleLeftEyeCapture}
                  >
                    <Camera className="mr-1 h-3 w-3" />
                    Camera
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Eye Upload */}
        <div>
          <Label className="mb-2 block">Right Eye Image</Label>
          <div
            className={`border-2 border-dashed rounded-xl p-4 transition-all ${
              rightEyePreview ? "border-secondary/40" : "border-border hover:border-secondary/40"
            } bg-background/50`}
            onDragOver={handleDragOver}
            onDrop={handleRightEyeDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleRightEyeChange}
              className="hidden"
              ref={rightEyeInputRef}
            />

            {rightEyePreview ? (
              <div className="space-y-4">
                <div className="aspect-square max-h-[200px] mx-auto overflow-hidden rounded-lg">
                  <img
                    src={rightEyePreview}
                    alt="Right Eye Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setRightEyeFile(null);
                      setRightEyePreview(null);
                      if (rightEyeInputRef.current) {
                        rightEyeInputRef.current.value = "";
                      }
                    }}
                  >
                    Change Image
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload right eye image
                </p>
                <div className="flex justify-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => rightEyeInputRef.current?.click()}
                  >
                    <Upload className="mr-1 h-3 w-3" />
                    Upload
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={handleRightEyeCapture}
                  >
                    <Camera className="mr-1 h-3 w-3" />
                    Camera
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analysis Button */}
      <div className="flex justify-center mt-6">
        {(leftEyePreview && rightEyePreview) ? (
          <div className="space-x-3">
            <Button variant="outline" onClick={resetAnalysis}>
              Start Over
            </Button>
            <Button 
              onClick={analyzeImages} 
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
                  Analyze Eyes
                </>
              )}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Please upload both left and right eye images to proceed with analysis
          </p>
        )}
      </div>

      {/* Results Section */}
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
