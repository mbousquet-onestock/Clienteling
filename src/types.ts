/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LoyaltyStatus = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Collaborateur';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  color?: string;
  size?: string;
  sku?: string;
}

export interface Interaction {
  productId: string;
  type: 'tried' | 'viewed_web' | 'purchased' | 'reviewed';
  date: string;
  rating?: number;
  comment?: string;
}

export interface Reward {
  id: string;
  name: string;
  value: number;
  type: 'discount' | 'gift';
  expiryDate: string;
}

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'garçon' | 'fille';
  birthDate: string;
  preferredSizes?: PreferredSizes;
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface PreferredSizes {
  shoes?: string;
  tops?: string;
  pants?: string;
  dresses?: string;
  jackets?: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  motif: 'shopping solo' | 'shopping groupe';
  duration: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  status: LoyaltyStatus;
  points: number;
  pointsHistory: {
    date: string;
    points: number;
    reason: string;
    type: 'transactional' | 'relational';
  }[];
  interactions: Interaction[];
  rewards: Reward[];
  preferences: string[];
  lastVisit: string;
  isStaff: boolean;
  staffNumber?: string;
  storeId?: string;
  loyaltyCardNumber?: string;
  hasCoupon: boolean;
  address?: string;
  city?: string;
  zipCode?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  children?: Child[];
  preferredSizes?: PreferredSizes;
  birthDate?: string;
  preferredCommChannel?: string;
  preferredPurchaseChannel?: string;
  emailQuality?: 'OK' | 'KO';
  smsQuality?: 'OK' | 'KO';
  lastPurchaseDate?: string;
  commChannels?: string[];
  loyaltyCardType?: string;
  appointments?: Appointment[];
}

export interface StoreContext {
  customers: Customer[];
  products: Product[];
  currentAdvisor: string;
}
