'use client';

import React from 'react'
import { useAppSelector } from '@/redux/hooks';

const UserLoadingWrapper = ( {children}: Readonly<{ children: React.ReactNode }> ) => {

    const { user } = useAppSelector(state => state.auth);

    if(!user) return <div className='text-4xl flex justify-center items-center w-full h-screen font-semibold italic'>Loading...</div>

  return (
    <div>
      {children}
    </div>
  )
}

export default UserLoadingWrapper