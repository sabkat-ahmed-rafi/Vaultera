'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { HiMenu, HiX } from 'react-icons/hi';
import { cn } from '@/lib/clsx/clsx';

interface MobileToggleProps {
  isOpen: boolean;
}

export default function MobileToggle({ isOpen }: MobileToggleProps) {
  return (
    <Dialog.Trigger asChild>
      <button className="lg:hidden relative w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 group">
        <div className="relative w-6 h-6">
          <HiMenu
            className={cn(
              'absolute inset-0 w-6 h-6 text-white transition-all duration-500 group-hover:scale-110',
              isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
            )}
          />
          <HiX
            className={cn(
              'absolute inset-0 w-6 h-6 text-white transition-all duration-500 group-hover:scale-110',
              isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
            )}
          />
        </div>
      </button>
    </Dialog.Trigger>
  );
}