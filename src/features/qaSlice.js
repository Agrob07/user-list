import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  qaList: [],
};

// export const fetchUsersAsync = createAsyncThunk(
//   'userlist/fetchUsers',
//   async (url) => {
//     const response = await fetch(url);
//     const data = await response.json()
//     return data;
//   }
// );

export const qaSlice = createSlice({
  name: "qaList",
  initialState,
  reducers: {
    addQA: (state, action) => {
      state.qaList = [...state.qaList, action.payload];
    },
    deleteQA: (state, action) => {
      state.qaList = state.qaList.filter((user) => user.id !== action.payload);
    },
    editQA: (state, action) => {
      state.qaList = state.qaList.map((user, idx) => {
        return user.id === action.payload.id
          ? (state.qaList[idx] = action.payload)
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

export const { addQA, deleteQA, editQA } = qaSlice.actions;

export const selectQAs = (state) => state.qa.qaList;

export default qaSlice.reducer;
