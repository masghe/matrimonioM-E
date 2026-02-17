
import React, { useState } from 'react';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import RsvpForm from './components/RsvpForm';
import GiftList from './components/GiftList';
import { Language, translations } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Home, Calendar, Gift, Send } from 'lucide-react';

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
          className="pointer-events-auto bg-white w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-[1.2rem] shadow-lg hover:shadow-xl transition-all duration-300 group active:scale-95 border border-stone-100"
          aria-label="Apri menu"
        >
          <div className="w-5 h-0.5 bg-olive-600 rounded-full group-hover:bg-olive-500 transition-colors"></div>
          <div className="w-5 h-0.5 bg-stone-700 rounded-full"></div>
          <div className="w-3 h-0.5 bg-olive-600 rounded-full self-start ml-3.5 group-hover:w-5 transition-all"></div>
        </button>

        {/* Language Switcher */}
        <nav className="pointer-events-auto flex gap-4 text-xs font-sans tracking-widest uppercase bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-stone-100">
          <button 
            onClick={() => toggleLanguage('it')}
            className={`transition-colors ${lang === 'it' ? 'text-olive-600 font-bold' : 'text-stone-400 hover:text-stone-600'}`}
          >
            IT
          </button>
          <span className="text-stone-300">|</span>
          <button 
            onClick={() => toggleLanguage('ro')}
            className={`transition-colors ${lang === 'ro' ? 'text-olive-600 font-bold' : 'text-stone-400 hover:text-stone-600'}`}
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
              className="fixed inset-0 z-[60] bg-stone-900/20 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full z-[70] bg-white flex flex-col shadow-2xl w-full md:w-[450px] border-r border-stone-100 overflow-hidden"
            >
              {/* Subtle background decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-olive-50/40 rounded-full blur-3xl -mr-32 -mt-32 -z-10"></div>
              <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-olive-50/50 to-transparent -z-10 pointer-events-none"></div>

              {/* Close Button */}
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 text-stone-300 hover:text-olive-600 transition-colors p-2 z-10"
              >
                <X className="w-8 h-8 font-light" />
              </button>

              {/* Menu Content */}
              <div className="flex flex-col h-full">
                
                {/* Header with Names - Background subtle color */}
                <div className="pt-20 pb-12 px-8 md:px-14 bg-stone-50/50">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-olive-600/60 font-sans mb-3 block">Matrimonio di</span>
                  <h2 className="text-4xl md:text-5xl font-serif italic text-stone-800 leading-tight">Marco & Emilia</h2>
                </div>

                {/* Full Width Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-olive-500/30 to-transparent"></div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 p-8 md:p-14">
                  <button 
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }}
                    className="flex items-center gap-5 py-4 px-6 rounded-2xl text-left text-stone-700 hover:text-olive-700 hover:bg-olive-50/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-white shadow-sm transition-colors border border-stone-100">
                      <Home className="w-4 h-4 text-stone-400 group-hover:text-olive-500" />
                    </div>
                    <span className="text-xl font-serif italic">Home</span>
                  </button>
                  
                  <button 
                    onClick={() => scrollToSection('dettagli')}
                    className="flex items-center gap-5 py-4 px-6 rounded-2xl text-left text-stone-700 hover:text-olive-700 hover:bg-olive-50/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-white shadow-sm transition-colors border border-stone-100">
                      <Calendar className="w-4 h-4 text-stone-400 group-hover:text-olive-500" />
                    </div>
                    <span className="text-xl font-serif italic">{t.assistantTitle === "Wedding Assistant" ? "Programma dell'evento" : "Programul evenimentului"}</span>
                  </button>
                  
                  <button 
                    onClick={() => scrollToSection('regalo')}
                    className="flex items-center gap-5 py-4 px-6 rounded-2xl text-left text-stone-700 hover:text-olive-700 hover:bg-olive-50/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-white shadow-sm transition-colors border border-stone-100">
                      <Gift className="w-4 h-4 text-stone-400 group-hover:text-olive-500" />
                    </div>
                    <span className="text-xl font-serif italic">{t.giftTitle}</span>
                  </button>
                </nav>

                {/* Bottom RSVP Button Container */}
                <div className="mt-auto p-8 md:p-14">
                  <div className="bg-olive-50/40 p-8 rounded-[2.5rem] border border-olive-100/50 relative overflow-hidden group">
                    {/* Animated shine effect */}
                    <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out"></div>
                    
                    <p className="text-[10px] uppercase tracking-[0.25em] text-olive-700/60 mb-5 text-center font-sans font-semibold">
                      {t.rsvpSubtitle}
                    </p>
                    <button 
                      onClick={() => scrollToSection('rsvp')}
                      className="w-full py-4 bg-olive-600 text-white rounded-full font-sans text-[11px] tracking-[0.35em] uppercase transition-all duration-300 hover:bg-olive-700 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 shadow-md shadow-olive-900/10"
                    >
                      <Send className="w-3.5 h-3.5" />
                      RSVP
                    </button>
                  </div>
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
