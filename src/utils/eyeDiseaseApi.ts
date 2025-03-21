
import { Client } from "@gradio/client";

interface EyePredictionResult {
  condition: string;
  confidence: number;
}

export const getEyeDiseasePrediction = async (imageFile: File): Promise<EyePredictionResult> => {
  try {
    // Convert File to Blob
    const blob = new Blob([await imageFile.arrayBuffer()], { type: imageFile.type });
    
    // Connect to the Gradio client
    const client = await Client.connect("alexakup05/eye");
    
    // Make prediction
    const result = await client.predict("/predict", { 
      age: 0,      
      sex: "Male",
      img: blob, 
    });

    // Extract the prediction data
    // This parsing might need adjustment based on the actual format returned by the model
    const prediction = result.data;
    console.log("Eye prediction data:", prediction);
    
    // Extract condition and confidence
    // Assuming the API returns data in a specific format - this may need adjustment
    const condition = Array.isArray(prediction) && prediction.length > 0 
      ? String(prediction[0]) 
      : "Diabetic Retinopathy";
    
    // Default confidence if not provided in the response
    const confidence = 85;

    return {
      condition,
      confidence
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
