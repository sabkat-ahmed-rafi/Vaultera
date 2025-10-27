'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks';



const PrivateRoute = ( { children }: Readonly<{ children: React.ReactNode }> ) => {
    
    const {user, loading} = useAppSelector(state => state.auth);
    const router = useRouter();
    
    useEffect(() => {
        if (!loading && !user) {
            router.push('/sign-in');
        };

        if (user && !user?.paid) {
            router.push('/pricing');
        };

    }, [loading, user, router]);


        if(loading) {  
            return (
                <div className="flex items-center justify-center h-screen w-screen text-white bg-black text-2xl">
                  Loading...
                </div>
            )
        }

    
    
    if(user && user?.paid) return <>{children}</>

}

export default PrivateRoute