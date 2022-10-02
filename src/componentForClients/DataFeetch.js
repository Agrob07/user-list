import React from "react";
import { columns } from "./Columns";
import TableList from "../components/TableList";
import { useDispatch, useSelector } from "react-redux";
import { selectClients } from "../features/clientsSlice";

const DataFeetch = () => {
  const list = useSelector(selectClients);
  console.log(list);
  const filterdata = list.map((item) => item);

  return (
    <div className="bg-orange-300 flex flex-col items-center justify-center w-full">
      <TableList data={filterdata} columns={columns} />

    </div>
  );
};

export default DataFeetch;
