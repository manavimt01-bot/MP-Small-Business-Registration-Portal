import React, { useState, createContext, useContext } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import { VendorProfile, Language } from './types';
import { generate100Vendors } from './utils/dummyGenerator';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (as: string, en: string, hi?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

// Central set of initial mock vendors in MP main districts for Municipality Officers database
const INITIAL_VENDORS: VendorProfile[] = [
  {
    id: "MP-BPL081",
    name: "रामेश्वर शर्मा (Rameshwar Sharma)",
    mobile: "9435012345",
    aadharNumber: "534211008899",
    businessType: "ठेला गाड़ी (Mobile Cart)",
    profession: "फल विक्रेता (Fruit Vendor)",
    location: { lat: 23.2599, lng: 77.4126, address: "New Market, Bhopal, Madhya Pradesh" },
    vendingType: "mobile",
    isVerified: true,
    dob: "12/04/1985",
    activeSchemes: ["PM SVANidhi (MP LEMS)", "Mukhyamantri Path Vikreta Kalyan Yojana"],
    loanStatus: "approved",
    selfie: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300",
    aadharScan: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=300&h=300",
    activityHistory: [
      { date: "10 May 2026", action: "DPI Facial and biometric verification succeeded." },
      { date: "11 May 2026", action: "PM SVANidhi Loan Approved (Amount: ₹20,000)" }
    ]
  },
  {
    id: "MP-IND112",
    name: "सुनीता यादव (Sunita Yadav)",
    mobile: "9864098765",
    aadharNumber: "453288112233",
    businessType: "लघु उद्योग (MSME/Small Scale)",
    profession: "बुनकर / शिल्पकार (Textiles Weaver)",
    location: { lat: 22.7196, lng: 75.8577, address: "Sarafa Bazar, Indore, Madhya Pradesh" },
    vendingType: "fixed",
    isVerified: true,
    dob: "25/08/1990",
    activeSchemes: ["Mukhyamantri Udhyami Kranti Yojana", "MP Deendayal Antyodaya Yojana"],
    loanStatus: "under_review",
    selfie: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300",
    aadharScan: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=300&h=300",
    activityHistory: [
      { date: "15 May 2026", action: "Registered using Digital Public Infrastructure." },
      { date: "16 May 2026", action: "Applied for Mukhyamantri Udhyami Kranti Yojana." }
    ]
  },
  {
    id: "MP-UJN409",
    name: "रामचरण सोनी (Ramcharan Soni)",
    mobile: "8876543210",
    aadharNumber: "882311445566",
    businessType: "स्थायी दुकान (Fixed Shop)",
    profession: "चाय और नाश्ता दुकान (Tea & Snacks Stall)",
    location: { lat: 23.1760, lng: 75.7885, address: "Mahakal Marg, Ujjain, Madhya Pradesh" },
    vendingType: "fixed",
    isVerified: true,
    dob: "15/08/1987",
    activeSchemes: ["Mukhyamantri Path Vikreta Kalyan Yojana"],
    loanStatus: "none",
    selfie: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300",
    aadharScan: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=300&h=300",
    activityHistory: [
      { date: "18 May 2026", action: "DPI Digital Certificate generated." }
    ]
  },
  {
    id: "MP-GWL304",
    name: "कविराज मिश्रा (Kaviraj Mishra)",
    mobile: "7002134567",
    aadharNumber: "772188443311",
    businessType: "ऋतुकालिक विक्रेता (Seasonal)",
    profession: "फूल विक्रेता (Flower Vendor)",
    location: { lat: 26.2183, lng: 78.1828, address: "Bada Bazar, Gwalior, Madhya Pradesh" },
    vendingType: "seasonal",
    isVerified: true,
    dob: "10/11/1993",
    activeSchemes: ["PM SVANidhi (MP LEMS)"],
    loanStatus: "eligible",
    selfie: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300",
    aadharScan: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=300&h=300",
    activityHistory: [
      { date: "02 May 2026", action: "Registration submitted." }
    ]
  },
  {
    id: "MP-JBP523",
    name: "अमित कुमार (Amit Kumar)",
    mobile: "9101234567",
    aadharNumber: "331122558800",
    businessType: "ठेला गाड़ी (Mobile Cart)",
    profession: "खिलौना विक्रेता (Toys Seller)",
    location: { lat: 23.1686, lng: 79.9339, address: "Civic Center, Jabalpur, Madhya Pradesh" },
    vendingType: "mobile",
    isVerified: false,
    dob: "05/02/1996",
    activeSchemes: [],
    loanStatus: "none",
    selfie: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300",
    aadharScan: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=300&h=300",
    activityHistory: [
      { date: "21 May 2026", action: "Registration submitted, pending Municipality Officer approval." }
    ]
  }
];

const ASSAMESE_TO_HINDI_MAP: Record<string, string> = {
  // Common terms / labels
  'নাম': 'नाम',
  'পঞ্জীয়ন নম্বৰ': 'पंजीकरण संख्या',
  'বৃত্তিৰ তালিকা': 'व्यवसाय श्रेणी',
  'ক্ষুদ্ৰ উদ্যোক্তা': 'लघु उद्यमी',
  'পঞ্জীয়নৰ স্থিতি': 'पंजीकरण स्थिति',
  'অনুমোদিত': 'स्वीकृत',
  'পৰীক্ষাধীন': 'समीक्षाधीन',
  'আধাৰ কাৰ্ড': 'आधार कार्ड (मास्कड)',
  'ঠিকনা': 'पता',
  'জিলা': 'जिला',
  'ৰাজ্য': 'राज्य',
  'পৰিচয় স্থিতি': 'पहचान स्थिति',
  'প্ৰমাণিত ব্যৱসায়': 'सत्यापित व्यवसाय',
  'সক্ৰিয় আঁচনি': 'सक्रिय योजनाएं',
  'আঁচনি সক্ৰিয়': 'योजनाएं सक्रिय',
  'ঋণ স্থিতি': 'ऋण स्थिति',
  '₹৫০,০০০ অনুমোদিত': '₹50,000 स्वीकृत',
  'আপোনাৰ বাবে উপযোগী আঁচনিসমূহ': 'आपके लिए विशेष योजनाएं',
  'সকলো চাওক': 'सभी देखें',
  'সংকোচন কৰক': 'विवरण छुपाएं',
  'বিৱৰণ চাওক': 'विवरण देखें',
  'আবেদন কৰা হ’ল': 'आवेदन किया गया',
  'এতিয়াই আবেদন কৰক': 'अभी आवेदन करें',
  'যোগ্যতাৰ চৰ্তসমূহ': 'पात्रता मापदंड',
  'প্ৰয়োজনীয় নথি-পত্ৰ': 'आवश्यक दस्तावेज',
  'আবেদনৰ শেষ সময়সীমা': 'आवेदन की अंतिम तिथि',
  'বিত্তীয় অন্তৰ্ভুক্তিকৰণ': 'वित्तीय समावेशन',
  'জামিনবিহীন ঋণ সুবিধা': 'बिना गारंटी ऋण सुविधा',
  'মই মোৰ তথ্যসমূহ বেংকৰ সৈতে ঋণৰ অফাৰ লাভ কৰাৰ সুবিধাৰ বাবে শ্বেয়াৰ কৰিবলৈ সহমত জনাইছোঁ।': 'मैं बैंक ऋण प्रस्तावों के लिए अपनी जानकारी साझा करने के लिए सहमति देता हूं।',
  'বেংক অফাৰসমূহ পৰীক্ষা কৰক': 'बैंक ऑफ़र देखें',
  'বিষয়া সত্যতা পৰীক্ষা': 'अधिकारी सत्यापन',
  'আধিকাৰিক ডেশ্বব’ৰ্ড': 'अधिकारी डैशबोर्ड',
  'আধিকাৰিক ডেশ্বব’ৰ্ড: পঞ্জীয়নৰ সবিশেষ': 'अधिकारी डैशबोर्ड: पंजीकरण विवरण',
  'পঞ্জীয়ন প্ৰোফাইল': 'पंजीकरण प्रोफ़ाइल',
  'আধাৰ নম্বৰ': 'आधार नंबर',
  'ম’বাইল নম্বৰ': 'मोबाइल नंबर',
  'উপজীৱিকা শ্ৰেণী': 'व्यवसाय और श्रेणी',
  'জন্ম তাৰিখ': 'जन्म तिथि',
  'ভিতৰুৱা নথি': 'प्रशासनिक ऑडिट लॉग',

  // Admin Dashboard and statistics
  'সংৰক্ষিত জীৱিকা': 'सुरक्षित आजीविका',
  'পৰিয়ালৰ লোক লাভান্বিত:': 'अनुमानित लाभार्थी परिवार:',
  'ব্যক্তি': 'सदस्य',
  'পৰিয়াল কল্যান সূচী': 'सामाजिक-आर्थिक सुरक्षा',
  'প্ৰত্যক্ষ আৰ্থিক সাহাৰ্য্য আৰু ঋন:': 'प्रत्यक्ष पूंजी और ऋण लाभ:',
  'প্ৰতিষ্ঠানিক ঋণ সংযোগ': 'संस्थागत ऋण कनेक्टिविटी',
  'মহিলা উদ্যোগ সবলীকৰণ': 'महिला उद्यम सशक्तिकरण',
  'পঞ্জীভূক্ত মহিলা কৰ্মী': 'पंजीकृत महिला उद्यमी',
  'মহিলা সবলীকৰণ': 'महिला सशक्तिकरण',
  'পৰ্যটন আৰু সংস্কৃতি': 'पर्यटन एवं संस्कृति',
  'পৰম্পৰাগত শিপিনী, হস্তশিল্প আৰু চাহ বিক্ৰেতা': 'हस्तशिल्प, स्थानीय हथकरघा और चाय विक्रेता',
  'উপীআই আৰু ম’বাইল বেংকিং সংযোগ': 'सत्यापित बायोमेट्रिक खाता + भुगतान क्यूआर मैपिंग',
  'বিত্তীয় অন্তৰ্ভুক্তি': 'वित्तीय समावेशन',
  'জিলা-ভিত্তিত পঞ্জীয়ন ঘনীভুততা আৰু বিত্তীয় প্ৰভাৱ পৰ্যবেক্ষণ বুক। জিলা নিৰ্বাচন কৰিলে ডেচবৰ্ড পৰিৱৰ্তন হ’ব।': 'क्षेत्रवार पंजीकरण घनत्व और जिला प्रदर्शन सूचकांक।',
  'জিলা পঞ্জীয়ন পদাৰ্পণ': 'क्षेत्रीय रजिस्ट्रियां',
  'অসম চৰকাৰ ম্যাপ্ড কৰা নোড': 'आधिकारिक नोड्स मानचित्रित।',
  'স্থানীয় বিত্তীয় প্ৰবাহ': 'जिला आर्थिक गतिविधि',
  'আবেদন মঞ্জুৰ': 'स्वीकृत ऋण',
  'স্মাৰ্ট মন্ত্ৰীসভা নীতি অন্তৰ্দৃষ্টি': 'मुख्यमंत्री नीति अंतर्दृष्टि',
  'পঞ্জীভূত তথ্য আৰু ক্ৰেডিট ট্ৰেণ্ড বিশ্লেষণ কৰি স্বয়ংক্ৰিয়ভাৱে প্ৰস্তুত কৰা অৰ্থনৈতিক নীতি প পৰামৰ্শসমূহ।': 'पंजीकृत आंकड़ों और आर्थिक प्रवृत्तियों का स्वतः विश्लेषण।',
  'হস্তশিল্প আৰু তাঁত শিল্প সংস্থাপন': 'हस्तशिल्प और हथकरघा क्लस्टर विकास',
  'पौৰ সংস্থাপন আনুষ্ঠানিকীকৰণ': 'नगर निगम व्यवस्था औपचारिकता',
  'বিত্তীয় সাহায্য আৰু ক্ৰেডিট আঁচনি': 'वित्तीय सहायता और ऋण योजनाएं',
  'পৰিসংখ্যা বিশ্লেষণ': 'सांख्यिकी विश्लेषण',
  'ব্যৱসায় শ্ৰেণীৰ বিতৰণ': 'व्यवसाय श्रेणी वितरण',
  'পঞ্জীভূত ক্ষুদ্ৰ ব্যৱসায়সমূহৰ শ্ৰেণী অনুসৰি বিভাজন। ই চৰকাৰী নীতি আৰু উন্নয়ন আঁচনি ৰূপায়ণত সহায় কৰে।': 'पंजीकृत लघु व्यवसायों का श्रेणीवार विभाजन।',
  'নাম, পঞ্জীয়ন আইডি বা পেশা বিচাৰক...': 'नाम, पंजीकरण आईडी या पेशा खोजें...',
  'সকলো ব্যৱসায় শ্ৰেণী': 'सभी श्रेणियां',
  'উদ্যोगৰ শ্ৰেণী': 'व्यवसाय श्रेणी',
  'কাৰ্য্যসমূহ': 'कार्रवाई',
  'কোনো বিক্ৰেতা পোৱা নগ’ল': 'कोई विक्रेता नहीं मिला',
  'ডিক্ৰী বাতিল কৰক': 'अनुमोदन रद्द करें',
  'অনুমোদন কৰক': 'सत्यापित करें और प्रमाण पत्र जारी करें',
  'ৰাজহুৱা প্ৰোফাইল': 'सार्वजनिक प्रोफ़ाइल',
  'আধাৰ কাৰ্ড (মাক্সড)': 'आधार कार्ड (मास्कड)',
  'ঠিকনা (মাক্সড)': 'पता (मास्कड)',
  'সম্পূৰ্ণ ঠিকনা': 'पूरा पता',
  'কামৰূপ মেট্ৰ’': 'भोपाल',
  'গুৱাহাটী': 'भोपाल',
  'অসম': 'मध्य प्रदेश',
  'পঞ্জীয়ন স্থিতি': 'पंजीकरण स्थिति',
  'স্থায়ী দোকান (Fixed Shop)': 'स्थायी दुकान (Fixed Shop)',
  'ঠেলা গাড়ী (Mobile Cart)': 'ठेला गाड़ी (Mobile Cart)',
  'ঋতুভিত্তিক বিক্ৰেতা (Seasonal)': 'मौसमी विक्रेता (Seasonal)',
  'ক্ষুদ্ৰ উদ্যোগ (MSME)': 'लघु उद्योग (MSME)',
  'সত্যাपित': 'सत्यापित',
  'সত্যাপিত': 'सत्यापित',
  'পেন্ডিং': 'लंबित',
  'সকলো': 'सभी',
  'সক্ৰিয়': 'सक्रिय',
  'মূল পৃষ্ঠা': 'मुख्य पृष्ठ',
  'ড্যাশবৰ্ড': 'डैशबोर्ड',
  'আঁচনিসমূহ': 'योजनाएं',
  'সহায়': 'सहायता',
  'সুৰক্ষিত': 'सुरक्षित',
  'বিষয়া প্রৱেশ': 'अधिकारी लॉगिन',
  'এই প্লেটফৰ্মখন ব্যৱসায় কৰাৰ সহজ পদ্ধতি (Ease of Doing Business) বৃদ্ধিৰ দিশত এক ঐতিহাসিক পদক্ষেপ।': 'यह प्लेटफॉर्म व्यापार सुगमता (Ease of Doing Business) को बढ़ावा देने की दिशा में एक ऐतिहासिक कदम है।'
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'registration' | 'dashboard' | 'admin'>('home');
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [lang, setLang] = useState<Language>('hi');

  // Shared Vendors Local State Backing
  const [vendors, setVendors] = useState<VendorProfile[]>(() => {
    let baseList = INITIAL_VENDORS;
    const saved = localStorage.getItem('state_vendors');
    let needsReset = false;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Check if any item contains Assamese/Bengali characters
          const hasAssamese = parsed.some((v: any) => 
            /[\u0980-\u09FF]/.test(v.name || '') || 
            /[\u0980-\u09FF]/.test(v.businessType || '') || 
            /[\u0980-\u09FF]/.test(v.profession || '') ||
            /[\u0980-\u09FF]/.test(v.location?.address || '')
          );
          if (hasAssamese) {
            needsReset = true;
          } else {
            baseList = parsed;
          }
        }
      } catch (e) {
        console.error("Local storage decode error. Reverting to base register.", e);
      }
    }
    const full100 = generate100Vendors(baseList);
    // Persist immediately if list was newly generated or expanded or reset
    if (full100.length !== baseList.length || !saved || needsReset) {
      localStorage.setItem('state_vendors', JSON.stringify(full100));
    }
    return full100;
  });

  const updateVendorsList = (updatedList: VendorProfile[]) => {
    setVendors(updatedList);
    localStorage.setItem('state_vendors', JSON.stringify(updatedList));
  };

  // Intercept QR code identity scans (e.g., ?view=verify&id=MP-IND112)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const idParam = params.get('id');
    if (viewParam === 'verify' && idParam) {
      const matched = vendors.find(v => v.id === idParam);
      if (matched) {
        setProfile(matched);
        setView('dashboard');
        // Clear query parameters from URL without reloading page
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [vendors]);

  const handleStartRegistration = () => setView('registration');

  const handleUpdateProfile = (updated: VendorProfile) => {
    setProfile(updated);
    const updatedList = vendors.map(v => v.id === updated.id ? updated : v);
    updateVendorsList(updatedList);
  };

  // On registration completion: update profile dashboard AND append to registry 
  const handleRegistrationComplete = (data: VendorProfile) => {
    setProfile(data);
    const newList = [data, ...vendors];
    updateVendorsList(newList);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = (as: string, en: string, hi?: string) => {
    if (lang === 'hi') {
      if (hi) return hi;
      const trimmedAs = as.trim();
      if (ASSAMESE_TO_HINDI_MAP[trimmedAs]) {
        return ASSAMESE_TO_HINDI_MAP[trimmedAs];
      }
      const cleanKey = trimmedAs.replace(/[:.!?\s]+$/, '').trim();
      if (ASSAMESE_TO_HINDI_MAP[cleanKey]) {
        const punctuation = trimmedAs.substring(cleanKey.length);
        return ASSAMESE_TO_HINDI_MAP[cleanKey] + punctuation;
      }
      return en;
    }
    return en;
  };

  const handleNavigate = (targetView: string) => {
    if (targetView === 'dashboard' && !profile) {
      setProfile(vendors[0] || INITIAL_VENDORS[0]);
    }
    setView(targetView as any);
  };

  const activeProfile = profile ? (vendors.find(v => v.id === profile.id) || profile) : null;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <Layout 
        currentView={view} 
        onNavigate={handleNavigate}
        profile={activeProfile}
      >
        {view === 'home' && <Home onStart={handleStartRegistration} onViewDashboard={() => handleNavigate('admin')} />}
        {view === 'registration' && <Registration onComplete={handleRegistrationComplete} />}
        {view === 'dashboard' && activeProfile && (
          <Dashboard 
            profile={activeProfile} 
            onUpdateProfile={handleUpdateProfile} 
          />
        )}
        {view === 'admin' && (
          <AdminDashboard 
            vendors={vendors} 
            setVendors={updateVendorsList} 
            onBackToHome={() => setView('home')} 
          />
        )}
      </Layout>
    </LanguageContext.Provider>
  );
};

export default App;
