import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkAuthSession, createUser, loginUser, logout, updateUser } from "./authThunks";
import { User } from "@/types/User";



interface AuthState {
  user: User | null;
  decryptedVaultKey: Uint8Array | null;
  loading: boolean;
}

const initialState : AuthState = {
  user: null,
  decryptedVaultKey: null,
  loading: true,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: ( state, action: PayloadAction<User | null> ) => {
            state.user = action.payload;
        },
        setDecryptedVaultKey: (state, action: PayloadAction<Uint8Array | null>) => {
            state.decryptedVaultKey = action.payload;
        },
        setLoading: ( state, action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
      builder
      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.decryptedVaultKey = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })

      // Check Auth Session
      .addCase(checkAuthSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthSession.fulfilled, (state, action) => {
        state.user = action.payload; 
        state.loading = false;
      })
      .addCase(checkAuthSession.rejected, (state) => {
        state.loading = false;
      });
    },
});

export const { setUser, setLoading, setDecryptedVaultKey } = authSlice.actions;
export default authSlice.reducer;