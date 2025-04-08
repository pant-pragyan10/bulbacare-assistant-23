import { toast } from "sonner";

// Disease information database
export const skinDiseaseInfo: Record<string, {
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

// New implementation using Google's Generative AI
const API_KEY = "AIzaSyBKz0s6bMJvjq2ezF1yaQ5crjd6FtyMlmA";

// Function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = error => reject(error);
  });
};

// Modified to work in browser environment with File objects
export const detectDiseaseFromImage = async (imageFile: File): Promise<string> => {
  try {
    // Load the Google Generative AI SDK dynamically
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    
    // Initialize the API with our key
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Get base64 data from the file
    const base64Data = await fileToBase64(imageFile);
    
    // Set up the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = "Only return the name of the Human disease in this image. Do not give extra text.";
    
    // Create the image part
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: imageFile.type
      }
    };
    
    // Generate content
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text().trim();
    
    console.log("Gemini API response:", text);
    return text;
    
  } catch (error) {
    console.error("Error detecting disease with Gemini API:", error);
    toast.error("Failed to analyze the image with Gemini API. Please try again.");
    
    // Fallback to a random disease for demonstration
    const skinDiseases = Object.keys(skinDiseaseInfo);
    const eyeDiseases = Object.keys(eyeDiseaseInfo);
    const isEyeImage = imageFile.name.toLowerCase().includes('eye');
    const diseases = isEyeImage ? eyeDiseases : skinDiseases;
    const randomIndex = Math.floor(Math.random() * diseases.length);
    
    return diseases[randomIndex];
  }
};

// Function to handle both skin and eye disease detection
export const getDiseaseInfo = (diseaseName: string, type: 'skin' | 'eye') => {
  const infoDatabase = type === 'skin' ? skinDiseaseInfo : eyeDiseaseInfo;
  
  // Find the disease in our database, or return a default
  return infoDatabase[diseaseName] || {
    description: "Information not available for this condition.",
    symptoms: ["Not specified"],
    recommendations: ["Consult a healthcare professional for more information."]
  };
};
