import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types/User";
import { mapUser } from "@/utils/mapUser";
import axios from "axios";
import { setLoading } from "./authSlice";
import { config } from "@/config/config";

const backendUrl = config.backend;

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
      const res = await axios.post(`${backendUrl}/api/auth/sign-up`, payload);
      return mapUser(res.data.newUser); 
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Registration failed");
    }
  }
);


export const loginUser = createAsyncThunk<User, LoginPayload>(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/sign-in`, payload);
      return mapUser(res.data.user); 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to login");
    }
  }
);

export const updateUser = createAsyncThunk<User , UpdateUserPayload>(
  "auth/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${backendUrl}/api/auth/update-user`, payload);
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
      await axios.post(`${backendUrl}/api/auth/remove-jwt`);
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Failed to logout");
    }
  }
);


export const checkAuthSession = createAsyncThunk<User | null>(
  "auth/checkAuthSession",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`${backendUrl}/api/auth/session`, {
        withCredentials: true
      });
      if(res.data.user) {
        dispatch(setLoading(false));
      }
      return mapUser(res.data.user);
    } catch (error) {
      dispatch(setLoading(false));
      return null;
    }
  }
);
