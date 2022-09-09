import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  userList: [],
  sortDetails: {},
};

// export const fetchUsersAsync = createAsyncThunk(
//   'userlist/fetchUsers',
//   async (url) => {
//     const response = await fetch(url);
//     const data = await response.json()
//     return data;
//   }
// );

export const userSlice = createSlice({
  name: "userList",
  initialState,

  reducers: {
    addUser: (state, action) => {
      state.userList = [...state.userList, action.payload];
    },
    deleteUser: (state, action) => {
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload
      );
    },
    editUser: (state, action) => {
      state.userList = state.userList.map((user, idx) => {
        console.log(action.payload);
        return user.id === action.payload.id
          ? (state.userList[idx] = action.payload)
          : user;
      });
    }
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

export const {
  addUser,
  deleteUser,
  editUser
} = userSlice.actions;

export const selectUsers = (state) => state.users.userList;

export default userSlice.reducer;
