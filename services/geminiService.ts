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
`;

export const sendMessageToAssistant = async (message: string): Promise<string> => {
  try {
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
    
    if (!apiKey) {
      console.warn("API Key non configurata.");
      return "L'assistente non è disponibile al momento.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: WEDDING_DETAILS,
        temperature: 0.7,
      },
    });
    
    return response.text || "Mi scuso, non riesco a rispondere.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Si è verificato un errore di connessione.";
  }
};