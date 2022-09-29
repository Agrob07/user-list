import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  developerList: [],
};

// export const fetchUsersAsync = createAsyncThunk(
//   'userlist/fetchUsers',
//   async (url) => {
//     const response = await fetch(url);
//     const data = await response.json()
//     return data;
//   }
// );

export const developerSlice = createSlice({
  name: "developerList",
  initialState,
  reducers: {
    addDev: (state, action) => {
      state.developerList = [...state.developerList, action.payload];
    },
    deleteDev: (state, action) => {
      state.developerList = state.developerList.filter(
        (user) => user.id !== action.payload
      );
    },
    editDev: (state, action) => {
      state.developerList = state.developerList.map((user, idx) => {
        return user.id === action.payload.id
          ? (state.developerList[idx] = action.payload)
          : user;
      });
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUsersAsync.pending, (state) => {
  //       state.status = 'loading';

  //     })
  //     .addCase(fetchUsersAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.userList = [...state.userList,action.payload];
  //     });
  // },
});

export const { addDev, deleteDev, editDev } = developerSlice.actions;

export const selectDevelopers = (state) => state.developer.developerList;

export default developerSlice.reducer;
