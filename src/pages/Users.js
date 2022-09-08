import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserList from "../components/UserList";
import Tooltip from "../components/Tooltip";
import {
  deleteUser,
  editUser,
  selectUsers,
  sortByColumnAge,
  sortByColumnUserName,
} from "../features/counter/counterSlice";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const Users = () => {
  const [show, setShow] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [userOnEdit, setUserOnEdit] = useState(null);
  const [activeRowId, setActiveRowId] = useState("");
  const [inputValue, setInputValue] = useState("");

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

  const handleSortClick = (e) => {
    const value = e.currentTarget.value;
    setShowIcon(!showIcon);
    const filteredList = [...userList].sort((prev, next) => {
      if (parseInt(prev[value])) {
        if (showIcon) {
          return prev[value] - next[value];
        } else {
          return next[value] - prev[value];
        }
      } else {
        if (showIcon) {
          return prev[value].localeCompare(next[value]);
        } else {
          return next[value].localeCompare(prev[value]);
        }
      }
    });
    setCurrentList(filteredList);
  };

  const handleEdit = (id) => {
    userList.forEach((user) => user.id === id && setUserOnEdit(user));
  };
  const handleEditSubmit = () => {
    dispatch(editUser(userOnEdit));
    setUserOnEdit(null);
  };

  const handleInputChange = (key, value) => {
    setUserOnEdit(() => ({
      ...userOnEdit,
      [key]: value,
    }));

    console.log(inputValue);
  };
  const columns = [
    {
      Header: () => {
        return (
          <span>
            USERNAME
            <button value={"username"} onClick={(e) => handleSortClick(e)}>
              {showIcon ? <AiFillCaretUp /> : <AiFillCaretDown />}
            </button>
          </span>
        );
      },
      accessor: "username",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          {!userOnEdit ? (
            <p>{cell.row.original.username}</p>
          ) : (
            <input
              name="username"
              value={userOnEdit.username}
              type={"text"}
              className="bg-red-500"
              onChange={({ target }) =>
                handleInputChange(target.name, target.value)
              }
            />
          )}
        </div>
      ),
    },
    {
      Header: () => {
        return (
          <span>
            AGE
            <button value={"age"} onClick={(e) => handleSortClick(e)}>
              {showIcon ? <AiFillCaretUp /> : <AiFillCaretDown />}
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
          ,
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
      <UserList data={currentList} columns={columns} />
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
