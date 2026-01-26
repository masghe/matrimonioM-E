
import React from 'react';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
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

  // Decorative swirl icon
  const SwirlIcon = () => (
    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="text-stone-300 mb-6 mx-auto">
      <path d="M1 10C1 10 8 1 15 1C22 1 25 10 25 10C25 10 28 19 35 19C42 19 45 10 45 10C45 10 48 1 55 1C62 1 59 10 59 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );

  return (
    <section className="py-24 px-4 md:px-12 bg-stone-50" id="dettagli">
      
      {/* 1. WELCOME SECTION (Bordered Box style) */}
      <div className="max-w-4xl mx-auto mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-stone-50 border border-blue-200/50 p-8 md:p-12 text-center shadow-sm relative"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-50"></div>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-800 mb-6">{t.welcomeTitle}</h2>
            <p className="text-stone-600 font-sans text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              {t.welcomeText}
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-50"></div>
        </motion.div>
      </div>

      {/* 2. INVITATION CARD STYLE (Box with inner border) */}
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-4 md:p-6 shadow-xl shadow-stone-200/50"
        >
          {/* Inner Decorative Border */}
          <div className="border border-stone-300 p-8 md:p-16 flex flex-col items-center justify-center relative">
            
            {/* Sezione Titolo Interna */}
            <div className="text-center mb-12 w-full">
              <SwirlIcon /> {/* Spostata qui, in cima al blocco */}
              <span className="uppercase tracking-[0.3em] text-[10px] text-stone-400 font-sans mb-3 block">L'Evento</span>
              <h2 className="text-4xl md:text-6xl font-serif italic text-stone-800">Programma dell'evento</h2>
              <div className="w-16 h-px bg-stone-200 mt-8 mx-auto"></div>
            </div>

            <div className="text-center mb-12">
               <p className="font-serif italic text-2xl text-stone-600 mb-2">{t.gettingMarried}</p>
               <h3 className="text-5xl md:text-7xl font-serif text-stone-800 my-4 tracking-tighter">
                 {t.longDate}
               </h3>
               <p className="font-serif text-xl text-stone-500 uppercase tracking-widest">Civitavecchia, Roma</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-4">
               {/* Ceremony */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-olive-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="uppercase tracking-widest text-xs font-sans font-bold">{t.ceremony}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif italic text-stone-800 px-4">{t.ceremonyLocation}</h4>
                <p className="text-stone-500 font-sans text-xs uppercase tracking-wider">
                  Piazza Vittorio Emanuele II
                </p>
                <p className="text-stone-800 font-serif text-lg">{t.ceremonyTime}</p>
                
                <a 
                  href={CEREMONY_MAP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-olive-600 hover:text-olive-500 text-xs uppercase tracking-widest font-sans transition-colors mt-2"
                >
                  {t.viewMap} <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Reception */}
              <div className="text-center space-y-3 md:border-l md:border-stone-100">
                <div className="flex items-center justify-center gap-2 text-olive-600 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="uppercase tracking-widest text-xs font-sans font-bold">{t.reception}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-serif italic text-stone-800 px-4">{t.receptionLocation}</h4>
                <p className="text-stone-500 font-sans text-xs uppercase tracking-wider">
                  Via del Tiro a Segno, 4
                </p>
                <p className="text-stone-800 font-serif text-lg">{t.receptionTime}</p>
                
                <div className="flex justify-center gap-4 mt-2">
                  <a 
                    href={RECEPTION_MAP_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-olive-600 hover:text-olive-500 text-xs uppercase tracking-widest font-sans transition-colors"
                  >
                    {t.viewMap} <ExternalLink className="w-3 h-3" />
                  </a>
                  <a 
                    href={RECEPTION_WEBSITE} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-stone-400 hover:text-stone-600 text-xs uppercase tracking-widest font-sans transition-colors"
                  >
                    {t.visitWebsite} <ExternalLink className="w-3 h-3" />
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
