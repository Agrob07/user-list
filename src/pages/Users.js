import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserList from "../components/UserList";
import Tooltip from "../components/Tooltip";
import {
  deleteUser,
  editUser,
  selectUsers,
} from "../features/counter/usersSlice";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const Users = () => {
  const [show, setShow] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [userOnEdit, setUserOnEdit] = useState(null);
  const [activeRowId, setActiveRowId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [sortOptions, setSortOptions] = useState({})


  const userList = useSelector(selectUsers);
  const [currentList, setCurrentList] = useState(userList);

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentList(userList);
  }, [userList]);

  const toggleDeleteModal = (rowId) => {
    setActiveRowId(rowId);
    setShow(!show);
  };

  const deleteRow = (rowID) => {
    dispatch(deleteUser(rowID));
    setShow(false);
  };

  const handleSortClick = (sortBy,sortType) => {
    setSortOptions({
      sortBy,
      sortType,
    })
};

const toggleSortedList = () =>{
  const filteredList = [...userList].sort((prev, next) => {  
    if(sortOptions.sortType = "asc") {
      if(sortOptions.sortBy === "age"){
         setShowIcon(true)
        { <AiFillCaretDown/>}  
     }else{
  setShowIcon(false)
   { <AiFillCaretUp/>}
   } 
      if (prev < next ) {
        return 1
      } else if (next < prev){
        return -1
      }else {return 0}

    }
    if(sortOptions.sortType = "asc"){
      if(sortOptions.sortBy === "username"){
        setShowIcon(true)
        { <AiFillCaretDown/>}  
         return prev.localeCompare(next)
       
     }else{
      setShowIcon(false)
      { <AiFillCaretDown/>}  
      return next.localeCompare(prev);
     }
    
    }
  });
  return filteredList
}

  const handleEdit = (id) => {
    userList.forEach((user) => user.id === id && setUserOnEdit(user));
  };


  const handleEditSubmit = () => {
    dispatch(editUser(userOnEdit));
    console.log(123,userOnEdit.username);
    setUserOnEdit(null);
  };


  const handleInputChange = (key, value) =>{
    setInputValue(userOnEdit.username)

  }


  const columns = [
    {
      Header: () => {
        return (
          <span>
            USERNAME
            <button onClick={() => handleSortClick("username",
             sortOptions.sortType ==="asc" ? sortOptions.sortType === "desc" 
        : sortOptions.sortType ==="asc") }>
            </button>
          </span>
        );
      },
      accessor: "username",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          {    !userOnEdit ? (
            <p>{cell.row.original.username}</p>
          ) : (
            <input
              name="username"
              type={"text"}
              className="bg-red-500"
              onChange={()=>handleInputChange()}
            />
          )
          }
        </div>
      ),
    },
    {
      Header: () => {
        return (
          <span>
            AGE
            <button onClick={() => handleSortClick("username",
             sortOptions.sortType ==="asc" ? sortOptions.sortType === "desc" 
        : sortOptions.sortType ==="asc") }>
            </button>
          </span>
        );
      },
      accessor: "age",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          {!userOnEdit ? (
            <p>{cell.row.original.age}</p>
          ) : (
            <input type={"text"} className="bg-red-500" />
          )}
        </div>
      ),
    },
    {
      Header: "CITY",
      accessor: "city",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          {!userOnEdit ? (
            <p>{cell.row.original.city}</p>
          ) : (
            <input type={"text"} className="bg-red-500" />
          )}
        </div>
      ),
    },
    {
      Header: "EMAIL",
      accessor: "email",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          {!userOnEdit ? (
            <p>{cell.row.original.email}</p>
          ) : (
            <input type={"text"} className="bg-red-500" />
          )}
        </div>
      ),
    },
    {
      Header: "ACTION",
      accessor: "action",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          {!userOnEdit ? (
            <button
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-indigo-600 mx-auto transition duration-150 ease-in-out 
         hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
              onClick={() => handleEdit(cell.row.original.id)}
            >
              Edit
            </button>
          ) : (
            <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 
       focus:ring-indigo-600 mx-auto transition duration-150 ease-in-out 
       hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
                onClick={() => setUserOnEdit(null)}
              >
                Cancel
              </button>
              <br/>
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-indigo-600 mx-auto transition duration-150 ease-in-out 
         hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
                onClick={handleEditSubmit}
              >
                Save
              </button>
            </div>
          )}
          <br />
          {!userOnEdit && (
            <button
              onClick={() => {
                toggleDeleteModal(cell.row.original.id);
              }}
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-indigo-600 mx-auto transition duration-150 ease-in-out 
         hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
            >
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];




  return (
    <>
      <UserList data={toggleSortedList()}  columns={columns} />
      <Tooltip
        setShow={setShow}
        toggleModal={toggleDeleteModal}
        show={show}
        deleteRow={deleteRow}
        rowID={activeRowId}
      />
    </>
  );
};
export default Users;
