
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface ResultsDisplayProps {
  results: {
    label: string;
    symptoms?: string[];
    recommendations?: string[];
    description?: string;
  }[] | null;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-center text-gray-600">Analyzing image...</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return <p className="text-gray-600 text-center p-6">Upload an image to see analysis results</p>;
  }

  const result = results[0]; // Get the first result

  return (
    <Card className="animate-slide-in-bottom">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Analysis Results</h3>
          
          <div>
            <div className="text-sm text-muted-foreground mb-1">Condition</div>
            <div className="text-xl font-semibold">{result.label}</div>
          </div>

          {result.description && (
            <div>
              <div className="text-sm text-muted-foreground mb-1">Description</div>
              <p>{result.description}</p>
            </div>
          )}

          {result.symptoms && result.symptoms.length > 0 && (
            <div>
              <div className="text-sm text-muted-foreground mb-2">Common Symptoms</div>
              <ul className="space-y-1.5">
                {result.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-mint-100 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-mint-500"></div>
                    </div>
                    <span className="text-sm">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations && result.recommendations.length > 0 && (
            <div>
              <div className="text-sm text-muted-foreground mb-2">Recommendations</div>
              <ul className="space-y-1.5">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-sm">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start dark:bg-amber-950/30 dark:border-amber-800">
            <AlertCircle className="h-5 w-5 text-amber-500 dark:text-amber-400 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-300">
              This analysis is for informational purposes only and should not replace professional medical advice. Please consult a healthcare provider for proper diagnosis and treatment.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
