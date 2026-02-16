import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import getImage from "@/app/shared/api/get-image";

type SignupPageState = {
  imgUrl: { url: string } | null;
  showPassword: boolean;
  emailError: string;
  passwordError: string;
  loadingImage: boolean;
};

const initialState: SignupPageState = {
  imgUrl: null,
  showPassword: false,
  emailError: "",
  passwordError: "",
  loadingImage: false,
};

export const fetchSignupImage = createAsyncThunk(
  "signupPage/fetchImage",
  async () => {
    return await getImage("login.png");
  }
);

const signupPageSlice = createSlice({
  name: "signupPage",
  initialState,
  reducers: {
    togglePassword(state) {
      state.showPassword = !state.showPassword;
    },
    setEmailError(state, action: PayloadAction<string>) {
      state.emailError = action.payload;
    },
    setPasswordError(state, action: PayloadAction<string>) {
      state.passwordError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignupImage.pending, (state) => {
        state.loadingImage = true;
      })
      .addCase(fetchSignupImage.fulfilled, (state, action: PayloadAction<{ url: string } | null>) => {
        state.imgUrl = action.payload;
        state.loadingImage = false;
      })
      .addCase(fetchSignupImage.rejected, (state) => {
        state.loadingImage = false;
      });
  },
});

export const { togglePassword, setEmailError, setPasswordError } =
  signupPageSlice.actions;

export default signupPageSlice.reducer;
