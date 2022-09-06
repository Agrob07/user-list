import React from "react";
import { deleteUser } from "../features/counter/counterSlice";
import { useDispatch } from "react-redux";

function Tooltip({ toggleModal, show, rowId }) {
  const dispatch = useDispatch();
  return (
    <>
      {show ? (
        <div>
          <div className="py-12 ">
            <div className="mx-auto container max-w-[228px] px-4 py-4 bg-white rounded relative">
              <p className="text-sm font-semibold leading-none text-gray-800 leading-4">
                Are you sure?
              </p>
              <div className=" pt-3 flex gap-2">
                <button
                  onClick={() => {
                    toggleModal();
                  }}
                  className="text-xs font-medium leading-3 text-center text-indigo-700 px-3 py-2 border 
      rounded-md border-indigo-700 w-full hover:bg-gray-100 transform duration-300 ease-in-out"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    dispatch(deleteUser(rowId));
                    toggleModal();
                  }}
                  className="text-xs font-medium leading-3 text-center text-white px-3 py-2
       bg-indigo-700 rounded-md w-full hover:bg-indigo-600 transform duration-300 ease-in-out"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
          <style>
            {`
      
body{
    background:rgb(229 231 235);
}`}
          </style>
        </div>
      ) : null}
    </>
  );
}
export default Tooltip;
