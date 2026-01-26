
import React, { useState } from 'react';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import RsvpForm from './components/RsvpForm';
import GiftList from './components/GiftList';
import { Language, translations } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('it');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = (newLang: Language) => {
    setLang(newLang);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = translations[lang];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <main className="bg-stone-50 min-h-screen text-stone-800 selection:bg-olive-200 selection:text-olive-900 transition-colors duration-500">
      
      {/* Navigation Bars */}
      <div className="fixed top-6 left-6 right-6 z-50 flex justify-between items-center pointer-events-none">
        {/* Hamburger Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="pointer-events-auto bg-white w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-[1.2rem] shadow-lg hover:shadow-xl transition-all duration-300 group"
          aria-label="Apri menu"
        >
          <div className="w-5 h-0.5 bg-stone-700 rounded-full"></div>
          <div className="w-5 h-0.5 bg-stone-700 rounded-full"></div>
          <div className="w-5 h-0.5 bg-stone-700 rounded-full"></div>
        </button>

        {/* Language Switcher */}
        <nav className="pointer-events-auto flex gap-4 text-xs font-sans tracking-widest uppercase bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-stone-100">
          <button 
            onClick={() => toggleLanguage('it')}
            className={`transition-colors ${lang === 'it' ? 'text-stone-800 font-bold' : 'text-stone-400 hover:text-stone-600'}`}
          >
            IT
          </button>
          <span className="text-stone-300">|</span>
          <button 
            onClick={() => toggleLanguage('ro')}
            className={`transition-colors ${lang === 'ro' ? 'text-stone-800 font-bold' : 'text-stone-400 hover:text-stone-600'}`}
          >
            RO
          </button>
        </nav>
      </div>

      {/* Fullscreen/Side Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Background Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-stone-900/10 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full z-[70] bg-white flex flex-col p-8 md:p-14 shadow-2xl w-full md:w-[450px]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 text-stone-400 hover:text-stone-800 transition-colors"
              >
                <X className="w-8 h-8 font-light" />
              </button>

              {/* Menu Content */}
              <div className="flex flex-col h-full pt-10">
                {/* Title */}
                <div className="mb-16">
                  <h2 className="text-4xl md:text-5xl font-serif italic text-stone-800">Marco e Emilia</h2>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-10 text-xl font-sans text-stone-700">
                  <button 
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }}
                    className="text-left hover:text-stone-950 transition-colors"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection('dettagli')}
                    className="text-left hover:text-stone-950 transition-colors"
                  >
                    Programma dell'evento
                  </button>
                  <button 
                    onClick={() => scrollToSection('regalo')}
                    className="text-left hover:text-stone-950 transition-colors"
                  >
                    Lista Regalo
                  </button>
                </nav>

                {/* Bottom RSVP Button */}
                <div className="mt-auto pb-6">
                  <button 
                    onClick={() => scrollToSection('rsvp')}
                    className="w-full py-4 border border-stone-800 rounded-full font-sans text-sm tracking-[0.3em] uppercase transition-all duration-300 hover:bg-stone-800 hover:text-white"
                  >
                    RSVP
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div id="home">
        <Hero lang={lang} />
      </div>
      
      <div id="dettagli">
        <InfoSection lang={lang} />
      </div>
      
      <div id="rsvp">
        <RsvpForm lang={lang} />
      </div>
      
      <div id="regalo">
        <GiftList lang={lang} />
      </div>

      <footer className="py-20 text-center text-stone-400 font-sans text-[10px] tracking-[0.3em] uppercase bg-stone-50">
        <div className="flex items-center justify-center gap-1.5 flex-wrap px-6">
          <span>&copy; 2026 Marco & Emilia • {t.footer}</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
        </div>
      </footer>
    </main>
  );
};

export default App;
