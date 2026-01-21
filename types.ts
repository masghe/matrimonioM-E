
export type Language = 'it' | 'ro';

// Define ChatMessage interface for the Assistant component state
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface RsvpData {
  name: string;
  email: string;
  guests: number;
  adults: number;
  children: number;
  attending: 'yes' | 'no';
  dietaryRestrictions: string;
}

export interface SectionProps {
  id: string;
  lang: Language;
}

export const translations = {
  it: {
    announce: "Siamo lieti di annunciare",
    date: "25 . 06 . 2026",
    longDate: "25 GIUGNO 2026",
    ceremony: "La Cerimonia",
    reception: "Il Ricevimento",
    ceremonyLocation: "Cattedrale di S. Francesco d’Assisi",
    receptionLocation: "Villa dei Desideri",
    ceremonyTime: "Ore 16:00",
    receptionTime: "A partire dalle 18:00",
    quote: '"Amare non è guardarsi l\'un l\'altro, ma guardare insieme nella stessa direzione."',
    viewMap: "Vedi mappa",
    visitWebsite: "Visita il sito",
    rsvpTitle: "Conferma Presenza",
    rsvpSubtitle: "Unisciti a noi",
    rsvpDeadline: "Si prega di confermare entro il 1 Maggio",
    nameLabel: "Nome e Cognome",
    emailLabel: "Email",
    guestsLabel: "Ospiti Totali",
    adultsLabel: "Di cui Adulti",
    childrenLabel: "Di cui Bambini",
    attendingLabel: "Partecipazione",
    dietaryLabel: "Allergie o Intolleranze",
    dietaryNote: "Il menu sarà a base di pesce. Vi preghiamo di segnalarci eventuali allergie o necessità di menu alternativi.",
    placeholderOptional: "Esempio: No pesce, Celiachia, etc.",
    accept: "Accetto con gioia",
    decline: "Declino con dispiacere",
    confirmBtn: "Conferma",
    sendingBtn: "Invio...",
    successTitle: "Grazie!",
    successMsg: "Abbiamo ricevuto la tua risposta. Non vediamo l'ora di festeggiare con te.",
    footer: "Con amore.",
    // Added assistant translations
    assistantTitle: "Assistente Virtuale",
    assistantWelcome: "Ciao! Sono l'assistente di Marco & Emilia. Come posso aiutarti?",
    assistantPlaceholder: "Fai una domanda...",
    // New Welcome Section
    welcomeTitle: "Benvenuti al nostro matrimonio!",
    welcomeText: "Siamo felicissimi! Non stiamo più nella pelle e vogliamo condividere con te questa notizia! Stiamo organizzando questo matrimonio e vogliamo che sia un giorno speciale per tutti. In attesa del grande giorno, abbiamo creato questo sito dove puoi trovare tutte le informazioni.",
    gettingMarried: "Ci sposiamo!",
  },
  ro: {
    announce: "Suntem bucuroși să vă anunțăm",
    date: "25 . 06 . 2026",
    longDate: "25 IUNIE 2026",
    ceremony: "Cununia Religioasă",
    reception: "Petrecerea",
    ceremonyLocation: "Catedrala Sfântul Francisc de Assisi",
    receptionLocation: "Villa dei Desideri",
    ceremonyTime: "Ora 16:00",
    receptionTime: "Începând cu ora 18:00",
    quote: '"A iubi nu înseamnă a ne privi unul pe celălalt, ci a privi amândoi în aceeași direcție."',
    viewMap: "Vezi pe hartă",
    visitWebsite: "Vizitează site-ul",
    rsvpTitle: "Confirmă Prezența",
    rsvpSubtitle: "Fiți alături de noi",
    rsvpDeadline: "Vă rugăm să confirmați până pe 1 Mai",
    nameLabel: "Nume și Prenume",
    emailLabel: "Email",
    guestsLabel: "Număr total de Persoane",
    adultsLabel: "Din care Adulți",
    childrenLabel: "Din care Copii",
    attendingLabel: "Prezență",
    dietaryLabel: "Alergii sau Intoleranțe",
    dietaryNote: "Meniul va fi pe bază de pește. Vă rugăm să ne comunicați eventualele alergii sau necesitatea unui meniu alternativ.",
    placeholderOptional: "Exemplu: Fără pește, Celiachie, etc.",
    accept: "Accept cu bucurie",
    decline: "Refuz cu regret",
    confirmBtn: "Confirmă",
    sendingBtn: "Se trimite...",
    successTitle: "Mulțumim!",
    successMsg: "Am primit răspunsul tău. Abia așteptăm să sărbătorim împreună.",
    footer: "Cu dragoste.",
    // Added assistant translations
    assistantTitle: "Asistent Virtual",
    assistantWelcome: "Bună! Sunt asistentul lui Marco & Emilia. Cu ce te pot ajuta?",
    assistantPlaceholder: "Pune o întrebare...",
    // New Welcome Section
    welcomeTitle: "Bine ați venit la nunta noastră!",
    welcomeText: "Suntem foarte fericiți! Abia așteptăm și vrem să împărtășim cu voi această veste! Organizăm această nuntă și ne dorim să fie o zi specială pentru toată lumea. În așteptarea marii zile, am creat acest site unde puteți găsi toate informațiile.",
    gettingMarried: "Ne căsătorim!",
  }
};
