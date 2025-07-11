import { JwtUser } from "@/types/JwtUser";
import axios from "axios";

export const setTokenInCookies = async (user: JwtUser) => {
    try{
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/set-jwt`, user);
    } catch(error) {
        throw new Error("Failed to set JWT cookie");
    }
};