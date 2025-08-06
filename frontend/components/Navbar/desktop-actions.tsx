'use client';

import { User } from '@/types/User';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { HiLightningBolt } from 'react-icons/hi';
import SettingsMenu from './setting-menu';
import { SiOpenmediavault } from "react-icons/si";


type Props = {
  user: User | null;
};


export default function DesktopActions({ user }: Props) {
  return (
    <div className="hidden lg:flex items-center space-x-4">

      {
        user?.paid && <Link href={'/vault'}>
          <button
            className="group flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-white text-black shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/80 backdrop-blur-md"
          >
            <SiOpenmediavault className="text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-medium text-sm sm:text-base tracking-wide">Vault</span>
          </button>
        </Link>
      }

      { user && <SettingsMenu /> }

      {
        !user && <div className='flex space-x-4'>
        <Link href={'/sign-up'}>
          <Button variant="outline" color='gray' className='text-white'>Register</Button>
        </Link>
        <Link href={'/sign-in'}>
          <Button variant="outline" color='gray' className='text-white'>Login</Button>
        </Link>
        </div>
      }

      {
        !user?.paid && <Link href={'/pricing'} className="relative group px-8 py-4 bg-white text-black font-bold rounded-2xl overflow-hidden shadow-2xl hover:shadow-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
        <span className="relative z-10 flex items-center space-x-2">
          <HiLightningBolt className="w-5 h-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
          <span>Plans</span>
        </span>
        <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </Link>
      }
    </div>
  );
}