'use client';

import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { HiX, HiLightningBolt, HiStar } from 'react-icons/hi';
import { FaRocket } from 'react-icons/fa';
import { navigation, socialLinks } from './data';
import Logo from '../Logo/Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-500" />
      <Dialog.Content className="fixed top-0 right-0 h-full w-full max-w-md bg-[#101211]/95 backdrop-blur-2xl shadow-2xl z-50 animate-in slide-in-from-right duration-700 ease-out border-l border-white/10">
      <Dialog.Title className="sr-only">Mobile Navigation Menu</Dialog.Title>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Dialog.Title asChild>
              <Logo />
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group">
                <HiX className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </Dialog.Close>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 py-8 overflow-y-auto">
            <div className="space-y-3 px-6">
              {navigation.map((item, index) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div className="space-y-3">
                      <div className="flex items-center px-5 py-5 rounded-3xl text-white font-bold text-lg">
                        <span>{item.name}</span>
                      </div>
                      <div className="ml-8 space-y-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={onClose}
                            className="flex items-center px-5 py-4 rounded-2xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group animate-in slide-in-from-right"
                            style={{
                              animationDelay: `${(index * 100) + (subIndex * 50)}ms`,
                            }}
                          >
                            <span className="font-semibold">{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center px-5 py-5 rounded-3xl text-white hover:bg-white/10 transition-all duration-500 transform hover:translate-x-2 animate-in slide-in-from-right"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">{item.name}</span>
                        <span className="text-sm text-gray-400">{item.description}</span>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile plan button */}
            <div className="px-6 mt-10">
             <Link href={'/pricing'}>
              <button className="w-full relative group px-8 py-5 bg-white text-black font-bold rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-700">
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <HiLightningBolt className="w-6 h-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                  <span className="text-lg">Plan</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
             </Link>
            </div>

            {/* Social Links */}
            <div className="px-6 mt-10">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 animate-in zoom-in"
                    style={{
                      animationDelay: `${800 + (index * 100)}ms`,
                    }}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400 font-semibold">
                © 2025 Keynism
              </p>
              <div className="flex items-center space-x-2">
                <HiStar className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white">Premium</span>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}