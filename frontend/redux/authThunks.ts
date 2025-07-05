import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { User } from "@/types/User";
import { mapFirebaseUser } from "@/utils/mapUser";


export interface AuthPayload {
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  name?: string | null;
}

// Create a user
export const createUser = createAsyncThunk<User | void, AuthPayload>(
  "auth/createUser",
  async ({ email, password }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      return mapFirebaseUser(user);
    } catch (error) {
      console.log(error)
    }
  }
);

export const updateUser = createAsyncThunk<User, UpdateUserPayload>(
  "auth/updateUser",
  async ({ name = null}) => {
    const updateData: { displayName?: string | null } = {};

    if (name) updateData.displayName = name;

    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No authenticated user found.");
    }
    await updateProfile(currentUser, updateData);

    return {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName,
    };
  }
);

export const loginUser = createAsyncThunk<User | void, AuthPayload>(
  "auth/loginUser",
  async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return mapFirebaseUser(user);
    } catch (error) {
      if (error) {
        console.log(error)
      }
    }
  }
);

export const logout = createAsyncThunk<void>(
  "auth/logout",
  async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }
);