
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Check } from "lucide-react";

interface ResultsDisplayProps {
  result: {
    condition: string;
    symptoms: string[];
    recommendations: string[];
  };
}

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  return (
    <Card className="animate-slide-in-bottom">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium">Analysis Results</h3>
              <p className="text-sm text-muted-foreground">
                Based on our AI analysis
              </p>
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-1">Condition</div>
            <div className="text-xl font-semibold">{result.condition}</div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-2">Common Symptoms</div>
            <ul className="space-y-1.5">
              {result.symptoms.map((symptom: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-mint-100 flex items-center justify-center">
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
              {result.recommendations.map((recommendation: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start dark:bg-green-950 dark:border-green-800">
            <AlertCircle className="h-5 w-5 text-amber-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-green-200">
              This analysis is for informational purposes only and should not replace professional medical advice. Please consult a healthcare provider for proper diagnosis and treatment.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
