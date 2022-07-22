import { createSlice } from "@reduxjs/toolkit";
import { getAreaInfoThunkAction } from "./thunk";
export interface MapState {
  area: string;
  value: string;
  mapList: {
    cityIndex: [];
    cityList: {};
  };
}
const initialState = {
  area: "",
  value: "",
  mapList: {
    cityIndex: [],
    cityList: {}
  }
} as MapState;
const MapSlice = createSlice({
  name: "MapSlice",
  initialState,
  reducers: {
    saveMapList(state, action) {
      state.mapList = action.payload;
    },
    initState(state, action) {
      console.log(action);
      state.area = action.payload.label;
      state.value = action.payload.value;
      window.sessionStorage.setItem("area", JSON.stringify(action.payload));
    }
  },
  extraReducers: b => {
    b.addCase(getAreaInfoThunkAction.fulfilled, (state, action: any) => {
      state.area = action.payload.body.label;
      state.value = action.payload.body.value;
      window.sessionStorage.setItem(
        "area",
        JSON.stringify(action.payload.body)
      );
    });
  }
});

export const { saveMapList, initState } = MapSlice.actions;

export default MapSlice;
