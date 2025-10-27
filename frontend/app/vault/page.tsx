'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  RiKeyLine,
  RiMailLine,
  RiShieldKeyholeLine,
  RiFileTextLine,
  RiBankCardLine,
  RiBankLine,
  RiUserLine,
  RiSearchLine,
  RiEyeLine,
  RiLockLine,
  RiArrowRightLine
} from 'react-icons/ri';
import { Card, TextField } from '@radix-ui/themes';
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from 'react-hot-toast';

interface VaultCounts {
  passwords: number;
  emails: number;
  twoFA: number;
  notes: number;
  cards: number;
  bankAccounts: number;
  identities: number;
}

const vaultCategories = [
  {
    id: 'passwords',
    title: 'Passwords',
    description: 'Website/app/Wi-Fi passwords.',
    icon: RiKeyLine,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    href: '/vault/passwords'
  },
  {
    id: 'emails',
    title: 'Emails/Usernames',
    description: 'Login identities if separate from passwords.',
    icon: RiMailLine,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    href: '/vault/emails'
  },
  {
    id: '2fa',
    title: '2FA (TOTP)',
    description: 'Time-based OTP secrets with QR/code input and in-app OTP preview.',
    icon: RiShieldKeyholeLine,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    href: '/vault/2fa'
  },
  {
    id: 'notes',
    title: 'Secure Notes',
    description: 'Text notes (e.g. bank info, license keys).',
    icon: RiFileTextLine,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    href: '/vault/notes'
  },
  {
    id: 'cards',
    title: 'Cards',
    description: 'Credit/debit card info with optional field masking (e.g. hide CVV).',
    icon: RiBankCardLine,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    href: '/vault/cards'
  },
  {
    id: 'bank-accounts',
    title: 'Bank Accounts',
    description: 'Account numbers, routing, IBAN, SWIFT, etc.',
    icon: RiBankLine,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/20',
    href: '/vault/bank-accounts'
  },
  {
    id: 'identities',
    title: 'Identities',
    description: 'Name, address, phone, national ID — for autofill.',
    icon: RiUserLine,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
    href: '/vault/identities'
  }
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [counts, setCounts] = useState<VaultCounts>({
    passwords: 0,
    emails: 0,
    twoFA: 0,
    notes: 0,
    cards: 0,
    bankAccounts: 0,
    identities: 0
  });
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [passwordsRes, emailsRes, twoFARes, notesRes, cardsRes, bankAccountsRes, identitiesRes] = await Promise.all([
          axiosSecure.get('/api/vault/passwords'),
          axiosSecure.get('/api/vault/emails'),
          axiosSecure.get('/api/vault/2fa'),
          axiosSecure.get('/api/vault/notes'),
          axiosSecure.get('/api/vault/cards'),
          axiosSecure.get('/api/vault/bank-accounts'),
          axiosSecure.get('/api/vault/identities')
        ]);

        setCounts({
          passwords: passwordsRes.data.items?.length || 0,
          emails: emailsRes.data.items?.length || 0,
          twoFA: twoFARes.data.items?.length || 0,
          notes: notesRes.data.items?.length || 0,
          cards: cardsRes.data.items?.length || 0,
          bankAccounts: bankAccountsRes.data.items?.length || 0,
          identities: identitiesRes.data.items?.length || 0
        });
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [axiosSecure]);

  const getCountForCategory = (categoryId: string): number => {
    switch (categoryId) {
      case 'passwords': return counts.passwords;
      case 'emails': return counts.emails;
      case '2fa': return counts.twoFA;
      case 'notes': return counts.notes;
      case 'cards': return counts.cards;
      case 'bank-accounts': return counts.bankAccounts;
      case 'identities': return counts.identities;
      default: return 0;
    }
  };

  const filteredCategories = vaultCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 overflow-hidden">
            <div className='relative left-10 lg:left-0'>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-sm md:text-base text-gray-400">Manage your secure vault items</p>
            </div>  
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <Card className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm font-medium">Total Items</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {loading ? '...' : totalItems}
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <RiLockLine className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
              </div>
            </Card>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <Card className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Categories</p>
                  <p className="text-3xl font-bold text-white">{vaultCategories.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <RiFileTextLine className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </Card>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <Card className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">2FA Enabled</p>
                  <p className="text-3xl font-bold text-white">
                    {loading ? '...' : counts.twoFA}
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <RiShieldKeyholeLine className="w-6 h-6 text-amber-400" />
                </div>
              </div>
            </Card>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-6 md:mb-8">
          <div className="relative max-w-full md:max-w-md">
            <TextField.Root
              placeholder="Search vault categories..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            >
             <TextField.Slot>
               <RiSearchLine className="size-4 text-gray-400" />
             </TextField.Slot>
            </TextField.Root>
          </div>
        </div>

        {/* Vault Categories */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6">Vault Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredCategories.map((category) => {
              const IconComponent = category.icon;
              const count = getCountForCategory(category.id);
              return (
                <Link key={category.id} href={category.href}>
                  <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group hover:scale-105 hover:border-gray-600/50 h-full">
                    <div className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className={`w-6 h-6 ${category.color}`} />
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-white">
                            {loading ? '...' : count}
                          </span>
                          <p className="text-xs text-gray-400">items</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white text-base md:text-lg group-hover:text-gray-100 transition-colors">
                          {category.title}
                        </p>
                        <RiArrowRightLine className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                        {category.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
  );
}