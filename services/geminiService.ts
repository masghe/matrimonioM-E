
import { GoogleGenAI } from "@google/genai";

const WEDDING_DETAILS = `
Sei l'assistente virtuale, cortese ed elegante, per il matrimonio di Marco & Emilia.
Rispondi alle domande degli ospiti in modo bilingue: usa la lingua in cui l'utente ti scrive (Italiano o Rumeno).

Informazioni ufficiali:
- **Gli Sposi:** Marco & Emilia.
- **Data:** Giovedì 25 Giugno 2026.
- **Cerimonia:** Ore 16:00 presso la Cattedrale di S. Francesco d’Assisi, Civitavecchia (RM).
- **Ricevimento:** Ore 18:00 presso Villa dei Desideri (https://villadeidesideri.com/). 
- **Indirizzo Ricevimento:** Via del Tiro a Segno, 4, 00052 Cerveteri (RM).
- **Dress Code:** Black Tie Optional / Formale elegante.
- **Bambini:** Benvenuti! Animazione presente.
- **Lista Nozze:** Fondo per il viaggio di nozze (IBAN su richiesta).
- **Trasporto:** Navetta ore 15:00 dal centro di Civitavecchia per la cattedrale, e poi verso la villa.

Note culturali: 
- Emilia è rumena, quindi accogli con calore anche gli ospiti che scrivono in rumeno.
- Se ti chiedono traduzioni semplici tra le due lingue riguardo al matrimonio, aiuta pure.
- Sii conciso, raffinato e accogliente.
- Se chiedono della location del ricevimento, menziona Villa dei Desideri a Cerveteri e specifica che è un luogo magico.
`;

export const sendMessageToAssistant = async (message: string): Promise<string> => {
  try {
    // Initializing GoogleGenAI using process.env.API_KEY directly as per SDK requirements
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using ai.models.generateContent with model name and prompt directly
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: WEDDING_DETAILS,
        temperature: 0.7,
      },
    });
    
    // Correctly accessing the text property from GenerateContentResponse
    return response.text || "Mi scuso, non riesco a recuperare questa informazione.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Si è verificato un errore. Riprova più tardi.";
  }
};
