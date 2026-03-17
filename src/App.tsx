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
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Customer, Product, LoyaltyStatus } from './types';
import { MOCK_CUSTOMERS, MOCK_PRODUCTS } from './mockData';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }) => {
  const variants = {
    primary: 'bg-[#5A5A40] text-white hover:bg-[#4A4A30]',
    secondary: 'bg-[#E6E6E6] text-[#1a1a1a] hover:bg-[#D6D6D6]',
    outline: 'border border-[#5A5A40] text-[#5A5A40] hover:bg-[#5A5A40]/5',
    ghost: 'text-[#5A5A40] hover:bg-[#5A5A40]/5'
  };

  return (
    <button 
      className={cn(
        'px-6 py-3 rounded-full font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('bg-white rounded-[32px] p-6 shadow-sm border border-black/5', className)}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'gold' | 'silver' | 'bronze' | 'staff' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-600',
    gold: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    silver: 'bg-slate-100 text-slate-700 border border-slate-200',
    bronze: 'bg-orange-100 text-orange-700 border border-orange-200',
    staff: 'bg-purple-100 text-purple-700 border border-purple-200'
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
    <span className={cn('px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider', variants[v])}>
      {children}
    </span>
  );
};

// --- Views ---

const AdvisorDashboard = ({ onSelectCustomer, onSignup }: { onSelectCustomer: (c: Customer) => void, onSignup: () => void }) => {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);

  const filtered = customers.filter(c => 
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.loyaltyCardNumber?.includes(search) ||
    c.staffNumber?.includes(search)
  );

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-light text-[#1a1a1a]">Bonjour, Sophie</h1>
          <p className="text-gray-500 italic">Prête à conseiller vos clients ?</p>
        </div>
        <Button onClick={onSignup} variant="outline">
          <Plus size={20} /> Nouveau Client
        </Button>
      </header>

      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
        <input 
          type="text"
          placeholder="Rechercher un client (Nom, Email, Carte, Salarié...)"
          className="w-full pl-16 pr-6 py-6 bg-white rounded-full border-none shadow-lg focus:ring-2 focus:ring-[#5A5A40] text-xl outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(customer => (
          <motion.div 
            key={customer.id}
            whileHover={{ y: -4 }}
            onClick={() => onSelectCustomer(customer)}
            className="cursor-pointer"
          >
            <Card className="flex items-center gap-6 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 rounded-full bg-[#f5f5f0] flex items-center justify-center text-[#5A5A40]">
                <User size={40} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-medium">{customer.firstName} {customer.lastName}</h3>
                    {customer.isStaff && <Badge variant="staff">Staff</Badge>}
                  </div>
                  <Badge>{customer.status}</Badge>
                </div>
                <p className="text-gray-500 text-sm">{customer.email}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-mono text-[#5A5A40]">
                  <span>{customer.points} points</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{customer.city}</span>
                  {customer.loyaltyCardNumber && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="text-xs opacity-60">#{customer.loyaltyCardNumber}</span>
                    </>
                  )}
                </div>
              </div>
              <ChevronRight className="text-gray-300" />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CustomerProfile = ({ 
  customer, 
  onBack, 
  onCheckout,
  onMerge
}: { 
  customer: Customer, 
  onBack: () => void, 
  onCheckout: () => void,
  onMerge: () => void
}) => {
  const triedProducts = MOCK_PRODUCTS.filter(p => 
    customer.interactions.some(i => i.productId === p.id && i.type === 'tried')
  );
  const webViewedProducts = MOCK_PRODUCTS.filter(p => 
    customer.interactions.some(i => i.productId === p.id && i.type === 'viewed_web')
  );

  return (
    <div className="space-y-8 pb-20">
      <nav className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-serif italic">Profil Client</h2>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info & Loyalty */}
        <div className="space-y-6">
          <Card className="text-center">
            <div className="w-32 h-32 rounded-full bg-[#f5f5f0] mx-auto flex items-center justify-center text-[#5A5A40] mb-4">
              <User size={64} />
            </div>
            <h3 className="text-2xl font-medium">{customer.firstName} {customer.lastName}</h3>
            <div className="flex justify-center gap-2 mt-2">
              <Badge>{customer.status}</Badge>
              <Badge variant="default">{customer.country}</Badge>
              {customer.isStaff && <Badge variant="staff">Salarié</Badge>}
            </div>
            
            <div className="mt-4 text-sm text-gray-500 space-y-1">
              {customer.loyaltyCardNumber && <p>Carte: <span className="font-mono">{customer.loyaltyCardNumber}</span></p>}
              {customer.staffNumber && <p>Matricule: <span className="font-mono">{customer.staffNumber}</span></p>}
            </div>

            <div className="mt-6 p-4 bg-[#f5f5f0] rounded-2xl">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Points Fidélité</p>
              <p className="text-4xl font-light text-[#5A5A40]">{customer.points}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={onCheckout} className="w-full">
                <ShoppingBag size={20} /> Encaisser
              </Button>
              <Button onClick={onMerge} variant="outline" className="w-full">
                <Merge size={20} /> Fusionner Compte
              </Button>
            </div>
          </Card>

          <Card>
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <Info size={18} className="text-blue-500" /> Coordonnées
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Adresse</p>
                <p>{customer.address}</p>
                <p>{customer.zipCode} {customer.city}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Contact</p>
                <p>{customer.phone}</p>
                <p>{customer.email}</p>
              </div>
              {customer.storeId && (
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">Magasin de rattachement</p>
                  <p>ID: {customer.storeId}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Interactions & Recommendations */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h3 className="text-xl font-serif italic mb-4 flex items-center gap-2">
              <Smartphone size={20} /> En cabine / Web
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-[#fcfcf7]">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Articles déjà essayés</h4>
                <div className="space-y-3">
                  {triedProducts.map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.price}€</p>
                      </div>
                    </div>
                  ))}
                  {triedProducts.length === 0 && <p className="text-sm text-gray-400 italic">Aucun article essayé récemment</p>}
                </div>
              </Card>
              <Card className="bg-[#fcfcf7]">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Consultés sur le web</h4>
                <div className="space-y-3">
                  {webViewedProducts.map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.price}€</p>
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
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.price}€</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-serif italic mb-4 flex items-center gap-2">
              <History size={20} /> Historique Fidélité
            </h3>
            <Card className="p-0 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-widest">
                  <tr>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Détail</th>
                    <th className="px-6 py-4 text-left">Type</th>
                    <th className="px-6 py-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customer.pointsHistory.map((h, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-xs">{h.date}</td>
                      <td className="px-6 py-4 font-medium">{h.reason}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                          h.type === 'transactional' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                        )}>
                          {h.type}
                        </span>
                      </td>
                      <td className={cn('px-6 py-4 text-right font-bold', h.points > 0 ? 'text-emerald-600' : 'text-red-600')}>
                        {h.points > 0 ? '+' : ''}{h.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>
        </div>
      </div>
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
                      ? 'border-[#5A5A40] bg-[#5A5A40]/5' 
                      : 'border-gray-100 hover:border-gray-200'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#f5f5f0] flex items-center justify-center text-[#5A5A40]">
                      <Gift size={24} />
                    </div>
                    <div>
                      <p className="font-medium">{reward.name}</p>
                      <p className="text-xs text-gray-500 italic">Expire le {reward.expiryDate}</p>
                    </div>
                  </div>
                  {appliedRewards.includes(reward.id) && <CheckCircle2 className="text-[#5A5A40]" />}
                </div>
              ))}
              {customer.rewards.length === 0 && (
                <p className="text-center text-gray-400 py-8 italic">Aucune récompense disponible</p>
              )}
            </div>
          </Card>

          <Card className="bg-[#1a1a1a] text-white">
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
            <Button onClick={() => setStep(2)} className="w-full mt-6 bg-white text-[#1a1a1a] hover:bg-gray-100">
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
          <Button onClick={onBack} variant="outline">
            Retour au tableau de bord
          </Button>
        </motion.div>
      )}
    </div>
  );
};

