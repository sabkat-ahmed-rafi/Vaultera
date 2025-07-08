import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types/User";
import { mapUser } from "@/utils/mapUser";



export interface CreateUserPayload {
  email: string;
  name: string;
  photo: string;
  password: string;
  salt: string;              // base64
  iv: string;                // base64
  encryptedVaultKey: string; // base64
}

interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  name?: string | null;
  photo?: string | null;
}

// Create a user
export const createUser = createAsyncThunk<void , CreateUserPayload>(
  "auth/createUser",
  async ({ email, name, photo, password, salt, iv, encryptedVaultKey }) => {
    try {
            
    } catch (error) {
      console.log(error)
    }
  }
);


export const loginUser = createAsyncThunk<void, LoginPayload>(
  "auth/loginUser",
  async ({ email, password }) => {
    try {
      
    } catch (error) {
        console.log(error)

    }
  }
);

export const updateUser = createAsyncThunk<void , UpdateUserPayload>(
  "auth/updateUser",
  async ({ name = null, photo = null}) => {
    
  }
);

export const logout = createAsyncThunk<void>(
  "auth/logout",
  async () => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  }
);