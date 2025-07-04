import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { AuthUserData, UpdateUserPayload } from "@/types/User";
import { mapFirebaseUser } from "@/utils/mapUser";
import { AuthPayload } from "@/types/Auth";


// Create a user
export const createUser = createAsyncThunk<AuthUserData | void, AuthPayload>(
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

export const updateUser = createAsyncThunk<AuthUserData, UpdateUserPayload>(
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

export const loginUser = createAsyncThunk<AuthUserData | void, AuthPayload>(
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