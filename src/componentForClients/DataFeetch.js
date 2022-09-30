import React from "react";
import axios from "axios";
import { columns } from "./Columns";
import { useState, useEffect } from "react";
import TableList from "../components/TableList";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../app/sagaActions";
import { selectClients } from "../features/clientsSlice";

const DataFeetch = () => {
  const [clientsdata, setClientsData] = useState([]);
  const dispatch = useDispatch();
  const list = useSelector(selectClients);
  console.log(list, "list");
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
    <div className="bg-orange-300 flex flex-col items-center justify-center w-full">
      <TableList data={filterData} columns={columns} />

      <button
        className="bg-green-700 w-20 "
        onClick={() => dispatch({ type: sagaActions.FETCH_DATA_SAGA })}
      >
        Getdata
      </button>
      {list}
    </div>
  );
};

export default DataFeetch;
