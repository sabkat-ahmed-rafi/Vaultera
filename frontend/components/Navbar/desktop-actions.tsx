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
        user && <Link href={'/vault'}>
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

    </div>
  );
}