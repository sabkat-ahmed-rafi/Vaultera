import { Spinner } from '@radix-ui/themes'
import React from 'react'

type LoadingSpinnerProps = {
  size: string;
}

const LoadingSpinner = ({ size }: LoadingSpinnerProps) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <Spinner className={`scale-[${size}]`}/>
    </div>
  )
}

export default LoadingSpinner