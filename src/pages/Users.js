import React, { useState,  useMemo, useRef } from "react";
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
  const dispatch = useDispatch();
  let formValues = useRef({});



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

  const handleEdit = (user) => {
    setUserOnEdit(user);
  };

  const handleEditSubmit = () => {
    dispatch(editUser({ ...userOnEdit, ...formValues.current }));
    setUserOnEdit(null);
  };

  const handleInputChange = (field, value) => {
    formValues.current[field] = value;
  };

  const columns = [
    {
      Header: "OPTION",
      accessor: "option",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          {userOnEdit && userOnEdit.id === cell.row.original.id ? (
            <select 
            className="w-full flex justify-center item-center"
            name="option" onChange={(e) => handleInputChange("option", e.target.value)}>
             <option value="QA">QA</option>
              <option value="Developer">Developer</option>   
          </select>
          ) : (
            <p>{cell.row.original.option}</p>
          )}
        </div>
      ),
    },
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
          {userOnEdit && userOnEdit.id === cell.row.original.id ? (
            <input
              defaultValue={cell.row.original.username}
              name="username"
              type={"text"}
              className="bg-gray-300"
              onChange={(e) => handleInputChange("username", e.target.value)}
            />
          ) : (
            <p>{cell.row.original.username}</p>
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
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2 ">
          {userOnEdit && userOnEdit.id === cell.row.original.id ? (
            <input
              defaultValue={cell.row.original.age}
              name="age"
              type={"text"}
              className="bg-gray-300"
              onChange={(e) => handleInputChange("age", e.target.value)}
            />
          ) : (
            <p>{cell.row.original.age}</p>
          )}
        </div>
      ),
    },
    {
      Header: "CITY",
      accessor: "city",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          {userOnEdit && userOnEdit.id === cell.row.original.id ? (
            <input
              defaultValue={cell.row.original.city}
              name="city"
              type={"text"}
              className="bg-gray-300"
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          ) : (
            <p>{cell.row.original.city}</p>
          )}
        </div>
      ),
    },
    {
      Header: "EMAIL",
      accessor: "email",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          {userOnEdit && userOnEdit.id === cell.row.original.id ? (
            <input
              defaultValue={cell.row.original.email}
              name="email"
              type={"text"}
              className="bg-gray-300"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          ) : (
            <p>{cell.row.original.email}</p>
          )}
        </div>
      ),
    },
    {
      Header: "ACTION",
      accessor: "action",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          {userOnEdit && userOnEdit.id === cell.row.original.id ? (
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
          ) : (
            <div className="flex flex-col gap-2">
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 
       focus:ring-indigo-600 mx-auto transition duration-150 ease-in-out 
       hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
                onClick={() => handleEdit(cell.row.original)}
              >
                Edit
              </button>

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
            </div>
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
