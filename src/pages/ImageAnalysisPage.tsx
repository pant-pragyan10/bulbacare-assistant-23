
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
      title: "Melanoma",
      description: 
        "Melanoma is the most serious type of skin cancer. It develops in the cells that produce melanin — the pigment that gives your skin its color. Melanoma can also form in your eyes and, rarely, inside your body.",
      confidenceScore: 92,
      symptoms: [
        "A mole that changes in size, shape or color",
        "A large brownish spot with darker speckles",
        "A small lesion with an irregular border and portions that appear red, pink, white, blue or blue-black",
        "Dark lesions on your palms, soles, fingertips or toes",
      ],
      recommendations: [
        "Seek immediate medical attention",
        "Have regular skin exams by a dermatologist",
        "Consider treatment options based on stage",
        "Regular follow-ups after treatment",
      ],
      date: "2023-09-15",
      imageUrl: "https://images.unsplash.com/photo-1576671414121-aa2d0339189c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Diabetic Retinopathy",
      description:
        "Diabetic retinopathy is a diabetes complication that affects eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina). Initially, diabetic retinopathy may cause no symptoms or only mild vision problems.",
      confidenceScore: 88,
      symptoms: [
        "Spots or dark strings floating in your vision (floaters)",
        "Blurred vision",
        "Fluctuating vision",
        "Dark or empty areas in your vision",
      ],
      recommendations: [
        "Control your blood sugar",
        "Manage your blood pressure and cholesterol",
        "Schedule regular eye exams",
        "Consider surgery or other procedures if recommended",
      ],
      date: "2023-10-22",
      imageUrl: "https://images.unsplash.com/photo-1591076231125-7b8eed3408a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
