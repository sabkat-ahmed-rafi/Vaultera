'use client'

import { checkAuthSession } from '@/redux/authThunks';
import { useAppDispatch } from '@/redux/hooks'
import React, { useEffect } from 'react'

const AuthLayer = ( { children }: Readonly<{ children: React.ReactNode }> ) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthSession());
  }, [dispatch])

  return <>{children}</>
}

export default AuthLayer