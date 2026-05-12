import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.gemini_api!
})


export const formattedText = async (text: string) : Promise<string> => {
  try {

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are a Hindi poetry narration formatter.

        Your task is to format OCR extracted Hindi poetry for emotional AI voice narration.

        Rules:
        - Preserve the original meaning exactly
        - Keep output entirely in Hindi
        - Add natural poetic line breaks
        - Add subtle pauses naturally
        - Improve readability for text-to-speech
        - Remove OCR artifacts if present
        - Do NOT explain anything
        - Output ONLY the final formatted poem
        - Do NOT add headings or commentary

        Poem:
        ${text}`
    });

    const formatted = response.text?.trim();

    if (!formatted) {
      throw new Error("Empty AI response");
    }

    return formatted;
  }
  catch(e){
    console.log(e);
    throw new Error("failed to format text.")
  }

  
}