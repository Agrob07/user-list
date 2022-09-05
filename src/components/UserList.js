import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import TableData from "./TableData";

const UserList = ({ data, columns }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
 

  return (
    <div>
      <TableData data={data} columns={columns} />
      {user && <Modal show={show} setShow={setShow} user={user} />}
    </div>
  );
};

export default UserList;
