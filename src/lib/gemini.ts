import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCollegeContext } from "../data/collegeData";

// PLACEHOLDER: The user will manually add/remove this.
const API_KEY = "";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getAIResponse(history: { role: 'user' | 'model', parts: { text: string }[] }[], userPrompt: string) {
    if (!API_KEY) {
        return "I'm sorry, the AI assistant is currently in 'Static Mode' because the API key is missing. Please ask me about admissions, fees, or placements, and I'll use my built-in knowledge!";
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: getCollegeContext()
        });

        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessage(userPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini AI Error:", error);
        return "I encountered a slight technical glitch while thinking. Could you please try asking that again? Or feel free to check out our quick links!";
    }
}
