'use client';

import { Box, IconButton, TextField, Text, Tooltip, Button } from '@radix-ui/themes';
import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { IoEye, IoEyeOff, IoKey } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { useState } from 'react';
import Logo from '@/components/Logo/Logo';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
import toast from 'react-hot-toast';
import { validateRegisterForm } from '@/lib/validation/validateRegisterForm';
import { useAppDispatch } from '@/redux/hooks';
import { createUser } from '@/redux/authThunks';
import { setTokenInCookies } from '@/utils/setJwt';
import { generateEncryptedKey } from '@/lib/encryption/generateEncryptedKey';
import { decryptGeneratedKey } from '@/lib/decryption/decryptGeneratedKey';
import { setDecryptedVaultKey } from '@/redux/authSlice';
import { useRouter } from 'next/navigation';

type Inputs = {
  name: string
  email: string
  password: string
  masterKey: string
}

const SignUp = () => {

  const [visiblePass, setVisiblePass] = useState<"password" | "text">("password");
  const [visibleKey, setVisibleKey] = useState<"password" | "text">("password");
  const { register, handleSubmit } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    
    try {
      // if (!validateRegisterForm(data)) return;

      const masterPassword = data.masterKey;
      const { encryptedVaultKey, salt, iv } = await generateEncryptedKey(masterPassword);
      const decryptedVaultKey = await decryptGeneratedKey(salt, iv, encryptedVaultKey, masterPassword);
      dispatch(setDecryptedVaultKey(decryptedVaultKey));

      const testUser = {
        email: data.email,
        name: data.name,
        photo: '',
        password: data.password,
        salt,
        iv,
        encryptedVaultKey 
      };

      const user = await dispatch(createUser(testUser)).unwrap();
      if(user.email == data.email) {
        await setTokenInCookies({
         id: user.id!,
         email: user.email!,
         name: user.name!,
         photo: user.photo
        });
        router.replace('/');
      };
      
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      };
    }

  };

  return (
    <section className='flex justify-center items-center min-h-screen md:my-10 xl:my-0'>
        <form onSubmit={handleSubmit(onSubmit)} className='md:shadow-slate-500 md:shadow-sm md:rounded-xl' >
          <Box className='md:p-10 space-y-2  md:w-[500px]'>
            <Logo />
            
            {/* Name Field */}
            <Box>
              <Text as="label" size="2" mb="1" weight="bold">Full Name</Text>
              <TextField.Root {...register("name", { required: true })} placeholder="John Doe" size="3">
                <TextField.Slot>
                  <FaUser height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Box>
            
            {/* Email Field */}
            <Box>
              <Text as="label" size="2" mb="1" weight="bold">Email</Text>
              <TextField.Root {...register("email", { required: true })} placeholder="you@example.com" type='email' size="3">
                <TextField.Slot>
                  <MdEmail height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            {/* Password Field */}
            <Box>
              <Text as="label" size="2" mb="1" weight="bold">Password</Text>
              <TextField.Root {...register("password", { required: true })} placeholder="Create password" size="3" type={visiblePass}>
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
              <TextField.Root {...register("masterKey", { required: true })} placeholder="Create master key" size="3" type={visibleKey}>
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
            <div className='mt-5'>
              <Button style={{ width: '100%' }} type='submit' size='3' variant="classic" color='gray'>Sign up</Button>
            </div>
            

          </Box>

          <p className='text-center pt-5 md:pt-0 md:pb-5 italic md:text-[15px]'>Already have an account? <Link className='font-semibold underline text-blue-400' href={'/sign-in'}>Log in</Link></p>

        </form>
    </section>
  );
};

export default SignUp;
