import { configureStore } from "@reduxjs/toolkit";
import missmatesReducer from "./features/missmates/missmatesSlice";

const store = configureStore({
  reducer: {
    missmates: missmatesReducer,
  },
});

export default store;
