'use client';

import { Box, IconButton, TextField, Text, Tooltip, Button } from '@radix-ui/themes';
import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { IoEye, IoEyeOff, IoKey } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { useState } from 'react';
import Logo from '@/components/Logo/Logo';

const Page = () => {
  const [visiblePass, setVisiblePass] = useState<"password" | "text">("password");
  const [visibleKey, setVisibleKey] = useState<"password" | "text">("password");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className='flex justify-center items-center min-h-screen md:my-10 xl:my-0'>
        <form onSubmit={handleRegister} className='md:shadow-slate-500 md:shadow-sm md:rounded-xl' >
          <Box className='md:p-10 space-y-2  md:w-[500px]'>
            <Logo />
            
            {/* Name Field */}
            <Box>
              <Text as="label" size="2" mb="1" weight="bold">Full Name</Text>
              <TextField.Root placeholder="John Doe" size="3">
                <TextField.Slot>
                  <FaUser height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            {/* Email Field */}
            <Box>
              <Text as="label" size="2" mb="1" weight="bold">Email</Text>
              <TextField.Root placeholder="you@example.com" size="3">
                <TextField.Slot>
                  <MdEmail height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            {/* Password Field */}
            <Box>
              <Text as="label" size="2" mb="1" weight="bold">Password</Text>
              <TextField.Root placeholder="Create password" size="3" type={visiblePass}>
                <TextField.Slot>
                  <RiLock2Fill height="16" width="16" />
                </TextField.Slot>
                <TextField.Slot pr="3">
                  <IconButton
                    onClick={() => setVisiblePass(visiblePass === 'text' ? 'password' : 'text')}
                    size="2"
                    variant="ghost"
                    color="gray"
                    type="button"
                  >
                    {visiblePass === 'text' ? (
                      <IoEyeOff height="16" width="16" />
                    ) : (
                      <IoEye height="16" width="16" />
                    )}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
            </Box>

            {/* Master Key Field */}
            <Box>
              <Text as="label" size="2" mb="1" weight="bold" className='flex items-center space-x-1'>
                <p>Master Key</p> 
                <Tooltip content="This encrypts your vault. We can't recover it if lost">
                  <IoIosInformationCircle size={12} />
                </Tooltip>
              </Text>
              <TextField.Root placeholder="Create master key" size="3" type={visibleKey}>
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

            <div className='mt-5 flex md:justify-end'>
              <Button type='submit' size='2' variant="classic" color='gray' highContrast>Sign up</Button>
            </div>
            

          </Box>

          <p className='text-center pt-5 md:pt-0 md:pb-5 italic md:text-[15px]'>Already have an account? Login</p>

        </form>
    </section>
  );
};

export default Page;
