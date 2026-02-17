
export type Language = 'it' | 'ro';

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
    ceremonyTime: "Ore 16:30",
    receptionTime: "A partire dalle 18:30",
    viewMap: "Vedi mappa",
    visitWebsite: "Visita il sito",
    rsvpTitle: "Conferma Presenza",
    rsvpSubtitle: "Unisciti a noi",
    rsvpDeadline: "Si prega di confermare entro il 25 Maggio",
    nameLabel: "Nome e Cognome",
    emailLabel: "Email",
    guestsLabel: "Ospiti",
    adultsLabel: "Adulti",
    childrenLabel: "Bambini",
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
    welcomeTitle: "Benvenuti al nostro matrimonio!",
    welcomeText: "Siamo felicissimi! Non stiamo più nella pelle e vogliamo condividere con te questa notizia! Stiamo organizzando questo matrimonio e vogliamo che sia un giorno speciale per tutti. In attesa del grande giorno, abbiamo creato questo sito dove puoi trovare tutte le informazioni.",
    gettingMarried: "Ci sposiamo!",
    assistantWelcome: "Ciao! Sono l'assistente di Marco ed Emilia. Come posso aiutarti?",
    assistantTitle: "Wedding Assistant",
    assistantPlaceholder: "Scrivi un messaggio...",
    days: "Giorni",
    hours: "Ore",
    minutes: "Minuti",
    seconds: "Secondi",
    contactsTitle: "Contatti",
    giftTitle: "Lista Regalo",
    giftSubtitle: "Un pensiero per noi",
    giftText1: "Il regalo più bello sarà festeggiare insieme questo evento, per noi, così importante.",
    giftText2: "Chi lo desidera potrà contribuire al nostro viaggio di nozze:",
    ibanLabel: "IBAN",
    holderLabel: "INTESTATO A",
    reasonLabel: "Causale",
    reasonText: "Regalo viaggio di nozze – Marco ed Emilia",
    copyIban: "Copia IBAN"
  },
  ro: {
    announce: "Suntem bucuroși să vă anunțăm",
    date: "25 . 06 . 2026",
    longDate: "25 IUNIE 2026",
    ceremony: "Cununia Religioasă",
    reception: "Petrecerea",
    ceremonyLocation: "Catedrala Sfântul Francisc de Assisi",
    receptionLocation: "Villa dei Desideri",
    ceremonyTime: "Ora 16:30",
    receptionTime: "Începând cu ora 18:30",
    viewMap: "Vezi pe hartă",
    visitWebsite: "Vizitează site-ul",
    rsvpTitle: "Confirmă Prezența",
    rsvpSubtitle: "Fiți alături de noi",
    rsvpDeadline: "Vă rugăm să confirmați până pe 25 Mai",
    nameLabel: "Nume și Prenume",
    emailLabel: "Email",
    guestsLabel: "Oaspeți",
    adultsLabel: "Adulti",
    childrenLabel: "Copii",
    attendingLabel: "Prezență",
    dietaryLabel: "Alergii sau Intoleranțe",
    dietaryNote: "Meniul va fi pe bază de pește. Vă rugăm să ne comunicați eventualele alerii sau necesitatea unui menu alternativ.",
    placeholderOptional: "Exemplu: Fără pește, Celiachie, etc.",
    accept: "Accept cu bucurie",
    decline: "Refuz cu regret",
    confirmBtn: "Confirmă",
    sendingBtn: "Se trimite...",
    successTitle: "Mulțumim!",
    successMsg: "Am primit răspunsul tău. Abia așteptăm să sărbătorim împreună.",
    footer: "Cu dragoste.",
    welcomeTitle: "Bine ați venit la nunta noastră!",
    welcomeText: "Suntem foarte fericiți! Abia așteptăm și vrem să împărtășim cu voi această veste! Organizăm această nuntă și ne dorim să fie o zi specială pentru toată lumea. In așteptarea marii zile, am creat acest site unde puteți găsi toate informațiile.",
    gettingMarried: "Ne căsătorim!",
    assistantWelcome: "Bună! Sunt asistentul lui Marco și al Emiliei. Cum te pot ajuta?",
    assistantTitle: "Asistent Nuntă",
    assistantPlaceholder: "Scrie un mesaj...",
    days: "Zile",
    hours: "Ore",
    minutes: "Minute",
    seconds: "Secunde",
    contactsTitle: "Contact",
    giftTitle: "Listă de Cadouri",
    giftSubtitle: "Un gând pentru noi",
    giftText1: "Cel mai frumos cadou va fi să sărbătorim împreună acest eveniment, atât de important pentru noi.",
    giftText2: "Cei care doresc pot contribui la luna noastră de miere:",
    ibanLabel: "IBAN",
    holderLabel: "TITULAR",
    reasonLabel: "Motiv",
    reasonText: "Cadou luna de miere – Marco și Emilia",
    copyIban: "Copiază IBAN"
  }
};