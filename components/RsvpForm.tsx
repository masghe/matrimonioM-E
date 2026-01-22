
import React, { useState } from 'react';
import { RsvpData, Language, translations } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, AlertCircle, Heart, Info } from 'lucide-react';

interface RsvpFormProps {
  lang: Language;
}

const RsvpForm: React.FC<RsvpFormProps> = ({ lang }) => {
  const t = translations[lang];
  
  // Nuovo URL del Webhook aggiornato
  const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/gr18nvipzgbwdng0phjwj9sgruiadsvp";

  const [formData, setFormData] = useState<RsvpData>({
    name: '',
    email: '',
    guests: 1,
    adults: 1,
    children: 0,
    attending: 'yes',
    dietaryRestrictions: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'attending') {
      const isAttending = value === 'yes';
      setFormData(prev => ({
        ...prev,
        attending: value as 'yes' | 'no',
        guests: isAttending ? 1 : 0,
        adults: isAttending ? 1 : 0,
        children: 0,
      }));
      return;
    }

    const processedValue = e.target.type === 'number' || e.target.tagName === 'SELECT' ? 
      (isNaN(parseInt(value)) ? value : parseInt(value)) 
      : value;
      
    setFormData({
      ...formData,
      [name]: processedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    
    setStatus('submitting');
    setErrorMessage(null);
    
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        guests: Number(formData.guests),
        adults: Number(formData.adults),
        children: Number(formData.children),
        attending: formData.attending === 'yes' ? 'Sì' : 'No',
        dietaryRestrictions: formData.dietaryRestrictions.trim() || "Nessuna",
        submittedAt: new Date().toISOString(),
        language: lang.toUpperCase()
      };

      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error(`Errore del server: ${response.status}`);
      }
      
    } catch (error: any) {
      console.error('RSVP Submission Error:', error);
      setStatus('error');
      
      if (error.message.includes('fetch') || error.message.includes('Failed')) {
        setErrorMessage("Errore di connessione. Verifica che il Webhook sia attivo su Make.com.");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const isDeclined = formData.attending === 'no';

  if (status === 'success') {
    return (
      <section className="py-24 px-6 bg-stone-50 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="relative inline-block mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-olive-500 rounded-full flex items-center justify-center text-white shadow-lg relative z-10"
            >
              <Check className="w-10 h-10" />
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-olive-200 rounded-full -z-0"
            />
          </div>
          <h3 className="text-4xl font-serif italic text-stone-800 mb-6">{t.successTitle}</h3>
          <p className="text-stone-600 font-sans leading-relaxed mb-8">{t.successMsg}</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map(i => (
              <Heart key={i} className="w-4 h-4 text-olive-300 fill-olive-300" />
            ))}
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-stone-50" id="rsvp">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <span className="uppercase tracking-[0.2em] text-xs font-sans text-stone-500 mb-2 block">{t.rsvpSubtitle}</span>
          <h2 className="text-5xl font-serif italic text-stone-800">{t.rsvpTitle}</h2>
          <p className="mt-4 text-stone-600 font-sans text-sm">{t.rsvpDeadline}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs uppercase tracking-wider text-stone-500 font-sans">{t.nameLabel}</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-olive-500 transition-colors font-serif text-xl text-stone-800 placeholder-stone-300"
                placeholder="Nome e Cognome"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs uppercase tracking-wider text-stone-500 font-sans">{t.emailLabel}</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-olive-500 transition-colors font-serif text-xl text-stone-800 placeholder-stone-300"
                placeholder="latua@email.com"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="attending" className="text-xs uppercase tracking-wider text-stone-500 font-sans">{t.attendingLabel}</label>
                <select
                  id="attending"
                  name="attending"
                  value={formData.attending}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-olive-500 transition-colors font-serif text-xl text-stone-800 cursor-pointer"
                >
                  <option value="yes">{t.accept}</option>
                  <option value="no">{t.decline}</option>
                </select>
              </div>

               <div className={`space-y-2 transition-all duration-300 ${isDeclined ? 'opacity-30' : 'opacity-100'}`}>
                <label htmlFor="guests" className="text-xs uppercase tracking-wider text-stone-500 font-sans">{t.guestsLabel}</label>
                <select
                  id="guests"
                  name="guests"
                  disabled={isDeclined}
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-olive-500 transition-colors font-serif text-xl text-stone-800 disabled:cursor-not-allowed"
                >
                  {isDeclined ? (
                    <option value="0">0</option>
                  ) : (
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-6 transition-all duration-300 ${isDeclined ? 'opacity-30' : 'opacity-100'}`}>
               <div className="space-y-2">
                <label htmlFor="adults" className="text-xs uppercase tracking-wider text-stone-500 font-sans">{t.adultsLabel}</label>
                <select
                  id="adults"
                  name="adults"
                  disabled={isDeclined}
                  value={formData.adults}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-olive-500 transition-colors font-serif text-xl text-stone-800 disabled:cursor-not-allowed"
                >
                  {isDeclined ? (
                    <option value="0">0</option>
                  ) : (
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="children" className="text-xs uppercase tracking-wider text-stone-500 font-sans">{t.childrenLabel}</label>
                <select
                  id="children"
                  name="children"
                  disabled={isDeclined}
                  value={formData.children}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-olive-500 transition-colors font-serif text-xl text-stone-800 disabled:cursor-not-allowed"
                >
                  {isDeclined ? (
                    <option value="0">0</option>
                  ) : (
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className={`space-y-3 transition-all duration-300 ${isDeclined ? 'opacity-30' : 'opacity-100'}`}>
              <div className="flex flex-col space-y-1">
                <label htmlFor="dietaryRestrictions" className="text-xs uppercase tracking-wider text-stone-500 font-sans">{t.dietaryLabel}</label>
                {!isDeclined && (
                  <p className="text-[10px] text-stone-400 font-sans italic flex items-start gap-1 leading-tight">
                    <Info className="w-3 h-3 flex-shrink-0 text-olive-500" />
                    {t.dietaryNote}
                  </p>
                )}
              </div>
              <input
                type="text"
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                disabled={isDeclined}
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-olive-500 transition-colors font-serif text-xl text-stone-800 placeholder-stone-300 disabled:cursor-not-allowed"
                placeholder={t.placeholderOptional}
              />
            </div>
          </div>

          <div className="pt-8 text-center flex flex-col items-center gap-4">
             <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="bg-stone-800 text-stone-50 px-10 py-3 font-sans uppercase tracking-[0.2em] text-xs hover:bg-stone-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px]"
            >
              {status === 'submitting' ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> {t.sendingBtn}
                </span>
              ) : t.confirmBtn}
            </button>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-50 border border-red-100 p-4 rounded-md max-w-sm"
                >
                  <p className="text-red-700 text-xs font-sans flex items-start gap-2 text-left leading-normal">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> 
                    <span>
                      {errorMessage || "Errore durante l'invio."} <br/>
                      <strong className="block mt-1">Verifica che lo scenario su Make sia attivo (ON).</strong>
                    </span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RsvpForm;
