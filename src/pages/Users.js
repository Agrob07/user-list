import React, { useState, useRef, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserList from "../components/UserList";
import { useNavigate } from "react-router-dom";
import Tooltip from "../components/Tooltip";
import { deleteQA, editQA, selectQAs } from "../features/qaSlice";
import {
  deleteDev,
  editDev,
  selectDevelopers,
} from "../features/developerSlice";

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const Users = () => {
  const [show, setShow] = useState(false);
  const [userOnEdit, setUserOnEdit] = useState(null);
  const [activeRowProps, setActiveRowProps] = useState(null);
  const [sortOptions, setSortOptions] = useState({});

  const qaList = useSelector(selectQAs);
  const navigate = useNavigate();

  const developerList = useSelector(selectDevelopers);
  const dispatch = useDispatch();
  let formValues = useRef({});

  const toggleDeleteModal = (deleteProps) => {
    setActiveRowProps(deleteProps);
    setShow(!show);
  };

  const deleteRow = ({ id, option }) => {
    option === "QA" ? dispatch(deleteQA(id)) : dispatch(deleteDev(id));
    setShow(false);
  };

  const handleSortClick = (sortBy, sortType, option) => {
    setSortOptions({
      sortBy,
      sortType,
      option,
    });
  };

  const sortedData = useCallback(
    (data) => {
      if (data[0] && sortOptions.option === data[0].option) {
        return [...data].sort((prev, next) => {
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
        });
      }
      return data;
    },
    [sortOptions.option, sortOptions.sortBy, sortOptions.sortType]
  );

  const sortedQAs = sortedData(qaList);
  const sortedDevs = sortedData(developerList);

  const handleEdit = (user) => {
    setUserOnEdit(user);
  };

  const handleEditSubmit = () => {
    userOnEdit.option === "QA"
      ? dispatch(editQA({ ...userOnEdit, ...formValues.current }))
      : dispatch(editDev({ ...userOnEdit, ...formValues.current }));
    setUserOnEdit(null);
  };

  const handleInputChange = (field, value) => {
    formValues.current[field] = value;
  };
  const columns = [
    {
      Header: "OPTION",
      accessor: "option",
    },
    {
      Header: (props) => {
        return (
          <button
            className="w-full flex justify-center item-center"
            onClick={() =>
              handleSortClick(
                "username",
                sortOptions.sortType === "asc" ? "desc" : "asc",
                props.data[0].option ? props.data[0].option : ""
              )
            }
          >
            USERNAME
            {sortOptions.sortBy === "username" &&
              props.data[0] &&
              sortOptions.option === props.data[0].option && (
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
              className="bg-gray-300 w-full"
              onChange={(e) => handleInputChange("username", e.target.value)}
            />
          ) : (
            <p>{cell.row.original.username}</p>
          )}
        </div>
      ),
    },
    {
      Header: (props) => {
        return (
          <button
            className="w-full flex justify-center item-center"
            onClick={() => {
              const type = sortOptions.sortType === "asc" ? "desc" : "asc";
              handleSortClick("age", type, props.data[0].option);
            }}
          >
            AGE
            {sortOptions.sortBy === "age" &&
              sortOptions.option === props.data[0].option && (
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
              className="bg-gray-300 w-full"
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
              className="bg-gray-300 w-full"
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
              className="bg-gray-300 w-full"
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
                  const { id, option } = cell.row.original;
                  toggleDeleteModal({
                    id,
                    option,
                  });
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
      <div className="flex  gap-2">
        <UserList data={sortedDevs} columns={columns} />
        <UserList data={sortedQAs} columns={columns} />
      </div>

      <Tooltip
        setShow={setShow}
        show={show}
        deleteRow={deleteRow}
        rowProps={activeRowProps}
      />
      <button
        className="focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-green-600 m-2 p
        mx-auto transition duration-150 ease-in-out hover:
        bg-green-500 hover:bg-green-600 rounded text-white
          px-4 sm:px-8 py-2 text-xs sm:text-sm"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </>
  );
};
export default Users;
