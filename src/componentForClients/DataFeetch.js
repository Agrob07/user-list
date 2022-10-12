import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectClients,
  // selectIsDataFail,
  selectIsDataLoading,
  selectIsDataSuccess,
  selectIsDeleted,
  loadingFetchData,
} from "../features/clientsSlice";
import { sagaActions } from "../app/sagaActions";
import TableList from "../components/TableList";
import Loading from "./Loading";
import Notification from "../componentForClients/Notificathion";
import Tooltip from "../components/Tooltip";
import CreateCLientModal from "./CreateCLientModal";

const curState = {
  id: null,
  option: "",
};

const DataFeetch = () => {
  const [showForm, setShowForm] = useState(false);
  const [control, setControl] = useState(curState);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const list = useSelector(selectClients);
  const success = useSelector(selectIsDataSuccess);
  const deleted = useSelector(selectIsDeleted);
  const loading = useSelector(selectIsDataLoading);
  // const loading = useSelector((state) => {
  //   return state.client.IsDataLoading;
  // });
  // function usePrevious(value) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   }, [value]);
  //   return ref.current;
  // }
  // const prevLoading = usePrevious(loading);

  console.log(loading, "loading");
  // console.log(prevLoading, "prev`");
  console.log(success, "success");
  console.log(deleted, "deleted");

  useEffect(() => {
    if (deleted || loading) {
      dispatch(loadingFetchData());
      dispatch({ type: sagaActions.FETCH_DATA });
    }
  }, [deleted, dispatch, loading]);

  useEffect(() => {
    if (deleted || loading) {
      dispatch(loadingFetchData());
      dispatch({ type: sagaActions.FETCH_DATA });
    }
  }, [deleted, dispatch, loading]);

  const handleCLick = (control) => {
    dispatch({
      type: sagaActions.DELETE_USER_REQUESTED,
      control: control.id,
    });
  };

  const filterdata = list.map((item) => item);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "USERNAME",
      accessor: "username",
    },
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "PASSWORD",
      accessor: "password",
    },
    {
      Header: "ACTION",
      accessor: "action",
      Cell: (cell) => (
        <div className="flex flex-col gap-2">
          <button
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 
     focus:ring-indigo-600 mx-auto transition duration-150 ease-in-out 
     hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
            onClick={() => {
              setControl({ id: cell.row.original.id, option: "edit" });
              setShowForm(true);
            }}
          >
            Edit
          </button>

          <button
            onClick={() => {
              setShow(true);
              setControl({ id: cell.row.original.id });
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
      {success && !loading ? (
        <TableList data={filterdata} columns={columns} />
      ) : !success && loading ? (
        <Loading />
      ) : (
        <Notification />
      )}

      <Tooltip
        setShow={setShow}
        show={show}
        deleteRow={handleCLick}
        rowProps={control}
      />

      <button
        className=" my-12 focus:outline-none focus:ring-2 focus:ring-offset-2 m y 
   focus:ring-indigo-600 mx-auto transition duration-150 ease-in-out 
   hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
        onClick={() => {
          setShowForm(true);
          setControl({ option: "create" });
        }}
      >
        Create User
      </button>

      <CreateCLientModal
        control={control}
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </>
  );
};

export default DataFeetch;
