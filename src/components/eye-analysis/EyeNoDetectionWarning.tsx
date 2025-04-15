
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const EyeNoDetectionWarning = () => {
  return (
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
  );
};

export default EyeNoDetectionWarning;
