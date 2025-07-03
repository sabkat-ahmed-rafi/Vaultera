import { Spinner } from '@radix-ui/themes'
import React from 'react'

const LoadingWave = (size: String) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <Spinner className={`scale-[${size}]`}/>
        <h1></h1>
    </div>
  )
}

export default LoadingWave