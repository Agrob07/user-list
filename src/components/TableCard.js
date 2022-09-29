import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { addDev, deleteDev } from "../features/developerSlice";
import { addQA, deleteQA } from "../features/qaSlice";

const TableCard = ({ id, index, row, moveCard }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const style = {
    width: "100%",
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "white",
    cursor: "move",
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      };
    },

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        if (row.original.option === "QA") {
          dispatch(deleteQA(row.original.id));
          dispatch(addDev({ ...row.original, option: "Developer" }));
        } else {
          dispatch(deleteDev(row.original.id));
          dispatch(addQA({ ...row.original, option: "QA" }));
        }
        return;
      }
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));
  return (
    <tr
      ref={ref}
      data-handler-id={handlerId}
      style={{ ...style, opacity }}
      {...row.getRowProps()}
    >
      {row.cells.map((cell) => {
        return (
          <td
            style={{ border: "1px solid rgba(220,220,220 ,50)" }}
            {...cell.getCellProps()}
          >
            {cell.render("Cell")}
          </td>
        );
      })}
    </tr>
  );
};

export default TableCard;
