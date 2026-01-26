
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language, translations } from '../types';
import { Copy, Check } from 'lucide-react';

interface GiftListProps {
  lang: Language;
}

const GiftList: React.FC<GiftListProps> = ({ lang }) => {
  const t = translations[lang];
  const [copied, setCopied] = useState(false);
  const iban = "IT31B0306234210000001431121";

  const handleCopy = () => {
    navigator.clipboard.writeText(iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SwirlIcon = () => (
    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="text-stone-300 mb-6 mx-auto">
      <path d="M1 10C1 10 8 1 15 1C22 1 25 10 25 10C25 10 28 19 35 19C42 19 45 10 45 10C45 10 48 1 55 1C62 1 59 10 59 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );

  return (
    <section className="py-24 px-4 md:px-12 bg-stone-50" id="regalo">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-4 md:p-6 shadow-xl shadow-stone-200/50"
        >
          <div className="border border-stone-300 p-8 md:p-16 flex flex-col items-center relative text-center">
            
            <SwirlIcon />

            <div className="max-w-2xl w-full">
              <span className="uppercase tracking-[0.2em] text-xs font-sans text-stone-500 mb-2 block">
                {t.giftSubtitle}
              </span>
              <h2 className="text-5xl md:text-6xl font-serif italic text-stone-800 mb-10">
                {t.giftTitle}
              </h2>
              
              <p className="text-stone-600 font-serif italic text-xl md:text-2xl leading-relaxed mb-8">
                "{t.giftText1}"
              </p>
              
              <div className="w-12 h-px bg-stone-200 mx-auto mb-8" />
              
              <p className="text-stone-500 font-sans text-xs uppercase tracking-widest mb-10">
                {t.giftText2}
              </p>

              <div className="space-y-8 bg-stone-50 p-8 border border-stone-100 rounded-sm relative group">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-sans block">
                    {t.ibanLabel}
                  </span>
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-lg md:text-xl font-sans text-stone-800 break-all px-4 tracking-wider">
                      {iban}
                    </span>
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-2 text-olive-600 hover:text-olive-700 text-[10px] uppercase tracking-widest font-sans transition-colors"
                    >
                      {copied ? (
                        <><Check className="w-3 h-3" /> COPIATO</>
                      ) : (
                        <><Copy className="w-3 h-3" /> {t.copyIban}</>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-stone-200/60">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-sans block">
                      {t.holderLabel}
                    </span>
                    <span className="text-lg font-serif italic text-stone-800">
                      Marco Convalle
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-sans block">
                      {t.reasonLabel}
                    </span>
                    <span className="text-lg font-serif italic text-stone-800">
                      {t.reasonText}
                    </span>
                  </div>
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

export default GiftList;
