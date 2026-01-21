
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

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden bg-stone-50">
      
      {/* Riquadro Centrale - Grandezza e stile sincronizzati */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="z-10 relative max-w-5xl w-full bg-white p-4 md:p-6 shadow-xl shadow-stone-200/50 mt-16 mb-16"
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

          {/* Contenitore principale - Spostato leggermente più su ora che l'annuncio è rimosso */}
          <div className="relative z-10 p-8 md:p-16 flex flex-col items-center justify-start pt-20 md:pt-36 min-h-[420px] md:min-h-[520px]"> 
            
            <h1 className="text-6xl md:text-8xl font-serif text-stone-800 mb-0 italic tracking-tighter leading-none px-4">
              Marco 
              <span className="block my-1 md:my-1 text-4xl md:text-6xl text-stone-800 font-light">&</span> 
              Emilia
            </h1>
            
            {/* Linea separatrice */}
            <div className="w-full max-w-[120px] h-px bg-stone-100 mb-3 md:mb-4"></div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col items-center gap-1 text-stone-600 font-sans tracking-[0.3em] text-[10px] md:text-xs"
            >
              <div className="flex flex-col items-center">
                <span className="font-bold text-stone-800 text-lg md:text-xl font-serif italic tracking-normal">
                  {t.date.split(' . ').join(' . ')}
                </span>
              </div>
              
              <div className="w-1 h-1 bg-olive-500 rounded-full my-0.5"></div>
              
              <div className="flex flex-col items-center">
                <span className="font-semibold text-stone-700">CIVITAVECCHIA, ROMA</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
