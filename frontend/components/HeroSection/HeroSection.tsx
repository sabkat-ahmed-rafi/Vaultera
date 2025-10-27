'use client'

import Link from 'next/link'
import React from 'react'
import { useAppSelector } from '@/redux/hooks'

const HeroSection = () => {

  const {user} = useAppSelector(state => state.auth);
  
  return (
    <>
      <section className="md:pt-48 pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 px-10">
                Take Control of Your Privacy with{' '}
                <span className="text-gray-300">
                  Vaultera
                </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
              Vaultera is your end-to-end encrypted password manager — built to 
              protect your sensitive data with zero-knowledge architecture. Your passwords, 
              only accessible to you.
            </p>
            <Link href={!user ? '/sign-in' : '/vault'} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:border-white/40 hover:bg-white/10 transition-all duration-200">
                How It Works
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection