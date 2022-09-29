// import React from "react";

// const Columns = (data) => {
//   // const filterdata = data.data.map((item) => item[2]);
//   console.log(data.data);

//   return <div>Columns</div>;
// };

// export default Columns;

export const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "USERNAME",
    accessor: "username",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "PHONE",
    accessor: "phone",
  },
  {
    Header: "Company",
    accessor: "company.name",
  },
];
