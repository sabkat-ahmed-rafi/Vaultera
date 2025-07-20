"use client"

import Logo from '@/components/Logo/Logo';
import { Box, Button, IconButton, Text, TextField } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { IoEye, IoEyeOff, IoKey } from 'react-icons/io5';

const Unlock = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const encodedRedirect = searchParams.get('redirect');
    const redirectedTo = encodedRedirect ? decodeURIComponent(encodedRedirect) : '/';

    const [visibleKey, setVisibleKey] = useState<"password" | "text">("password");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

  return (
    <section className='flex justify-evenly items-center min-h-screen xl:my-0'>
        <form onSubmit={handleSubmit} className='md:shadow-slate-500 md:shadow-sm md:rounded-xl' >
          <Box className='md:p-10 space-y-2 md:w-[500px]'>
          <Logo />
            <h1 className='text-center md:text-2xl text-xl pb-8'>Enter Master Password</h1>
            {/* Master Key Field */}
            <Box>
              <Text as="label" size="2" mb="1" weight="bold" className='flex items-center space-x-1'>
                <p>Master Key</p> 
              </Text>
              <TextField.Root placeholder="Enter master key" size="3" type={visibleKey}>
                <TextField.Slot>
                  <IoKey height="16" width="16" />
                </TextField.Slot>
                <TextField.Slot pr="3">
                  <IconButton
                    onClick={() => setVisibleKey(visibleKey === 'text' ? 'password' : 'text')}
                    size="2"
                    variant="ghost"
                    color="gray"
                    type="button"
                  >
                    {visibleKey === 'text' ? (
                      <IoEyeOff height="16" width="16" />
                    ) : (
                      <IoEye height="16" width="16" />
                    )}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
            </Box>

            {/* Form submit button */}
            <div className='mt-5 w-full'>
              <Button style={{ width: '100%' }} type='submit' size='3' variant="classic" color='gray'>Access Vault</Button>
            </div>
            
          </Box>

        </form>
    </section>
  )
}

export default Unlock