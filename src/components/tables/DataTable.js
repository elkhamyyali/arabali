import React, { useState } from "react";
import "daisyui";

const DataTable = ({ columns, data, requestSort, sortConfig }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col mb-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 rounded w-full"
          />
        </div>{" "}
      </div>{" "}
      <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl">
        <div className="px-6 py-3 mb-0 bg-white border-b-0 rounded-t-2xl">
          <h6> Data Table </h6>{" "}
        </div>{" "}
        <div className="flex-auto px-0 pt-0 pb-2">
          <div className="p-0 overflow-x-auto">
            <table className="w-full mb-0 text-slate-500">
              <thead className="align-bottom">
                <tr>
                  {" "}
                  {columns.map((column) => (
                    <th
                      key={column.accessor}
                      className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-b-solid tracking-none whitespace-nowrap text-xs border-b-gray-200"
                      onClick={() => requestSort(column.accessor)}
                    >
                      {column.Header}{" "}
                      {sortConfig.key === column.accessor
                        ? sortConfig.direction === "ascending"
                          ? " ↑"
                          : " ↓"
                        : ""}{" "}
                    </th>
                  ))}{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                {filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {" "}
                    {columns.map((column) => (
                      <td
                        key={column.accessor}
                        className="p-2 align-middle bg-transparent border-b text-xs whitespace-nowrap border-b-gray-200 text-center"
                      >
                        {row[column.accessor]}{" "}
                      </td>
                    ))}{" "}
                  </tr>
                ))}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default DataTable;