const SignupView = ({ onBack }: { onBack: () => void }) => {
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-20">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-serif italic">Bienvenue chez Grain de Malice !</h2>
        <p className="text-gray-500">Votre compte fidélité est activé. Vous commencez avec 50 points de bienvenue.</p>
        <Button onClick={onBack} className="w-full">Accéder au profil</Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <nav className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-serif italic">Nouveau Programme Fidélité</h2>
      </nav>

      <Card className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Prénom</label>
            <input type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#5A5A40]" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Nom</label>
            <input type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#5A5A40]" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email</label>
          <input type="email" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#5A5A40]" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Téléphone</label>
          <input type="tel" className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#5A5A40]" />
        </div>
        <div className="flex items-center gap-3 p-4 bg-[#fcfcf7] rounded-2xl">
          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#5A5A40] focus:ring-[#5A5A40]" />
          <p className="text-sm text-gray-600">J'accepte de recevoir les offres exclusives Grain de Malice</p>
        </div>
        <Button onClick={() => setSuccess(true)} className="w-full">Créer mon compte</Button>
      </Card>
    </div>
  );
};

const MergeView = ({ customer, onBack }: { customer: Customer, onBack: () => void }) => {
  const [selectedToMerge, setSelectedToMerge] = useState<Customer | null>(null);
  const [merged, setMerged] = useState(false);

  const otherCustomers = MOCK_CUSTOMERS.filter(c => c.id !== customer.id);

  if (merged) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-20">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <Merge size={40} />
        </div>
        <h2 className="text-3xl font-serif italic">Fusion Réussie</h2>
        <p className="text-gray-500">Les historiques et points ont été consolidés sur le compte principal.</p>
        <Button onClick={onBack} className="w-full">Retour au profil</Button>
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
        <Card className="border-2 border-[#5A5A40] bg-[#5A5A40]/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#5A5A40] mb-2">Compte Principal</p>
          <h4 className="font-medium">{customer.firstName} {customer.lastName}</h4>
          <p className="text-xs text-gray-500">{customer.email}</p>
          <p className="mt-2 font-mono text-sm">{customer.points} pts</p>
        </Card>

        <div className="flex justify-center">
          <Plus size={32} className="text-gray-300 rotate-45" />
        </div>

        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Sélectionner le compte à fusionner</h3>
          <div className="space-y-3">
            {otherCustomers.map(c => (
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
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm">{c.points} pts</p>
                </div>
              </div>
            ))}
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
          <Button onClick={() => setMerged(true)} className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white">
            Confirmer la fusion
          </Button>
        </Card>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'dashboard' | 'profile' | 'checkout' | 'signup' | 'merge'>('dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setView('profile');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] font-sans selection:bg-[#5A5A40]/20">
      <main className="max-w-7xl mx-auto px-6 py-12">
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
                onSelectCustomer={handleSelectCustomer} 
                onSignup={() => setView('signup')}
              />
            )}
            
            {view === 'profile' && selectedCustomer && (
              <CustomerProfile 
                customer={selectedCustomer} 
                onBack={() => setView('dashboard')}
                onCheckout={() => setView('checkout')}
                onMerge={() => setView('merge')}
              />
            )}

            {view === 'checkout' && selectedCustomer && (
              <CheckoutView 
                customer={selectedCustomer} 
                onBack={() => setView('profile')}
              />
            )}

            {view === 'signup' && (
              <SignupView onBack={() => setView('dashboard')} />
            )}

            {view === 'merge' && selectedCustomer && (
              <MergeView 
                customer={selectedCustomer} 
                onBack={() => setView('profile')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-black/5 px-6 py-3 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Globe size={10} /> Mode: Magasin Français</span>
          <span className="w-1 h-1 rounded-full bg-gray-200" />
          <span>Connecté: Sophie B.</span>
        </div>
        <div className="flex items-center gap-4">
          <span>V1.4.2</span>
          <span className="flex items-center gap-1 text-emerald-500"><CheckCircle2 size={10} /> Système Opérationnel</span>
        </div>
      </footer>
    </div>
  );
}
