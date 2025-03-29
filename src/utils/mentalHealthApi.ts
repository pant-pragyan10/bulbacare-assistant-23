
import { Client } from "@gradio/client";

interface ChatResponse {
  response: string;
}

export const getMentalHealthResponse = async (
  userMessage: string,
  systemMessage: string = "You are Dr. Well Being, a mental health assistant. Provide supportive, empathetic responses."
): Promise<string> => {
  try {
    const client = await Client.connect("hrutikkharjul/Mental-health-chatbot");
    const result = await client.predict("/chat", {
      message: userMessage,
      system_message: systemMessage,
      max_tokens: 256, // Increased for more complete responses
      temperature: 0.7, // Slightly increased for more natural responses
      top_p: 0.9, // Adjusted for better response variety
    });

    // Parse the response data
    const response = result.data as ChatResponse;
    return response.response || "I'm having trouble understanding. Can you rephrase that?";
  } catch (error) {
    console.error("Error getting mental health response:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};
