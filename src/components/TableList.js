import React, { useCallback, useState, useEffect } from "react";
import { useTable } from "react-table";
import update from "immutability-helper";
import TableCard from "./TableCard";

function TableList({ data, data1, columns }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      data1,
    });
  const [cards, setCards] = useState(rows);
  useEffect(() => {
    setCards(rows);
  }, [data, data1, rows]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <table {...getTableProps()} className=" bg-white-500 w-full">
      <thead className="w-full">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className="" {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="w-full">
        {cards.map((card, idx) => {
          prepareRow(card);
          return (
            <TableCard
              key={card.id}
              id={card.id}
              index={idx}
              row={card}
              moveCard={moveCard}
            />
          );
        })}
      </tbody>
    </table>
  );
}
export default TableList;
