'use client';

import { useState } from 'react';
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

const vaultCategories = [
  {
    id: 'passwords',
    title: 'Passwords',
    description: 'Website/app/Wi-Fi passwords.',
    icon: RiKeyLine,
    count: 23,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    href: '/vault/passwords'
  },
  {
    id: 'emails',
    title: 'Emails/Usernames',
    description: 'Login identities if separate from passwords.',
    icon: RiMailLine,
    count: 8,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    href: '/emails'
  },
  {
    id: '2fa',
    title: '2FA (TOTP)',
    description: 'Time-based OTP secrets with QR/code input and in-app OTP preview.',
    icon: RiShieldKeyholeLine,
    count: 12,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    href: '/2fa'
  },
  {
    id: 'notes',
    title: 'Secure Notes',
    description: 'Text notes (e.g. bank info, license keys).',
    icon: RiFileTextLine,
    count: 5,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    href: '/notes'
  },
  {
    id: 'cards',
    title: 'Cards',
    description: 'Credit/debit card info with optional field masking (e.g. hide CVV).',
    icon: RiBankCardLine,
    count: 4,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    href: '/cards'
  },
  {
    id: 'bank-accounts',
    title: 'Bank Accounts',
    description: 'Account numbers, routing, IBAN, SWIFT, etc.',
    icon: RiBankLine,
    count: 3,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/20',
    href: '/bank-accounts'
  },
  {
    id: 'identities',
    title: 'Identities',
    description: 'Name, address, phone, national ID — for autofill.',
    icon: RiUserLine,
    count: 2,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
    href: '/identities'
  }
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = vaultCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = vaultCategories.reduce((sum, category) => sum + category.count, 0);

  return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                  <p className="text-2xl md:text-3xl font-bold text-white">{totalItems}</p>
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
                  <p className="text-3xl font-bold text-white">12</p>
                </div>
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <RiShieldKeyholeLine className="w-6 h-6 text-amber-400" />
                </div>
              </div>
            </Card>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <Card className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Security Score</p>
                  <p className="text-3xl font-bold text-white">87%</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <RiEyeLine className="w-6 h-6 text-purple-400" />
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
              return (
                <Link key={category.id} href={category.href}>
                  <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group hover:scale-105 hover:border-gray-600/50 h-full">
                    <div className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className={`w-6 h-6 ${category.color}`} />
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-white">{category.count}</span>
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

        {/* Recent Activity */}
        <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
          <div>
            <p className="text-white text-base md:text-lg">Recent Activity</p>
          </div>
          <div className="p-4 md:p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/30">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <RiKeyLine className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Added new password for GitHub</p>
                  <p className="text-gray-400 text-xs">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/30">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <RiShieldKeyholeLine className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Updated 2FA for Google account</p>
                  <p className="text-gray-400 text-xs">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/30">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <RiBankCardLine className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Added new credit card</p>
                  <p className="text-gray-400 text-xs">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
  );
}