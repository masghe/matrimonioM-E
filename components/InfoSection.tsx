
import React from 'react';
import { MapPin, Calendar, ExternalLink, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Language, translations } from '../types';

interface InfoSectionProps {
  lang: Language;
}

const InfoSection: React.FC<InfoSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const CEREMONY_MAP_URL = "https://www.google.com/maps/search/?api=1&query=Cattedrale+di+S.+Francesco+d’Assisi+Civitavecchia";
  const RECEPTION_MAP_URL = "https://www.google.com/maps/search/?api=1&query=Villa+dei+Desideri+Cerveteri+Via+del+Tiro+a+Segno+4";
  const RECEPTION_WEBSITE = "https://villadeidesideri.com/";

  // URL per l'incorporamento delle mappe (Embed)
  const CEREMONY_EMBED = "https://maps.google.com/maps?q=Cattedrale+di+San+Francesco+d'Assisi+Civitavecchia&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const RECEPTION_EMBED = "https://maps.google.com/maps?q=Villa+dei+Desideri+Cerveteri&t=&z=15&ie=UTF8&iwloc=&output=embed";

  // Immagini caricate in precedenza
  const CHURCH_IMAGE = "https://www.chiesadicivitavecchia.it/wp-content/uploads/sites/2/2020/01/Cattedrale-6.jpg"; 
  const VILLA_IMAGE = "https://villadeidesideri.com/wp-content/uploads/2024/11/Progetto-senza-titolo-1.png";

  const SwirlIcon = () => (
    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="text-stone-300 mb-6 mx-auto">
      <path d="M1 10C1 10 8 1 15 1C22 1 25 10 25 10C25 10 28 19 35 19C42 19 45 10 45 10C45 10 48 1 55 1C62 1 59 10 59 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );

  const BotanicalFlourish = () => (
    <svg viewBox="0 0 100 20" className="w-32 h-auto text-olive-500/30 mb-4 opacity-60">
      <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="20" cy="5" r="1" fill="currentColor" />
      <circle cx="50" cy="15" r="1" fill="currentColor" />
      <circle cx="80" cy="5" r="1" fill="currentColor" />
    </svg>
  );

  return (
    <section className="py-24 px-4 md:px-12 bg-stone-50" id="dettagli">
      <div className="max-w-4xl mx-auto mb-24 relative">
        <div className="absolute inset-0 bg-radial-gradient from-olive-100/40 to-transparent blur-3xl -z-10 transform scale-150"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative bg-white/40 backdrop-blur-sm border border-stone-200/60 rounded-[3rem] p-10 md:p-20 text-center shadow-sm"
        >
            <div className="flex justify-center mb-2">
               <BotanicalFlourish />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-light italic text-stone-800 mb-8 tracking-tight">
              {t.welcomeTitle}
            </h2>
            <div className="w-12 h-px bg-stone-300 mx-auto mb-8"></div>
            <p className="text-stone-600 font-serif text-lg md:text-xl leading-relaxed max-w-2xl mx-auto italic font-light">
              {t.welcomeText}
            </p>
            <div className="flex justify-center mt-10 rotate-180">
               <BotanicalFlourish />
            </div>
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-stone-200 rounded-tl-2xl"></div>
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-stone-200 rounded-br-2xl"></div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-4 md:p-6 shadow-xl shadow-stone-200/50"
        >
          <div className="border border-stone-300 p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center relative">
            <div className="text-center mb-12 w-full">
              <SwirlIcon />
              <span className="uppercase tracking-[0.3em] text-[10px] text-stone-400 font-sans mb-3 block">L'Evento</span>
              <h2 className="text-4xl md:text-6xl font-serif italic text-stone-800">Programma dell'evento</h2>
              <div className="w-16 h-px bg-stone-200 mt-8 mx-auto"></div>
            </div>

            <div className="text-center mb-16">
               <p className="font-serif italic text-2xl text-stone-600 mb-2">{t.gettingMarried}</p>
               <h3 className="text-5xl md:text-7xl font-serif text-stone-800 my-4 tracking-tighter">
                 {t.longDate}
               </h3>
               <p className="font-serif text-xl text-stone-700 uppercase tracking-widest">Civitavecchia, Roma</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full mt-4">
              {/* Cerimonia */}
              <div className="flex flex-col h-full">
                <div className="flex flex-col items-center gap-2 mb-6">
                  <div className="flex items-center justify-center gap-2 text-olive-600">
                    <Calendar className="w-4 h-4" />
                    <span className="uppercase tracking-widest text-xs font-sans font-bold">{t.ceremony}</span>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full h-48 md:h-64 mt-4 mb-2 overflow-hidden rounded-2xl shadow-md border border-stone-100 bg-stone-100"
                  >
                    <img 
                      src={CHURCH_IMAGE} 
                      alt="Cattedrale di San Francesco - Civitavecchia" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-in-out"
                    />
                  </motion.div>
                </div>
                
                <div className="flex-grow flex flex-col items-center justify-center space-y-4 mb-6 text-center">
                  <div>
                    <h4 className="text-2xl md:text-3xl font-serif italic text-stone-800 px-4 leading-tight">{t.ceremonyLocation}</h4>
                    <p className="text-stone-500 font-sans text-xs uppercase tracking-wider">Piazza Vittorio Emanuele II</p>
                  </div>
                  {/* Spacer per pareggiare l'altezza del link sito del ricevimento su desktop */}
                  <div className="h-[22px] hidden md:block"></div>
                </div>
                
                <div className="text-center mb-8">
                  <p className="text-stone-800 font-serif text-xl border-y border-stone-100 py-3 px-8 inline-block">
                    {t.ceremonyTime}
                  </p>
                </div>
                
                {/* Mappa Aperta Cerimonia */}
                <div className="space-y-4 flex flex-col items-center">
                  <div className="w-full overflow-hidden rounded-xl shadow-sm border border-stone-200 h-[250px]">
                    <iframe 
                      src={CEREMONY_EMBED} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>

                  <a href={CEREMONY_MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-olive-600 hover:text-olive-500 text-xs uppercase tracking-widest font-sans font-bold transition-colors">
                    {t.viewMap} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Ricevimento */}
              <div className="flex flex-col h-full md:border-l md:border-stone-100 md:pl-16">
                <div className="flex flex-col items-center gap-2 mb-6">
                  <div className="flex items-center justify-center gap-2 text-olive-600">
                    <MapPin className="w-4 h-4" />
                    <span className="uppercase tracking-widest text-xs font-sans font-bold">{t.reception}</span>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full h-48 md:h-64 mt-4 mb-2 overflow-hidden rounded-2xl shadow-md border border-stone-100 bg-stone-100"
                  >
                    <img 
                      src={VILLA_IMAGE} 
                      alt="Villa dei Desideri" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-in-out"
                    />
                  </motion.div>
                </div>

                <div className="flex-grow flex flex-col items-center justify-center space-y-4 mb-6 text-center">
                  <div>
                    <h4 className="text-2xl md:text-3xl font-serif italic text-stone-800 px-4 leading-tight">{t.receptionLocation}</h4>
                    <p className="text-stone-500 font-sans text-xs uppercase tracking-wider">Via del Tiro a Segno, 4</p>
                  </div>
                  <a href={RECEPTION_WEBSITE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-800 text-[11px] uppercase tracking-widest font-sans transition-colors decoration-stone-200 underline underline-offset-4">
                    <Globe className="w-3.5 h-3.5" /> {t.visitWebsite}
                  </a>
                </div>

                <div className="text-center mb-8">
                  <p className="text-stone-800 font-serif text-xl border-y border-stone-100 py-3 px-8 inline-block">
                    {t.receptionTime}
                  </p>
                </div>

                {/* Mappa Aperta Ricevimento */}
                <div className="space-y-4 flex flex-col items-center">
                  <div className="w-full overflow-hidden rounded-xl shadow-sm border border-stone-200 h-[250px]">
                    <iframe 
                      src={RECEPTION_EMBED} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>

                  <a href={RECEPTION_MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-olive-600 hover:text-olive-500 text-xs uppercase tracking-widest font-sans font-bold transition-colors">
                    {t.viewMap} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-16 rotate-180">
              <SwirlIcon />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InfoSection;
