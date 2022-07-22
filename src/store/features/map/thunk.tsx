import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMapAreaInfo } from "@/service/map/map-api";
export const getAreaInfoThunkAction = createAsyncThunk(
  "MapSlice/getAreaInfoThunkAction",
  async (name: string) => {
    const res = await getMapAreaInfo(name);
    return res;
  }
);
