import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserList from "../components/UserList";
import Tooltip from "../components/Tooltip";
import { deleteUser, selectUsers, sortByColumnAge,sortByColumnUserName} from "../features/counter/counterSlice";
import { AiFillCaretDown,AiFillCaretUp } from "react-icons/ai";



const Users = () => {
  const [show, setShow] = useState(false);
  const [showIcon, setShowIcon] = useState(false)
  const [activeRowId, setActiveRowId] = useState("");
  const userList = useSelector(selectUsers);
  const dispatch = useDispatch();

  const toggleDeleteModal = (rowId) => {
    !activeRowId ? setActiveRowId(rowId) : setActiveRowId("")
    setShow(!show);
    dispatch(deleteUser(activeRowId));
    
  };

  const columns = [
    {
      Header: () => {
        return (
          <span>
          USERNAME
          <button onClick={()=>{
              setShowIcon (!showIcon)
              dispatch(sortByColumnUserName("username"))}
            }>
            {showIcon ? <AiFillCaretUp/> : <AiFillCaretDown/>}
            </button>
          </span>
        );
      },
      accessor: "username",
    },
    {
      Header: () => {
        return (
          <span >
            AGE
            <button onClick={()=>{
              setShowIcon (!showIcon)
              dispatch(sortByColumnAge("age"))}
            }>
            {showIcon ? <AiFillCaretUp/> : <AiFillCaretDown/>}
            </button>
          </span>
        )
      },
      accessor: "age",
    },
    {
      Header: "CITY",
      accessor: "city",
    },
    {
      Header: "EMAIL",
      accessor: "email",
    },
    {
      Header: "ACTHION",
      accessor: "action",
      Cell: (cell) => (
        <div className="flex flex-col items-center justify-center m-0.5 mt-2 mb-2">
          <button
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-indigo-600 mx-auto transition duration-150 ease-in-out 
         hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
          >
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
        setShow = {setShow}
        toggleModal={toggleDeleteModal}
        show={show}
      />
    </>
  );
};
export default Users;
