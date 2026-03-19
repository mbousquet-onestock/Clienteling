import { Customer, Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1562020',
    name: 'E25DUNE.V',
    category: 'Vêtements',
    price: 25.00,
    color: 'Blanc',
    size: '38',
    sku: '1562020',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_853008_7120_1.jpg',
    description: 'Vêtement élégant E25DUNE.V',
    rating: 4.5
  },
  {
    id: '2051702',
    name: 'H25HELLO.T',
    category: 'T-shirts',
    price: 10.00,
    color: 'Marine',
    size: 'S',
    sku: '2051702',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_854856_7271_1.jpg',
    description: 'T-shirt confortable H25HELLO.T',
    rating: 4.2
  },
  {
    id: '1411220',
    name: 'E24BRAZIL.D',
    category: 'Robes',
    price: 12.00,
    color: 'Light stone',
    size: '36',
    sku: '1411220',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_850447_6987_1.jpg',
    description: 'Robe légère E24BRAZIL.D',
    rating: 4.8
  },
  {
    id: '2448242',
    name: 'E26TOKYO.D',
    category: 'Pantalons',
    price: 34.19,
    color: 'Dark grey',
    size: '46',
    sku: '2448242',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_855020_7391_1.jpg',
    description: 'Pantalon moderne E26TOKYO.D',
    rating: 4.0
  },
  {
    id: '2501608',
    name: 'E26CANNES.G',
    category: 'Vestes',
    price: 59.99,
    color: 'Kaki',
    size: '48',
    sku: '2501608',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_855505_7353_1.jpg',
    description: 'Veste de saison E26CANNES.G',
    rating: 4.7
  },
  {
    id: '2393993',
    name: 'E26BRESIL.V',
    category: 'Vêtements',
    price: 39.99,
    color: 'Stone',
    size: '48',
    sku: '2393993',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_855155_7384_1.jpg',
    description: 'Vêtement tendance E26BRESIL.V',
    rating: 4.3
  },
  {
    id: '2394002',
    name: 'E26BRESIL.V',
    category: 'Vêtements',
    price: 35.99,
    color: 'Black washed',
    size: '50',
    sku: '2394002',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_855155_7389_1.jpg',
    description: 'Vêtement tendance E26BRESIL.V noir',
    rating: 4.4
  },
  {
    id: '2466305',
    name: 'E26DANCING.C',
    category: 'Chemises',
    price: 31.49,
    color: 'Jaune',
    size: '48',
    sku: '2466305',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_855455_7350_1.jpg',
    description: 'Chemise colorée E26DANCING.C',
    rating: 4.1
  },
  {
    id: '1897420',
    name: 'H25HAPPY.T',
    category: 'T-shirts',
    price: 6.00,
    color: 'Pivoine',
    size: 'M',
    sku: '1897420',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_854685_7233_1.jpg',
    description: 'T-shirt joyeux H25HAPPY.T',
    rating: 4.6
  },
  {
    id: '2506411',
    name: 'E26CLELIA.R',
    category: 'Robes',
    price: 35.99,
    color: 'Ecru',
    size: '44',
    sku: '2506411',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_855543_7322_1.jpg',
    description: 'Robe élégante E26CLELIA.R',
    rating: 4.5
  },
  {
    id: '2501683',
    name: 'E26COOLGIRLD',
    category: 'Jeans',
    price: 31.99,
    color: 'Dark stone',
    size: '42',
    sku: '2501683',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_855506_7382_1.jpg',
    description: 'Jean tendance E26COOLGIRLD',
    rating: 4.2
  },
  {
    id: '2402487',
    name: 'E26POMPON.D',
    category: 'Accessoires',
    price: 35.99,
    color: 'Black',
    size: '40',
    sku: '2402487',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_855084_7383_1.jpg',
    description: 'Accessoire chic E26POMPON.D',
    rating: 4.0
  },
  {
    id: '2370204',
    name: 'E26COOL.P',
    category: 'Pulls',
    price: 28.79,
    color: 'Blanc cassé',
    size: '40',
    sku: '2370204',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_855101_7321_1.jpg',
    description: 'Pull doux E26COOL.P',
    rating: 4.3
  },
  {
    id: '2049002',
    name: 'H25KLEO.T',
    category: 'T-shirts',
    price: 23.99,
    color: 'Marron',
    size: 'L',
    sku: '2049002',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_854826_7265_1.jpg',
    description: 'T-shirt classique H25KLEO.T',
    rating: 4.1
  },
  {
    id: '2791628',
    name: 'E26CLOUD.C',
    category: 'Chemises',
    price: 29.60,
    color: 'Noir',
    size: '42',
    sku: '2791628',
    image: 'https://medias.graindemalice.fr/products/MKP/mp_855968_7360_1.jpg',
    description: 'Chemise légère E26CLOUD.C',
    rating: 4.4
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
    points: 45,
    pointsHistory: [],
    interactions: [
      { productId: '1562020', type: 'tried', date: '2026-03-10' },
      { productId: '2051702', type: 'viewed_web', date: '2026-03-12' },
      { productId: '1411220', type: 'purchased', date: '2026-02-15' },
      { productId: '2448242', type: 'reviewed', date: '2026-02-20', rating: 5, comment: 'Superbe pantalon, très bien taillé !' }
    ],
    rewards: [],
    preferences: ['Store Preferred'],
    lastVisit: '2026-03-10',
    isStaff: false,
    hasCoupon: true,
    address: '8 avenue des Champs-Élysées',
    city: 'Paris',
    zipCode: '75001',
    billingAddress: {
      street: '8 avenue des Champs-Élysées',
      city: 'Paris',
      zipCode: '75001',
      country: 'France'
    },
    shippingAddress: {
      street: '8 avenue des Champs-Élysées',
      city: 'Paris',
      zipCode: '75001',
      country: 'France'
    },
    children: [
      { id: 'c1', firstName: 'Léa', lastName: 'Bernard', gender: 'fille', birthDate: '2015-05-12', preferredSizes: { shoes: '32', tops: '10 ans', pants: '10 ans' } },
      { id: 'c2', firstName: 'Lucas', lastName: 'Bernard', gender: 'garçon', birthDate: '2018-09-20', preferredSizes: { shoes: '28', tops: '6 ans', pants: '6 ans' } }
    ],
    preferredSizes: {
      shoes: '38',
      tops: 'M',
      pants: '38',
      dresses: '38'
    },
    storeId: '26',
    birthDate: '1980-03-15',
    preferredCommChannel: 'Store',
    preferredPurchaseChannel: 'Magasin',
    emailQuality: 'OK',
    smsQuality: 'OK',
    lastPurchaseDate: '2026-02-15',
    commChannels: ['Email', 'SMS', 'WhatsApp'],
    loyaltyCardType: 'Physique',
    appointments: [
      { id: 'a1', date: '2026-03-20', time: '14:00', motif: 'shopping solo', duration: '1h' },
      { id: 'a2', date: '2026-02-10', time: '10:30', motif: 'shopping groupe', duration: '2h' }
    ]
  },
  {
    id: 'fnf2tt',
    firstName: 'Philippe',
    lastName: 'Petit',
    email: 'philippe.petit@example.com',
    phone: '0690838637',
    country: 'France',
    status: 'Bronze',
    points: 10,
    pointsHistory: [],
    interactions: [
      { productId: '2501608', type: 'tried', date: '2026-03-05' },
      { productId: '2393993', type: 'viewed_web', date: '2026-03-08' },
      { productId: '2394002', type: 'purchased', date: '2026-01-20' },
      { productId: '2466305', type: 'reviewed', date: '2026-01-25', rating: 4, comment: 'Couleur très vive, j\'adore.' }
    ],
    rewards: [],
    preferences: ['Store Preferred'],
    lastVisit: '2026-03-05',
    isStaff: false,
    hasCoupon: false,
    address: '72 rue de la Paix',
    city: 'Toulouse',
    zipCode: '31000',
    billingAddress: {
      street: '72 rue de la Paix',
      city: 'Toulouse',
      zipCode: '31000',
      country: 'France'
    },
    shippingAddress: {
      street: '15 rue des Fleurs',
      city: 'Toulouse',
      zipCode: '31200',
      country: 'France'
    },
    children: [
      { id: 'c3', firstName: 'Emma', lastName: 'Petit', gender: 'fille', birthDate: '2020-01-10', preferredSizes: { shoes: '24', tops: '4 ans', pants: '4 ans' } }
    ],
    preferredSizes: {
      shoes: '42',
      tops: 'L',
      pants: '42'
    },
    storeId: '26',
    birthDate: '1992-07-22',
    preferredCommChannel: 'Web',
    preferredPurchaseChannel: 'Magasin',
    emailQuality: 'KO',
    smsQuality: 'OK',
    lastPurchaseDate: '2026-01-20',
    commChannels: ['SMS', 'WhatsApp'],
    loyaltyCardType: 'Dématérialisée',
    appointments: [
      { id: 'a3', date: '2026-03-25', time: '16:00', motif: 'shopping solo', duration: '45min' }
    ]
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
    interactions: [
      { productId: '1897420', type: 'tried', date: '2026-03-15' },
      { productId: '2506411', type: 'viewed_web', date: '2026-03-16' },
      { productId: '2501683', type: 'purchased', date: '2026-03-10' },
      { productId: '2402487', type: 'reviewed', date: '2026-03-12', rating: 3, comment: 'Un peu déçue par la matière.' }
    ],
    rewards: [
      { id: 'r_h1', name: 'Coupon Fidélité', value: 5, type: 'discount', expiryDate: '2026-05-23' }
    ],
    children: [
      { id: 'c4', firstName: 'Théo', lastName: 'Thomas', gender: 'garçon', birthDate: '2012-04-15', preferredSizes: { shoes: '36', tops: '14 ans', pants: '14 ans' } }
    ],
    preferredSizes: {
      shoes: '37',
      tops: 'S',
      pants: '36',
      dresses: '36'
    },
    preferences: ['Store Preferred'],
    lastVisit: '2026-03-15',
    isStaff: false,
    hasCoupon: true,
    address: '89 rue du Commerce',
    city: 'Nantes',
    zipCode: '44000',
    storeId: '12189',
    loyaltyCardNumber: '9110000655870',
    birthDate: '1975-11-30',
    preferredCommChannel: 'Store',
    preferredPurchaseChannel: 'Web',
    emailQuality: 'OK',
    smsQuality: 'OK',
    lastPurchaseDate: '2026-03-10',
    commChannels: ['Email', 'SMS'],
    loyaltyCardType: 'Physique',
    appointments: [
      { id: 'a4', date: '2026-03-22', time: '11:00', motif: 'shopping solo', duration: '1h' },
      { id: 'a5', date: '2026-03-15', time: '15:30', motif: 'shopping solo', duration: '1h' }
    ]
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
    interactions: [
      { productId: '2370204', type: 'tried', date: '2026-03-01' },
      { productId: '2049002', type: 'viewed_web', date: '2026-03-02' },
      { productId: '2791628', type: 'purchased', date: '2026-02-28' }
    ],
    rewards: [],
    preferences: ['Staff Benefits'],
    lastVisit: '2024-05-02',
    isStaff: true,
    staffNumber: '102231',
    children: [
      { id: 'c5', firstName: 'Manon', lastName: 'Robert', gender: 'fille', birthDate: '2017-11-05', preferredSizes: { shoes: '30', tops: '8 ans', pants: '8 ans' } }
    ],
    preferredSizes: {
      shoes: '43',
      tops: 'XL',
      pants: '44'
    },
    hasCoupon: false,
    address: '50 avenue des Champs-Élysées',
    city: 'Toulouse',
    zipCode: '31000',
    storeId: '101',
    loyaltyCardNumber: '9110000816028',
    birthDate: '1988-01-10',
    preferredCommChannel: 'Web',
    preferredPurchaseChannel: 'Magasin',
    emailQuality: 'OK',
    smsQuality: 'KO',
    lastPurchaseDate: '2024-05-01',
    commChannels: ['Email'],
    loyaltyCardType: 'Collaborateur'
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
    staffNumber: '1000060596825',
    children: [
      { id: 'c6', firstName: 'Hugo', lastName: 'Thomas', gender: 'garçon', birthDate: '2014-08-22', preferredSizes: { shoes: '34', tops: '12 ans', pants: '12 ans' } },
      { id: 'c7', firstName: 'Chloé', lastName: 'Thomas', gender: 'fille', birthDate: '2019-03-30', preferredSizes: { shoes: '26', tops: '5 ans', pants: '5 ans' } }
    ],
    preferredSizes: {
      shoes: '41',
      tops: 'M',
      pants: '40'
    },
    hasCoupon: true,
    address: '131 rue de Paris',
    city: 'Marseille',
    zipCode: '13001',
    storeId: '7007',
    loyaltyCardNumber: '9110000117804',
    birthDate: '1982-09-05',
    preferredCommChannel: 'Store',
    preferredPurchaseChannel: 'Magasin',
    emailQuality: 'OK',
    smsQuality: 'OK',
    lastPurchaseDate: '2026-01-24',
    commChannels: ['Email', 'SMS'],
    loyaltyCardType: 'Collaborateur'
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
    loyaltyCardNumber: '9710267094078',
    children: [
      { id: 'c8', firstName: 'Alice', lastName: 'Bernard', gender: 'fille', birthDate: '2021-06-18', preferredSizes: { shoes: '22', tops: '3 ans', pants: '3 ans' } }
    ],
    preferredSizes: {
      shoes: '39',
      tops: 'L',
      pants: '40',
      dresses: '40'
    },
    birthDate: '1995-12-12',
    preferredCommChannel: 'Web',
    preferredPurchaseChannel: 'Web',
    emailQuality: 'OK',
    smsQuality: 'OK',
    lastPurchaseDate: '2025-09-19',
    commChannels: ['Email', 'SMS'],
    loyaltyCardType: 'Dématérialisée'
  }
];
