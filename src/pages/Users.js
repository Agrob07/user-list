import React from "react";
import { useSelector } from "react-redux";
import UserList from "../components/UserList";
import { selectUsers } from "../features/counter/counterSlice";
import { generateColumns } from "../helpers/generateColumns";

const Users = () => {
  const userList = useSelector(selectUsers);
  const columns = generateColumns(userList[0]);

  console.log(columns);

  return (
    <>
      <UserList data={userList} columns={columns} />
    </>
  );
};

export default Users;
