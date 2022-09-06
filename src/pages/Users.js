import React, { useState } from "react";
import UserList from "../components/UserList";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers } from "../features/counter/counterSlice";
import { sortByColumn } from "../features/counter/counterSlice";
import Tooltip from "../components/Tooltip";
const Users = () => {
  const [show, setShow] = useState(false);
  const [activeRowId, setActiveRowId] = useState("");
  const userList = useSelector(selectUsers);
  const dispatch = useDispatch();
  const data = userList.map((item) => item);
  const users = Object.values(data[0]);
  const id = users[0];
  console.log(users, id);

  const toggleDeleteModal = (rowId) => {
    if (!activeRowId) {
      setActiveRowId(rowId);
    } else {
      setActiveRowId("");
    }
    console.log(8888888888888888, rowId);
    setShow(!show);
  };

  const columns = [
    {
      key: "id",
      title: "ID",
      Header: () => {
        return (
          <span
            onClick={() => {
              dispatch(sortByColumn("username"));
            }}
          >
            USERNAME
          </span>
        );
      },
      accessor: "username",
      render: (cell) => {
        cell.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      },
    },
    {
      key: "id",
      title: "ID",
      Header: "AGE",
      accessor: "age",
      render: (val) => {
        <>
          {val}
          <span>Icon</span>
        </>;
      },
    },
    {
      key: "id",
      title: "ID",
      Header: "CITY",
      accessor: "city",
    },
    {
      key: "id",
      title: "ID",
      Header: "EMAIL",
      accessor: "email",
    },
    {
      key: "id",
      title: "ID",
      Header: "ACTHION",
      accessor: "action",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          <button
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-indigo-600 mx-auto transition duration-150 ease-in-out 
         hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
          >
            {" "}
            Edit
          </button>
          ,
          <br />
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
      ),
    },
  ];

  return (
    <>
      <UserList data={userList} columns={columns} />
      <Tooltip
        rowId={activeRowId}
        toggleModal={toggleDeleteModal}
        show={show}
      />
    </>
  );
};
export default Users;
