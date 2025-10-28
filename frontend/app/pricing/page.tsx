'use client'

import React from 'react'
import { Card, Button, Box, Flex, Text, Badge, Separator } from '@radix-ui/themes'
import { RiShieldKeyholeLine, RiVipCrown2Line, RiShieldLine, RiKeyLine, RiFileTextLine, RiUserLine, RiBankCardLine, RiBankLine, RiMailLine } from 'react-icons/ri'
import { useAppSelector } from '@/redux/hooks'
import toast from 'react-hot-toast'
import useAxiosSecure from '@/hooks/useAxiosSecure'

const features: Array<{ icon: React.ReactNode; label: string }> = [
  { icon: <RiShieldLine className="text-green-400" />, label: 'Client-side vault encryption (master key stays local)' },
  { icon: <RiKeyLine className="text-green-400" />, label: 'Passwords manager' },
  { icon: <RiMailLine className="text-green-400" />, label: 'Emails / usernames' },
  { icon: <RiShieldKeyholeLine className="text-green-400" />, label: 'TOTP 2FA accounts' },
  { icon: <RiFileTextLine className="text-green-400" />, label: 'Secure notes' },
  { icon: <RiUserLine className="text-green-400" />, label: 'Identities' },
  { icon: <RiBankCardLine className="text-green-400" />, label: 'Cards' },
  { icon: <RiBankLine className="text-green-400" />, label: 'Bank accounts' },
]

const Pricing: React.FC = () => {

  const { user } = useAppSelector(state => state.auth)
  const axisoSecure = useAxiosSecure()
  

  const startCheckout = async (type: 'subscription' | 'lifetime') => {
    try {
      const res = await axisoSecure.post(`/api/paddle/checkout/${type}`)
      const url = res.data?.url
      if(url) {
        window.location.href = url
      } else {
        toast.error('Unable to start checkout')
      }
    } catch (_) {
      toast.error('Something went wrong')
    }
  }

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        {/* Header (aligned with other routes) */}
        <div className='mb-8 md:mb-10'>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center ">
              <RiShieldKeyholeLine className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Pricing</h1>
              <p className="text-gray-400">Choose subscription or one‑time — your vault, your way.</p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Pro subscription */}
          <div className="group relative rounded-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition" />
            <Card className="bg-gray-800/60 border-gray-700/60 hover:border-gray-600 transition-all rounded-2xl">
              <Box p="5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <RiShieldKeyholeLine className="text-blue-400 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold">Pro</h3>
                      <p className="text-gray-400 text-sm">Everything you need, unlimited.</p>
                  </div>
                </div>
                  <Badge color="blue" variant="soft">Most popular</Badge>
              </div>

              <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-white">$1</span>
                  <span className="text-gray-400 mb-1">/month</span>
              </div>

              <Separator my="4" size="4" className="bg-gray-700/60" />

              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={String(f.label)} className="flex items-center gap-2 text-gray-300 text-sm">
                    {f.icon}
                    {f.label}
                  </li>
                ))}
              </ul>

              <Flex mt="5" gap="3">
                  <Button size="3" className="!cursor-pointer" style={{ width: '100%', backgroundColor: 'white', color: 'black' }} onClick={() => startCheckout('subscription')}>
                    Subscribe now
                  </Button>
              </Flex>
              <p className="text-gray-500 text-xs mt-2">Cancel anytime. Secured payments.</p>
              </Box>
            </Card>
          </div>

          {/* Lifetime */}
          <div className="group relative rounded-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-400/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition" />
            <Card className="bg-gray-800/60 border-gray-700/60 hover:border-gray-600 transition-all rounded-2xl">
              <Box p="5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <RiVipCrown2Line className="text-purple-300 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold">Lifetime</h3>
                    <p className="text-gray-400 text-sm">One payment. Yours forever.</p>
                  </div>
                </div>
                <Badge color="purple" variant="soft">Best value</Badge>
              </div>

              <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-white">$40</span>
                  <span className="text-gray-400 mb-1">one‑time</span>
              </div>

              <Separator my="4" size="4" className="bg-gray-700/60" />

              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={String(f.label)} className="flex items-center gap-2 text-gray-300 text-sm">
                    {f.icon}
                    {f.label}
                  </li>
                ))}
              </ul>

              <Flex mt="5" gap="3">
                  <Button size="3" className="!cursor-pointer" color="purple" style={{ width: '100%', backgroundColor: 'white', color: 'black' }} onClick={() => startCheckout('lifetime')}>
                    Get lifetime access
                  </Button>
              </Flex>
              <p className="text-gray-500 text-xs mt-2">Includes all future updates.</p>
              </Box>
            </Card>
          </div>
        </div>

        {/* FAQ / Trust */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <Card className="bg-gray-800/60 border-gray-700/60">
            <Box p="4">
              <Text weight="bold" className="text-white">Private by design</Text>
              <Text className="text-gray-400 block mt-1">Zero‑knowledge encryption keeps your data only in your hands.</Text>
            </Box>
          </Card>
          <Card className="bg-gray-800/60 border-gray-700/60">
            <Box p="4">
              <Text weight="bold" className="text-white">Cancel anytime</Text>
              <Text className="text-gray-400 block mt-1">No contracts. Manage your plan from settings with one click.</Text>
            </Box>
          </Card>
          <Card className="bg-gray-800/60 border-gray-700/60">
            <Box p="4">
              <Text weight="bold" className="text-white">Secure payments</Text>
              <Text className="text-gray-400 block mt-1">Processed by your payment provider over HTTPS.</Text>
            </Box>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Pricing


