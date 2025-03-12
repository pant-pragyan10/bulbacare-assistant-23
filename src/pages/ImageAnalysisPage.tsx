
import { useState } from "react";
import Layout from "@/components/Layout";
import SkinImageAnalysis from "@/components/SkinImageAnalysis";
import EyeImageAnalysis from "@/components/EyeImageAnalysis";
import ResultsCard from "@/components/ResultsCard";
import { Scan, FileQuestion, Search, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ImageAnalysisPage = () => {
  const previousResults = [
    {
      id: 1,
      title: "Atopic Dermatitis",
      description: 
        "Atopic dermatitis is a chronic skin condition characterized by red, itchy, and inflamed skin. It typically affects the insides of the elbows, backs of the knees, and the face.",
      confidenceScore: 94,
      symptoms: [
        "Dry, sensitive skin",
        "Intense itching",
        "Red to brownish-gray patches",
        "Small, raised bumps",
      ],
      recommendations: [
        "Apply moisturizer at least twice daily",
        "Use mild, fragrance-free soaps",
        "Avoid scratching affected areas",
        "Consider prescription corticosteroid creams",
      ],
      date: "2023-08-15",
      imageUrl: "https://images.unsplash.com/photo-1612776569606-d96f95d1c0ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Conjunctivitis",
      description:
        "Conjunctivitis, commonly known as pink eye, is an inflammation of the conjunctiva. The condition can be allergic, bacterial, or viral and is typically characterized by redness and eye discharge.",
      confidenceScore: 87,
      symptoms: [
        "Redness in the white of the eye",
        "Increased tear production",
        "Thick yellow discharge (bacterial)",
        "Burning or itchy eyes",
      ],
      recommendations: [
        "Apply warm compresses to affected eyes",
        "Avoid touching or rubbing your eyes",
        "Dispose of eye cosmetics if infected",
        "See a doctor for prescription eye drops",
      ],
      date: "2023-09-22",
      imageUrl: "https://images.unsplash.com/photo-1560707854-fb9a10ced4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <Layout>
      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-2 text-center mb-8">
            <h1 className="heading-lg">Skin & Eye Disease Detection</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload a photo of your skin condition or eye to get an AI-powered analysis and recommendations. Our system provides quick, accurate assessments to help guide your healthcare decisions.
            </p>
          </div>

          <div className="mb-12">
            <Tabs defaultValue="skin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="skin" className="flex items-center gap-2">
                  <Scan className="h-4 w-4" />
                  <span>Skin Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="eye" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>Eye Analysis</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="skin">
                <SkinImageAnalysis />
              </TabsContent>
              <TabsContent value="eye">
                <EyeImageAnalysis />
              </TabsContent>
            </Tabs>
          </div>

          {previousResults.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Search className="h-5 w-5 text-primary" />
                <h2 className="heading-sm">Previous Analyses</h2>
              </div>
              <div className="space-y-6">
                {previousResults.map((result) => (
                  <ResultsCard
                    key={result.id}
                    title={result.title}
                    description={result.description}
                    confidenceScore={result.confidenceScore}
                    symptoms={result.symptoms}
                    recommendations={result.recommendations}
                    imageUrl={result.imageUrl}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ImageAnalysisPage;
