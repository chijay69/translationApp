import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function transcribeAudio(transcript: string): Promise<string> {
  try {
    // Create a model instance
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Prompt to enhance the transcript
    const prompt = `Please enhance and clean up this transcript while maintaining its original meaning. If the text is not in English, preserve the original language:

${transcript}

Return only the enhanced transcript without any additional text or explanations.`;

    // Generate enhanced transcription
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error enhancing transcript:', error);
    throw error;
  }
}

export async function translateText(text: string, fromLang: string, toLang: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Translate this text from ${fromLang} to ${toLang}. Maintain the meaning and tone while ensuring natural-sounding translation:

${text}

Return only the translated text without any additional text or explanations.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
} 