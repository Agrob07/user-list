import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientsList: [],
};

export const clientsSlice = createSlice({
  name: "clientsList",
  initialState,
  // reducers: {
  //   fetchData: (state, action) => {
  //     return {
  //       : action.payload,
  //     };
  // },
  // },
});

console.log(initialState.clientsList, 111);

export const { fetchData } = clientsSlice.actions;

export const selectClients = (state) => state.clientsList;

export default clientsSlice.reducer;
