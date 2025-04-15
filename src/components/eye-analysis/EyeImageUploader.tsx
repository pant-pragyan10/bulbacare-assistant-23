
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Eye } from "lucide-react";
import { toast } from "sonner";

interface EyeImageUploaderProps {
  eyePreview: string | null;
  onFileSelected: (file: File) => void;
  resetPreview: () => void;
}

const EyeImageUploader = ({ eyePreview, onFileSelected, resetPreview }: EyeImageUploaderProps) => {
  const eyeInputRef = useRef<HTMLInputElement>(null);
  const cameraCaptureRef = useRef<HTMLInputElement>(null);

  const handleEyeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.type.startsWith("image/")) {
        onFileSelected(file);
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
        onFileSelected(file);
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

  return (
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
              onClick={resetPreview}
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
  );
};

export default EyeImageUploader;
