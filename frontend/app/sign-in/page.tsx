'use client';

import { Box, IconButton, TextField, Text, Tooltip, Button } from '@radix-ui/themes';
import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { IoEye, IoEyeOff, IoKey } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import { useState } from 'react';
import Logo from '@/components/Logo/Logo';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
import { validateLoginForm } from '@/lib/validation/validateLoginForm';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginUser } from '@/redux/authThunks';
import toast from 'react-hot-toast';
import { setTokenInCookies } from '@/utils/setJwt';
import axios from 'axios';
import { config } from '@/config/config';
import { decryptGeneratedKey } from '@/lib/decryption/decryptGeneratedKey';
import { useRouter } from 'next/navigation';
import { setDecryptedVaultKey } from '@/redux/authSlice';


type Inputs = {
  email: string
  password: string
  masterKey: string
}

const SignIn = () => {
  const [visiblePass, setVisiblePass] = useState<"password" | "text">("password");
  const [visibleKey, setVisibleKey] = useState<"password" | "text">("password");
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    
    try {
      setLoading(true);
      // if(!validateLoginForm(data)) {
      // setLoading(false);
      // return;
      // };

      const email = data.email;
      const password = data.password;
      const masterPassword = data.masterKey;

      const fetchedUser = await axios.get(`${config.backend}/api/auth/users/${email}/vault-key-info`);
      
      if(fetchedUser.data.vaultKeyInfo) {
        const { salt, iv, encryptedVaultKey } = fetchedUser.data.vaultKeyInfo;
        const decryptedVaultKey = await decryptGeneratedKey(salt, iv, encryptedVaultKey, masterPassword);
        dispatch(setDecryptedVaultKey(decryptedVaultKey));
      };

      const testUser = { email, password };

      const user = await dispatch(loginUser(testUser)).unwrap();

      if(user.email == email) {
        await setTokenInCookies({
         id: user.id!,
         email: user.email!,
         name: user.name!,
         photo: user.photo
        });
        router.replace('/');
      };
      
    } catch (error: any) {
      setLoading(false);
      if(error.status == 401) return toast.error("Something went wrong")
      toast.error("Invalid Credentials");
    }

  };

  return (
    <section className='flex justify-center items-center min-h-screen md:my-10 xl:my-0'>
        <form onSubmit={handleSubmit(onSubmit)} className='md:shadow-slate-500 md:shadow-sm md:rounded-xl' >
          <Box className='md:p-10 space-y-2  md:w-[500px]'>
            <Logo />

            {/* Email Field */}
            <Box>
              <Text as="label" size="2" mb="1" weight="bold">Email</Text>
              <TextField.Root {...register("email", { required: true })} disabled={loading} placeholder="you@example.com" type='email' size="3">
                <TextField.Slot>
                  <MdEmail height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            {/* Password Field */}
            <Box>
              <Text as="label" size="2" mb="1" weight="bold">Password</Text>
              <TextField.Root {...register("password", { required: true })} disabled={loading} placeholder="Enter password" size="3" type={visiblePass}>
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
                <Tooltip content={
                  <span className='inline-block text-center'>
                    Forgot your Master Key? Email us at{' '}
                    <Link className='text-blue-600 hover:underline' href={"https://www.linkedin.com/in/sabkat-ahmed-rafi"}>support@vaultera.com</Link> to delete your account — recovery isn’t possible.
                  </span>
                }>
                  <IoIosInformationCircle size={12} />
                </Tooltip>
              </Text>
              <TextField.Root {...register("masterKey", { required: true })} disabled={loading} placeholder="Enter master key" size="3" type={visibleKey}>
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
              <Button style={{ width: '100%' }} loading={loading} type='submit' size='3' variant="classic" color='gray'>Log in</Button>
            </div>
            

          </Box>

          <p className='text-center pt-5 md:pt-0 md:pb-5 italic md:text-[15px]'>Don't have an account? <Link className='text-blue-400 underline font-semibold' href={'/sign-up'}>Create one</Link></p>

        </form>
    </section>
  );
};

export default SignIn;
