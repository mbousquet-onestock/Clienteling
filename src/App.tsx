/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Star, 
  History, 
  Gift, 
  Merge, 
  Plus, 
  ChevronRight, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Globe,
  Smartphone,
  Info,
  XCircle,
  Mail,
  MessageSquare,
  Calendar,
  ShoppingBasket,
  Edit2,
  Save,
  X,
  Scan,
  Baby,
  Ruler,
  Truck,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Customer, Product, LoyaltyStatus, Child, Address, PreferredSizes } from './types';
import { MOCK_CUSTOMERS, MOCK_PRODUCTS } from './mockData';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatCardNumber = (num: string | undefined | number) => {
  if (num === undefined || num === null) return '';
  return num.toString().replace(/\.0$/, '');
};

// --- Components ---

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'onestock', size?: 'sm' | 'md' | 'lg' }) => {
  const variants = {
    primary: 'bg-onestock-blue text-white hover:bg-onestock-navy shadow-sm',
    onestock: 'bg-[#26B5A9] text-white hover:bg-[#1f948a] shadow-sm', // Teal from the image
    secondary: 'bg-onestock-light text-onestock-navy hover:bg-gray-200',
    outline: 'border border-onestock-blue text-onestock-blue hover:bg-onestock-blue/5',
    ghost: 'text-onestock-blue hover:bg-onestock-blue/5'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm font-semibold',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button 
      className={cn(
        'rounded-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2',
        variants[variant as keyof typeof variants] || variants.primary,
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className, ...props }: { children: React.ReactNode, className?: string } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow', className)} {...props}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'default', className, ...props }: { children: React.ReactNode, variant?: 'default' | 'gold' | 'silver' | 'bronze' | 'staff' | 'outline', className?: string } & React.HTMLAttributes<HTMLSpanElement>) => {
  const variants = {
    default: 'bg-gray-100 text-gray-600',
    gold: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    silver: 'bg-slate-100 text-slate-700 border border-slate-200',
    bronze: 'bg-orange-100 text-orange-700 border border-orange-200',
    staff: 'bg-purple-100 text-purple-700 border border-purple-200',
    outline: 'border border-gray-200 text-gray-500 bg-transparent'
  };

  const statusMap: Record<string, keyof typeof variants> = {
    'Gold': 'gold',
    'Silver': 'silver',
    'Bronze': 'bronze',
    'Platinum': 'gold',
    'Collaborateur': 'staff'
  };

  const v = typeof children === 'string' ? statusMap[children] || 'default' : variant;

  return (
    <span 
      className={cn('px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider inline-flex items-center', variants[v], className)}
      {...props}
    >
      {children}
    </span>
  );
};

// --- Views ---

const AdvisorDashboard = ({ 
  customers,
  onSelectCustomer, 
  onSignup 
}: { 
  customers: Customer[],
  onSelectCustomer: (c: Customer) => void, 
  onSignup: () => void 
}) => {
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => 
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.loyaltyCardNumber?.includes(search) ||
    c.staffNumber?.includes(search)
  );

  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-light text-onestock-navy">Bonjour, Sophie</h1>
          <p className="text-gray-500 italic text-sm sm:text-base">Prête à conseiller vos clients ?</p>
        </div>
      </header>

      {/* Modernized Search Bar based on image */}
      <div className="bg-white p-2 rounded-lg shadow-xl border border-gray-100 flex flex-col md:flex-row items-stretch gap-2">
        <div className="flex-1 flex items-center border border-gray-200 rounded-md overflow-hidden bg-gray-50/30 focus-within:ring-2 focus-within:ring-onestock-blue/20 focus-within:border-onestock-blue transition-all">
          <div className="px-4 text-gray-400">
            <Search size={20} />
          </div>
          <input 
            type="text"
            placeholder="Nom, Email, Carte de fidélité..."
            className="flex-1 py-3 bg-transparent outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-4 py-3 text-xs font-medium text-gray-500 hover:bg-gray-100 border-l border-gray-200 flex items-center gap-1 transition-colors">
            Recherche avancée <ChevronRight size={14} className="rotate-90" />
          </button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="onestock" className="flex-1 md:flex-none px-8">
            Rechercher
          </Button>
          <Button variant="onestock" onClick={onSignup} className="flex-1 md:flex-none px-8">
            Ajouter client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(customer => (
          <motion.div 
            key={customer.id}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => onSelectCustomer(customer)}
            className="cursor-pointer"
          >
            <Card className="h-full flex flex-col gap-4 hover:shadow-xl transition-all border-transparent hover:border-onestock-blue/20 p-5 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-onestock-light flex items-center justify-center text-onestock-blue shrink-0">
                  <User size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-semibold truncate text-onestock-navy">{customer.firstName} {customer.lastName}</h3>
                    <Badge className="shrink-0">{customer.status}</Badge>
                  </div>
                  <p className="text-gray-400 text-xs truncate">{customer.email}</p>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-end">
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Points</span>
                    <span className="text-xl font-bold text-onestock-blue">{customer.points}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Dernier achat</span>
                    <p className="text-xs font-medium text-onestock-navy">{customer.lastPurchaseDate || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const EditCustomerView = ({ 
  customer, 
  onBack, 
  onSave 
}: { 
  customer: Customer, 
  onBack: () => void, 
  onSave: (updated: Customer) => void 
}) => {
  const [formData, setFormData] = useState({ ...customer });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <nav className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-serif italic">Modifier le profil</h2>
      </nav>

      <Card className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Prénom</label>
            <input 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 bg-onestock-light rounded-xl border-none focus:ring-2 focus:ring-onestock-blue"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Nom</label>
            <input 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 bg-onestock-light rounded-xl border-none focus:ring-2 focus:ring-onestock-blue"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
          <input 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-onestock-light rounded-xl border-none focus:ring-2 focus:ring-onestock-blue"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Téléphone</label>
          <input 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 bg-onestock-light rounded-xl border-none focus:ring-2 focus:ring-onestock-blue"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Date de naissance</label>
            <input 
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full p-3 bg-onestock-light rounded-xl border-none focus:ring-2 focus:ring-onestock-blue"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Carte de fidélité</label>
            <input 
              name="loyaltyCardNumber"
              value={formData.loyaltyCardNumber || ''}
              onChange={handleChange}
              className="w-full p-3 bg-onestock-light rounded-xl border-none focus:ring-2 focus:ring-onestock-blue"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Matricule</label>
          <input 
            name="staffNumber"
            value={formData.staffNumber || ''}
            onChange={handleChange}
            className="w-full p-3 bg-onestock-light rounded-xl border-none focus:ring-2 focus:ring-onestock-blue"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">Adresse</h4>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Rue</label>
            <input 
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              className="w-full p-3 bg-onestock-light rounded-xl border-none focus:ring-2 focus:ring-onestock-blue"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Code Postal</label>
              <input 
                name="zipCode"
                value={formData.zipCode || ''}
                onChange={handleChange}
                className="w-full p-3 bg-onestock-light rounded-xl border-none focus:ring-2 focus:ring-onestock-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Ville</label>
              <input 
                name="city"
                value={formData.city || ''}
                onChange={handleChange}
                className="w-full p-3 bg-onestock-light rounded-xl border-none focus:ring-2 focus:ring-onestock-blue"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Pays</label>
            <input 
              name="country"
              value={formData.country || ''}
              onChange={handleChange}
              className="w-full p-3 bg-onestock-light rounded-xl border-none focus:ring-2 focus:ring-onestock-blue"
            />
          </div>
        </div>

        <div className="pt-6">
          <Button onClick={() => onSave(formData)} className="w-full">
            <Save size={20} /> Enregistrer les modifications
          </Button>
        </div>
      </Card>
    </div>
  );
};

const CustomerProfile = ({ 
  customer, 
  onBack, 
  onMerge,
  onEdit,
  onAddTriedItem,
  onUpdateCustomer
}: { 
  customer: Customer, 
  onBack: () => void, 
  onMerge: () => void,
  onEdit: () => void,
  onAddTriedItem: (productId: string) => void,
  onUpdateCustomer: (customer: Customer) => void
}) => {
  const [isAddingTried, setIsAddingTried] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [searchProduct, setSearchProduct] = useState('');
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
  const [isEditingChildren, setIsEditingChildren] = useState(false);
  const [isEditingSizes, setIsEditingSizes] = useState(false);
  const [isEditingMarketing, setIsEditingMarketing] = useState(false);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    motif: 'shopping solo' as 'shopping solo' | 'shopping groupe',
    duration: '1h'
  });
  const [editingMarketing, setEditingMarketing] = useState({
    commChannels: [] as string[],
    preferredCommChannel: '',
    preferredPurchaseChannel: ''
  });
  const [editingChildren, setEditingChildren] = useState<Child[]>([]);

  useEffect(() => {
    if (isEditingMarketing) {
      setEditingMarketing({
        commChannels: customer.commChannels || [],
        preferredCommChannel: customer.preferredCommChannel || '',
        preferredPurchaseChannel: customer.preferredPurchaseChannel || ''
      });
    }
  }, [isEditingMarketing, customer]);

  useEffect(() => {
    if (isEditingChildren) {
      setEditingChildren(customer.children || []);
    }
  }, [isEditingChildren, customer.children]);

  const handleAddChild = () => {
    const newChild: Child = {
      id: `new-${Date.now()}`,
      firstName: '',
      lastName: customer.lastName,
      gender: 'fille',
      birthDate: new Date().toISOString().split('T')[0],
      preferredSizes: { shoes: '', tops: '', pants: '' }
    };
    setEditingChildren([...editingChildren, newChild]);
  };

  const handleUpdateChild = (id: string, field: keyof Child, value: any) => {
    setEditingChildren(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleUpdateChildSize = (childId: string, sizeField: keyof PreferredSizes, value: string) => {
    setEditingChildren(prev => prev.map(c => 
      c.id === childId ? { 
        ...c, 
        preferredSizes: { ...c.preferredSizes, [sizeField]: value } 
      } : c
    ));
  };

  const handleRemoveChild = (id: string) => {
    setEditingChildren(prev => prev.filter(c => c.id !== id));
  };

  const triedProducts = MOCK_PRODUCTS.filter(p => 
    customer.interactions.some(i => i.productId === p.id && i.type === 'tried')
  );

  const availableProducts = MOCK_PRODUCTS.filter(p => 
    !customer.interactions.some(i => i.productId === p.id && i.type === 'tried') &&
    p.name.toLowerCase().includes(searchProduct.toLowerCase())
  );
  const webViewedProducts = MOCK_PRODUCTS.filter(p => 
    customer.interactions.some(i => i.productId === p.id && i.type === 'viewed_web')
  );

  const purchasedProducts = MOCK_PRODUCTS.filter(p => 
    customer.interactions.some(i => i.productId === p.id && i.type === 'purchased')
  ).map(p => ({
    ...p,
    purchaseDate: customer.interactions.find(i => i.productId === p.id && i.type === 'purchased')?.date
  }));

  const reviewedInteractions = customer.interactions.filter(i => i.type === 'reviewed').map(i => ({
    ...i,
    product: MOCK_PRODUCTS.find(p => p.id === i.productId)
  }));

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanning) {
      timer = setTimeout(() => {
        const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
        onAddTriedItem(randomProduct.id);
        setIsScanning(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isScanning, onAddTriedItem]);

  return (
    <div className="space-y-8">
      <nav className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-serif italic">Profil Client</h2>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Block 1: Top Left (Desktop) / Top (Mobile) */}
        <div className="space-y-6 lg:col-span-1 order-1">
          <Card className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-onestock-light mx-auto flex items-center justify-center text-onestock-blue mb-4">
                <User size={64} />
              </div>
              <h3 className="text-2xl font-medium">{customer.firstName} {customer.lastName}</h3>
              <div className="flex justify-center gap-2 mt-2">
                <Badge>{customer.status}</Badge>
                <Badge variant="default">{customer.country}</Badge>
                {customer.isStaff && <Badge variant="staff">Salarié</Badge>}
              </div>
              
              <div className="mt-4 text-sm text-gray-500 space-y-2">
                {customer.loyaltyCardNumber && <p>Carte de fidélité: <span className="font-mono">{formatCardNumber(customer.loyaltyCardNumber)}</span></p>}
                <div className="flex items-center justify-center gap-2">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Coupon</p>
                  <Badge variant={customer.hasCoupon ? 'gold' : 'outline'}>
                    {customer.hasCoupon ? 'Oui' : 'Non'}
                  </Badge>
                </div>
                {customer.staffNumber && <p>Matricule: <span className="font-mono">{formatCardNumber(customer.staffNumber)}</span></p>}
              </div>

              <div className="mt-6 p-4 bg-onestock-light rounded-xl">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Points Fidélité</p>
                  <p className="text-4xl font-bold text-onestock-blue">{customer.points}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Info size={18} className="text-blue-500" /> Coordonnées
                </h4>
                <button 
                  onClick={() => setIsEditingAddresses(true)}
                  className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
                >
                  <Edit2 size={14} />
                </button>
              </div>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 flex items-center gap-1">
                    <Globe size={10} /> Adresse
                  </p>
                  <p className="font-medium">{customer.address}</p>
                  <p className="text-gray-500">{customer.zipCode} {customer.city}</p>
                  <p className="text-gray-500">{customer.country}</p>
                </div>
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Contact</p>
                    <p className="flex items-center gap-2"><Smartphone size={14} /> {customer.phone}</p>
                    <p className="flex items-center gap-2"><Mail size={14} /> {customer.email}</p>
                  </div>
                  {customer.birthDate && (
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Date de naissance</p>
                      <p className="flex items-center gap-2"><Calendar size={14} /> {customer.birthDate}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
              <Button onClick={onEdit} variant="outline" className="w-full">
                <Edit2 size={20} /> Modifier Profil
              </Button>
              <Button onClick={onMerge} variant="outline" className="w-full">
                <Merge size={20} /> Fusionner Compte
              </Button>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium flex items-center gap-2">
                <Ruler size={18} className="text-purple-500" /> Tailles préférées
              </h4>
              <button 
                onClick={() => setIsEditingSizes(true)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
              >
                <Edit2 size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-gray-400 uppercase font-bold text-[9px]">Pointure</p>
                <p className="font-medium">{customer.preferredSizes?.shoes || '-'}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-gray-400 uppercase font-bold text-[9px]">Hauts</p>
                <p className="font-medium">{customer.preferredSizes?.tops || '-'}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-gray-400 uppercase font-bold text-[9px]">Pantalons</p>
                <p className="font-medium">{customer.preferredSizes?.pants || '-'}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-gray-400 uppercase font-bold text-[9px]">Robes</p>
                <p className="font-medium">{customer.preferredSizes?.dresses || '-'}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium flex items-center gap-2">
                <Baby size={18} className="text-pink-500" /> Enfants
              </h4>
              <button 
                onClick={() => setIsEditingChildren(true)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
              >
                <Edit2 size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {customer.children?.map(child => (
                <div key={child.id} className="p-3 bg-gray-50 rounded-xl text-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{child.firstName} {child.lastName}</p>
                      <p className="text-xs text-gray-500 capitalize">{child.gender} • {child.birthDate}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {new Date().getFullYear() - new Date(child.birthDate).getFullYear()} ans
                    </Badge>
                  </div>
                  {child.preferredSizes && (
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
                      {child.preferredSizes.shoes && <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-gray-100">👟 {child.preferredSizes.shoes}</span>}
                      {child.preferredSizes.tops && <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-gray-100">👕 {child.preferredSizes.tops}</span>}
                      {child.preferredSizes.pants && <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-gray-100">👖 {child.preferredSizes.pants}</span>}
                    </div>
                  )}
                </div>
              ))}
              {(!customer.children || customer.children.length === 0) && (
                <p className="text-xs text-gray-400 italic text-center py-2">Aucun enfant renseigné</p>
              )}
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium flex items-center gap-2">
                <Smartphone size={18} className="text-emerald-500" /> Profil Marketing
              </h4>
              <button 
                onClick={() => setIsEditingMarketing(true)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
              >
                <Edit2 size={14} />
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Qualité Email</p>
                  <div className="flex items-center gap-2">
                    {customer.emailQuality === 'OK' ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <CheckCircle2 size={16} /> Valide
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 font-medium">
                        <XCircle size={16} /> Invalide
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Qualité SMS</p>
                  <div className="flex items-center gap-2">
                    {customer.smsQuality === 'OK' ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <CheckCircle2 size={16} /> Valide
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 font-medium">
                        <XCircle size={16} /> Invalide
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Canaux de communication</p>
                <div className="flex flex-wrap gap-2">
                  {customer.commChannels?.map(channel => (
                    <Badge key={channel} variant="outline" className="text-[10px]">
                      {channel === 'Email' && <Mail size={10} className="mr-1" />}
                      {channel === 'SMS' && <MessageSquare size={10} className="mr-1" />}
                      {channel === 'WhatsApp' && <Smartphone size={10} className="mr-1 text-emerald-500" />}
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-50">
                <div className="flex justify-between">
                  <span className="text-gray-500">Canal préféré (Comm)</span>
                  <span className="font-medium">{customer.preferredCommChannel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Canal préféré (Achat)</span>
                  <span className="font-medium flex items-center gap-1">
                    <ShoppingBasket size={14} /> {customer.preferredPurchaseChannel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Dernier achat</span>
                  <span className="font-medium">{customer.lastPurchaseDate}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Block 2: Right Column (Desktop) / Middle (Mobile) */}
        <div className="lg:col-span-2 space-y-8 order-2">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-serif italic flex items-center gap-2">
                <Smartphone size={20} /> En cabine / Web
              </h3>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsScanning(true)}
                  className="text-xs h-8 px-3 bg-onestock-blue/10 text-onestock-blue hover:bg-onestock-blue/20"
                >
                  <Scan size={14} className="mr-1" /> Scan
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsAddingTried(!isAddingTried)}
                  className="text-xs h-8 px-3"
                >
                  {isAddingTried ? <X size={14} /> : <Plus size={14} />} 
                  {isAddingTried ? 'Annuler' : 'Ajouter article essayé'}
                </Button>
              </div>
            </div>

            {isScanning && (
              <Card className="mb-6 bg-black text-white overflow-hidden relative min-h-[200px] flex flex-center items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-onestock-blue/20 to-transparent animate-pulse" />
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-48 h-48 border-2 border-onestock-blue rounded-3xl mx-auto relative">
                    <div className="absolute inset-4 border border-white/30 rounded-2xl" />
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-onestock-blue shadow-[0_0_15px_rgba(0,163,224,0.8)] animate-scan" />
                  </div>
                  <p className="text-sm font-medium">Scannez le code-barres de l'article</p>
                  <Button variant="outline" size="sm" onClick={() => setIsScanning(false)} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Arrêter le scan
                  </Button>
                </div>
              </Card>
            )}

            {isAddingTried && (
              <Card className="mb-6 bg-onestock-blue/5 border-onestock-blue/10">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text"
                    placeholder="Rechercher un article..."
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border-none focus:ring-2 focus:ring-onestock-blue text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
                  {availableProducts.map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => {
                        onAddTriedItem(p.id);
                        setIsAddingTried(false);
                        setSearchProduct('');
                      }}
                      className="flex items-center gap-3 p-2 bg-white rounded-xl cursor-pointer hover:border-onestock-blue border border-transparent transition-all"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{p.name}</p>
                        <p className="text-[10px] text-gray-500">{p.price}€ • {p.color} • {p.size}</p>
                        <p className="text-[9px] text-gray-400 font-mono">SKU: {p.sku}</p>
                      </div>
                      <Plus size={14} className="text-onestock-blue" />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-onestock-light">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Articles déjà essayés</h4>
                <div className="space-y-3">
                  {triedProducts.map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-sm font-bold text-onestock-navy uppercase tracking-tight">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.price}€ • {p.color} • {p.size}</p>
                        <p className="text-[10px] text-gray-400 font-mono">SKU: {p.sku}</p>
                      </div>
                    </div>
                  ))}
                  {triedProducts.length === 0 && <p className="text-sm text-gray-400 italic">Aucun article essayé récemment</p>}
                </div>
              </Card>
              <Card className="bg-onestock-light">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Consultés sur le web</h4>
                <div className="space-y-3">
                  {webViewedProducts.map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-sm font-bold text-onestock-navy uppercase tracking-tight">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.price}€ • {p.color} • {p.size}</p>
                        <p className="text-[10px] text-gray-400 font-mono">SKU: {p.sku}</p>
                      </div>
                    </div>
                  ))}
                  {webViewedProducts.length === 0 && <p className="text-sm text-gray-400 italic">Aucun article consulté</p>}
                </div>
              </Card>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-serif italic mb-4 flex items-center gap-2">
              <Gift size={20} /> Recommandations personnalisées
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {MOCK_PRODUCTS.slice(0, 3).map(p => (
                <div key={p.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-2">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute top-2 right-2">
                      <button className="p-2 bg-white/80 backdrop-blur rounded-full shadow-sm">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-onestock-navy uppercase tracking-tight truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.price}€</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-serif italic mb-4 flex items-center gap-2">
              <MessageSquare size={20} /> Avis produit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviewedInteractions.map((rev, i) => (
                <Card key={i} className="flex gap-4">
                  <img src={rev.product?.image} alt={rev.product?.name} className="w-16 h-16 rounded-lg object-cover shrink-0" referrerPolicy="no-referrer" />
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-onestock-navy uppercase tracking-tight">{rev.product?.name}</p>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} size={10} fill={idx < (rev.rating || 0) ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 italic">"{rev.comment}"</p>
                    <p className="text-[10px] text-gray-400">{rev.date}</p>
                  </div>
                </Card>
              ))}
              {reviewedInteractions.length === 0 && (
                <Card className="col-span-full py-8 text-center text-gray-400 italic">
                  Aucun avis déposé par ce client
                </Card>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-serif italic mb-4 flex items-center gap-2">
              <ShoppingBasket size={20} /> Historique de commandes
            </h3>
            <Card className="p-6">
              <div className="space-y-4">
                {purchasedProducts.map((p, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-sm font-bold text-onestock-navy uppercase tracking-tight">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.price.toFixed(2)}€ • {p.color} • {p.size}</p>
                        <p className="text-[10px] text-gray-400 font-mono">SKU: {p.sku}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Achat le</p>
                      <p className="text-xs font-mono bg-gray-100 px-2 py-1 rounded-lg">{p.purchaseDate}</p>
                    </div>
                  </div>
                ))}
                {purchasedProducts.length === 0 && (
                  <p className="py-8 text-center text-gray-400 italic">
                    Aucune commande trouvée
                  </p>
                )}
              </div>
            </Card>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-serif italic flex items-center gap-2">
                <Calendar size={20} /> Rendez-vous
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsAddingAppointment(true)}
                className="text-xs h-8 px-3 bg-onestock-blue/10 text-onestock-blue hover:bg-onestock-blue/20"
              >
                <Plus size={14} className="mr-1" /> Nouveau RDV
              </Button>
            </div>
            <Card className="p-6">
              <div className="space-y-4">
                {customer.appointments?.map((apt, i) => {
                  const aptDate = new Date(`${apt.date}T${apt.time}`);
                  const isPast = aptDate < new Date();
                  return (
                    <div key={i} className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center shrink-0",
                          apt.motif === 'shopping solo' ? "bg-blue-50 text-blue-500" : "bg-purple-50 text-purple-500"
                        )}>
                          <Calendar size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-onestock-navy uppercase tracking-tight">{apt.motif}</p>
                          <p className="text-xs text-gray-500">{apt.date} • {apt.time}</p>
                          <p className="text-[10px] text-gray-400 font-mono">Durée: {apt.duration}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <Badge variant={isPast ? 'default' : 'outline'} className="text-[9px] uppercase tracking-widest">
                          {isPast ? 'Passé' : 'À venir'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
                {(!customer.appointments || customer.appointments.length === 0) && (
                  <p className="py-8 text-center text-gray-400 italic">
                    Aucun rendez-vous prévu
                  </p>
                )}
              </div>
            </Card>
          </section>
        </div>
      </div>

      {/* Address Edit Modal */}
      {isEditingAddresses && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif italic">Modifier les adresses</h3>
              <button onClick={() => setIsEditingAddresses(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-sm flex items-center gap-2"><Globe size={16} /> Adresse unique</h4>
                <div className="grid grid-cols-1 gap-3">
                  <input 
                    type="text" 
                    placeholder="Rue" 
                    defaultValue={customer.address} 
                    id="address-street"
                    className="w-full p-2 border rounded-lg text-sm" 
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Code Postal" 
                      defaultValue={customer.zipCode} 
                      id="address-zip"
                      className="p-2 border rounded-lg text-sm" 
                    />
                    <input 
                      type="text" 
                      placeholder="Ville" 
                      defaultValue={customer.city} 
                      id="address-city"
                      className="p-2 border rounded-lg text-sm" 
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Pays" 
                    defaultValue={customer.country} 
                    id="address-country"
                    className="w-full p-2 border rounded-lg text-sm" 
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={() => {
                  const street = (document.getElementById('address-street') as HTMLInputElement).value;
                  const zip = (document.getElementById('address-zip') as HTMLInputElement).value;
                  const city = (document.getElementById('address-city') as HTMLInputElement).value;
                  const country = (document.getElementById('address-country') as HTMLInputElement).value;
                  
                  onUpdateCustomer({
                    ...customer,
                    address: street,
                    zipCode: zip,
                    city: city,
                    country: country,
                    billingAddress: { street, zipCode: zip, city, country },
                    shippingAddress: { street, zipCode: zip, city, country }
                  });
                  setIsEditingAddresses(false);
                }} className="flex-1">Enregistrer</Button>
                <Button variant="outline" onClick={() => setIsEditingAddresses(false)} className="flex-1">Annuler</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Children Edit Modal */}
      {isEditingChildren && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif italic">Gérer les enfants</h3>
              <button onClick={() => setIsEditingChildren(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {editingChildren.map(child => (
                <div key={child.id} className="p-4 bg-gray-50 rounded-xl space-y-3 relative group">
                  <button 
                    onClick={() => handleRemoveChild(child.id)}
                    className="absolute top-2 right-2 p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Prénom" 
                      value={child.firstName} 
                      onChange={(e) => handleUpdateChild(child.id, 'firstName', e.target.value)}
                      className="p-2 border rounded-lg text-sm" 
                    />
                    <input 
                      type="text" 
                      placeholder="Nom" 
                      value={child.lastName} 
                      onChange={(e) => handleUpdateChild(child.id, 'lastName', e.target.value)}
                      className="p-2 border rounded-lg text-sm" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <select 
                      value={child.gender} 
                      onChange={(e) => handleUpdateChild(child.id, 'gender', e.target.value)}
                      className="p-2 border rounded-lg text-sm"
                    >
                      <option value="garçon">Garçon</option>
                      <option value="fille">Fille</option>
                    </select>
                    <input 
                      type="date" 
                      value={child.birthDate} 
                      onChange={(e) => handleUpdateChild(child.id, 'birthDate', e.target.value)}
                      className="p-2 border rounded-lg text-sm" 
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input 
                      type="text" 
                      placeholder="Pointure" 
                      value={child.preferredSizes?.shoes} 
                      onChange={(e) => handleUpdateChildSize(child.id, 'shoes', e.target.value)}
                      className="p-2 border rounded-lg text-[10px]" 
                    />
                    <input 
                      type="text" 
                      placeholder="Hauts" 
                      value={child.preferredSizes?.tops} 
                      onChange={(e) => handleUpdateChildSize(child.id, 'tops', e.target.value)}
                      className="p-2 border rounded-lg text-[10px]" 
                    />
                    <input 
                      type="text" 
                      placeholder="Pantalons" 
                      value={child.preferredSizes?.pants} 
                      onChange={(e) => handleUpdateChildSize(child.id, 'pants', e.target.value)}
                      className="p-2 border rounded-lg text-[10px]" 
                    />
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full border-dashed"
                onClick={handleAddChild}
              >
                <Plus size={16} className="mr-2" /> Ajouter un enfant
              </Button>
            </div>
            <div className="flex gap-3 pt-6">
              <Button onClick={() => {
                onUpdateCustomer({ ...customer, children: editingChildren });
                setIsEditingChildren(false);
              }} className="flex-1">Terminer</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Sizes Edit Modal */}
      {isEditingSizes && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif italic">Tailles préférées</h3>
              <button onClick={() => setIsEditingSizes(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Pointure</label>
                <input type="text" defaultValue={customer.preferredSizes?.shoes} className="w-full p-2 border rounded-lg text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Hauts (Pulls, T-shirts)</label>
                <input type="text" defaultValue={customer.preferredSizes?.tops} className="w-full p-2 border rounded-lg text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Pantalons</label>
                <input type="text" defaultValue={customer.preferredSizes?.pants} className="w-full p-2 border rounded-lg text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Robes</label>
                <input type="text" defaultValue={customer.preferredSizes?.dresses} className="w-full p-2 border rounded-lg text-sm" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={() => {
                  // For the demo, we'll just close.
                  setIsEditingSizes(false);
                }} className="flex-1">Enregistrer</Button>
                <Button variant="outline" onClick={() => setIsEditingSizes(false)} className="flex-1">Annuler</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Marketing Edit Modal */}
      {isEditingMarketing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif italic">Profil Marketing</h3>
              <button onClick={() => setIsEditingMarketing(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase">Canaux de communication</label>
                <div className="space-y-2">
                  {['Email', 'SMS', 'WhatsApp'].map(channel => (
                    <label key={channel} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={editingMarketing.commChannels.includes(channel)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setEditingMarketing(prev => ({
                            ...prev,
                            commChannels: checked 
                              ? [...prev.commChannels, channel]
                              : prev.commChannels.filter(c => c !== channel)
                          }));
                        }}
                        className="w-5 h-5 rounded border-gray-300 text-onestock-blue focus:ring-onestock-blue"
                      />
                      <span className="text-sm font-medium">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase">Canal préféré (Comm)</label>
                <select 
                  value={editingMarketing.preferredCommChannel}
                  onChange={(e) => setEditingMarketing(prev => ({ ...prev, preferredCommChannel: e.target.value }))}
                  className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-onestock-blue text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Store">Store</option>
                  <option value="Web">Web</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase">Canal préféré (Achat)</label>
                <select 
                  value={editingMarketing.preferredPurchaseChannel}
                  onChange={(e) => setEditingMarketing(prev => ({ ...prev, preferredPurchaseChannel: e.target.value }))}
                  className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-onestock-blue text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Magasin">Magasin</option>
                  <option value="Web">Web</option>
                  <option value="Omnicanal">Omnicanal</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={() => {
                  onUpdateCustomer({ 
                    ...customer, 
                    commChannels: editingMarketing.commChannels,
                    preferredCommChannel: editingMarketing.preferredCommChannel,
                    preferredPurchaseChannel: editingMarketing.preferredPurchaseChannel
                  });
                  setIsEditingMarketing(false);
                }} className="flex-1">Enregistrer</Button>
                <Button variant="outline" onClick={() => setIsEditingMarketing(false)} className="flex-1">Annuler</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Appointment Creation Modal */}
      {isAddingAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif italic text-onestock-navy">Nouveau Rendez-vous</h3>
              <button onClick={() => setIsAddingAppointment(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Date</label>
                  <input 
                    type="date" 
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-onestock-blue text-sm" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Heure</label>
                  <input 
                    type="time" 
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-onestock-blue text-sm" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Motif</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setNewAppointment(prev => ({ ...prev, motif: 'shopping solo' }))}
                    className={cn(
                      "p-3 rounded-xl border-2 text-sm font-medium transition-all",
                      newAppointment.motif === 'shopping solo' 
                        ? "border-onestock-blue bg-onestock-blue/5 text-onestock-blue" 
                        : "border-gray-100 hover:border-gray-200"
                    )}
                  >
                    Shopping Solo
                  </button>
                  <button 
                    onClick={() => setNewAppointment(prev => ({ ...prev, motif: 'shopping groupe' }))}
                    className={cn(
                      "p-3 rounded-xl border-2 text-sm font-medium transition-all",
                      newAppointment.motif === 'shopping groupe' 
                        ? "border-onestock-blue bg-onestock-blue/5 text-onestock-blue" 
                        : "border-gray-100 hover:border-gray-200"
                    )}
                  >
                    Shopping Groupe
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Durée estimée</label>
                <select 
                  value={newAppointment.duration}
                  onChange={(e) => setNewAppointment(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-onestock-blue text-sm"
                >
                  <option value="30min">30 minutes</option>
                  <option value="45min">45 minutes</option>
                  <option value="1h">1 heure</option>
                  <option value="1h30">1 heure 30</option>
                  <option value="2h">2 heures</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => {
                    const apt = {
                      ...newAppointment,
                      id: `apt-${Date.now()}`
                    };
                    onUpdateCustomer({
                      ...customer,
                      appointments: [...(customer.appointments || []), apt]
                    });
                    setIsAddingAppointment(false);
                  }} 
                  className="flex-1"
                >
                  Confirmer le RDV
                </Button>
                <Button variant="outline" onClick={() => setIsAddingAppointment(false)} className="flex-1">
                  Annuler
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

const CheckoutView = ({ customer, onBack }: { customer: Customer, onBack: () => void }) => {
  const [step, setStep] = useState(1);
  const [appliedRewards, setAppliedRewards] = useState<string[]>([]);

  const toggleReward = (id: string) => {
    setAppliedRewards(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const total = 129.97;
  const discount = appliedRewards.length * 10;
  const finalTotal = total - discount;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <nav className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-serif italic">Encaissement</h2>
      </nav>

      {step === 1 ? (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Récompenses disponibles</h3>
              <Badge>{customer.status}</Badge>
            </div>
            
            <div className="space-y-4">
              {customer.rewards.map(reward => (
                <div 
                  key={reward.id}
                  onClick={() => toggleReward(reward.id)}
                  className={cn(
                    'p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between',
                    appliedRewards.includes(reward.id) 
                      ? 'border-onestock-blue bg-onestock-blue/5' 
                      : 'border-gray-100 hover:border-gray-200'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-onestock-light flex items-center justify-center text-onestock-blue">
                      <Gift size={24} />
                    </div>
                    <div>
                      <p className="font-medium">{reward.name}</p>
                      <p className="text-xs text-gray-500 italic">Expire le {reward.expiryDate}</p>
                    </div>
                  </div>
                  {appliedRewards.includes(reward.id) && <CheckCircle2 className="text-onestock-blue" />}
                </div>
              ))}
              {customer.rewards.length === 0 && (
                <p className="text-center text-gray-400 py-8 italic">Aucune récompense disponible</p>
              )}
            </div>
          </Card>

          <Card className="bg-onestock-navy text-white">
            <div className="space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Sous-total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Récompenses</span>
                <span>-{discount.toFixed(2)}€</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between text-2xl font-light">
                <span>Total</span>
                <span>{finalTotal.toFixed(2)}€</span>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-3 p-3 bg-white/5 rounded-xl text-xs text-gray-400">
              <Info size={16} />
              <p>Points à gagner sur cet achat: <span className="text-white font-bold">+{Math.floor(finalTotal)} points</span></p>
            </div>
            <Button onClick={() => setStep(2)} className="w-full mt-6 bg-white text-onestock-navy hover:bg-gray-100">
              Confirmer le paiement
            </Button>
          </Card>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 py-12"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 size={48} />
          </div>
          <div>
            <h3 className="text-3xl font-serif italic">Paiement Réussi !</h3>
            <p className="text-gray-500 mt-2">Le ticket a été envoyé à {customer.email}</p>
          </div>
          <Card className="max-w-xs mx-auto">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Nouveau Statut</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="gold">Gold</Badge>
              <ChevronRight size={16} className="text-gray-300" />
              <Badge variant="gold">Platinum</Badge>
            </div>
            <p className="text-sm text-emerald-600 font-medium">Upgrade de palier atteint ! 🎉</p>
          </Card>
          <Button onClick={onBack} variant="onestock">
            Retour au tableau de bord
          </Button>
        </motion.div>
      )}
    </div>
  );
};

const SignupView = ({ onBack, onSignupComplete }: { onBack: () => void, onSignupComplete: (customer: Customer) => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleSignup = () => {
    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      country: 'France',
      status: 'Bronze',
      points: 50,
      pointsHistory: [
        { date: new Date().toISOString().split('T')[0], points: 50, reason: 'Bienvenue', type: 'relational' }
      ],
      interactions: [],
      rewards: [],
      preferences: [],
      lastVisit: new Date().toISOString().split('T')[0],
      isStaff: false,
      hasCoupon: false,
    };
    onSignupComplete(newCustomer);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <nav className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-serif italic">Nouveau Programme Fidélité</h2>
      </nav>

      <Card className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Prénom</label>
            <input 
              type="text" 
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-onestock-blue" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Nom</label>
            <input 
              type="text" 
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-onestock-blue" 
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-onestock-blue" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Téléphone</label>
          <input 
            type="tel" 
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-onestock-blue" 
          />
        </div>
        <div className="flex items-center gap-3 p-4 bg-onestock-light rounded-2xl">
          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-onestock-blue focus:ring-onestock-blue" />
          <p className="text-sm text-gray-600">J'accepte de recevoir les offres exclusives OneStock</p>
        </div>
        <Button onClick={handleSignup} variant="onestock" className="w-full">Créer mon compte</Button>
      </Card>
    </div>
  );
};

const MergeView = ({ 
  customer, 
  otherCustomers,
  onBack,
  onMergeComplete
}: { 
  customer: Customer, 
  otherCustomers: Customer[],
  onBack: () => void,
  onMergeComplete: (mergedCustomer: Customer, secondaryId: string) => void
}) => {
  const [selectedToMerge, setSelectedToMerge] = useState<Customer | null>(null);
  const [merged, setMerged] = useState(false);
  const [mergedCustomer, setMergedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = useMemo(() => {
    return otherCustomers.filter(c => 
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.loyaltyCardNumber?.includes(searchTerm)
    );
  }, [otherCustomers, searchTerm]);

  const handleMerge = () => {
    if (!selectedToMerge) return;

    const newMergedCustomer: Customer = {
      ...customer,
      points: customer.points + selectedToMerge.points,
      pointsHistory: [...customer.pointsHistory, ...selectedToMerge.pointsHistory].sort((a, b) => b.date.localeCompare(a.date)),
      interactions: [...customer.interactions, ...selectedToMerge.interactions].sort((a, b) => b.date.localeCompare(a.date)),
      rewards: [...customer.rewards, ...selectedToMerge.rewards].sort((a, b) => b.expiryDate.localeCompare(a.expiryDate)),
      children: [...(customer.children || []), ...(selectedToMerge.children || [])],
      preferences: Array.from(new Set([...(customer.preferences || []), ...(selectedToMerge.preferences || [])])),
      appointments: [...(customer.appointments || []), ...(selectedToMerge.appointments || [])].sort((a, b) => b.date.localeCompare(a.date)),
    };

    setMergedCustomer(newMergedCustomer);
    setMerged(true);
  };

  if (merged && selectedToMerge && mergedCustomer) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-20">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-serif italic">Fusion Réussie</h2>
        <p className="text-gray-500">Les historiques, points et avantages ont été consolidés sur le compte de {customer.firstName}.</p>
        <div className="bg-gray-50 p-4 rounded-2xl text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Nouveau solde points :</span>
            <span className="font-bold">{mergedCustomer.points} pts</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Ventes regroupées :</span>
            <span className="font-bold">{mergedCustomer.interactions.filter(i => i.type === 'purchased').length} achats</span>
          </div>
        </div>
        <Button onClick={() => onMergeComplete(mergedCustomer, selectedToMerge.id)} variant="onestock" className="w-full">
          Retour au profil
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <nav className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-serif italic">Fusion de Comptes</h2>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <Card className="border-2 border-onestock-blue bg-onestock-blue/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-onestock-blue mb-2">Compte Principal</p>
          <h4 className="font-medium">{customer.firstName} {customer.lastName}</h4>
          <p className="text-xs text-gray-500">{customer.email}</p>
          <p className="mt-2 font-mono text-sm">{customer.points} pts</p>
        </Card>

        <div className="flex justify-center">
          <Plus size={32} className="text-gray-300 rotate-45" />
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Sélectionner le compte à fusionner</h3>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Rechercher par nom, email ou carte de fidélité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-onestock-blue outline-none text-sm transition-all"
            />
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {filteredCustomers.map(c => (
              <div 
                key={c.id}
                onClick={() => setSelectedToMerge(c)}
                className={cn(
                  'p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between',
                  selectedToMerge?.id === c.id ? 'border-red-200 bg-red-50' : 'border-gray-100 hover:border-gray-200'
                )}
              >
                <div>
                  <p className="font-medium">{c.firstName} {c.lastName}</p>
                  <p className="text-xs text-gray-500">{c.email}</p>
                  {c.loyaltyCardNumber && <p className="text-[10px] font-mono text-gray-400 mt-1">{formatCardNumber(c.loyaltyCardNumber)}</p>}
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm">{c.points} pts</p>
                </div>
              </div>
            ))}
            {filteredCustomers.length === 0 && (
              <p className="text-center text-gray-400 py-8 italic">Aucun compte trouvé</p>
            )}
          </div>
        </div>
      </div>

      {selectedToMerge && (
        <Card className="bg-red-50 border-red-100">
          <div className="flex gap-4">
            <AlertCircle className="text-red-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">Attention</p>
              <p className="text-xs text-red-600">Cette action est irréversible. Le compte de {selectedToMerge.firstName} sera supprimé et ses {selectedToMerge.points} points seront transférés.</p>
            </div>
          </div>
          <Button onClick={handleMerge} className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white">
            Confirmer la fusion
          </Button>
        </Card>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'dashboard' | 'profile' | 'checkout' | 'signup' | 'merge' | 'edit'>('dashboard');
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const selectedCustomer = useMemo(() => 
    customers.find(c => c.id === selectedCustomerId) || null
  , [customers, selectedCustomerId]);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomerId(customer.id);
    setView('profile');
  };

  const handleUpdateCustomer = (updated: Customer) => {
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
    setView('profile');
  };

  const handleSignupComplete = (newCustomer: Customer) => {
    setCustomers(prev => [newCustomer, ...prev]);
    setSelectedCustomerId(newCustomer.id);
    setView('profile');
  };

  const handleAddTriedItem = (productId: string) => {
    if (!selectedCustomer) return;
    
    const newInteraction = {
      productId,
      type: 'tried' as const,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedCustomer = {
      ...selectedCustomer,
      interactions: [newInteraction, ...selectedCustomer.interactions]
    };

    handleUpdateCustomer(updatedCustomer);
  };

  return (
    <div className="min-h-screen bg-onestock-light text-onestock-navy font-sans selection:bg-onestock-blue/20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'dashboard' && (
              <AdvisorDashboard 
                customers={customers}
                onSelectCustomer={handleSelectCustomer} 
                onSignup={() => setView('signup')}
              />
            )}
            
            {view === 'profile' && selectedCustomer && (
              <CustomerProfile 
                customer={selectedCustomer} 
                onBack={() => setView('dashboard')}
                onMerge={() => setView('merge')}
                onEdit={() => setView('edit')}
                onAddTriedItem={handleAddTriedItem}
                onUpdateCustomer={handleUpdateCustomer}
              />
            )}

            {view === 'edit' && selectedCustomer && (
              <EditCustomerView 
                customer={selectedCustomer}
                onBack={() => setView('profile')}
                onSave={handleUpdateCustomer}
              />
            )}

            {view === 'checkout' && selectedCustomer && (
              <CheckoutView 
                customer={selectedCustomer} 
                onBack={() => setView('profile')}
              />
            )}

            {view === 'signup' && (
              <SignupView 
                onBack={() => setView('dashboard')} 
                onSignupComplete={handleSignupComplete}
              />
            )}

            {view === 'merge' && selectedCustomer && (
              <MergeView 
                customer={selectedCustomer} 
                otherCustomers={customers.filter(c => c.id !== selectedCustomer.id)}
                onBack={() => setView('profile')}
                onMergeComplete={(mergedCustomer, secondaryId) => {
                  setCustomers(prev => prev.filter(c => c.id !== secondaryId).map(c => c.id === mergedCustomer.id ? mergedCustomer : c));
                  setView('profile');
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
