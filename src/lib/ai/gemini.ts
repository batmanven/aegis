import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getSurvivalAdvice = async (query: string, context?: string) => {
  const prompt = `
    You are the AEGIS GRID Survival AI, a specialized assistant for disaster scenarios.
    Your tone is tactical, calm, and highly practical. Use concise bullet points for instructions.
    
    Current Context: ${context || "General disaster preparedness"}
    User Query: ${query}
    
    Provide immediate survival instructions. If the user asks for things unrelated to disasters, briefly redirect them to stay focused on safety.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error('Gemini SDK Error:', error);
    throw error;
  }
};
