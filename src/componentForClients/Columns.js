

export const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "USERNAME",
    accessor: "username",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "PHONE",
    accessor: "phone",
  },
  {
    Header: "Company",
    accessor: "company.name",
  },
  {
    Header: "ACTION",
    accessor: "action",
    Cell: (cell) => (
      <div className="flex flex-col items-center justify-center m-0.5 mt-2 gap-1 mb-2">
        <button
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 
       focus:ring-indigo-600 mx-auto transition duration-150 ease-in-out 
       hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
        >
          Edit
        </button>

        <button
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
