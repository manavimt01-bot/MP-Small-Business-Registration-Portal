import { VendorProfile } from '../types';

const MP_FIRST_NAMES = [
  { as: "रमेश", en: "Ramesh" },
  { as: "सुनीता", en: "Sunita" },
  { as: "अमित", en: "Amit" },
  { as: "पूजा", en: "Pooja" },
  { as: "राजेश", en: "Rajesh" },
  { as: "दिनेश", en: "Dinesh" },
  { as: "संजय", en: "Sanjay" },
  { as: "अनिल", en: "Anil" },
  { as: "विजय", en: "Vijay" },
  { as: "मनोज", en: "Manoj" },
  { as: "कमलेश", en: "Kamlesh" },
  { as: "रेखा", en: "Rekha" },
  { as: "राधा", en: "Radha" },
  { as: "किरण", en: "Kiran" },
  { as: "दीपक", en: "Deepak" },
  { as: "विकास", en: "Vikas" },
  { as: "संदीप", en: "Sandeep" },
  { as: "सुनील", en: "Sunil" },
  { as: "प्रीति", en: "Preeti" },
  { as: "राहुल", en: "Rahul" },
  { as: "अजय", en: "Ajay" },
  { as: "संतोष", en: "Santosh" },
  { as: "अरविंद", en: "Arvind" },
  { as: "महेश", en: "Mahesh" },
  { as: "जितेंद्र", en: "Jitendra" },
  { as: "हरीश", en: "Harish" },
  { as: "शिव", en: "Shiv" },
  { as: "ओमप्रकाश", en: "Omprakash" },
  { as: "रामप्रकाश", en: "Ramprakash" },
  { as: "सुरेंद्र", en: "Surendra" }
];

const MP_LAST_NAMES = [
  { as: "शर्मा", en: "Sharma" },
  { as: "वर्मा", en: "Verma" },
  { as: "यादव", en: "Yadav" },
  { as: "चौहान", en: "Chouhan" },
  { as: "गुप्ता", en: "Gupta" },
  { as: "पटेल", en: "Patel" },
  { as: "मिश्रा", en: "Mishra" },
  { as: "सोनी", en: "Soni" },
  { as: "ठाकुर", en: "Thakur" },
  { as: "पांडे", en: "Pandey" },
  { as: "सिंह", en: "Singh" },
  { as: "तिवारी", en: "Tiwari" },
  { as: "जैन", en: "Jain" },
  { as: "राठौर", en: "Rathore" },
  { as: "साहू", en: "Sahu" },
  { as: "जोशी", en: "Joshi" },
  { as: "दुबे", en: "Dubey" },
  { as: "मालवीय", en: "Malviya" },
  { as: "सेन", en: "Sen" },
  { as: "विश्वकर्मा", en: "Vishwakarma" }
];

const BUSINESS_CATEGORIES = [
  {
    type: "स्थायी दुकान (Fixed Shop)",
    vendingType: "fixed" as const,
    professions: [
      "चाय और नाश्ता दुकान (Tea & Snacks Stall)",
      "किराना दुकान (Grocery Shop)",
      "स्टेशनरी दुकान (Stationery shop)",
      "दर्जी और सिलाई दुकान (Tailor Shop)",
      "मोबाइल मरम्मत दुकान (Mobile Repair Stall)"
    ]
  },
  {
    type: "ठेला गाड़ी (Mobile Cart)",
    vendingType: "mobile" as const,
    professions: [
      "फल विक्रेता (Fruit Vendor)",
      "सब्जी विक्रेता (Vegetables Seller)",
      "फास्ट फूड ठेला (Fast Food Cart)",
      "आइसक्रीम ठेला (Ice Cream Cart)"
    ]
  },
  {
    type: "ऋतुकालिक विक्रेता (Seasonal)",
    vendingType: "seasonal" as const,
    professions: [
      "फूल विक्रेता (Flower Vendor)",
      "मौसमी फल विक्रेता (Seasonal Fruits Seller)",
      "पूजा सामग्री विक्रेता (Festival Items Seller)",
      "ऊनी कपड़े विक्रेता (Winter Clothes Vendor)"
    ]
  },
  {
    type: "लघु उद्योग (MSME/Small Scale)",
    vendingType: "fixed" as const,
    professions: [
      "बांस-बेंत हस्तशिल्प (Bamboo Crafts Seller)",
      "हथकरघा बुनकर (Textiles Weaver)",
      "कुटीर हस्तशिल्प उद्योग (Handicrafts Maker)",
      "मिट्टी के बर्तन/मूर्तिकार (Pottery Maker)"
    ]
  }
];

