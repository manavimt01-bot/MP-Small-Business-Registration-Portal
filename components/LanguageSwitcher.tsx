import React from 'react';
import { motion } from 'motion/react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../App';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center space-x-2" id="language-switcher-container">
      <div className="flex items-center bg-gray-50 p-1 rounded-[18px] border border-orange-100/40 relative shadow-inner">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50/80 border border-orange-100/30 text-orange-600 shrink-0 ml-1">
          <Languages className="w-4 h-4" id="lang-icon" />
        </div>
        
        <div className="flex relative ml-1">
          <button
            id="lang-btn-hi"
            onClick={() => setLang('hi')}
            className={`relative z-10 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
              lang === 'hi' ? 'text-orange-700' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            हिंदी
          </button>
          <button
            id="lang-btn-en"
            onClick={() => setLang('en')}
            className={`relative z-10 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
              lang === 'en' ? 'text-orange-700' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            English
          </button>

          {/* Spring-animated active background */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="absolute top-0 bottom-0 rounded-xl bg-white shadow-md border border-orange-100/60"
            style={{
              left: lang === 'hi' ? '0%' : '50%',
              width: '50%',
              zIndex: 0
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
