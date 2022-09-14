import React from "react";
import { useDrag, useDrop } from "react-dnd";
import TableList from "./TableList";

const UserList = ({ data, columns, a }) => {
  
  console.log(a,78);

  const  filterData = data.filter((item)=>item.option==="Developer"  )
  const  filterData1 = data.filter((item)=>item.option==="QA"  )


  return (
    <div className="flex justify-between items-center w-full gap-12 m-2 p-2">
   
       
    
      <div className="bg-slate-100	w-full">
      <TableList  data={filterData}  columns={columns} />
        
      </div>
      <div className="bg-slate-100	w-full">

      <TableList   data={filterData1}  columns={columns} />
      </div>



    </div>
  );
};
export default UserList;
