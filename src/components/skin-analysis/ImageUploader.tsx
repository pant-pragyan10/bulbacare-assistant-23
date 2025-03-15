
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Camera, ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  previewUrl: string | null;
  onFileSelected: (file: File) => void;
  resetAnalysis: () => void;
}

const ImageUploader = ({ previewUrl, onFileSelected, resetAnalysis }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (file.type.startsWith("image/")) {
        onFileSelected(file);
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
        onFileSelected(file);
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

  return (
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
  );
};

export default ImageUploader;
