
import React from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang];
  
  // Immagine per la cornice interna
  const frameImageUrl = "https://img.freepik.com/foto-premium/sfondo-di-fiori_23-2148011060.jpg";

  const scrollToRsvp = () => {
    const rsvpSection = document.getElementById('rsvp');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Artistic Botanical Element for names
  const BotanicalFlourish = () => (
    <svg viewBox="0 0 100 20" className="w-24 md:w-32 h-auto text-olive-600/30 my-2 opacity-60">
      <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="20" cy="5" r="0.8" fill="currentColor" />
      <circle cx="50" cy="15" r="0.8" fill="currentColor" />
      <circle cx="80" cy="5" r="0.8" fill="currentColor" />
    </svg>
  );

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden bg-stone-50">
      
      {/* Riquadro Centrale */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="z-10 relative max-w-5xl w-full bg-white p-4 md:p-6 shadow-xl shadow-stone-200/50"
      >
        <div className="relative border border-stone-300 overflow-hidden bg-white">
          
          {/* Immagine come sfondo adattata agli angoli */}
          <div 
            className="absolute inset-0 z-0 bg-no-repeat pointer-events-none opacity-[0.85]"
            style={{ 
              backgroundImage: `url('${frameImageUrl}')`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Contenitore principale */}
          <div className="relative z-10 p-8 md:p-16 flex flex-col items-center justify-center min-h-[500px] md:min-h-[620px]"> 
            
            {/* AREA NOMI FANTASIOSA */}
            <div className="relative flex flex-col items-center py-8 px-8 md:px-20">
              
              {/* Sfondo acquerello soffuso specifico per i nomi */}
              <div className="absolute inset-0 bg-radial-gradient from-white/80 to-transparent blur-2xl -z-10 transform scale-125"></div>
              
              <div className="flex flex-col items-center relative z-10">
                {/* Decorazione superiore leggera */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  <BotanicalFlourish />
                </motion.div>

                <h1 className="flex flex-col items-center font-serif text-stone-800 leading-tight">
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 1.2 }}
                    className="text-6xl md:text-9xl italic font-light tracking-tight"
                  >
                    Marco
                  </motion.span>
                  
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 1 }}
                    className="text-3xl md:text-5xl my-2 text-stone-400 font-light italic"
                  >
                    &
                  </motion.span>
                  
                  <motion.span 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 1.2 }}
                    className="text-6xl md:text-9xl italic font-light tracking-tight"
                  >
                    Emilia
                  </motion.span>
                </h1>

                {/* Decorazione inferiore leggera */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="rotate-180"
                >
                  <BotanicalFlourish />
                </motion.div>
              </div>

              {/* Angoli decorativi sottili intorno ai nomi */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-stone-200/60 rounded-tl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-stone-200/60 rounded-br-3xl"></div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex flex-col items-center gap-2 mt-2"
            >
              <div className="flex flex-col items-center">
                <span className="font-light text-stone-700 text-lg md:text-xl font-serif italic tracking-wider">
                  {t.date.split(' . ').join(' . ')}
                </span>
              </div>
              
              <div className="w-1 h-1 bg-olive-500/40 rounded-full my-0.5"></div>
              
              <div className="flex flex-col items-center">
                <span className="font-semibold text-stone-700 uppercase tracking-[0.3em] text-[10px] md:text-xs">
                  CIVITAVECCHIA, ROMA
                </span>
              </div>
            </motion.div>

            {/* Pulsante RSVP a pillola */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="mt-8 mb-4"
            >
              <button
                onClick={scrollToRsvp}
                className="group px-10 py-3 rounded-full border border-stone-800 bg-white/40 backdrop-blur-sm transition-all duration-300 hover:bg-stone-800 hover:text-white shadow-sm"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-medium">
                  RSVP
                </span>
              </button>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
