'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  RiKeyLine,
  RiMailLine,
  RiShieldKeyholeLine,
  RiFileTextLine,
  RiBankCardLine,
  RiBankLine,
  RiUserLine,
  RiDashboardLine,
  RiMenuLine,
  RiCloseLine,
  RiSettingsLine,
  RiLogoutBoxLine
} from 'react-icons/ri';
import { cn } from '@/lib/clsx/clsx';
import Logo from '@/components/Logo/Logo';
import { logout } from '@/redux/authThunks';
import { useAppDispatch } from '@/redux/hooks';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/vault',
    icon: RiDashboardLine,
  },
  {
    title: 'Passwords',
    href: '/vault/passwords',
    icon: RiKeyLine,
  },
  {
    title: 'Emails/Usernames',
    href: '/vault/emails',
    icon: RiMailLine,
  },
  {
    title: '2FA (TOTP)',
    href: '/vault/2fa',
    icon: RiShieldKeyholeLine,
  },
  {
    title: 'Secure Notes',
    href: '/vault/notes',
    icon: RiFileTextLine,
  },
  {
    title: 'Cards',
    href: '/vault/cards',
    icon: RiBankCardLine,
  },
  {
    title: 'Bank Accounts',
    href: '/vault/bank-accounts',
    icon: RiBankLine,
  },
  {
    title: 'Identities',
    href: '/vault/identities',
    icon: RiUserLine,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const signOut = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-6 left-4 z-50 flex md:hidden backdrop-blur-sm text-white hover:bg-gray-700/80 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <RiCloseLine className="size-7" /> : <RiMenuLine className="size-7" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-72 backdrop-blur-sm border-r border-gray-700/50 transform transition-transform duration-300 ease-in-out overflow-auto lg:overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:sticky md:z-auto"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <Logo />

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gray-800/50 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    )}
                  >
                    <Icon className="size-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="space-y-2">
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                <RiSettingsLine className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              <button onClick={signOut} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 w-full">
                <RiLogoutBoxLine className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}