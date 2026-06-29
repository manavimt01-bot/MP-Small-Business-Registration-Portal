import React from 'react';
import { ShoppingBag, Truck, Calendar, Store } from 'lucide-react';
import { Scheme } from './types';

export const BUSINESS_TYPES = [
  { id: 'fixed', label: 'स्थायी दुकान (Fixed Shop)', icon: <Store className="w-8 h-8" /> },
  { id: 'mobile', label: 'ठेला गाड़ी (Mobile Cart)', icon: <Truck className="w-8 h-8" /> },
  { id: 'seasonal', label: 'ऋतुकालिक विक्रेता (Seasonal)', icon: <Calendar className="w-8 h-8" /> },
  { id: 'small_scale', label: 'लघु उद्योग (MSME/Small Scale)', icon: <ShoppingBag className="w-8 h-8" /> },
];

export const SCHEMES: Scheme[] = [
  {
    id: 'svanidhi',
    title: 'PM SVANidhi (MP LEMS)',
    titleAs: 'पीएम स्वनिधि योजना (मध्य प्रदेश)',
    description: 'Working capital loan up to ₹50,000 for street vendors with 7% interest subsidy and cash-back on digital transactions.',
    descriptionAs: 'पथ विक्रेताओं के लिए ७% ब्याज अनुदान और डिजिटल लेनदेन पर कैशबैक के साथ ₹५०,००० तक का कार्यशील पूंजी ऋण।',
    eligibility: 'All street vendors vending in urban areas of Madhya Pradesh on or before March 24, 2020.',
    eligibilityAs: '२४ मार्च, २०२० या उससे पहले मध्य प्रदेश के शहरी क्षेत्रों में व्यवसाय कर रहे सभी पथ विक्रेता।',
    documents: ['Aadhar Card', 'Vending Certificate (LoR)', 'Bank Passbook'],
    documentsAs: ['आधार कार्ड', 'विक्रेता प्रमाण पत्र (LoR)', 'बैंक पासबुक'],
    deadline: 'March 31, 2027',
    deadlineAs: '३१ मार्च, २०२७'
  },
  {
    id: 'path-vikreta-kalyan',
    title: 'Mukhyamantri Path Vikreta Kalyan Yojana',
    titleAs: 'मुख्यमंत्री पथ विक्रेता कल्याण योजना',
    description: 'Interest-free working capital loan up to ₹10,000 sponsored directly by the Government of Madhya Pradesh.',
    descriptionAs: 'मध्य प्रदेश सरकार द्वारा सीधे प्रायोजित ₹१०,००० तक का ब्याज-मुक्त कार्यशील पूंजी ऋण।',
    eligibility: 'Urban street vendors of Madhya Pradesh, age between 18-55 years, holding valid urban local body recommendation.',
    eligibilityAs: 'मध्य प्रदेश के शहरी पथ विक्रेता, आयु १८-५५ वर्ष के बीच, जिनके पास नगरीय निकाय की अनुशंसा हो।',
    documents: ['Samagra ID', 'Aadhar Card', 'Bank Account', 'Urban Body Recommendation'],
    documentsAs: ['समग्र आईडी', 'आधार कार्ड', 'बैंक खाता', 'नगरीय निकाय अनुशंसा'],
    deadline: 'Ongoing FY 2026-27',
    deadlineAs: 'जारी वित्तीय वर्ष २०२६-२७'
  },
  {
    id: 'udhyami-kranti',
    title: 'Mukhyamantri Udhyami Kranti Yojana',
    titleAs: 'मुख्यमंत्री उद्यमी क्रांति योजना',
    description: 'Collateral-free loans up to ₹50 Lakh with a 3% interest subsidy for establishing self-employment ventures.',
    descriptionAs: 'स्व-रोजगार उद्यम स्थापित करने के लिए ३% ब्याज अनुदान के साथ ₹५० लाख तक का संपार्श्विक-मुक्त (बिना गारंटी) ऋण।',
    eligibility: 'Domicile of MP, age between 18-40 years, with minimum educational qualification of 8th standard pass.',
    eligibilityAs: 'मध्य प्रदेश के मूल निवासी, आयु १८-४० वर्ष के बीच, न्यूनतम शैक्षणिक योग्यता ८वीं कक्षा उत्तीर्ण।',
    documents: ['Domicile Certificate', 'Educational Certificate', 'Project Report', 'Aadhar Card'],
    documentsAs: ['मूल निवासी प्रमाण पत्र', 'शैक्षणिक योग्यता प्रमाण पत्र', 'परियोजना रिपोर्ट', 'आधार कार्ड'],
    deadline: 'March 31, 2027',
    deadlineAs: '३१ मार्च, २०२७'
  },
  {
    id: 'antyodaya-yojana',
    title: 'MP Deendayal Antyodaya Yojana (DAY-NULM)',
    titleAs: 'एमपी दीनदयाल अंत्योदय योजना (शहरी आजीविका)',
    description: 'Direct financial support, skill training, and social security coverage for registered street vendor self-help groups.',
    descriptionAs: 'पंजीकृत पथ विक्रेता स्व-सहायता समूहों (SHGs) के लिए प्रत्यक्ष वित्तीय सहायता, कौशल प्रशिक्षण और सामाजिक सुरक्षा कवरेज।',
    eligibility: 'All small and micro-vendors registered on the MP Urban State Vendor Registry.',
    eligibilityAs: 'मध्य प्रदेश शहरी राज्य विक्रेता रजिस्ट्री पर पंजीकृत सभी छोटे और सूक्ष्म पथ विक्रेता।',
    documents: ['Registration ID', 'SHG Certificate', 'Aadhar Card'],
    documentsAs: ['पंजीकरण आईडी', 'स्व-सहायता समूह प्रमाण पत्र', 'आधार कार्ड'],
    deadline: 'Auto-renewal upon Registration',
    deadlineAs: 'पंजीकरण पर स्वतः नवीनीकरण'
  }
];
