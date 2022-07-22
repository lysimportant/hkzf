import { createAsyncThunk } from "@reduxjs/toolkit";
import { getHomeIndexBanner } from "@/service/Index/index_";
export const getHomeBannersThunkAction = createAsyncThunk(
  "homeindexSlice/getHomeBannersThunkAction",
  async () => {
    const res = await getHomeIndexBanner();
    return res;
  }
);
