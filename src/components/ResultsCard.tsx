
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, AlertCircle } from "lucide-react";

interface ResultsCardProps {
  title: string;
  description: string;
  confidenceScore: number;
  symptoms: string[];
  recommendations: string[];
  imageUrl: string;
}

const ResultsCard = ({
  title,
  description,
  confidenceScore,
  symptoms,
  recommendations,
  imageUrl,
}: ResultsCardProps) => {
  return (
    <Card className="shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4 bg-background">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="mt-4">
            <div className="text-sm text-muted-foreground">Confidence Score</div>
            <div className="flex items-center justify-between mt-1">
              <div className="font-semibold text-lg">{confidenceScore}%</div>
              <div className="w-2/3 h-2 bg-muted rounded-full">
                <div 
                  className={`h-full rounded-full ${
                    confidenceScore > 80 ? 'bg-mint-500' : confidenceScore > 50 ? 'bg-amber-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${confidenceScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="px-0 py-2">
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Common Symptoms</h4>
                <ul className="space-y-1.5">
                  {symptoms.map((symptom, index) => (
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
                <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                <ul className="space-y-1.5">
                  {recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-0.5 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800">
                  This analysis is for informational purposes only and should not replace professional medical advice. Please consult a healthcare provider for proper diagnosis and treatment.
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Save Report
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Find Specialist
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default ResultsCard;