const MP_DISTRICT_LOCATIONS = [
  { district: "Bhopal", coords: { lat: 23.2599, lng: 77.4126 }, places: ["New Market, Bhopal, Madhya Pradesh", "MP Nagar, Bhopal, Madhya Pradesh", "Bairagarh, Bhopal, Madhya Pradesh", "Kolar Road, Bhopal, Madhya Pradesh"] },
  { district: "Indore", coords: { lat: 22.7196, lng: 75.8577 }, places: ["Sarafa Bazar, Indore, Madhya Pradesh", "Chhappan Dukan, Indore, Madhya Pradesh", "Rajwada Chowk, Indore, Madhya Pradesh", "Vijay Nagar, Indore, Madhya Pradesh"] },
  { district: "Ujjain", coords: { lat: 23.1760, lng: 75.7885 }, places: ["Mahakal Marg, Ujjain, Madhya Pradesh", "Freeganj, Ujjain, Madhya Pradesh", "Nanakheda, Ujjain, Madhya Pradesh"] },
  { district: "Gwalior", coords: { lat: 26.2183, lng: 78.1828 }, places: ["Bada Bazar, Gwalior, Madhya Pradesh", "Hazira Chowk, Gwalior, Madhya Pradesh", "Deen Dayal Nagar, Gwalior, Madhya Pradesh"] },
  { district: "Jabalpur", coords: { lat: 23.1686, lng: 79.9339 }, places: ["Civic Center, Jabalpur, Madhya Pradesh", "Wright Town, Jabalpur, Madhya Pradesh", "Sadar Bazar, Jabalpur, Madhya Pradesh"] },
  { district: "Sagar", coords: { lat: 23.8388, lng: 78.7378 }, places: ["Katra Bazar, Sagar, Madhya Pradesh", "Civil Lines, Sagar, Madhya Pradesh", "Gopal Ganj, Sagar, Madhya Pradesh"] },
  { district: "Rewa", coords: { lat: 24.5363, lng: 81.3033 }, places: ["Sirmour Chowk, Rewa, Madhya Pradesh", "Fort Road, Rewa, Madhya Pradesh", "Jayanti Kunj, Rewa, Madhya Pradesh"] },
  { district: "Satna", coords: { lat: 24.5801, lng: 80.8265 }, places: ["Panni Lal Chowk, Satna, Madhya Pradesh", "Bharhut Nagar, Satna, Madhya Pradesh", "Sadar Bazar, Satna, Madhya Pradesh"] }
];

const SCHEMES_POOL = [
  "PM SVANidhi (MP LEMS)",
  "Mukhyamantri Path Vikreta Kalyan Yojana",
  "Mukhyamantri Udhyami Kranti Yojana",
  "MP Deendayal Antyodaya Yojana"
];

const LOAN_STATUS_POOL: ('eligible' | 'applied' | 'under_review' | 'approved' | 'none')[] = [
  'eligible', 'applied', 'under_review', 'approved', 'none'
];

