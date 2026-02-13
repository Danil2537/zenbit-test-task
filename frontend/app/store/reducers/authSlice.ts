import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    Logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthenticated, Logout } = authSlice.actions;
export default authSlice.reducer;
