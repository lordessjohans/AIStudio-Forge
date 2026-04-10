import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getForgeAdvice(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are the AI Studio Forge Assistant. Your goal is to help users build AI applications using Google AI Studio. Suggest templates, explain concepts, and provide encouragement. Keep responses concise and helpful.",
      },
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "There was an error connecting to the AI Forge. Please check your API key.";
  }
}
