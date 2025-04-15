
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera, RefreshCw, Check, AlertCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { detectDiseaseFromImage, getDiseaseInfo } from "@/utils/geminiApi";
import { Label } from "@/components/ui/label";

const EyeImageAnalysis = () => {
  const [eyeFile, setEyeFile] = useState<File | null>(null);
  const [eyePreview, setEyePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [noEyeDetected, setNoEyeDetected] = useState(false);
  const eyeInputRef = useRef<HTMLInputElement>(null);
  const cameraCaptureRef = useRef<HTMLInputElement>(null);

  const handleEyeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.type.startsWith("image/")) {
        setEyeFile(file);
        setEyePreview(URL.createObjectURL(file));
        setAnalysisResult(null);
        setNoEyeDetected(false);
      } else {
        toast.error("Please select an image file for the eye.");
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleEyeDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    if (file) {
      if (file.type.startsWith("image/")) {
        setEyeFile(file);
        setEyePreview(URL.createObjectURL(file));
        setAnalysisResult(null);
        setNoEyeDetected(false);
      } else {
        toast.error("Please drop an image file for the eye.");
      }
    }
  };

  const handleEyeCapture = () => {
    if (cameraCaptureRef.current) {
      cameraCaptureRef.current.click();
    }
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

  const resetAnalysis = () => {
    setEyeFile(null);
    setEyePreview(null);
    setAnalysisResult(null);
    setNoEyeDetected(false);
    if (eyeInputRef.current) {
      eyeInputRef.current.value = "";
    }
    if (cameraCaptureRef.current) {
      cameraCaptureRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="max-w-md mx-auto">
        {/* Eye Upload */}
        <div>
          <Label className="mb-2 block">Eye Image</Label>
          <div
            className={`border-2 border-dashed rounded-xl p-4 transition-all ${
              eyePreview ? "border-secondary/40" : "border-border hover:border-secondary/40"
            } bg-background/50`}
            onDragOver={handleDragOver}
            onDrop={handleEyeDrop}
          >
            {/* Regular file upload input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleEyeChange}
              className="hidden"
              ref={eyeInputRef}
            />
            
            {/* Camera capture input */}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleEyeChange}
              className="hidden"
              ref={cameraCaptureRef}
            />

            {eyePreview ? (
              <div className="space-y-4">
                <div className="aspect-square max-h-[250px] mx-auto overflow-hidden rounded-lg">
                  <img
                    src={eyePreview}
                    alt="Eye Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setEyeFile(null);
                      setEyePreview(null);
                      setNoEyeDetected(false);
                      if (eyeInputRef.current) {
                        eyeInputRef.current.value = "";
                      }
                      if (cameraCaptureRef.current) {
                        cameraCaptureRef.current.value = "";
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
                  Upload eye image
                </p>
                <div className="flex justify-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => eyeInputRef.current?.click()}
                  >
                    <Upload className="mr-1 h-3 w-3" />
                    Upload
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={handleEyeCapture}
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
        {eyePreview ? (
          <div className="space-x-3">
            <Button variant="outline" onClick={resetAnalysis}>
              Start Over
            </Button>
            <Button 
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
        ) : (
          <p className="text-sm text-muted-foreground">
            Please upload an eye image to proceed with analysis
          </p>
        )}
      </div>

      {/* No Eye Detected Message */}
      {noEyeDetected && (
        <Card className="animate-slide-in-bottom bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">No Eye Detected</h3>
                <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
                  We couldn't detect an eye in the uploaded image. Please upload a clearer image that shows the eye properly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {analysisResult && (
        <Card className="animate-slide-in-bottom">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center">
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
