// var array = [ 2,4,7,12,1,5 ];

// array.toggled_sort = function () {
//     var self=this;
//     this.asc=!this.asc;
//     return this.sort(function (l, r) {
//         return l > r ? (self.asc ? 1 : -1) : l < r ? (self.asc ? -1 : 1) : 0;
//     });
// };

// state.userList = state.userList.sort((a, b) => {
// if (state.sortDetails.sort === "asc") {
// if (a[action.payload] < b[action.payload]) {
// return -1;
// }
// if (a[action.payload] > b[action.payload]) {
// return 1;
// }
// return 0;
// }
// if (state.sortDetails.sort === "desc") {
// if (a[action.payload] < b[action.payload]) {
// return 1;
// }
// if (a[action.payload] > b[action.payload]) {
// return -1;
// }
// return 0;
// }
// });
// state.sortDetails.access = action.payload;
// state.sortDetails.sort =
// state.sortDetails.sort === "asc"
// ? (state.sortDetails.sort = "desc")
// : (state.sortDetails.sort = "asc");

// {!userOnEdit ? (
//   <p>{cell.row.original.username}</p>
// ) : (
//   <input
//     name="username"
//     value={userOnEdit.username}
//     type={"text"}
//     className="bg-red-500"
//     onChange={({ target }) =>
//       handleInputChange(target.name, target.value)

// const handleInputChange = (key, value) => {
//   setUserOnEdit(() => ({
//     ...userOnEdit,
//     [key]: value,
//   }));

// };

// const toggleSortedList = () =>{
//   const filteredList = [...userList].sort((prev, next) => {
//     if (parseInt(prev[value])) {
//       if (showIcon) {
//         return prev[value] - next[value];
//       } else {
//         return next[value] - prev[value];
//       }
//     } else {
//       if (showIcon) {
//         return prev[value].localeCompare(next[value]);
//       } else {
//         return next[value].localeCompare(prev[value]);
//       }
//     }
//   });
//   return filteredList
// }








// Cell: (cell) => (
//   <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
//     {userOnEdit && userOnEdit.id === cell.row.original.id ? (
//       <select 
//       className="w-full flex justify-center item-center"
//       name="option" onChange={(e) => handleInputChange("option", e.target.value)}>
//        <option value="QA">QA</option>
//         <option value="Developer">Developer</option>   
//     </select>
//     ) : (
//       <p>{cell.row.original.option}</p>
//     )}
//   </div>
// ),