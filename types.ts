
export type Language = 'hi' | 'en';

export enum RegistrationStep {
  AUTH = 'AUTH',
  PROFILE = 'PROFILE',
  VERIFY_IDENTITY = 'VERIFY_IDENTITY',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED'
}

export interface ActivityLog {
  date: string;
  action: string;
}

export interface VendorProfile {
  id?: string;
  name: string;
  mobile: string;
  aadharNumber: string;
  businessType: string;
  profession?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  vendingType: 'fixed' | 'mobile' | 'seasonal';
  isVerified: boolean;
  selfie?: string;
  aadharScan?: string;
  dob?: string;
  activeSchemes?: string[];
  loanStatus?: 'eligible' | 'applied' | 'under_review' | 'approved' | 'none';
  activityHistory?: ActivityLog[];
  upiId?: string;
  businessName?: string;
  panCard?: string;
}

export interface Scheme {
  id: string;
  title: string;
  titleAs: string;
  description: string;
  descriptionAs: string;
  eligibility: string;
  eligibilityAs: string;
  documents: string[];
  documentsAs: string[];
  deadline: string;
  deadlineAs: string;
}
