import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import getImage from '@/app/shared/api/get-image';
import getBuildings from '@/app/buildings/api/get-Buildings';
import { Building } from '@/app/buildings/types/building';

type RootPageState = {
  cityImgUrl: { url: string } | null;
  buildings: Building[];
  loadingImage: boolean;
  loadingBuildings: boolean;
};

const initialState: RootPageState = {
  cityImgUrl: null,
  buildings: [],
  loadingImage: false,
  loadingBuildings: false,
};

export const fetchCityImage = createAsyncThunk(
  'rootPage/fetchCityImage',
  async () => {
    return await getImage('root_unauth.png');
  },
);

export const fetchBuildings = createAsyncThunk(
  'rootPage/fetchBuildings',
  async () => {
    return await getBuildings();
  },
);

const rootPageSlice = createSlice({
  name: 'rootPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // image
      .addCase(fetchCityImage.pending, (state) => {
        state.loadingImage = true;
      })
      .addCase(fetchCityImage.fulfilled, (state, action) => {
        state.cityImgUrl = action.payload;
        state.loadingImage = false;
      })
      .addCase(fetchCityImage.rejected, (state) => {
        state.loadingImage = false;
      })

      // buildings
      .addCase(fetchBuildings.pending, (state) => {
        state.loadingBuildings = true;
      })
      .addCase(
        fetchBuildings.fulfilled,
        (state, action: PayloadAction<Building[] | null>) => {
          state.buildings = action.payload ?? [];
          state.loadingBuildings = false;
        },
      )
      .addCase(fetchBuildings.rejected, (state) => {
        state.loadingBuildings = false;
      });
  },
});

export default rootPageSlice.reducer;
