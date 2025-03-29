
import { Client } from "@gradio/client";

interface ChatResponse {
  response: string;
}

export const getMentalHealthResponse = async (
  userMessage: string,
  systemMessage: string = "You are Dr. Well Being, a mental health assistant. Provide supportive, empathetic responses."
): Promise<string> => {
  try {
    console.log("Sending message to Mental Health API:", { userMessage, systemMessage });
    
    // Connect to the Hugging Face space
    const client = await Client.connect("hrutikkharjul/Mental-health-chatbot");
    
    // Make the API request
    const result = await client.predict("/chat", {
      message: userMessage,
      system_message: systemMessage,
      max_tokens: 256,  // Increased for more complete responses
      temperature: 0.7, // Slightly increased for more natural responses
      top_p: 0.9,      // Adjusted for better response variety
    });

    // Log the full API response
    console.log("Mental Health API response:", result);
    
    // Handle the response format correctly based on the API structure
    if (result.data && Array.isArray(result.data) && result.data.length > 0) {
      // Extract the response text from the first element of the data array
      return result.data[0] || "I'm having trouble understanding. Can you rephrase that?";
    }
    
    // Fallback for unexpected response structure
    return "I'm having trouble understanding. Can you rephrase that?";
  } catch (error) {
    console.error("Error getting mental health response:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};
