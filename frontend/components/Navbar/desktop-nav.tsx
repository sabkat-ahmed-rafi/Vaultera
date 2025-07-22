'use client';

import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HiChevronDown } from 'react-icons/hi';
import { navigation } from './data';

export default function DesktopNav() {
  return (
    <NavigationMenu.Root className="hidden lg:flex">
      <NavigationMenu.List className="flex items-center space-x-1">
        {navigation.map((item) => (
          // If item have sub-menu
          <NavigationMenu.Item key={item.name}>
            {item.submenu ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="group relative flex items-center space-x-2 px-6 py-4 text-white hover:text-gray-200 font-semibold transition-all duration-300 rounded-2xl hover:bg-white/10 overflow-hidden">
                    <span className="relative z-10">{item.name}</span>
                    <HiChevronDown className="w-4 h-4 group-hover:rotate-180 transition-all duration-300" />
                    <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-2xl"></div>
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[300px] bg-black/95 backdrop-blur-2xl rounded-3xl p-3 shadow-2xl border border-white/10 animate-in slide-in-from-top-3 duration-500"
                    sideOffset={12}
                  >
                    {item.submenu.map((subItem, index) => (
                      <DropdownMenu.Item key={subItem.name} asChild>
                        <Link
                          href={subItem.href}
                          className="flex items-center px-5 py-4 rounded-2xl text-white hover:text-gray-200 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                          style={{
                            animationDelay: `${index * 100}ms`,
                          }}
                        >
                          <span className="font-semibold">{subItem.name}</span>
                        </Link>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              // If item don't have any sub-menu
              <NavigationMenu.Link asChild>
                <Link
                  href={item.href}
                  className="group relative flex items-center xl:px-6 px-2 py-2.5 text-white hover:text-gray-200 font-semibold transition-all duration-300 rounded-[2px] hover:bg-white/10 overflow-hidden"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-[2px]"></div>
                </Link>
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}