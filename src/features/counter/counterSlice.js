import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggledSort } from "../../helpers/toogleSort";

const initialState = {
  status: "idle",
  userList: ["sername",15],
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
      console.log(111, action);
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload
      );
    },
     editUser: (state, action) => {
      state.userList = state.userList.map((user) => {
        return user.id === action.payload.id ? (user = action.payload) : user;
      });
    },
    sortByColumnAge: (state, action) => {
      state.userList = state.userList = state.userList.sort((a, b) => {
        if (state.sortDetails.sort === "asc") {
        if (a[action.payload] < b[action.payload]) {
        return -1;
        }
        if (a[action.payload] > b[action.payload]) {
        return 1;
        }
        return 0;
        }
        if (state.sortDetails.sort === "desc") {
        if (a[action.payload] < b[action.payload]) {
        return 1;
        }
        if (a[action.payload] > b[action.payload]) {
        return -1;
        }
        return 0;
        }
        });
        state.sortDetails.access = action.payload;
        state.sortDetails.sort =
        state.sortDetails.sort === "asc" ? (state.sortDetails.sort = "desc")
        : (state.sortDetails.sort = "asc");
      },
      sortByColumnUserName : (state,action) => {
      
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

export const { addUser, deleteUser, editUser, sortByColumnAge,sortByColumnUserName } =
  userSlice.actions;

export const selectUsers = (state) => state.users.userList;

export default userSlice.reducer;
