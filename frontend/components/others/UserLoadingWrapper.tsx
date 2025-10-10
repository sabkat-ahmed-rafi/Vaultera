'use client';

import React from 'react'
import { useAppSelector } from '@/redux/hooks';

const UserLoadingWrapper = ( {children}: Readonly<{ children: React.ReactNode }> ) => {

    const { loading } = useAppSelector(state => state.auth);

    if(loading) return <div className='text-4xl flex justify-center items-center w-full h-screen font-semibold italic'>Loading...</div>

  return (
    <div>
      {children}
    </div>
  )
}

export default UserLoadingWrapper