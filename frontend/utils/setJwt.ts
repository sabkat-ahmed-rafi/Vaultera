import { config } from "@/config/config";
import { JwtUser } from "@/types/JwtUser";
import axios from "axios";

export const setTokenInCookies = async (user: JwtUser) => {
    try{
        await axios.post(`${config.backend}/api/auth/set-jwt`, user, { withCredentials: true });
    } catch(error) {
        throw new Error("Failed to set JWT cookie");
    }
};