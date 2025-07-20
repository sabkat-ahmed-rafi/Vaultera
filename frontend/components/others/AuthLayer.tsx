'use client'

import { checkAuthSession } from '@/redux/authThunks';
import { useAppDispatch } from '@/redux/hooks'
import React, { useEffect } from 'react'
import MasterPasswordGuard from './MasterPasswordGuard';

const AuthLayer = ( { children }: Readonly<{ children: React.ReactNode }> ) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthSession());
  }, [dispatch])

  return (
    <>
     <MasterPasswordGuard>
      {children}
     </MasterPasswordGuard>
    </>
  )
}

export default AuthLayer