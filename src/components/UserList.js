import React, { useState, useMemo } from "react";
import SearchUserModal from "./SearchUserModal";
import TableList from "./TableList";

const UserList = ({ data, columns }) => {
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInptValue] = useState("");

  const dataSearch = useMemo(() => {
    return inputValue
      ? data.filter((item) => {
          const exceptId = { ...item, id: "" };
          return Object.values(exceptId).some((elem) => {
            return parseInt(elem)
              ? elem === inputValue
              : elem.includes(inputValue);
          });
        })
      : data;
  }, [data, inputValue]);

  const range = Math.ceil(dataSearch.length / itemsPerPage);
  const pages = Array.from({ length: range }, (_, i) => i + 1);
  const prev = currentPage - 1;
  const startIndx = prev * itemsPerPage;
  const endIndex = startIndx + itemsPerPage;

  const paginatedData = useMemo(() => {
    return dataSearch.filter((_, idx) => {
      return idx >= startIndx && idx < endIndex;
    });
  }, [dataSearch, endIndex, startIndx]);

  return (
    <div className="flex flex-col w-1/2 border-2 ">
      {paginatedData.length ? (
        <TableList data={paginatedData} columns={columns} />
      ) : (
        <div>No such result</div>
      )}
      <div className="flex items-center justify-center">
        {pages.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className="text-brand w-10 h-10
             flex justify-center items-center  
                cursor-pointer focus:bg-gray-100 dark:
               focus:bg-sky-200 hover:bg-sky-100 "
            onClick={() => {
              setCurrentPage(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <SearchUserModal
        inputValue={inputValue}
        setCurrentPage={setCurrentPage}
        setInptValue={setInptValue}
      />
    </div>
  );
};
export default UserList;
