import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/authThunks";
import { toast } from "react-hot-toast";


export const axiosSecure = axios.create({
    baseURL: process.env.NEXT_PUBLIC_user_service,
    withCredentials: true,
});


const useAxiosSecure = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const interceptorRef = useRef<number | null>(null);
    const toastShownRef = useRef(false); 

    useEffect(() => {
        // Request interceptor to attach the token
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Existing response interceptor setup
        if(!interceptorRef.current) {
            interceptorRef.current = axiosSecure.interceptors.response.use(
                (response) => response,
                async (error) => {
                    const status = error.response?.status;
                    const message = error.response?.data?.error || "Unknown Error";
                    console.log(error)
                    if(status == 401 && message == "sessionExpired") {
                        if (!toastShownRef.current) {
                            toastShownRef.current = true;
                            toast.error("Your session has expired");
                            await dispatch(logout()).unwrap();
                            router.push("/signin");
                            setTimeout(() => {
                                toastShownRef.current = false;
                            }, 3000); 
                        }
                    } else if (status == 403) {
                        console.log("Access denied");
                    }
                    return Promise.reject(error);
                }
            );
        }

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            if(interceptorRef.current !== null) {
                axiosSecure.interceptors.response.eject(interceptorRef.current);
                interceptorRef.current = null;
            }
        }

    }, [router]);

    return axiosSecure;
}

export default useAxiosSecure