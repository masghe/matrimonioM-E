
import React, { useState } from 'react';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import RsvpForm from './components/RsvpForm';
import { Language, translations } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('it');

  const toggleLanguage = (newLang: Language) => {
    setLang(newLang);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = translations[lang];

  return (
    <main className="bg-stone-50 min-h-screen text-stone-800 selection:bg-olive-200 selection:text-olive-900 transition-colors duration-500">
      {/* Language Switcher */}
      <nav className="fixed top-6 right-6 z-50 flex gap-4 text-xs font-sans tracking-widest uppercase">
        <button 
          onClick={() => toggleLanguage('it')}
          className={`transition-colors ${lang === 'it' ? 'text-stone-800 font-bold border-b border-stone-800' : 'text-stone-400 hover:text-stone-600'}`}
        >
          IT
        </button>
        <span className="text-stone-300">|</span>
        <button 
          onClick={() => toggleLanguage('ro')}
          className={`transition-colors ${lang === 'ro' ? 'text-stone-800 font-bold border-b border-stone-800' : 'text-stone-400 hover:text-stone-600'}`}
        >
          RO
        </button>
      </nav>

      <Hero lang={lang} />
      <InfoSection lang={lang} />
      
      {/* Decorative Divider */}
      <div className="py-12 flex items-center justify-center">
        <span className="text-3xl font-serif italic text-stone-300">M & E</span>
      </div>

      <RsvpForm lang={lang} />

      <footer className="py-24 text-center text-stone-400 font-sans text-xs tracking-widest uppercase border-t border-stone-200">
        <p>&copy; 2026 Marco & Emilia. {t.footer}</p>
      </footer>
    </main>
  );
};

export default App;
