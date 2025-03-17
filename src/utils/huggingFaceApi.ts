
import { Client } from "@gradio/client";

interface PredictionResult {
  label: string;
  confidence: number;
}

export const getSkinDiseasePrediction = async (imageFile: File): Promise<PredictionResult> => {
  try {
    // Convert File to Blob
    const blob = new Blob([await imageFile.arrayBuffer()], { type: imageFile.type });
    
    // Connect to the Gradio client
    const client = await Client.connect("pant-pragyan10/skin-disease-detection");
    
    // Make prediction
    const result = await client.predict("/predict", { 
      img: blob,
    });

    // Parse the result - assuming the model returns a string with format "disease_name (confidence%)"
    const prediction = result.data[0];
    
    // Extract disease name and confidence from the prediction
    // This parsing might need adjustment based on the actual format returned by the model
    const match = String(prediction).match(/(.+?)\s*\((\d+\.?\d*)%\)/);
    const disease = match ? match[1] : String(prediction);
    const confidence = match ? parseFloat(match[2]) : 90;

    return {
      label: disease,
      confidence: confidence
    };
  } catch (error) {
    console.error("Error predicting skin disease:", error);
    throw error;
  }
};

// Map the disease labels to more detailed information
export const diseaseInfo: Record<string, {
  description: string;
  symptoms: string[];
  recommendations: string[];
}> = {
  "Acne": {
    description: "A skin condition that occurs when hair follicles plug with oil and dead skin cells.",
    symptoms: [
      "Whiteheads (closed plugged pores)",
      "Blackheads (open plugged pores)",
      "Small red, tender bumps (papules)",
      "Pimples (pustules), which are papules with pus at their tips"
    ],
    recommendations: [
      "Wash affected areas with a gentle cleanser",
      "Avoid harsh products that can irritate skin",
      "Consider over-the-counter products containing benzoyl peroxide",
      "Consult a dermatologist for prescription treatments"
    ]
  },
  "Actinic Keratosis": {
    description: "A rough, scaly patch on the skin caused by years of sun exposure.",
    symptoms: [
      "Rough, dry or scaly patch of skin",
      "Flat to slightly raised patch or bump on the top layer of skin",
      "In some cases, a hard, wart-like surface",
      "Color variations, including pink, red or brown"
    ],
    recommendations: [
      "Use broad-spectrum sunscreen with SPF 30+",
      "Wear protective clothing and seek shade",
      "Have regular skin exams by a dermatologist",
      "Consider treatments like cryotherapy or topical medications"
    ]
  },
  "Basal Cell Carcinoma": {
    description: "The most common type of skin cancer, usually developing on sun-exposed skin areas.",
    symptoms: [
      "A shiny, skin-colored bump that's translucent",
      "A brown, black or blue lesion",
      "A flat, scaly patch with a raised edge",
      "A white, waxy, scar-like lesion"
    ],
    recommendations: [
      "Seek immediate medical attention",
      "Schedule a complete skin examination",
      "Discuss treatment options with a dermatologist",
      "Regular follow-ups to check for recurrence"
    ]
  },
  "Dermatitis": {
    description: "A general term for skin inflammation with symptoms like swollen, reddened and itchy skin.",
    symptoms: [
      "Dry, sensitive skin", 
      "Redness and inflammation", 
      "Itchiness",
      "Swollen and raw skin"
    ],
    recommendations: [
      "Apply moisturizer frequently",
      "Use mild, fragrance-free soaps",
      "Identify and avoid triggers",
      "Consider antihistamines for itching"
    ]
  },
  "Melanoma": {
    description: "The most serious type of skin cancer, forming in cells that produce melanin.",
    symptoms: [
      "A change in an existing mole",
      "Development of a new pigmented growth",
      "A mole that changes in color, size or feel",
      "A mole that bleeds"
    ],
    recommendations: [
      "Seek immediate medical attention",
      "Have a dermatologist perform a skin biopsy",
      "Discuss treatment options based on stage",
      "Regular skin checks to monitor for changes"
    ]
  },
  "Nevus": {
    description: "A common type of skin growth that is usually benign (non-cancerous), also known as a mole.",
    symptoms: [
      "Round growth on the skin",
      "Usually brown, but can be other colors",
      "Can be flat or raised",
      "Generally present from childhood or adolescence"
    ],
    recommendations: [
      "Monitor for changes in size, shape or color",
      "Regular skin self-examinations",
      "Shield moles from excessive sun exposure",
      "Consult a dermatologist if you notice changes"
    ]
  },
  "Seborrheic Keratosis": {
    description: "A common benign skin growth that often appears as a waxy, stuck-on growth.",
    symptoms: [
      "Waxy, scaly, slightly raised growths",
      "Color ranging from light tan to black",
      "Round or oval shaped lesions",
      "Gradually increases in size and thickness"
    ],
    recommendations: [
      "No treatment is necessary for benign growths",
      "Removal options if they become irritated",
      "Regular monitoring for changes",
      "Consult a dermatologist if concerned"
    ]
  },
  "Squamous Cell Carcinoma": {
    description: "The second most common type of skin cancer that develops in the squamous cells of the skin.",
    symptoms: [
      "A firm, red nodule",
      "A flat lesion with a scaly, crusted surface",
      "A new sore or raised area on an old scar",
      "A rough, scaly patch on your lip"
    ],
    recommendations: [
      "Seek immediate medical attention",
      "Complete skin examination by a dermatologist",
      "Discuss treatment options based on stage",
      "Follow-up exams to check for new cancers"
    ]
  },
  "Vascular Lesion": {
    description: "Relatively common abnormalities of the skin and underlying tissues, often present at birth.",
    symptoms: [
      "Red or purple discoloration of the skin",
      "Raised or flat lesions",
      "May change in appearance with temperature or emotion",
      "Can appear anywhere on the body"
    ],
    recommendations: [
      "Monitor for changes in size or color",
      "Laser therapy may be an option for cosmetic concerns",
      "Consult with a dermatologist for evaluation",
      "No treatment needed for most benign lesions"
    ]
  }
};
