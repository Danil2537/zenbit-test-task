import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import getImage from '@/app/shared/api/get-image';

type LoginPageState = {
  imgUrl: { url: string } | null;
  showPassword: boolean;
  loadingImage: boolean;
};

const initialState: LoginPageState = {
  imgUrl: null,
  showPassword: false,
  loadingImage: false,
};

export const fetchLoginImage = createAsyncThunk(
  'loginPage/fetchImage',
  async () => {
    return await getImage('login.png');
  },
);

const loginPageSlice = createSlice({
  name: 'loginPage',
  initialState,
  reducers: {
    togglePassword(state) {
      state.showPassword = !state.showPassword;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginImage.pending, (state) => {
        state.loadingImage = true;
      })
      .addCase(
        fetchLoginImage.fulfilled,
        (state, action: PayloadAction<{ url: string } | null>) => {
          state.imgUrl = action.payload;
          state.loadingImage = false;
        },
      )
      .addCase(fetchLoginImage.rejected, (state) => {
        state.loadingImage = false;
      });
  },
});

export const { togglePassword } = loginPageSlice.actions;
export default loginPageSlice.reducer;
