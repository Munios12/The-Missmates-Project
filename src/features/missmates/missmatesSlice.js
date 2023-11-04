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
    addMissmate(state, action) {
      [...state.missmates, action.payload];
    },
    deleteMissmate(state, action) {
      [[...state.missmates].filter((item) => item.id !== action.payload.id)];
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

export function addMissmate(newMissmate) {
  return async function (dispatch) {
    const { data, error } = await supabase
      .from("missmates")
      .insert([newMissmate])
      .select();
    if (error) {
      throw new Error("No se ha podido añadir el missmate");
    }
    console.log(data);
    dispatch({ type: "missmates/addMissmates", payload: data });
  };
}

export function deleteMissmate(missmateId) {
  return async function (dispatch) {
    const { error } = await supabase
      .from("missmates")
      .delete()
      .eq("id", missmateId);
    if (error) {
      throw new Error("No se ha podido eliminar el missmate");
    }

    dispatch({ type: "missmates/deleteMissmates", payload: missmateId });
  };
}

export default missmatesSlice.reducer;
