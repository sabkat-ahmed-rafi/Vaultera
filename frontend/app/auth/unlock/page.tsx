"use client"

import Logo from '@/components/Logo/Logo';
import { decryptGeneratedKey } from 'cryptonism';
import { setDecryptedVaultKey } from '@/redux/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Box, Button, IconButton, Text, TextField } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
import { IoEye, IoEyeOff, IoKey } from 'react-icons/io5';

const Unlock = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const encodedRedirect = searchParams.get('redirect');
    const redirectedTo = encodedRedirect ? decodeURIComponent(encodedRedirect) : '/';

    const [visibleKey, setVisibleKey] = useState<"password" | "text">("password");
    const [masterPassword, setMasterPassword] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if(!user) {
          setLoading(false);
          return toast.error("Something went wrong");
        }

        const { salt, iv, encryptedVaultKey } = user;
        if (!salt || !iv || !encryptedVaultKey) {
           toast.error("Something went wrong");
           setLoading(false);
           return;
        };

        try {
          const decResult = await decryptGeneratedKey({ salt, iv, encryptedKey: encryptedVaultKey, password: masterPassword });
          if(decResult?.success) {
            dispatch(setDecryptedVaultKey(decResult.decryptedKey));
            router.replace(redirectedTo);
          } else {
            throw new Error(decResult?.error?.message || 'Failed to decrypt');
          }
        } catch (error) {
          setLoading(false);
          toast.error("Incorrect master password");
        }
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
              <TextField.Root onChange={(e) => setMasterPassword(e.target.value)} disabled={loading} placeholder="Enter master key" size="3" name='massterPassword' type={visibleKey}>
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
              <Button loading={loading} style={{ width: '100%' }} type='submit' size='3' variant="classic" color='gray'>Access Vault</Button>
            </div>
            
          </Box>

        </form>
    </section>
  )
}

export default Unlock