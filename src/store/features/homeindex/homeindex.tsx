import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "@/service";
import { getHomeBannersThunkAction } from "./thunk";
export interface state {
  banners: [];
  area: string;
}
const initialState: state = {
  banners: [],
  area: ""
};

const HomeIndexSlice = createSlice({
  name: "homeindexSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getHomeBannersThunkAction.fulfilled,
      (state, action: any) => {
        state.banners = action.payload.body.map(
          (item: any) => `${BASE_URL}${item.imgSrc}`
        );
      }
    );
  }
});

export default HomeIndexSlice;
