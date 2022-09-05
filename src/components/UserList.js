import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, selectUsers } from "../features/counter/counterSlice";
import Modal from "./Modal";

const UserList = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const userList = useSelector(selectUsers);
  const dispatch = useDispatch();

  const hanleEdit = (content) => {
    setUser(content);
    setShow(true);
  };

  return (
    <div>
      <ul className=" flex w-12 whitespace-nowrap">
        {userList.map((user) => {
          const { id, username, age, city, email } = user;
          return (
            <li key={id}>
              <p className="pl-16">{username}</p>

              <p className="pl-16">{age}</p>

              <p className="pl-16">{city}</p>

              <p className="pl-16">{email}</p>

              <div className="m-5 mt-4 sm:mt-0 ">
                <button
                  onClick={() => dispatch(deleteUser(id))}
                  className="text-base font-medium leading-4 py-4 w-full bg-gray-800 text-white uppercase mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 hover:bg-gray-700"
                >
                  Delete
                </button>
                <br />
                <button
                  className="text-base font-medium leading-4 py-4 w-full bg-gray-800 text-white uppercase mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 hover:bg-gray-700"
                  onClick={() => hanleEdit(user)}
                >
                  Edit
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {user && <Modal show={show} setShow={setShow} user={user} />}
    </div>
  );
};

export default UserList;
