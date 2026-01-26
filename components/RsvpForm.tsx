
import React, { useState, useEffect } from 'react';
import { RsvpData, Language, translations } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, AlertCircle, Heart, Info } from 'lucide-react';

interface RsvpFormProps {
  lang: Language;
}

const Countdown: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const targetDate = new Date('2026-06-25T16:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: t.days, value: timeLeft.days },
    { label: t.hours, value: timeLeft.hours },
    { label: t.minutes, value: timeLeft.minutes },
    { label: t.seconds, value: timeLeft.seconds }
  ];

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4 my-8">
      {items.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="flex flex-col items-center bg-stone-50 border border-stone-200 rounded-sm p-3 min-w-[65px] md:min-w-[80px] shadow-sm"
        >
          <span className="text-2xl md:text-3xl font-serif italic text-stone-800 leading-none">
            {item.value.toString().padStart(2, '0')}
          </span>
          <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-olive-600 font-sans mt-2 font-medium">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const RsvpForm: React.FC<RsvpFormProps> = ({ lang }) => {
  const t = translations[lang];
  
  const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/oq3l6j636nd9mdfjqfn74y9d57vn7qsr";

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
      const cleanEmail = formData.email.toLowerCase().trim();
      const totalGuestsCalculated = Number(formData.adults) + Number(formData.children);

      const payload = {
        name: formData.name.trim(),
        email: cleanEmail,
        guests: totalGuestsCalculated,
        adults: Number(formData.adults),
        children: Number(formData.children),
        attending: formData.attending === 'yes' ? 'Sì' : 'No',
        dietaryRestrictions: formData.dietaryRestrictions.trim() || "Nessuna",
        submittedAt: new Date().toLocaleString('it-IT'),
        language: lang.toUpperCase(),
        rowSearchKey: cleanEmail 
      };

      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const text = await response.text();
        throw new Error(text || `Errore server: ${response.status}`);
      }
    } catch (error: any) {
      console.error('RSVP Error:', error);
      setStatus('error');
      setErrorMessage(error.message || "Errore durante l'invio. Riprova più tardi.");
    }
  };

  const SwirlIcon = () => (
    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="text-stone-300 mb-6 mx-auto">
      <path d="M1 10C1 10 8 1 15 1C22 1 25 10 25 10C25 10 28 19 35 19C42 19 45 10 45 10C45 10 48 1 55 1C62 1 59 10 59 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );

  const isDeclined = formData.attending === 'no';

  return (
    <section className="py-24 px-4 md:px-12 bg-stone-50" id="rsvp">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-4 md:p-6 shadow-xl shadow-stone-200/50"
        >
          <div className="border border-stone-300 p-8 md:p-16 flex flex-col items-center relative">
            
            <SwirlIcon />

            <div className="text-center flex flex-col items-center w-full">
              <span className="uppercase tracking-[0.2em] text-xs font-sans text-stone-500 mb-2 block">{t.rsvpSubtitle}</span>
              <h2 className="text-5xl md:text-6xl font-serif italic text-stone-800">{t.rsvpTitle}</h2>
              
              <Countdown lang={lang} />
              
              <p className="mb-12 text-stone-600 font-sans text-xs tracking-widest border-t border-stone-100 pt-6 w-full max-w-[280px] mx-auto leading-relaxed">
                {t.rsvpDeadline}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <div className="relative inline-block mb-8">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-olive-500 rounded-full flex items-center justify-center text-white shadow-lg relative z-10"
                    >
                      <Check className="w-10 h-10" />
                    </motion.div>
                  </div>
                  <h3 className="text-4xl font-serif italic text-stone-800 mb-6">{t.successTitle}</h3>
                  <p className="text-stone-600 font-sans leading-relaxed mb-8">{t.successMsg}</p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3].map(i => (
                      <Heart key={i} className="w-4 h-4 text-olive-300 fill-olive-300" />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  className="w-full max-w-lg space-y-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-wider text-stone-500 font-sans">{t.nameLabel}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-stone-200 py-2 focus:outline-none focus:border-stone-800 transition-colors font-serif text-xl text-stone-800 placeholder-stone-300"
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
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-stone-200 py-2 focus:outline-none focus:border-stone-800 transition-colors font-serif text-xl text-stone-800 placeholder-stone-300"
                        placeholder="latua@email.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="attending" className="text-xs uppercase tracking-wider text-stone-500 font-sans">{t.attendingLabel}</label>
                      <select
                        id="attending"
                        name="attending"
                        value={formData.attending}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-stone-200 py-2 focus:outline-none focus:border-stone-800 transition-colors font-serif text-xl text-stone-800 cursor-pointer"
                      >
                        <option value="yes">{t.accept}</option>
                        <option value="no">{t.decline}</option>
                      </select>
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
                          className="w-full bg-transparent border-b border-stone-200 py-2 focus:outline-none focus:border-stone-800 transition-colors font-serif text-xl text-stone-800"
                        >
                          {isDeclined ? <option value="0">0</option> : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n}</option>)}
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
                          className="w-full bg-transparent border-b border-stone-200 py-2 focus:outline-none focus:border-stone-800 transition-colors font-serif text-xl text-stone-800"
                        >
                          {isDeclined ? <option value="0">0</option> : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n}</option>)}
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
                        className="w-full bg-transparent border-b border-stone-200 py-2 focus:outline-none focus:border-stone-800 transition-colors font-serif text-xl text-stone-800 placeholder-stone-300"
                        placeholder={t.placeholderOptional}
                      />
                    </div>
                  </div>

                  <div className="pt-8 text-center flex flex-col items-center gap-6">
                    <button 
                      type="submit" 
                      disabled={status === 'submitting'}
                      className="bg-stone-800 text-stone-50 px-12 py-4 font-sans uppercase tracking-[0.2em] text-[10px] hover:bg-stone-700 transition-colors disabled:opacity-70 min-w-[180px]"
                    >
                      {status === 'submitting' ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> {t.sendingBtn}
                        </span>
                      ) : t.confirmBtn}
                    </button>

                    {status === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-100 p-4 rounded-md max-w-sm"
                      >
                        <p className="text-red-700 text-[11px] font-sans flex items-start gap-2 text-left leading-tight">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> 
                          <span>{errorMessage}</span>
                        </p>
                      </motion.div>
                    )}

                    {/* Sezione Contatti - Omogeneizzata */}
                    <div className="pt-6 border-t border-stone-100 w-full max-w-xs">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-sans block mb-5">
                        {t.contactsTitle}
                      </span>
                      <div className="flex flex-col gap-4">
                        <a 
                          href="https://wa.me/393889260370" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center"
                        >
                          <span className="text-base md:text-lg font-serif italic text-stone-800 group-hover:text-olive-600 transition-colors duration-300">
                            Marco: +39 3889260370
                          </span>
                        </a>
                        <a 
                          href="https://wa.me/393334026921" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center"
                        >
                          <span className="text-base md:text-lg font-serif italic text-stone-800 group-hover:text-olive-600 transition-colors duration-300">
                            Emilia: +39 3334026921
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-12 rotate-180">
              <SwirlIcon />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RsvpForm;
