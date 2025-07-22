'use client';

import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/clsx/clsx';
import DesktopNav from './desktop-nav';
import DesktopActions from './desktop-actions';
import MobileToggle from './mobile-toggle';
import MobileMenu from './mobile-menu';
import Logo from '../Logo/Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out py-3',
        isScrolled
          ? 'bg-[#101211]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-white/5'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <DesktopNav />
          <DesktopActions />
          
          <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <MobileToggle isOpen={isMobileMenuOpen} />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
          </Dialog.Root>
        </div>
      </div>
    </nav>
  );
}