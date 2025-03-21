
import { Client } from "@gradio/client";

interface EyePredictionResult {
  condition: string;
  confidence: number;
}

interface EyeAnalysisParameters {
  leftImageFile: File;
  rightImageFile: File;
}

export const getEyeDiseasePrediction = async (
  { leftImageFile, rightImageFile }: EyeAnalysisParameters
): Promise<EyePredictionResult> => {
  try {
    // Convert Files to Blobs
    const leftEyeBlob = new Blob([await leftImageFile.arrayBuffer()], { type: leftImageFile.type });
    const rightEyeBlob = new Blob([await rightImageFile.arrayBuffer()], { type: rightImageFile.type });
    
    // Connect to the Gradio client
    const client = await Client.connect("Vinit710/GMED");
    
    // Make prediction with both eye images
    const result = await client.predict("/predict", { 
      left_image: leftEyeBlob,
      right_image: rightEyeBlob
    });

    // Extract the prediction data
    const prediction = result.data;
    console.log("Eye prediction data:", prediction);
    
    // Parse the results
    // Assuming the API returns an object with disease probabilities
    // This may need adjustment based on the actual response format
    const predictionObj = Array.isArray(prediction) && prediction.length > 0 
      ? prediction[0] 
      : prediction;
    
    // Find the condition with the highest probability
    let highestCondition = "Diabetic Retinopathy";
    let highestConfidence = 0;
    
    // Iterate through the prediction object to find the condition with highest probability
    // Adjust this parsing logic based on the actual response format
    if (typeof predictionObj === 'object' && predictionObj !== null) {
      for (const [condition, probabilityStr] of Object.entries(predictionObj)) {
        // Convert probability string to number
        const confidence = parseFloat(String(probabilityStr).replace('%', ''));
        
        if (confidence > highestConfidence) {
          highestConfidence = confidence;
          highestCondition = condition;
        }
      }
    }

    return {
      condition: highestCondition,
      confidence: Math.round(highestConfidence)
    };
  } catch (error) {
    console.error("Error predicting eye disease:", error);
    throw error;
  }
};

// Information about eye conditions
export const eyeDiseaseInfo: Record<string, {
  description: string;
  symptoms: string[];
  recommendations: string[];
}> = {
  "Diabetic Retinopathy": {
    description: "A diabetes complication that affects the eyes by damaging the blood vessels in the retina, potentially leading to vision loss and blindness.",
    symptoms: [
      "Blurred vision",
      "Fluctuating vision",
      "Impaired color vision",
      "Dark or empty areas in your vision",
      "Vision loss"
    ],
    recommendations: [
      "Manage your blood sugar levels carefully",
      "Get regular eye exams",
      "Control blood pressure and cholesterol",
      "Seek immediate medical attention if you notice vision changes",
      "Consider laser treatment or other procedures if recommended by your doctor"
    ]
  },
  "Glaucoma": {
    description: "A group of eye conditions that damage the optic nerve, often caused by abnormally high pressure in the eye.",
    symptoms: [
      "Gradual loss of peripheral vision",
      "Tunnel vision in advanced stages",
      "Severe eye pain",
      "Nausea and vomiting",
      "Blurred vision"
    ],
    recommendations: [
      "Use prescribed eye drops regularly",
      "Undergo regular eye exams",
      "Protect eyes from injury",
      "Consider laser therapy or surgery if recommended",
      "Limit caffeine consumption"
    ]
  },
  "Cataract": {
    description: "A clouding of the normally clear lens of the eye, leading to decreased vision.",
    symptoms: [
      "Clouded, blurred or dim vision",
      "Increasing difficulty with vision at night",
      "Sensitivity to light and glare",
      "Seeing halos around lights",
      "Fading or yellowing of colors"
    ],
    recommendations: [
      "Use brighter lighting",
      "Wear anti-glare sunglasses",
      "Use magnifying lenses when needed",
      "Consider surgery when vision impairment affects daily activities",
      "Update eyeglass or contact lens prescription"
    ]
  },
  "Age-related Macular Degeneration": {
    description: "A common eye condition that causes damage to the macula, a small area near the center of the retina needed for sharp, central vision.",
    symptoms: [
      "Blurred or reduced central vision",
      "Difficulty adapting to low light levels",
      "Need for increasingly bright light when reading",
      "Visual distortions (straight lines appear wavy)",
      "Decreased intensity or brightness of colors"
    ],
    recommendations: [
      "Eat a diet rich in fruits and vegetables",
      "Exercise regularly",
      "Maintain normal blood pressure and cholesterol levels",
      "Avoid smoking",
      "Consider AREDS vitamins if recommended by your doctor"
    ]
  }
};
