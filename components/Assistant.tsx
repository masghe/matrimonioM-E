import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAssistant } from '../services/geminiService';
import { ChatMessage, Language, translations } from '../types';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AssistantProps {
  lang: Language;
}

const Assistant: React.FC<AssistantProps> = ({ lang }) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message based on language
  useEffect(() => {
    setMessages([
      {
        role: 'model',
        text: t.assistantWelcome,
        timestamp: new Date()
      }
    ]);
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToAssistant(input);
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsOpen(true)}
              className="bg-stone-800 text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-stone-700 transition-colors"
            >
              <Sparkles className="w-5 h-5 text-olive-500" />
              <span className="font-sans text-xs uppercase tracking-wider pr-1">Assistant</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 md:bottom-10 md:left-10 w-[90vw] md:w-96 bg-white rounded-lg shadow-2xl z-50 overflow-hidden border border-stone-200 flex flex-col max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-stone-100 p-4 flex justify-between items-center border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-olive-600" />
                <h3 className="font-serif italic text-stone-800 text-lg">{t.assistantTitle}</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 h-80 md:h-96">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm font-sans leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-stone-800 text-stone-50 rounded-br-none'
                        : 'bg-white border border-stone-200 text-stone-700 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-stone-200 p-3 rounded-lg rounded-bl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-stone-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.assistantPlaceholder}
                  className="flex-1 bg-stone-50 border border-stone-200 rounded-full px-4 py-2 text-sm font-sans focus:outline-none focus:border-stone-400 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-olive-600 text-white rounded-full hover:bg-olive-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Assistant;