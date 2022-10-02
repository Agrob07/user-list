import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientsList: [],
};

export const clientsSlice = createSlice({
  name: "clientsList",
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.clientsList = action.payload;
    },
    deleteClient: (state, action) => {
      state.clientsList = state.clientsList.filter(
        (user) => user.id !== action.payload
      )
  },
  },
});

export const { fetchData } = clientsSlice.actions;

export const selectClients = (state) => state.client.clientsList;

export default clientsSlice.reducer;
