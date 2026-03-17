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
}

export interface StoreContext {
  customers: Customer[];
  products: Product[];
  currentAdvisor: string;
}