export function generate100Vendors(existingVendors: VendorProfile[]): VendorProfile[] {
  // Use existing vendors to preserve any manually added registrations
  const baseList = [...existingVendors];
  
  // Create unique set of mobile numbers and aadhar numbers to prevent collisions
  const existingMobiles = new Set(baseList.map(v => v.mobile));
  const existingAadhars = new Set(baseList.map(v => v.aadharNumber));
  const existingIds = new Set(baseList.map(v => v.id));

  // We want exactly 100 vendors
  const neededCount = 100 - baseList.length;

  if (neededCount <= 0) {
    return baseList.slice(0, 100);
  }

  // Seeded random generator helper to maintain stability but dynamic feel
  let seed = 42;
  function random(): number {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(random() * arr.length)];
  }

  const avatars = [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300"
  ];

  for (let i = 0; i < neededCount; i++) {
    // 1. Name Generator
    const firstSeed = pickRandom(MP_FIRST_NAMES);
    const lastSeed = pickRandom(MP_LAST_NAMES);
    const name = `${firstSeed.as} ${lastSeed.as} (${firstSeed.en} ${lastSeed.en})`;

    // 2. Identity Unique Keys
    let mobile = "";
    do {
      mobile = "9" + Math.floor(100000000 + random() * 900000000).toString();
    } while (existingMobiles.has(mobile));
    existingMobiles.add(mobile);

    let aadharNumber = "";
    do {
      aadharNumber = Math.floor(100000000000 + random() * 900000000000).toString();
    } while (existingAadhars.has(aadharNumber));
    existingAadhars.add(aadharNumber);

    // 3. District & Location Coords
    const distLoc = pickRandom(MP_DISTRICT_LOCATIONS);
    const address = pickRandom(distLoc.places);
    // Add minor offset so maps are correct
    const lat = distLoc.coords.lat + (random() - 0.5) * 0.04;
    const lng = distLoc.coords.lng + (random() - 0.5) * 0.04;

    // 4. Profession & Category
    const category = pickRandom(BUSINESS_CATEGORIES);
    const profession = pickRandom(category.professions);

    // 5. Short ID e.g., MP-BPL382
    const distPrefix = distLoc.district.substring(0, 3).toUpperCase();
    let id = "";
    do {
      id = `MP-${distPrefix}${Math.floor(100 + random() * 900)}`;
    } while (existingIds.has(id));
    existingIds.add(id);

    // 6. Verification Statuses (80% verified, 20% pending)
    const isVerified = random() < 0.8;

    // DOB
    const birthYear = Math.floor(1975 + random() * 25);
    const birthMonth = Math.floor(1 + random() * 12).toString().padStart(2, '0');
    const birthDay = Math.floor(1 + random() * 28).toString().padStart(2, '0');
    const dob = `${birthDay}/${birthMonth}/${birthYear}`;

    // Loan Status & Schemes (Verified people have schemes)
    let loanStatus: 'eligible' | 'applied' | 'under_review' | 'approved' | 'none' = 'none';
    const activeSchemes: string[] = [];

    if (isVerified) {
      loanStatus = pickRandom(LOAN_STATUS_POOL);
      
      const numSchemes = Math.floor(random() * 3); // 0, 1, or 2 schemes
      const shuffledSchemes = [...SCHEMES_POOL].sort(() => 0.5 - random());
      for (let s = 0; s < numSchemes; s++) {
        activeSchemes.push(shuffledSchemes[s]);
      }
    }

    // Selfie
    const selfie = pickRandom(avatars);
    const aadharScan = "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=300&h=300";

    // History
    const activityHistory = [
      { date: `${Math.floor(1 + random() * 20)} May 2026`, action: "DPI Facial and biometric verification succeeded." }
    ];
    if (loanStatus !== 'none') {
      activityHistory.unshift({
        date: `${Math.floor(21 + random() * 4)} May 2026`,
        action: `Applied for micro-credit line. Status check updated to: ${loanStatus.toUpperCase()}`
      });
    }

    baseList.push({
      id,
      name,
      mobile,
      aadharNumber,
      businessType: category.type,
      profession,
      location: { lat, lng, address },
      vendingType: category.vendingType,
      isVerified,
      dob,
      activeSchemes,
      loanStatus,
      selfie,
      aadharScan,
      activityHistory
    });
  }

  return baseList;
}
