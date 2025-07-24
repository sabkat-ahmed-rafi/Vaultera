import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React from 'react'
import { HiCog, HiGlobe, HiUser } from 'react-icons/hi'

const SettingsMenu = () => {
  return (
    <>
        <div>
            <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="p-4 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 group">
                        <HiCog className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="min-w-[220px] bg-[#101211] backdrop-blur-2xl rounded-3xl p-3 shadow-2xl border border-white/10 animate-in slide-in-from-top-3 duration-500 z-[60]"
                        sideOffset={12}
                        align="end"
                      >
                        <DropdownMenu.Item className="flex items-center space-x-3 px-5 py-4 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 cursor-pointer">
                          <HiUser className="w-5 h-5" />
                          <span className="font-semibold">Profile</span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="flex items-center space-x-3 px-5 py-4 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 cursor-pointer">
                          <HiCog className="w-5 h-5" />
                          <span className="font-semibold">Settings</span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="h-px bg-white/10 my-2" />
                        <DropdownMenu.Item className="flex items-center space-x-3 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all duration-300 cursor-pointer">
                          <HiGlobe className="w-5 h-5" />
                          <span className="font-semibold">Sign Out</span>
                        </DropdownMenu.Item>
                       </DropdownMenu.Content>
                    </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    </>
  )
}

export default SettingsMenu