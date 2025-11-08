import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    frontend: process.env.FRONTEND,
    jwt_secret: process.env.JWT_SECRET, 

};