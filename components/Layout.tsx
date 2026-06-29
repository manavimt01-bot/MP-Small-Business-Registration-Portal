
import React from 'react';
import { ShieldCheck, User } from 'lucide-react';
import { useLanguage } from '../App';
import LanguageSwitcher from './LanguageSwitcher';

interface LayoutProps {
  children: React.ReactNode;
  currentView?: string;
  onNavigate?: (view: string) => void;
  profile?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, profile }) => {
  const { lang, setLang, t } = useLanguage();
  const [logoError, setLogoError] = React.useState(false);
  const [footerLogoError, setFooterLogoError] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center space-x-4 cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md p-1 border border-orange-100 overflow-hidden">
              {logoError ? (
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex flex-col items-center justify-center text-[10px] text-white font-black leading-none tracking-tighter uppercase p-0.5 shadow-inner">
                  <span>MP</span>
                  <span className="text-[7px] tracking-normal font-bold">GOVT</span>
                </div>
              ) : (
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Seal_of_Madhya_Pradesh.svg/320px-Seal_of_Madhya_Pradesh.svg.png" 
                  alt="Emblem of Madhya Pradesh" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                />
              )}
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 leading-tight">
                {t('शहरी पथ विक्रेता पोर्टल', 'Urban Vending Portal', 'शहरी पथ विक्रेता पोर्टल')}
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">Govt of Madhya Pradesh</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-10 text-sm font-black uppercase tracking-widest text-gray-600">
            <button 
              onClick={() => onNavigate && onNavigate('home')}
              className={`hover:text-orange-600 transition-colors border-b-2 border-transparent pb-1 font-black uppercase tracking-widest cursor-pointer ${currentView === 'home' ? 'text-orange-600 border-orange-600' : ''}`}
            >
              {t('মূল পৃষ্ঠা', 'Home')}
            </button>
            {profile && (
              <button 
                onClick={() => onNavigate && onNavigate('dashboard')}
                className={`hover:text-orange-600 transition-colors border-b-2 border-transparent pb-1 font-black uppercase tracking-widest cursor-pointer ${currentView === 'dashboard' ? 'text-orange-600 border-orange-600' : ''}`}
              >
                {t('মোৰ প্রফাইল', 'My Profile', 'मेरा प्रोफाइल')}
              </button>
            )}
            <button 
              onClick={() => onNavigate && onNavigate('admin')}
              className={`hover:text-orange-600 transition-colors border-b-2 border-transparent pb-1 font-black uppercase tracking-widest cursor-pointer ${currentView === 'admin' ? 'text-orange-600 border-orange-600' : ''}`}
            >
              {t('ড্যাশবৰ্ড', 'Dashboard')}
            </button>
            <button 
              onClick={() => {
                onNavigate && onNavigate('home');
                setTimeout(() => {
                  document.getElementById('schemes')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-orange-600 transition-colors border-b-2 border-transparent hover:border-orange-600 pb-1 font-black uppercase tracking-widest cursor-pointer"
            >
              {t('আঁচনিসমূহ', 'Schemes')}
            </button>
            <button 
              onClick={() => {
                onNavigate && onNavigate('home');
                setTimeout(() => {
                  document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-orange-600 transition-colors border-b-2 border-transparent hover:border-orange-600 pb-1 font-black uppercase tracking-widest cursor-pointer"
            >
              {t('সহায়', 'Help')}
            </button>
          </nav>

          <div className="flex items-center space-x-6">
            {/* Language Switcher */}
            <LanguageSwitcher />

            <div className="hidden sm:flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-green-700 bg-green-50 px-4 py-2.5 rounded-full border border-green-100">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('সুৰক্ষিত', 'Secure')}</span>
            </div>
            
            <button 
              onClick={() => onNavigate && onNavigate('admin')}
              className={`px-4 h-12 rounded-2xl border flex items-center justify-center space-x-2 transition-all cursor-pointer font-black text-[10px] uppercase tracking-widest ${
                currentView === 'admin'
                  ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-100'
                  : 'bg-orange-50/70 border-orange-100 text-orange-600 hover:bg-orange-100'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>{t('বিষয়া প্রৱেশ', 'Officer Login')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-20 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm p-1 border border-gray-100 overflow-hidden">
                 {footerLogoError ? (
                   <div className="w-full h-full rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex flex-col items-center justify-center text-[10px] text-white font-black leading-none tracking-tighter uppercase p-0.5 shadow-inner">
                     <span>MP</span>
                     <span className="text-[7px] tracking-normal font-bold">GOVT</span>
                   </div>
                 ) : (
                   <img 
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Seal_of_Madhya_Pradesh.svg/320px-Seal_of_Madhya_Pradesh.svg.png" 
                     alt="Emblem of Madhya Pradesh" 
                     className="w-full h-full object-contain"
                     referrerPolicy="no-referrer"
                     onError={() => setFooterLogoError(true)}
                   />
                 )}
               </div>
               <span className="font-black text-xl text-gray-900 tracking-tight">{t('मध्य प्रदेश शासन', 'Madhya Pradesh Government', 'मध्य प्रदेश शासन')}</span>
            </div>
            <p className="text-gray-500 leading-relaxed font-medium">
              {t(
                'सशक्त विक्रेता, समृद्ध मध्य प्रदेश। यह पोर्टल मध्य प्रदेश के शहरी पथ विक्रेताओं को डिजिटल पहचान और सरकारी योजनाओं का लाभ देने के लिए समर्पित है।',
                'Empowered Vendor, Prosperous Madhya Pradesh. This portal is dedicated to providing digital identity and government benefits to urban street vendors of Madhya Pradesh.',
                'सशक्त विक्रेता, समृद्ध मध्य प्रदेश। यह पोर्टल मध्य प्रदेश के शहरी पथ विक्रेताओं को डिजिटल पहचान और सरकारी योजनाओं का लाभ देने के लिए समर्पित है।'
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-black text-gray-900 uppercase text-xs tracking-[0.2em]">{t('যোগাযোগ', 'Contact')}</h3>
              <div className="space-y-2 text-sm text-gray-500 font-medium">
                <p>1800-345-5678</p>
                <p>support@mpvendor.gov.in</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-black text-gray-900 uppercase text-xs tracking-[0.2em]">{t('আইনী', 'Legal')}</h3>
              <div className="space-y-2 text-sm text-gray-500 font-medium">
                <p>{t('গোপনীয়তা নীতি', 'Privacy Policy')}</p>
                <p>{t('নিয়মাৱলী আৰু চৰ্তসমূহ', 'Terms')}</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50/50 p-10 rounded-[48px] border border-orange-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
               <ShieldCheck className="w-32 h-32" />
            </div>
            <h4 className="font-black text-orange-900 mb-3 uppercase text-xs tracking-widest">{t('ডিজিটেল সুশাসন', 'Digital Governance')}</h4>
            <p className="text-sm text-orange-800 opacity-80 leading-relaxed font-medium">
              {t(
                'এই প্লেটফৰ্মখন ব্যৱসায় কৰাৰ সহজ পদ্ধতি (Ease of Doing Business) বৃদ্ধিৰ দিশত এক ঐতিহাসিক পদক্ষেপ।',
                'This platform is a historic step towards promoting Ease of Doing Business.'
              )}
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-100 text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} {t('नगरीय विकास एवं आवास विभाग, मध्य प्रदेश।', 'Dept of Urban Development & Housing, Madhya Pradesh.', 'नगरीय विकास एवं आवास विभाग, मध्य प्रदेश।')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
