import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types/User";
import { mapUser } from "@/utils/mapUser";
import axios from "axios";



interface CreateUserPayload {
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

interface UpdateUserPayload {
  name?: string | null;
  photo?: string | null;
}

// Create a user
export const createUser = createAsyncThunk<User, CreateUserPayload>(
  "auth/createUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/sign-up", payload);
      return mapUser(res.data); 
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error?.response?.data || "Registration failed");
    }
  }
);


export const loginUser = createAsyncThunk<User, LoginPayload>(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/sign-in", payload);
      return mapUser(res.data); 
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Failed to login");
    }
  }
);

export const updateUser = createAsyncThunk<User , UpdateUserPayload>(
  "auth/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put("/api/update-user", payload);
      return mapUser(res.data);
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Failed to update user");
    }
  }
);

export const logout = createAsyncThunk<void>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/logout");
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Failed to logout");
    }
  }
);