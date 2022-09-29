import React from "react";
import axios from "axios";
import { columns } from "./Columns";
import { useState, useEffect } from "react";
import TableList from "../components/TableList";

const DataFeetch = () => {
  const [clientsdata, setClientsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then((response) => response);
        setClientsData(res.data);
      } catch (err) {
        alert(err);
      }
    }
    fetchData();
  }, []);

  const filterData = clientsdata.map((item) => item);

  return (
    <div className="bg-orange-300 flex items-center justify-center w-full">
      <TableList data={filterData} columns={columns} />
    </div>
  );
};

export default DataFeetch;
