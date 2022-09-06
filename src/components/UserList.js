import React from "react";

import TableList from "./TableList";

const UserList = ({ data, columns }) => {
  return (
    <div>
      <TableList data={data} columns={columns} />
    </div>
  );
};
export default UserList;
