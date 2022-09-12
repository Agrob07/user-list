import React, { useState, useEffect, useMemo, useRef } from "react";
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
  const [userOnEdit, setUserOnEdit] = useState(null);
  const [activeRowId, setActiveRowId] = useState("");
  const [sortOptions, setSortOptions] = useState({});

  const userList = useSelector(selectUsers);
  const [currentList, setCurrentList] = useState(userList);
  const dispatch = useDispatch();
  let formValues = useRef({});

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

  const handleSortClick = (sortBy, sortType) => {
    setSortOptions({
      sortBy,
      sortType,
    });
  };

  const filteredList = useMemo(
    () =>
      [...userList].sort((prev, next) => {
        if (sortOptions.sortBy === "age") {
          if (sortOptions.sortType === "asc") {
            return prev.age - next.age;
          } else {
            return next.age - prev.age;
          }
        } else {
          if (sortOptions.sortType === "asc") {
            return prev.username.localeCompare(next.username);
          } else {
            return next.username.localeCompare(prev.username);
          }
        }
      }),
    [sortOptions.sortBy, sortOptions.sortType, userList]
  );

  const handleEdit = (id) => {
    currentList.map((user) => user.id === id && setUserOnEdit(user))
  };

  const handleEditSubmit = () => {
    
    dispatch(editUser(formValues.current));
    setUserOnEdit(null);

  };

  const handleInputChange = (field, value) => {
    formValues.current[field] =  value
  
  };



  const columns = [
    {
      Header: () => {
        return (
          <button
            className="w-full flex justify-center item-center"
            onClick={() =>
              handleSortClick(
                "username",
                sortOptions.sortType === "asc" ? "desc" : "asc"
              )
            }
          >
            USERNAME
            {sortOptions.sortBy === "username" && (
              <span>
                {sortOptions.sortType === "asc" ? (
                  <AiFillCaretDown />
                ) : (
                  <AiFillCaretUp />
                )}
              </span>
            )}
          </button>
        );
      },
      accessor: "username",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          {!userOnEdit ? (
            <p>{cell.row.original.username}</p>
          ) : (
            <input
              defaultValue={cell.row.original.username}
              name="username"
              type={"text"}
              className="bg-gray-300"
              onChange={(e)=>handleInputChange("username", e.target.value)}
            />
          )}
        </div>
      ),
    },
    {
      Header: () => {
        return (
          <button
            className="w-full flex justify-center item-center"
            onClick={() => {
              const type = sortOptions.sortType === "asc" ? "desc" : "asc";
              handleSortClick("age", type);
            }}
          >
            AGE
            {sortOptions.sortBy === "age" && (
              <span>
                {sortOptions.sortType === "asc" ? (
                  <AiFillCaretDown />
                ) : (
                  <AiFillCaretUp />
                )}
              </span>
            )}
          </button>
        );
      },
      accessor: "age",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          {!userOnEdit ? (
            <p>{cell.row.original.age}</p>
          ) : (
            <input
            defaultValue={cell.row.original.age}
            name="age"
            type={"text"}
            className="bg-gray-300"
            onChange={(e)=>handleInputChange("age", e.target.value)}
          />
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
            <input
            defaultValue={cell.row.original.city}
            name="city"
            type={"text"}
            className="bg-gray-300"
            onChange={(e)=>handleInputChange("city", e.target.value)}
          />
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
    <input
              defaultValue={cell.row.original.email}
              name="email"
              type={"text"}
              className="bg-gray-300"
              onChange={(e)=>handleInputChange("email", e.target.value)}
            />          )}
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
              <br />
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
      <UserList data={filteredList} columns={columns} />
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
