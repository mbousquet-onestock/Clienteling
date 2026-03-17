import { Customer, Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Robe d\'été Fleurie',
    category: 'Robes',
    price: 49.99,
    image: 'https://picsum.photos/seed/dress1/400/600',
    description: 'Une robe légère et élégante pour les journées ensoleillées.',
    rating: 4.5
  },
  {
    id: 'p2',
    name: 'Jean Slim Bleu',
    category: 'Pantalons',
    price: 39.99,
    image: 'https://picsum.photos/seed/jeans1/400/600',
    description: 'Le basique indispensable, coupe parfaite.',
    rating: 4.2
  },
  {
    id: 'p3',
    name: 'Veste en Cuir Noir',
    category: 'Vestes',
    price: 89.99,
    image: 'https://picsum.photos/seed/jacket1/400/600',
    description: 'Une touche de caractère pour vos tenues.',
    rating: 4.8
  },
  {
    id: 'p4',
    name: 'Top en Dentelle Blanc',
    category: 'Hauts',
    price: 29.99,
    image: 'https://picsum.photos/seed/top1/400/600',
    description: 'Délicat et raffiné.',
    rating: 4.0
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '5v1e1r',
    firstName: 'Jean',
    lastName: 'Bernard',
    email: 'jean.bernard@example.com',
    phone: '0633218196',
    country: 'France',
    status: 'Bronze',
    points: 0,
    pointsHistory: [],
    interactions: [],
    rewards: [],
    preferences: ['Store Preferred'],
    lastVisit: '2022-12-20',
    isStaff: false,
    hasCoupon: true,
    address: '8 avenue des Champs-Élysées',
    city: 'Paris',
    zipCode: '75001',
    storeId: '26'
  },
  {
    id: 'fnf2tt',
    firstName: 'Philippe',
    lastName: 'Petit',
    email: 'philippe.petit@example.com',
    phone: '0690838637',
    country: 'France',
    status: 'Bronze',
    points: 0,
    pointsHistory: [],
    interactions: [],
    rewards: [],
    preferences: ['Store Preferred'],
    lastVisit: '2022-09-12',
    isStaff: false,
    hasCoupon: false,
    address: '72 rue de la Paix',
    city: 'Toulouse',
    zipCode: '31000',
    storeId: '26'
  },
  {
    id: 'h1kdkh',
    firstName: 'Nathalie',
    lastName: 'Thomas',
    email: 'nathalie.thomas@example.com',
    phone: '0642351161',
    country: 'France',
    status: 'Silver',
    points: 114,
    pointsHistory: [
      { date: '2025-05-23', points: 114, reason: 'Dernier achat', type: 'transactional' }
    ],
    interactions: [],
    rewards: [
      { id: 'r_h1', name: 'Coupon Fidélité', value: 5, type: 'discount', expiryDate: '2026-05-23' }
    ],
    preferences: ['Store Preferred'],
    lastVisit: '2025-05-23',
    isStaff: false,
    hasCoupon: true,
    address: '89 rue du Commerce',
    city: 'Nantes',
    zipCode: '44000',
    storeId: '12189',
    loyaltyCardNumber: '9110000655870.0'
  },
  {
    id: '5qy0w8',
    firstName: 'Jean',
    lastName: 'Robert',
    email: 'jean.robert@example.com',
    phone: '0681618495',
    country: 'France',
    status: 'Collaborateur',
    points: 0,
    pointsHistory: [],
    interactions: [],
    rewards: [],
    preferences: ['Staff Benefits'],
    lastVisit: '2024-05-02',
    isStaff: true,
    staffNumber: '102231',
    hasCoupon: false,
    address: '50 avenue des Champs-Élysées',
    city: 'Toulouse',
    zipCode: '31000',
    storeId: '101',
    loyaltyCardNumber: '9110000816028.0'
  },
  {
    id: '6tdr8w',
    firstName: 'Philippe',
    lastName: 'Thomas',
    email: 'philippe.thomas@example.com',
    phone: '0684969653',
    country: 'France',
    status: 'Collaborateur',
    points: 103,
    pointsHistory: [
      { date: '2026-01-24', points: 103, reason: 'Dernier achat', type: 'transactional' }
    ],
    interactions: [],
    rewards: [
      { id: 'r_6t', name: 'Coupon Collaborateur', value: 15, type: 'discount', expiryDate: '2026-12-31' }
    ],
    preferences: ['Staff Benefits'],
    lastVisit: '2026-01-24',
    isStaff: true,
    staffNumber: '1000060596825.0',
    hasCoupon: true,
    address: '131 rue de Paris',
    city: 'Marseille',
    zipCode: '13001',
    storeId: '7007',
    loyaltyCardNumber: '9110000117804.0'
  },
  {
    id: '000ghb',
    firstName: 'Jean',
    lastName: 'Bernard',
    email: 'jean.bernard@example.com',
    phone: '0622691669',
    country: 'France',
    status: 'Bronze',
    points: 46,
    pointsHistory: [
      { date: '2025-09-19', points: 46, reason: 'Dernier achat', type: 'transactional' }
    ],
    interactions: [],
    rewards: [],
    preferences: ['Web Preferred'],
    lastVisit: '2025-09-19',
    isStaff: false,
    hasCoupon: false,
    address: '8 avenue des Champs-Élysées',
    city: 'Paris',
    zipCode: '75001',
    storeId: '10267',
    loyaltyCardNumber: '9710267094078.0'
  }
];
