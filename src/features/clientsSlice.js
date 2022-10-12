import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  clientsList: [],
  isDataSuccess: false,
  isDataLoading: true,
  isDeleted: false,
};

export const clientsSlice = createSlice({
  name: "clientsList",
  initialState,
  reducers: {
    loadingFetchData: (state) => {
      state.isDataSuccess = false;
      state.isDataLoading = true;
    },
    successFetchData: (state, action) => {
      state.clientsList = action.payload;
      state.isDataSuccess = true;
      state.isDataLoading = false;
      // state.isDeleted = false;
    },
    failFetchData: (state, action) => {
      state.isDataSuccess = false;
      state.isDataLoading = false;
    },
    deleteClientdData: (state) => {
      state.isDeleted = true;
    },
  },
});

export const {
  loadingFetchData,
  successFetchData,
  failFetchData,
  deleteClientdData,
} = clientsSlice.actions;

export const selectClients = (state) => state.client.clientsList;
export const selectIsDataSuccess = (state) => state.client.isDataSuccess;
export const selectIsDataLoading = (state) => state.client.isDataLoading;
export const selectIsDeleted = (state) => state.client.isDeleted;

export default clientsSlice.reducer;
