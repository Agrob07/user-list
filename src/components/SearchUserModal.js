import React from "react";
import { Formik } from "formik";

const SearchUserModal = ({ inputValue, setInptValue }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setInptValue("");
  };

  let id;

  const handleChange = (e) => {
    if (id !== undefined) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      setInptValue(e.target.value);
    }, 500);
  };

  return (
    <Formik initialValues={inputValue}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <div className="w-full py-5 mt-8 ">
            <input
              name=""
              onChange={handleChange}
              value={props.inputValue}
              type="text"
              placeholder="search"
              className=" py-4 focus:outline-none text-base leading-4 text-gray-600 border-gray-400 border-b"
            />
          </div>
          {inputValue && (
            <button
              type="submit"
              className="text-base w-36 font-medium leading-4 py-4 
                  bg-sky-800 text-white uppercase mt-4 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 
                 focus:ring-sky-700 hover:bg-sky-700"
              onClick={(e) => handleClick(e)}
            >
              Clear Filter
            </button>
            
          )}
        </form>
      )}
    </Formik>
  );
};

export default SearchUserModal;
