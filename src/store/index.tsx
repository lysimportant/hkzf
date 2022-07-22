import { configureStore } from "@reduxjs/toolkit";
import HomeIndexSlice from "./features/homeindex/homeindex";
import MapSlice from "./features/map/map-feature";
const store = configureStore({
  reducer: {
    [HomeIndexSlice.name]: HomeIndexSlice.reducer,
    [MapSlice.name]: MapSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
