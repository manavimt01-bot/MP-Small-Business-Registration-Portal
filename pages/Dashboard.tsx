
import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { VendorProfile, Scheme } from '../types';
import { SCHEMES } from '../constants';
import VendorCard from '../components/VendorCard';
import { 
  Download, 
  Share2, 
  CreditCard, 
  Gift, 
  Landmark, 
  ShieldCheck, 
  ArrowRight, 
  Loader2, 
  CheckCircle, 
  TrendingUp, 
  Scan, 
  X, 
  Camera, 
  ShieldAlert,
  Fingerprint,
  Verified,
  Star,
  Quote,
  PlayCircle,
  Award,
  Users,
  ChevronDown,
  ChevronUp,
  FileText,
  Info,
  CalendarDays,
  Bell,
  Trash2,
  QrCode,
  Printer
} from 'lucide-react';
import { useLanguage } from '../App';

interface DashboardProps {
  profile: VendorProfile;
  onUpdateProfile?: (updated: VendorProfile) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onUpdateProfile }) => {
  const { lang, t } = useLanguage();
  const [bankConsent, setBankConsent] = useState(false);
  const [applyingFor, setApplyingFor] = useState<string | null>(null);
  const [appliedSchemes, setAppliedSchemes] = useState<string[]>([]);
  const [checkingOffers, setCheckingOffers] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isVerifyingScan, setIsVerifyingScan] = useState(false);
  const [scanResult, setScanResult] = useState<'success' | 'error' | null>(null);
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [localProfile, setLocalProfile] = useState<VendorProfile>(profile);

  // Sync profile state when the prop changes (e.g. from officer admin portal)
  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  // QR Code Placard States
  const [qrType, setQrType] = useState<'identity' | 'payment'>('identity');
  const [upiId, setUpiId] = useState(profile.upiId || `${profile.mobile || '9999999999'}@upi`);
  const [identityQrUrl, setIdentityQrUrl] = useState<string>('');
  const [paymentQrUrl, setPaymentQrUrl] = useState<string>('');

  // Sync UPI ID state when profile changes
  useEffect(() => {
    if (localProfile.upiId) {
      setUpiId(localProfile.upiId);
    }
  }, [localProfile.upiId]);

  // Generate QR Code data URLs
  useEffect(() => {
    const generateQRs = async () => {
      try {
        const idPayload = `${window.location.origin}/?view=verify&id=${localProfile.id || 'MP-TEMP'}`;
        const payPayload = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(localProfile.name)}&cu=INR`;

        const idUrl = await QRCode.toDataURL(idPayload, {
          width: 300,
          margin: 2,
          color: {
            dark: '#0F172A', // Slate 900
            light: '#FFFFFF'
          }
        });
        setIdentityQrUrl(idUrl);

        const payUrl = await QRCode.toDataURL(payPayload, {
          width: 300,
          margin: 2,
          color: {
            dark: '#EA580C', // Orange 600
            light: '#FFFFFF'
          }
        });
        setPaymentQrUrl(payUrl);
      } catch (err) {
        console.error("Error generating QR codes", err);
      }
    };

    generateQRs();
  }, [localProfile.id, localProfile.name, upiId]);

  const generatePlacardUrl = async (type: 'identity' | 'payment'): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1100;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject("Could not get canvas 2D context");
        return;
      }

      // 1. Draw Background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 800, 1100);

      // 2. Draw Decorative Border
      ctx.strokeStyle = '#EA580C'; // Saffron
      ctx.lineWidth = 16;
      ctx.strokeRect(20, 20, 760, 1060);

      // Inner subtle border
      ctx.strokeStyle = '#1E3A8A'; // Navy Blue
      ctx.lineWidth = 4;
      ctx.strokeRect(36, 36, 728, 1028);

      // 3. Header Gradient
      const grad = ctx.createLinearGradient(0, 40, 800, 240);
      grad.addColorStop(0, '#E65100'); // Deep Saffron
      grad.addColorStop(1, '#FF9800'); // Light Saffron
      ctx.fillStyle = grad;
      ctx.fillRect(40, 40, 720, 200);

      // 4. Header Texts
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      
      ctx.font = 'bold 22px "Inter", sans-serif';
      ctx.fillText('मध्य प्रदेश शासन • GOVERNMENT OF MADHYA PRADESH', 400, 95);

      ctx.font = '900 46px "Inter", sans-serif';
      ctx.fillText('PM SVANIDHI DIGITAL VYAPARI', 400, 160);

      ctx.font = 'bold 18px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText('NAGARIYA VIKAS EVAM AWAS VIBHAG', 400, 205);

      // 5. Vendor Info Section
      ctx.textAlign = 'left';
      ctx.fillStyle = '#0F172A'; // Slate 900

      // Draw beautiful info card background
      ctx.fillStyle = '#F8FAFC';
      ctx.beginPath();
      ctx.roundRect(80, 280, 640, 220, 32);
      ctx.fill();
      ctx.strokeStyle = '#F1F5F9';
      ctx.lineWidth = 2;
      ctx.strokeRect(80, 280, 640, 220);

      // Text inside Info Card
      ctx.fillStyle = '#EA580C';
      ctx.font = '900 36px "Inter", sans-serif';
      ctx.fillText(localProfile.name.toUpperCase(), 120, 345);

      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 18px "Inter", sans-serif';
      ctx.fillText('REGISTRATION UID', 120, 400);
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 24px "JetBrains Mono", monospace';
      ctx.fillText(localProfile.id || `MP-REG${localProfile.aadharNumber?.slice(-4) || '8091'}`, 120, 435);

      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 18px "Inter", sans-serif';
      ctx.fillText('BUSINESS TYPE', 420, 400);
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 24px "Inter", sans-serif';
      ctx.fillText(localProfile.businessType || 'Street Vendor', 420, 435);

      // 6. Centered QR Code
      const qrImage = new Image();
      qrImage.onload = () => {
        // Draw white background block for QR code
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 15;
        
        ctx.beginPath();
        ctx.roundRect(220, 540, 360, 360, 48);
        ctx.fill();
        
        ctx.shadowColor = 'transparent'; // Reset shadow
        
        // Draw the QR Code image
        ctx.drawImage(qrImage, 240, 560, 320, 320);

        // 7. QR Payload Text Indicator below QR
        ctx.textAlign = 'center';
        ctx.fillStyle = '#0F172A';
        ctx.font = '900 24px "Inter", sans-serif';
        if (type === 'payment') {
          ctx.fillText(`UPI ID: ${upiId}`, 400, 955);
          ctx.fillStyle = '#16A34A'; // Green
          ctx.font = 'bold 18px "Inter", sans-serif';
          ctx.fillText('✓ SCAN WITH ANY UPI APP TO MAKE SECURE PAYMENT', 400, 990);
        } else {
          ctx.fillStyle = '#1E3A8A'; // Navy
          ctx.font = 'bold 18px "Inter", sans-serif';
          ctx.fillText('✓ SCAN TO VERIFY GOVERNMENT STREET VENDOR IDENTITY', 400, 970);
        }

        // 8. Footer Brand Signature
        ctx.fillStyle = '#64748B';
        ctx.font = 'normal 15px "Inter", sans-serif';
        ctx.fillText('Generated via Madhya Pradesh Digital DPI Street Vendor Integration Gateway Portal', 400, 1045);

        resolve(canvas.toDataURL('image/png'));
      };

      qrImage.onerror = (err) => {
        reject(err);
      };

      // Set source to generated QR code URL
      qrImage.src = type === 'payment' ? paymentQrUrl : identityQrUrl;
    });
  };

  const downloadPlacard = async (type: 'identity' | 'payment') => {
    try {
      const dataUrl = await generatePlacardUrl(type);
      const link = document.createElement('a');
      link.download = `MP_SVANidhi_Placard_${type === 'payment' ? 'Payment' : 'Verification'}_${localProfile.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error downloading placard", err);
      alert("Unable to download placard. Please try again.");
    }
  };

  const printPlacard = async (type: 'identity' | 'payment') => {
    try {
      const dataUrl = await generatePlacardUrl(type);
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert("Pop-up blocker is active. Please allow pop-ups to print.");
        return;
      }
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Placard - ${localProfile.name}</title>
            <style>
              body {
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #f1f5f9;
                font-family: system-ui, -apple-system, sans-serif;
              }
              img {
                max-width: 100%;
                max-height: 98vh;
                object-fit: contain;
                box-shadow: 0 10px 25px rgba(0,0,0,0.15);
              }
              @media print {
                body { background-color: white; }
                img { box-shadow: none; max-height: 100vh; width: auto; height: auto; }
              }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" onload="window.print();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (err) {
      console.error("Error printing placard", err);
      alert("Unable to print. Please try again.");
    }
  };

  const handleSaveUpiId = () => {
    if (!upiId.trim() || !upiId.includes('@')) {
      alert(t('অনুগ্ৰহ কৰি এটা বৈধ ইউ পি আই আইডি প্ৰদান কৰক।', 'Please provide a valid UPI ID (e.g. name@bank).', 'कृपया एक वैध यूपीआई आईडी प्रदान करें।'));
      return;
    }
    const updatedProfile = {
      ...localProfile,
      upiId: upiId.trim()
    };
    setLocalProfile(updatedProfile);
    if (onUpdateProfile) {
      onUpdateProfile(updatedProfile);
    }
    alert(t('ইউ পি আই আইডি সফলতাৰে সংৰক্ষিত হ’ল!', 'UPI ID saved successfully!', 'यूपीआई आईडी सफलतापूर्वक सहेजा गया!'));
  };

  // Notifications State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<{
    id: string;
    title: string;
    message: string;
    timestamp: string;
    type: 'success' | 'info' | 'warning';
    read: boolean;
  }[]>(() => {
    const saved = localStorage.getItem(`notifications_${profile.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing notifications", e);
      }
    }
    return [
      {
        id: 'welcome',
        title: t('স্বাগতম পঞ্জীয়ন প’ৰ্টেললৈ', 'Welcome to MP SVANidhi Portal', 'एमपी स्वनिधि पोर्टल पर आपका स्वागत है'),
        message: t('আপোনাৰ ডিজিটেল আবেদন পত্ৰখন সফলতাৰে জমা হৈছে। এতিয়া প্ৰশাসনিক অনুসন্ধান চলি আছে।', 'Your digital registration profile has been successfully captured on the MP Government network. Administrative audit is pending.', 'आपका डिजिटल पंजीकरण प्रोफाइल सफलतापूर्वक दर्ज कर लिया गया है। प्रशासनिक सत्यापन लंबित है।'),
        timestamp: 'Just Now',
        type: 'info',
        read: false
      }
    ];
  });

  // Save notifications
  useEffect(() => {
    localStorage.setItem(`notifications_${profile.id}`, JSON.stringify(notifications));
  }, [notifications, profile.id]);

  // Track previous values
  const prevVerifiedRef = useRef(profile.isVerified);
  const prevLoanStatusRef = useRef(profile.loanStatus);

  useEffect(() => {
    // 1. Detect registration status change
    if (profile.isVerified !== prevVerifiedRef.current) {
      const isApprovedNow = profile.isVerified;
      const newNotification = {
        id: `reg_status_${Date.now()}`,
        title: isApprovedNow 
          ? t('পঞ্জীয়ন অনুমোদিত', 'Registration Approved!', 'पंजीकरण स्वीकृत!') 
          : t('পঞ্জীয়ন স্থগিত কৰা হৈছে', 'Registration Put on Hold', 'पंजीकरण स्थगित किया गया'),
        message: isApprovedNow
          ? t('আপোনাৰ পথ বিক্ৰেতাৰ পঞ্জীয়ন পৌৰ বিভাগৰ বিষয়াৰ দ্বাৰা অনুমোদিত হৈছে। এতিয়া আপোনাৰ পৰিচয় কাৰ্ড সুৰক্ষিত।', 'Your street vendor profile has been verified and approved by the Municipality Officer! Your digital identity card is now active.', 'नगरपालिका अधिकारी द्वारा आपके पथ विक्रेता प्रोफाइल को सत्यापित और स्वीकृत कर दिया गया है! आपका डिजिटल पहचान पत्र अब सक्रिय है।')
          : t('আপোনাৰ পথ বিক্ৰেতাৰ পঞ্জীয়ন সাময়িকভাৱে স্থগিত কৰা হৈছে। অনুগ্ৰহ কৰি পৌৰ কাৰ্যালয়ৰ সৈতে যোগাযোগ কৰক।', 'Your street vendor registration has been put on hold for compliance review. Please contact municipal supervisor.', 'आपका पथ विक्रेता पंजीकरण समीक्षा के लिए स्थगित कर दिया गया है। कृपया नगर पालिका पर्यवेक्षक से संपर्क करें।'),
        timestamp: 'Just Now',
        type: isApprovedNow ? 'success' as const : 'warning' as const,
        read: false
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      prevVerifiedRef.current = profile.isVerified;
    }

    // 2. Detect loan scheme approval
    if (profile.loanStatus !== prevLoanStatusRef.current) {
      const currentLoan = profile.loanStatus;
      let title = '';
      let message = '';
      let type: 'success' | 'info' | 'warning' = 'info';

      if (currentLoan === 'approved') {
        title = t('ঋণ আবেদন মঞ্জুৰ', 'PM SVANidhi Loan Approved!', 'पीएम स्वनिधि ऋण स्वीकृत!');
        message = t('অভিনন্দন! আপোনাৰ পিএম স্বনিধি ঋণ আঁচনিৰ ₹৫০,০০০ মঞ্জুৰ হৈছে আৰু আপোনাৰ বেংক একাউণ্টলৈ পোনপটীয়াকৈ হস্তান্তৰ কৰা হ’ব।', 'Congratulations! Your micro-credit loan application of ₹50,000 has been approved by our partner bank.', 'बधाई हो! पीएम स्वनिधि ऋण के तहत ₹50,000 की राशि स्वीकृत कर दी गई है। यह सीधे आपके बैंक खाते में स्थानांतरित की जाएगी।');
        type = 'success';
      } else if (currentLoan === 'under_review') {
        title = t('ঋণ যোগ্যতা পৰীক্ষা চলি আছে', 'Loan Eligibility Under Review', 'ऋण पात्रता समीक्षाधीन');
        message = t('আপোনাৰ পিএম স্বনিধি আঁচনিৰ ঋণ আবেদন বেংকৰ বিত্তীয় গোটৰ দ্বাৰা পৰীক্ষা কৰা হৈছে।', 'Your PM SVANidhi micro-credit application is undergoing standard compliance and credit score audit.', 'पीएम स्वनिधि के तहत आपके ऋण आवेदन की पात्रता की समीक्षा की जा रही है।');
        type = 'info';
      } else if (currentLoan === 'eligible') {
        title = t('আপুনি ঋণৰ বাবে যোগ্য', 'Pre-Approved Loan Offer Active', 'ऋण के लिए पूर्व-स्वीकृति सक्रिय');
        message = t('আপুনি এতিয়া পিএম স্বনিধি ঋণ আঁচনিৰ অধীনত ₹১০,০০০ ৰ পৰা ₹৫০,০০০ লৈকে জামিনবিহীন ঋণৰ আবেদন কৰিব পাৰিব।', 'You are now eligible to apply for collateral-free micro credit up to ₹50,000 under the SVANidhi Scheme.', 'अब आप स्वनिधि योजना के तहत ₹50,000 तक के संपार्श्विक-मुक्त सूक्ष्म ऋण के लिए आवेदन करने के योग्य हैं।');
        type = 'success';
      }

      if (title) {
        const newNotification = {
          id: `loan_status_${Date.now()}`,
          title,
          message,
          timestamp: 'Just Now',
          type,
          read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
      prevLoanStatusRef.current = profile.loanStatus;
    }
  }, [profile.isVerified, profile.loanStatus, profile, t]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const triggerDemoNotification = (scenario: 'approve_profile' | 'approve_loan' | 'new_benefit') => {
    if (scenario === 'approve_profile') {
      const updatedProfile = {
        ...localProfile,
        isVerified: true,
        loanStatus: localProfile.loanStatus === 'none' ? 'eligible' : localProfile.loanStatus
      };
      if (onUpdateProfile) {
        onUpdateProfile(updatedProfile);
      }
    } else if (scenario === 'approve_loan') {
      const updatedProfile = {
        ...localProfile,
        loanStatus: 'approved' as const
      };
      if (onUpdateProfile) {
        onUpdateProfile(updatedProfile);
      }
    } else if (scenario === 'new_benefit') {
      setNotifications(prev => [
        {
          id: `sim_benefit_${Date.now()}`,
          title: t('নতুন কল্যাণ আঁচনি মুকলি', 'New State Welfare Scheme Active', 'नई सरकारी योजना सक्रिय'),
          message: t('মধ্য প্ৰদেশ চৰকাৰে পথ বিক্ৰেতাসকলৰ বাবে নতুন পৰিয়াল বীমা আঁচনি ঘোষণা কৰিছে। ডেশ্ববৰ্ডত সবিশেষ খবৰ চাওক।', 'Madhya Pradesh government launched a new Family Welfare Insurance program for urban vendors. Check your schemes tab for details.', 'मध्य प्रदेश सरकार ने शहरी विक्रेताओं के लिए एक नया परिवार कल्याण बीमा कार्यक्रम शुरू किया है। विवरण के लिए योजनाएं टैब देखें।'),
          timestamp: 'Just Now',
          type: 'info',
          read: false
        },
        ...prev
      ]);
    }
  };

  const generateIDCardUrl = async (prof: VendorProfile): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 1200;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject("Could not get canvas context");
          return;
        }

        // Draw background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 800, 1200);

        // Draw Rounded corner base shadow/clip
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(0, 0, 800, 1200, 60);
        ctx.clip();

        // Saffron background header
        const grad = ctx.createLinearGradient(0, 0, 800, 400);
        grad.addColorStop(0, '#E65100');
        grad.addColorStop(0.5, '#F57C00');
        grad.addColorStop(1, '#FF9800');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 800, 384);

        // Header circle overlays
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.beginPath();
        ctx.arc(800, 0, 320, 0, Math.PI * 2);
        ctx.fill();

        // Top texts
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px "Inter", sans-serif';
        ctx.fillText('DIGITAL VYAPARI', 80, 100);

        ctx.font = '900 44px "Inter", sans-serif';
        ctx.fillText('IDENTITY CARD', 80, 220);

        ctx.font = 'bold 20px "Inter", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillText('GOVERNMENT OF MADHYA PRADESH', 80, 275);

        // Verified Stamp
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(700, 180, 45, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#16A34A';
        ctx.font = 'bold 48px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✓', 700, 196);
        ctx.textAlign = 'left';

        ctx.restore();

        // Draw Avatar base
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 20;
        ctx.beginPath();
        ctx.roundRect(80, 300, 240, 240, 42);
        ctx.fill();
        ctx.shadowColor = 'transparent';

        // Load selfie image
        let selfieImage: HTMLImageElement | null = null;
        const selfieUrl = prof.selfie || `https://api.dicebear.com/7.x/avataaars/svg?seed=${prof.mobile || 'mp_vendor'}`;
        try {
          selfieImage = await new Promise<HTMLImageElement>((res, rej) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => res(img);
            img.onerror = () => rej();
            img.src = selfieUrl;
          });
        } catch (e) {
          console.warn("Failed to load selfie image on canvas", e);
        }

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(90, 310, 220, 220, 32);
        ctx.clip();
        ctx.fillStyle = '#FFF7ED';
        ctx.fillRect(90, 310, 220, 220);
        
        if (selfieImage) {
          ctx.drawImage(selfieImage, 90, 310, 220, 220);
        } else {
          // Fallback Vector Avatar
          ctx.fillStyle = '#FFEDD5';
          ctx.beginPath();
          ctx.arc(200, 400, 45, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#EA580C';
          ctx.beginPath();
          ctx.arc(200, 375, 52, Math.PI, 0);
          ctx.fill();
          ctx.fillStyle = '#0F172A';
          ctx.beginPath();
          ctx.ellipse(200, 520, 85, 85, 0, Math.PI, 0);
          ctx.fill();
        }
        ctx.restore();

        // Verified badge pill
        ctx.fillStyle = '#16A34A';
        ctx.beginPath();
        ctx.roundRect(420, 460, 280, 60, 30);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 22px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('VERIFIED SMALL BUSINESS', 560, 498);
        ctx.textAlign = 'left';

        // Text content
        ctx.fillStyle = '#0F172A';
        ctx.font = '900 48px "Inter", sans-serif';
        ctx.fillText(prof.name || 'Small Business', 80, 640);

        ctx.fillStyle = '#EA580C';
        ctx.font = 'bold 24px "Inter", sans-serif';
        ctx.fillText((prof.businessType || 'MP Street Vendor').toUpperCase(), 80, 690);

        // Separator line
        ctx.strokeStyle = '#F1F5F9';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(80, 750);
        ctx.lineTo(720, 750);
        ctx.stroke();

        // Details Grid
        ctx.fillStyle = '#64748B';
        ctx.font = 'bold 18px "Inter", sans-serif';
        ctx.fillText('REGISTRATION UID', 80, 800);
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 24px "JetBrains Mono", monospace';
        ctx.fillText(prof.id || `MP-${prof.aadharNumber?.slice(-4) || '8291'}`, 80, 840);

        ctx.fillStyle = '#64748B';
        ctx.font = 'bold 18px "Inter", sans-serif';
        ctx.fillText('MOBILE NUMBER', 400, 800);
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 24px "JetBrains Mono", monospace';
        ctx.fillText(`+91 ${prof.mobile || 'XXXXXX'}`, 400, 840);

        ctx.fillStyle = '#64748B';
        ctx.font = 'bold 18px "Inter", sans-serif';
        ctx.fillText('DATE OF ISSUE', 80, 910);
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 24px "Inter", sans-serif';
        ctx.fillText('2026-05-21', 80, 950);

        ctx.fillStyle = '#64748B';
        ctx.font = 'bold 18px "Inter", sans-serif';
        ctx.fillText('AUTHORITY STATE', 400, 910);
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 24px "Inter", sans-serif';
        ctx.fillText('Govt of Madhya Pradesh', 400, 950);

        // Generate or load QR code
        let qrUrl = identityQrUrl;
        if (!qrUrl) {
          try {
            const idPayload = `${window.location.origin}/?view=verify&id=${prof.id || 'MP-TEMP'}`;
            qrUrl = await QRCode.toDataURL(idPayload, {
              width: 300,
              margin: 2,
              color: {
                dark: '#0F172A',
                light: '#FFFFFF'
              }
            });
          } catch (e) {
            console.error("Failed to generate QR in downloadIDCard", e);
          }
        }

        let qrImg: HTMLImageElement | null = null;
        if (qrUrl) {
          try {
            qrImg = await new Promise<HTMLImageElement>((res, rej) => {
              const img = new Image();
              img.onload = () => res(img);
              img.onerror = () => rej();
              img.src = qrUrl;
            });
          } catch (e) {
            console.warn("Failed to load QR code image on ID card canvas", e);
          }
        }

        if (qrImg) {
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.roundRect(80, 1020, 120, 120, 20);
          ctx.fill();
          ctx.shadowColor = 'transparent';

          ctx.drawImage(qrImg, 85, 1025, 110, 110);
        } else {
          // Fallback: raw QR boxes
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(80, 1020, 120, 120);
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(100, 1040, 80, 80);
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(115, 1055, 50, 50);
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(125, 1065, 30, 30);
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(135, 1075, 10, 10);
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(170, 1020, 30, 30);
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(175, 1025, 20, 20);
          ctx.fillRect(80, 1110, 30, 30);
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(85, 1115, 20, 20);
        }

        // Footer terms
        ctx.fillStyle = '#64748B';
        ctx.font = 'normal 15px "Inter", sans-serif';
        ctx.fillText('This official identity card guarantees direct access to Madhya Pradesh state welfare benefits', 228, 1070);
        ctx.fillText('and enables swift micro-credit disbursement from registered financial partner portals.', 228, 1100);

        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        reject(err);
      }
    });
  };

  const downloadIDCard = async (prof: VendorProfile) => {
    try {
      const dataUrl = await generateIDCardUrl(prof);
      const link = document.createElement('a');
      link.download = `MP_Street_Vendor_ID_${prof.name || 'Vendor'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error downloading ID card", err);
      alert("Unable to download ID card. Please try again.");
    }
  };

  const printIDCard = async (prof: VendorProfile) => {
    try {
      const dataUrl = await generateIDCardUrl(prof);
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert("Pop-up blocker is active. Please allow pop-ups to print.");
        return;
      }
      printWindow.document.write(`
        <html>
          <head>
            <title>Print ID Card - ${prof.name}</title>
            <style>
              body {
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #f1f5f9;
                font-family: system-ui, -apple-system, sans-serif;
              }
              img {
                max-width: 100%;
                max-height: 98vh;
                object-fit: contain;
                box-shadow: 0 10px 25px rgba(0,0,0,0.15);
              }
              @media print {
                body { background-color: white; }
                img { box-shadow: none; max-height: 100vh; width: auto; height: auto; }
              }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" onload="window.print();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (err) {
      console.error("Error printing ID card", err);
      alert("Unable to print ID card. Please try again.");
    }
  };

  const handleApplyScheme = (schemeId: string) => {
    setApplyingFor(schemeId);
    setTimeout(() => {
      setAppliedSchemes(prev => [...prev, schemeId]);
      const schemeTitle = SCHEMES.find(s => s.id === schemeId)?.title || schemeId;
      const nextLoanStatus = schemeId === 'svanidhi' ? 'applied' as const : localProfile.loanStatus;
      const updatedProfile = {
        ...localProfile,
        activeSchemes: Array.from(new Set([...(localProfile.activeSchemes || []), schemeTitle])),
        loanStatus: nextLoanStatus,
        activityHistory: [
          { date: 'Just Now', action: `Applied for ${schemeTitle}` },
          ...(localProfile.activityHistory || [])
        ]
      };
      setLocalProfile(updatedProfile);
      if (onUpdateProfile) {
        onUpdateProfile(updatedProfile);
      }

      // Add Notification
      setNotifications(prev => [
        {
          id: `scheme_applied_${Date.now()}`,
          title: t('আঁচনিৰ আবেদন দাখিল', 'Scheme Application Submitted', 'योजना आवेदन जमा किया गया'),
          message: `${t('আপুনি', 'You have successfully applied for', 'आपने सफलतापूर्वक आवेदन किया है')} ${schemeTitle}. ${t('প্ৰশাসনিক অনুসন্ধান সোনকালেই সম্পূৰ্ণ হ’ব।', 'Eligibility review will be completed by the supervisor shortly.', 'सत्यापन प्रक्रिया शीघ्र पूरी की जाएगी।')}`,
          timestamp: 'Just Now',
          type: 'info',
          read: false
        },
        ...prev
      ]);

      setApplyingFor(null);
    }, 2000);
  };

  const handleCheckOffers = () => {
    setCheckingOffers(true);
    setTimeout(() => {
      setCheckingOffers(false);
      const updatedProfile = {
        ...localProfile,
        loanStatus: 'under_review' as const,
        activityHistory: [
          { date: 'Just Now', action: 'Credit Review Started' },
          ...(localProfile.activityHistory || [])
        ]
      };
      setLocalProfile(updatedProfile);
      if (onUpdateProfile) {
        onUpdateProfile(updatedProfile);
      }

      // Add Notification
      setNotifications(prev => [
        {
          id: `credit_review_${Date.now()}`,
          title: t('ঋণ অনুসন্ধান আৰম্ভ হৈছে', 'Credit Review Triggered', 'ऋण समीक्षा प्रारंभ'),
          message: t('আপোনাৰ ঋণ অফাৰৰ যোগ্যতা পৰীক্ষা কৰা হৈছে। অনুগ্ৰহ কৰি অপেক্ষা কৰক।', 'Bank micro-credit scoring evaluation has been initialized for your verified credentials.', 'बैंक द्वारा आपके क्रेडिट स्कोर और पात्रता की समीक्षा शुरू कर दी गई है।'),
          timestamp: 'Just Now',
          type: 'info',
          read: false
        },
        ...prev
      ]);

      alert(t('অপোনাক অভিনন্দন! আপুনি ₹৫০,০০০ লৈকে ঋণ লাভৰ যোগ্যতা অৰ্জন কৰিছে।', 'Congratulations! You are eligible for a credit up to ₹50,000.'));
    }, 3000);
  };

  const startScanner = async () => {
    setIsScannerOpen(true);
    setScanResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert(t("কেমেৰা অন কৰিবলৈ অসমৰ্থ।", "Unable to access camera."));
      setIsScannerOpen(false);
    }
  };

  const closeScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsScannerOpen(false);
    setIsVerifyingScan(false);
    setScanResult(null);
  };

  const simulateScan = () => {
    setIsVerifyingScan(true);
    setTimeout(() => {
      setIsVerifyingScan(false);
      setScanResult('success');
    }, 2500);
  };

  const toggleExpandScheme = (id: string) => {
    setExpandedSchemeId(prev => prev === id ? null : id);
  };

  const loanStatus = localProfile.loanStatus || 'none';

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: ID Card & Quick Actions */}
        <div className="lg:col-span-4 space-y-10">
          <div className="sticky top-24 space-y-10">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">{t('আপোনাৰ ডিজিটেল কাৰ্ড', 'Your Digital ID')}</h2>
              <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                 <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Live Sync</span>
              </div>
            </div>

            <VendorCard profile={localProfile} />
            
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => downloadIDCard(localProfile)}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-orange-600 transition-all duration-500">
                  <Download className="w-6 h-6 text-orange-600 group-hover:text-white" />
                </div>
                <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest text-center leading-none">{t('ডাউনলোড', 'Download ID')}</span>
              </button>
              <button 
                onClick={() => printIDCard(localProfile)}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-amber-600 transition-all duration-500">
                  <Printer className="w-6 h-6 text-amber-600 group-hover:text-white" />
                </div>
                <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest text-center leading-none">{t('প্ৰিন্ট কৰক', 'Print ID')}</span>
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert(t('শ্বেয়াৰিং লিংক কপি কৰা হৈছে।', 'Sharing link copied to clipboard.'));
                }}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500">
                  <Share2 className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest text-center leading-none">{t('শ্বেয়াৰ', 'Share Card')}</span>
              </button>
            </div>

            {/* Official Verification Feature Section */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-[40px] border border-green-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                 <ShieldCheck className="w-20 h-20" />
               </div>
               <div className="flex items-center space-x-3 mb-4">
                 <ShieldCheck className="w-6 h-6 text-green-600" />
                 <h3 className="font-black text-green-900 uppercase text-xs tracking-widest">{t('আঞ্চলিক সত্যতা প্ৰমাণ', 'Official Verification')}</h3>
               </div>
               <p className="text-xs text-green-800 opacity-80 leading-relaxed font-medium mb-6">
                 {t('यह कार्ड मध्य प्रदेश सरकार के नगरीय विकास एवं आवास विभाग के नियमों के तहत मान्य और स्वीकृत है।', 'This card is recognized and valid under the guidelines of the Govt of Madhya Pradesh.', 'यह कार्ड मध्य प्रदेश सरकार के नगरीय विकास एवं आवास विभाग के नियमों के तहत मान्य और स्वीकृत है।')}
               </p>
               <button 
                onClick={startScanner}
                className="w-full py-4 bg-green-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-green-700 transition-all shadow-lg shadow-green-200 active:scale-95"
               >
                 <Scan className="w-4 h-4" />
                 <span>{t('বিষয়া সত্যতা পৰীক্ষা', 'Official Scan')}</span>
               </button>
            </div>
          </div>
        </div>

        {/* Right Column: Schemes & Banking */}
        <div className="lg:col-span-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
            <div className="relative pl-0 md:pl-4 text-left">
              <div className="absolute -left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-orange-500 rounded-full hidden md:block"></div>
              <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">{t('ব্যৱসায়ী ডেশ্বব’ৰ্ড', 'Merchant Dashboard', 'विक्रेता डैशबोर्ड')}</h1>
              <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
                {t('আপোনাৰ ডিজিটেল পৰিচয় আৰু চৰকাৰী আঁচনি সুবিধা চোৱাচিতা কৰক।', 'Manage your digital credentials, apply for PM SVANidhi benefits, and view verified records.', 'अपने डिजिटल क्रेडेंशियल प्रबंधित करें, पीएम स्वनिधि लाभों के लिए आवेदन करें, और रिकॉर्ड देखें।')}
              </p>
            </div>

            {/* Real-Time Notification Bell & Dropdown */}
            <div className="relative self-start md:self-center shrink-0 z-30">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) markAllAsRead();
                }}
                className={`p-4 rounded-3xl border flex items-center justify-center relative transition-all duration-300 cursor-pointer ${
                  showNotifications 
                    ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-100' 
                    : 'bg-white text-gray-700 border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200'
                }`}
              >
                <Bell className={`w-6 h-6 ${notifications.some(n => !n.read) ? 'animate-bounce' : ''}`} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {/* Notification Center Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-4 w-96 bg-white rounded-[32px] border border-orange-100 shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                    <div>
                      <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider flex items-center space-x-1.5">
                        <span>{t('লাইভ সৰকাৰী জাননী', 'State Notification Hub')}</span>
                        {notifications.some(n => !n.read) && (
                          <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                        )}
                      </h3>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Madhya Pradesh live feed gateway</p>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-orange-600">
                      <button onClick={clearNotifications} className="hover:text-red-600 transition-colors cursor-pointer">
                        {t('মহা মছক', 'Clear All')}
                      </button>
                    </div>
                  </div>

                  {/* List */}
                  <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <Bell className="w-8 h-8 mx-auto opacity-20 mb-2" />
                        <p className="text-xs font-bold uppercase tracking-wider">{t('কোনো জাননী নাই', 'No new notifications')}</p>
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          className={`p-4 rounded-2xl border transition-all text-left relative group ${
                            n.read ? 'bg-gray-50/50 border-gray-100/50' : 'bg-orange-50/20 border-orange-100'
                          }`}
                        >
                          {/* Indicator bullet */}
                          <div className="flex items-start space-x-3">
                            <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                              n.type === 'success' ? 'bg-green-500' : n.type === 'warning' ? 'bg-red-500' : 'bg-blue-500'
                            }`}></span>
                            <div className="space-y-1">
                              <h4 className="text-xs font-extrabold text-gray-900 leading-tight pr-5">{n.title}</h4>
                              <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{n.message}</p>
                              <span className="text-[8px] font-black text-gray-400 uppercase block tracking-wider pt-1">{n.timestamp}</span>
                            </div>
                          </div>

                          <button 
                            onClick={(e) => deleteNotification(n.id, e)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Live Simulation Control Deck */}
                  <div className="border-t border-gray-100 mt-6 pt-4 text-left">
                     <p className="text-[9px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
                       ⚡ Live Simulator Deck (Verify Real-Time alerts)
                     </p>
                     <div className="grid grid-cols-3 gap-2 text-[8px] font-black tracking-widest uppercase">
                        <button 
                          onClick={() => triggerDemoNotification('approve_profile')}
                          disabled={localProfile.isVerified}
                          className="py-2.5 px-1 bg-green-50 text-green-700 border border-green-100 hover:bg-green-600 hover:text-white rounded-xl transition disabled:opacity-40 cursor-pointer"
                        >
                          Approve Profile
                        </button>
                        <button 
                          onClick={() => triggerDemoNotification('approve_loan')}
                          disabled={localProfile.loanStatus === 'approved'}
                          className="py-2.5 px-1 bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-600 hover:text-white rounded-xl transition disabled:opacity-40 cursor-pointer"
                        >
                          Approve Loan
                        </button>
                        <button 
                          onClick={() => triggerDemoNotification('new_benefit')}
                          className="py-2.5 px-1 bg-orange-50 text-orange-700 border border-orange-100 hover:bg-orange-600 hover:text-white rounded-xl transition cursor-pointer"
                        >
                          Push State Notice
                        </button>
                     </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Official Registration Profile Details Card */}
          <div className="bg-white rounded-[48px] border border-orange-100 p-10 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/[0.02] rounded-full -mr-24 -mt-24 pointer-events-none"></div>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-orange-50/80 rounded-2xl flex items-center justify-center text-orange-600 border border-orange-100 shadow-inner">
                <ShieldCheck className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                  {t('আধিকাৰিক ডেশ্বব’ৰ্ড: পঞ্জীয়নৰ সবিশেষ', 'Officer Dashboard: Registration Profile')}
                </h2>
                <p className="text-xs text-gray-400 font-bold tracking-wider uppercase">
                  {t('मध्य प्रदेश सरकार का अधिकृत डेटाबेस', 'Madhya Pradesh Government Authorized Records', 'मध्य प्रदेश सरकार का अधिकृत डेटाबेस')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {/* Name */}
              <div className="space-y-1 bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50 hover:bg-white hover:shadow-md hover:border-orange-100 transition-all">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">{t('নাম', 'Name')}</span>
                <span className="text-lg font-black text-gray-900 block font-sans">{profile.name}</span>
              </div>

              {/* Registration ID */}
              <div className="space-y-1 bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50 hover:bg-white hover:shadow-md hover:border-orange-100 transition-all">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">{t('পঞ্জীয়ন নম্বৰ', 'Registration ID')}</span>
                <span className="text-lg font-black text-orange-600 block font-mono">
                  {profile.id || `MP-REG${profile.aadharNumber ? profile.aadharNumber.slice(-4) : "8091"}`}
                </span>
              </div>

              {/* Professional Category */}
              <div className="space-y-1 bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50 hover:bg-white hover:shadow-md hover:border-orange-100 transition-all">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">{t('বৃত্তিৰ তালিকা', 'Professional Category')}</span>
                <span className="text-lg font-black text-gray-700 block font-sans">
                  {profile.profession || profile.businessType || t('ক্ষুদ্ৰ উদ্যোক্তা', 'Micro-entrepreneur')}
                </span>
              </div>

              {/* Registration Status */}
              <div className="space-y-1 bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50 hover:bg-white hover:shadow-md hover:border-orange-100 transition-all">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">{t('পঞ্জীয়নৰ স্থিতি', 'Registration Status')}</span>
                <div className="flex items-center space-x-2.5 mt-1">
                  <span className={`flex h-2.5 w-2.5 rounded-full ${profile.isVerified ? 'bg-green-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`}></span>
                  <span className={`text-md font-black uppercase tracking-widest ${profile.isVerified ? 'text-green-700' : 'text-amber-700'}`}>
                    {profile.isVerified ? t('অনুমোদিত', 'Approved') : t('পৰীক্ষাধীন', 'Review Mode')}
                  </span>
                </div>
              </div>

              {/* Aadhaar Card (Masked) */}
              <div className="space-y-1 bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50 hover:bg-white hover:shadow-md hover:border-orange-100 transition-all">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">{t('আধাৰ কাৰ্ড', 'Aadhaar Card (Masked)')}</span>
                <span className="text-lg font-black text-gray-700 block font-mono">
                  {profile.aadharNumber 
                    ? `XXXX-XXXX-${profile.aadharNumber.slice(-4)}` 
                    : 'XXXX-XXXX-8091'}
                </span>
              </div>

              {/* Masked Address */}
              <div className="space-y-1 bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50 hover:bg-white hover:shadow-md hover:border-orange-100 transition-all">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">{t('ঠিকনা', 'Masked Address')}</span>
                <span className="text-[15px] font-bold text-gray-750 block font-sans leading-snug">
                  {profile.location?.address 
                    ? (() => {
                        const addr = profile.location.address;
                        const parts = addr.split(',');
                        if (parts.length > 1) {
                          return `••••••••, ${parts.slice(1).join(',').trim()}`;
                        }
                        return `••••••••, ${addr}`;
                      })()
                    : '••••••••, New Market, Bhopal'}
                </span>
              </div>

              {/* District */}
              <div className="space-y-1 bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50 hover:bg-white hover:shadow-md hover:border-orange-100 transition-all">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">{t('জিলা', 'District')}</span>
                <span className="text-lg font-black text-gray-900 block font-sans">
                  {profile.location?.address?.split(',').slice(-2, -1)[0]?.trim() || t('भोपाल', 'Bhopal', 'भोपाल')}
                </span>
              </div>

              {/* State */}
              <div className="space-y-1 bg-orange-50/20 p-6 rounded-3xl border border-orange-100/30 hover:bg-white hover:shadow-md hover:border-orange-100 transition-all">
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest block">{t('ৰাজ্য', 'State')}</span>
                <span className="text-lg font-black text-orange-700 block font-sans">{t('मध्य प्रदेश', 'Madhya Pradesh', 'मध्य प्रदेश')}</span>
              </div>
            </div>
          </div>

          {/* Digital QR Code & Payments Centre Card */}
          <div className="bg-white rounded-[48px] border border-orange-100 p-10 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/[0.02] rounded-full -mr-24 -mt-24 pointer-events-none"></div>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
              {/* Left Side: Controls and Actions */}
              <div className="flex-1 space-y-8 text-left">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-50/80 rounded-2xl flex items-center justify-center text-orange-600 border border-orange-100 shadow-inner">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                      {t('ডিজিটেল কিউআৰ ক’ড আৰু লেনদেন', 'Digital QR Placard & Payments', 'डिजिटल क्यूआर कोड और भुगतान')}
                    </h2>
                    <p className="text-xs text-gray-400 font-bold tracking-wider uppercase">
                      {t('সক্ৰিয় লেনদেন তথা পৰিচয় পত্ৰ', 'Active Merchant Payments & ID Verification', 'सक्रिय मर्चेंट भुगतान और आईडी सत्यापन')}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {t('জেনেৰেট কৰক আৰু ডাউনলোড কৰক গ্ৰাহকৰ পৰা পোনে পোনে ইউ পি আই পেমেন্ট গ্ৰহণ কৰিবলৈ আৰু নিজৰ পৰিচয় প্ৰমাণ কৰিবলৈ এটা সুন্দৰ কাৰ্ড।', 'Generate, download, and print a custom merchant placard to accept direct client UPI payments or show your verified identity.', 'ग्राहकों से सीधे यूपीआई भुगतान स्वीकार करने या अपनी सत्यापित पहचान प्रदर्शित करने के लिए एक सुंदर मर्चेंट क्यूआर प्लेकार्ड जनरेट, डाउनलोड और प्रिंट करें।')}
                </p>

                {/* QR Type Selection Tabs */}
                <div className="flex space-x-3 p-1.5 bg-gray-50 rounded-3xl border border-gray-100 max-w-md">
                  <button
                    onClick={() => setQrType('identity')}
                    className={`flex-1 py-3 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                      qrType === 'identity'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'text-gray-500 hover:text-gray-950 hover:bg-gray-100/50'
                    }`}
                  >
                    {t('পৰিচয় কিউআৰ', 'Identity Verification', 'पहचान सत्यापन')}
                  </button>
                  <button
                    onClick={() => setQrType('payment')}
                    className={`flex-1 py-3 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                      qrType === 'payment'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'text-gray-500 hover:text-gray-950 hover:bg-gray-100/50'
                    }`}
                  >
                    {t('ডিজিটেল পেমেন্ট কিউআৰ', 'UPI Digital Payments', 'यूपीआई डिजिटल भुगतान')}
                  </button>
                </div>

                {/* Conditional Inputs / Explanations */}
                {qrType === 'payment' ? (
                  <div className="bg-orange-50/30 p-6 rounded-3xl border border-orange-100/50 space-y-4 max-w-md">
                    <label className="block text-[10px] font-black text-orange-700 uppercase tracking-widest">
                      {t('ইউ পি আই আইডি আপডেট কৰক', 'Your Active UPI ID', 'अपनी सक्रिय यूपीआई आईडी')}
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="mobile-number@upi"
                        className="flex-1 px-5 py-3 bg-white rounded-2xl border border-gray-200 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono shadow-inner"
                      />
                      <button
                        onClick={handleSaveUpiId}
                        className="px-6 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all cursor-pointer"
                      >
                        {t('সংৰক্ষণ কৰক', 'Save', 'सहेजें')}
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium leading-normal">
                      {t('গ্ৰাহকে এই আইডি ব্যৱহাৰ কৰি যিকোনো UPI অ্যাপৰ (Google Pay, PhonePe, Paytm, BHIM) জৰিয়তে পোনপটীয়াভাৱে আপোনাৰ বেংক একাউণ্টলৈ পেমেন্ট পঠিয়াব পাৰিব।', 'Clients will pay directly into your linked bank account via any UPI application (GPay, PhonePe, Paytm).', 'ग्राहक सीधे आपकी लिंक की गई यूपीआई आईडी पर किसी भी यूपीआई ऐप के माध्यम से सीधे आपके बैंक खाते में भुगतान कर सकेंगे।')}
                    </p>
                  </div>
                ) : (
                  <div className="bg-blue-50/20 p-6 rounded-3xl border border-blue-100/30 space-y-3 max-w-md">
                    <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">
                      {t('নিৰাপদ চৰকাৰী সত্যতা নিৰূপণ', 'Government Verification Payload', 'सुरक्षित सरकारी सत्यापन')}
                    </p>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      {t('এই কিউআৰ ক’ডটো স্কেন কৰিলে এজন পৌৰ বিষয়া বা গ্ৰাহকে পোনপটীয়াকৈ আপোনাৰ চৰকাৰী অনুমোদিত প্ৰফাইল পৃষ্ঠালৈ পুনঃনিৰ্দেশিত হ’ব আৰু আপোনাৰ ব্যৱসায়িক বৈধতা সত্যতা প্ৰমাণ কৰিব পাৰিব।', 'Scanning this QR code immediately redirects any authority supervisor or client to your official real-time government-registered verification page to verify credentials.', 'इस क्यूआर कोड को स्कैन करने पर कोई भी अधिकारी या ग्राहक आपकी सत्यापित और स्वीकृत प्रोफाइल पर जाकर आपके व्यवसाय की सत्यता की पुष्टि कर सकता है।')}
                    </p>
                  </div>
                )}

                {/* Print and Download Actions */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => downloadPlacard(qrType)}
                    className="inline-flex items-center space-x-3 px-8 py-5 bg-orange-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-orange-600/20 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('প্লেকাৰ্ড ডাউনলোড কৰক', 'Download Placard', 'प्लेकार्ड डाउनलोड करें')}</span>
                  </button>
                  <button
                    onClick={() => printPlacard(qrType)}
                    className="inline-flex items-center space-x-3 px-8 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-3xl font-black text-xs uppercase tracking-widest hover:border-orange-200 hover:bg-orange-50/10 transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{t('প্লেকাৰ্ড প্ৰিন্ট কৰক', 'Print Placard', 'प्लेकार्ड प्रिंट करें')}</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Visual Mockup Preview */}
              <div className="w-full lg:w-80 shrink-0">
                <div className="bg-gray-50 rounded-[40px] p-6 border border-gray-100 shadow-inner flex flex-col items-center">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Placard Live Preview</span>
                  
                  {/* Miniature Placard Card representation */}
                  <div className="w-full bg-white rounded-[32px] p-5 border-4 border-orange-500 flex flex-col relative overflow-hidden shadow-md aspect-[3/4] select-none">
                    {/* Header bar */}
                    <div className="bg-gradient-to-r from-orange-600 to-amber-500 -mx-5 -mt-5 p-3 text-center text-white">
                      <p className="text-[6px] font-black tracking-widest">GOVERNMENT OF MADHYA PRADESH</p>
                      <p className="text-[10px] font-black tracking-tight mt-0.5">PM SVANIDHI MERCHANT</p>
                    </div>

                    {/* Vendor details inside miniature placard */}
                    <div className="mt-4 text-center">
                      <p className="text-xs font-black text-gray-900 truncate leading-none uppercase">{localProfile.name}</p>
                      <p className="text-[7px] font-mono text-orange-600 font-bold mt-1 leading-none">{localProfile.id || 'MP-REG8091'}</p>
                    </div>

                    {/* QR Area */}
                    <div className="my-auto flex flex-col items-center justify-center">
                      <div className="w-28 h-28 bg-white border border-gray-100 rounded-2xl shadow-sm p-2 flex items-center justify-center">
                        {qrType === 'payment' ? (
                          paymentQrUrl ? (
                            <img src={paymentQrUrl} alt="UPI QR" className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-full h-full bg-orange-50 animate-pulse rounded-xl"></div>
                          )
                        ) : (
                          identityQrUrl ? (
                            <img src={identityQrUrl} alt="Identity QR" className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl"></div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Footer bar */}
                    <div className="border-t border-gray-100 pt-3 text-center">
                      <p className="text-[6px] font-black text-green-600 uppercase tracking-widest flex items-center justify-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span>{qrType === 'payment' ? 'SCAN TO PAY ANY UPI' : 'SCAN TO VERIFY VENDOR'}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Redesigned Dashboard Stats / Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50/20 p-8 rounded-[40px] border border-green-100/80 flex items-center space-x-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-200">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-black text-green-700 uppercase tracking-[0.15em] leading-none mb-1.5">{t('পৰিচয় স্থিতি', 'Identity Status')}</p>
                <p className="text-[16px] md:text-lg font-black text-gray-900 leading-none">{t('প্ৰমাণিত ব্যৱসায়', 'Verified Merchant')}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50/20 p-8 rounded-[40px] border border-orange-100/80 flex items-center space-x-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-200">
                <Gift className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-black text-orange-700 uppercase tracking-[0.15em] leading-none mb-1.5">{t('সক্ৰিয় আঁচনি', 'Active Benefits')}</p>
                <p className="text-[16px] md:text-lg font-black text-gray-900 leading-none">{localProfile.activeSchemes?.length || 0} {t('আঁচনি সক্ৰিয়', 'Applied')}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/20 p-8 rounded-[40px] border border-blue-100/80 flex items-center space-x-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
                <Landmark className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-700 uppercase tracking-[0.15em] leading-none mb-1.5">{t('ঋণ স্থিতি', 'Credit pre-approval')}</p>
                <p className="text-[16px] md:text-lg font-black text-gray-900 leading-none">{loanStatus === 'applied' ? t('পৰীক্ষাধীন', 'Review Mode') : t('₹৫০,০০০ অনুমোদিত', '₹50,000 Pre-App')}</p>
              </div>
            </div>
          </div>

          {/* Enhanced Special Schemes Discovery Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-gray-900 flex items-center tracking-tight">
                <Gift className="w-8 h-8 mr-4 text-orange-500" />
                {t('আপোনাৰ বাবে উপযোগী আঁচনিসমূহ', 'Special Schemes for You')}
              </h2>
              <button className="text-[10px] font-black text-orange-600 hover:text-orange-700 uppercase tracking-[0.2em] border-b-2 border-orange-200 pb-1">{t('সকলো চাওক', 'View All')}</button>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {SCHEMES.slice(0, 4).map((scheme) => {
                const isApplied = appliedSchemes.includes(scheme.id) || localProfile.activeSchemes?.some(s => s === scheme.title);
                const isExpanded = expandedSchemeId === scheme.id;
                
                return (
                  <div 
                    key={scheme.id} 
                    className={`bg-white rounded-[56px] border border-gray-100 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-orange-200/10 transition-all duration-500 overflow-hidden flex flex-col group relative ${isExpanded ? 'ring-2 ring-orange-100' : ''}`}
                  >
                    <div className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex items-start md:items-center space-x-8 flex-1">
                        <div className="w-20 h-20 bg-gray-50 rounded-[32px] shrink-0 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 shadow-sm border border-gray-100">
                          <TrendingUp className="w-9 h-9" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-2xl font-black text-gray-900 asomiya leading-tight">{lang === 'hi' ? scheme.titleAs : scheme.title}</h3>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${isApplied ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                              {isApplied ? 'Active' : 'Eligible'}
                            </div>
                          </div>
                          <p className="text-gray-500 leading-relaxed font-medium italic">"{lang === 'hi' ? scheme.descriptionAs : scheme.description}"</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 shrink-0">
                        <button 
                          onClick={() => toggleExpandScheme(scheme.id)}
                          className="flex items-center space-x-2 px-6 py-4 bg-gray-50 text-gray-700 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-50 hover:text-orange-700 transition-all"
                        >
                          <span>{isExpanded ? t('সংকোচন কৰক', 'Hide Details') : t('বিৱৰণ চাওক', 'View Details')}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        
                        {isApplied ? (
                          <div className="px-8 py-4 bg-green-50 text-green-700 rounded-3xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-3 border-2 border-green-200">
                            <CheckCircle className="w-4 h-4" />
                            <span>{t('আবেদন কৰা হ’ল', 'Applied')}</span>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleApplyScheme(scheme.id)}
                            disabled={!!applyingFor}
                            className="px-8 py-4 bg-gray-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all duration-300 flex items-center space-x-3 disabled:opacity-50 active:scale-95 shadow-xl shadow-gray-900/10"
                          >
                            {applyingFor === scheme.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>{t('এতিয়াই আবেদন কৰক', 'Apply')}</span> <ArrowRight className="w-4 h-4" /></>}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <div className={`transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0'} overflow-hidden bg-gray-50/30`}>
                       <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-orange-600">
                               <Info className="w-5 h-5" />
                               <h4 className="text-[11px] font-black uppercase tracking-widest">{t('যোগ্যতাৰ চৰ্তসমূহ', 'Eligibility Criteria')}</h4>
                            </div>
                            <p className="text-gray-700 font-medium leading-relaxed">{lang === 'hi' ? scheme.eligibilityAs : scheme.eligibility}</p>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-blue-600">
                               <FileText className="w-5 h-5" />
                               <h4 className="text-[11px] font-black uppercase tracking-widest">{t('প্ৰয়োজনীয় নথি-পত্ৰ', 'Required Documents')}</h4>
                            </div>
                            <ul className="space-y-2">
                               {(lang === 'hi' ? scheme.documentsAs : scheme.documents).map((doc, i) => (
                                 <li key={i} className="flex items-center space-x-2 text-gray-700 font-medium font-sans">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                    <span>{doc}</span>
                                 </li>
                               ))}
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-red-600">
                               <CalendarDays className="w-5 h-5" />
                               <h4 className="text-[11px] font-black uppercase tracking-widest">{t('আবেদনৰ শেষ সময়সীমা', 'Application Deadline')}</h4>
                            </div>
                            <div className="inline-block px-5 py-3 bg-red-50 text-red-700 rounded-2xl border border-red-100 shadow-sm">
                               <span className="text-lg font-black tracking-tight">{lang === 'hi' ? scheme.deadlineAs : scheme.deadline}</span>
                            </div>
                          </div>
                       </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="p-12 bg-gradient-to-br from-indigo-950 via-blue-900 to-indigo-900 rounded-[64px] text-white overflow-hidden relative shadow-[0_40px_80px_-12px_rgba(30,58,138,0.3)] border-4 border-white/5">
            <div className="relative z-10 space-y-10">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/10 rounded-[32px] flex items-center justify-center backdrop-blur-2xl border border-white/20 shadow-2xl">
                   <Landmark className="w-10 h-10 text-blue-300" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight mb-1">{t('বিত্তীয় অন্তৰ্ভুক্তিকৰণ', 'Financial Inclusion')}</h2>
                  <p className="text-blue-200 text-lg font-medium opacity-80">{t('জামিনবিহীন ঋণ সুবিধা', 'Collateral-free Loan Facility')}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div 
                  className="flex items-start space-x-6 bg-white/5 p-8 rounded-[40px] border border-white/10 group cursor-pointer hover:bg-white/[0.08] transition-all" 
                  onClick={() => setBankConsent(!bankConsent)}
                >
                   <div className="pt-1">
                      <div className={`w-7 h-7 rounded-lg border-2 transition-all flex items-center justify-center ${bankConsent ? 'bg-orange-500 border-orange-500' : 'border-white/30 bg-white/5'}`}>
                        {bankConsent && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                   </div>
                   <label className="text-base text-blue-50 leading-relaxed font-medium cursor-pointer hindi">
                     {t('মই মোৰ তথ্যসমূহ বেংকৰ সৈতে ঋণৰ অফাৰ লাভ কৰাৰ সুবিধাৰ বাবে শ্বেয়াৰ কৰিবলৈ সহমত জনাইছোঁ।', 'I consent to sharing my information with banks for loan offers.')}
                   </label>
                </div>
                <button 
                  onClick={handleCheckOffers}
                  disabled={!bankConsent || checkingOffers}
                  className="w-full py-6 bg-white text-indigo-950 rounded-[32px] font-black text-xl hover:bg-blue-50 transition-all disabled:opacity-30 shadow-2xl shadow-black/20 flex items-center justify-center space-x-4 active:scale-[0.98]"
                >
                  {checkingOffers ? <Loader2 className="w-7 h-7 animate-spin" /> : <><span>{t('বেংক অফাৰসমূহ পৰীক্ষা কৰক', 'Check Bank Offers')}</span> <ArrowRight className="w-6 h-6" /></>}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Official Scanner Modal */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="relative w-full max-w-2xl bg-white rounded-[56px] shadow-2xl overflow-hidden border border-white/20 flex flex-col max-h-[90vh]">
            <div className="bg-[#121212] p-8 flex justify-between items-center text-white shrink-0">
               <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/20">
                    <ShieldCheck className="w-7 h-7" />
                 </div>
                 <div>
                   <h3 className="text-xl font-black uppercase tracking-tight">Official DPI Scanner</h3>
                   <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase">Municipal Authority Portal</p>
                 </div>
               </div>
               <button onClick={closeScanner} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                 <X className="w-6 h-6" />
               </button>
            </div>
            <div className="p-10 flex flex-col items-center space-y-10 overflow-y-auto">
               <div className="relative aspect-square w-full max-w-sm bg-gray-950 rounded-[48px] overflow-hidden border-8 border-white shadow-inner flex items-center justify-center group">
                 {!scanResult ? (
                   <>
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale opacity-65" />
                    
                    {/* High-Tech HUD Viewfinder Overlay */}
                    <div className="absolute inset-0 p-8 pointer-events-none flex flex-col justify-between select-none z-10">
                      {/* Modern Corner brackets */}
                      <div className="absolute top-6 left-6 w-8 h-8 border-t-[4px] border-l-[4px] border-green-500 rounded-tl-xl opacity-90 filter drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]"></div>
                      <div className="absolute top-6 right-6 w-8 h-8 border-t-[4px] border-r-[4px] border-green-500 rounded-tr-xl opacity-90 filter drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]"></div>
                      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-[4px] border-l-[4px] border-green-500 rounded-bl-xl opacity-90 filter drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]"></div>
                      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-[4px] border-r-[4px] border-green-500 rounded-br-xl opacity-90 filter drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]"></div>

                      {/* Concentric targets & grid lines */}
                      <div className="absolute inset-14 border border-green-500/10 rounded-[36px] flex items-center justify-center">
                        <div className="w-10 h-px bg-green-500/30"></div>
                        <div className="h-10 w-px bg-green-500/30"></div>
                        <div className="absolute w-28 h-28 border border-green-500/15 rounded-full animate-[pulse_2.5s_infinite]"></div>
                        <div className="absolute w-14 h-14 border border-green-500/25 border-dashed rounded-full animate-[spin_15s_linear_infinite]"></div>
                      </div>

                      {/* Header signals */}
                      <div className="flex justify-between items-center w-full z-20">
                        <span className="text-[9px] font-mono font-black tracking-widest text-green-400 bg-green-950/65 px-2.5 py-1 rounded-lg border border-green-500/20 uppercase flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                          DPI_LINK_OK
                        </span>
                        <span className="text-[9px] font-mono font-black tracking-widest text-red-400 bg-red-950/65 px-2.5 py-1 rounded-lg border border-red-500/20 uppercase flex items-center animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-ping"></span>
                          SCANNING
                        </span>
                      </div>

                      {/* Footer tracking telemetry */}
                      <div className="flex justify-between items-center w-full mt-auto z-20 text-[8px] font-mono font-bold tracking-widest text-green-400/40">
                        <span>FPS 60 // RAW.YUV</span>
                        <span>RES.1080P // AUTO</span>
                      </div>
                    </div>

                    {/* Smooth laser line & holographic sweeping cone */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                      <div className="absolute inset-x-0 h-1/4 bg-gradient-to-b from-transparent via-green-500/[0.04] to-green-500/[0.22] border-b-[3px] border-green-400 shadow-[0_4px_15px_rgba(74,222,128,0.5)] animate-scan-holographic top-0"></div>
                    </div>
                   </>
                 ) : (
                   <div className="w-full h-full bg-green-50 flex flex-col items-center justify-center text-center p-12 space-y-6">
                      <Verified className="w-20 h-20 text-green-600 animate-bounce" />
                      <h4 className="text-3xl font-black text-green-900 tracking-tight uppercase">{t('प्रमाणित विक्रेता', 'Verified Vendor')}</h4>
                      <button onClick={() => setScanResult(null)} className="text-xs font-black text-green-700 uppercase tracking-widest border-b-2 border-green-200 pb-1">{t('पुनः स्कैन करें', 'Scan Another')}</button>
                   </div>
                 )}
               </div>
               {!scanResult && (
                 <button onClick={simulateScan} disabled={isVerifyingScan} className="w-full py-6 bg-gray-900 text-white rounded-[28px] font-black text-lg flex items-center justify-center space-x-4 shadow-xl active:scale-95">
                   {isVerifyingScan ? <Loader2 className="w-6 h-6 animate-spin" /> : <> <Camera className="w-6 h-6" /> <span>SCAN VENDOR QR</span> </>}
                 </button>
               )}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes scan-holographic {
          0% { transform: translateY(-110%); }
          50% { transform: translateY(310%); }
          100% { transform: translateY(-110%); }
        }
        .animate-scan-holographic {
          animation: scan-holographic 3.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
