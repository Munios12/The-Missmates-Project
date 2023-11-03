import { createSlice } from "@reduxjs/toolkit";
import supabase from "../../services/supabase";

const initialState = {
  missmates: [],
  isLoading: false,
};

const missmatesSlice = createSlice({
  name: "missmates",
  initialState,
  reducers: {
    loadMissmates(state, action) {
      state.missmates = action.payload;
    },
  },
});

// export const { loadMissmates } = missmatesSlice.actions;

export function loadMissmates() {
  return async function (dispatch) {
    const { data, error } = await supabase.from("missmates").select("*");
    if (error) {
      console.error(error);
      throw new Error("No se han podido cargar...");
    }
    dispatch({ type: "missmates/loadMissmates", payload: data });
  };
}

export default missmatesSlice.reducer;
