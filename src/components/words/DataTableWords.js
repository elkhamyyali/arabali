import React, { useState } from "react";
import PropTypes from "prop-types";
import withSorting from "./withSorting";
import { wordColumns } from "./columns";

const DataTableWords = ({ data, requestSort, sortConfig }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const filteredData = data.filter((item) =>
    Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
          <h6> Words Table </h6>{" "}
        </div>{" "}
        <div className="flex-auto px-0 pt-0 pb-2">
          <div className="p-0 overflow-x-auto">
            <table className="w-full mb-0 text-slate-500">
              <thead className="align-bottom">
                <tr>
                  {" "}
                  {wordColumns.map((column) => (
                    <th
                      key={column.uid}
                      onClick={() => requestSort(column.uid)}
                      className={`px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-b-solid tracking-none whitespace-nowrap text-xs border-b-gray-200 ${getClassNamesFor(
                        column.uid
                      )}`}
                    >
                      {column.name}{" "}
                    </th>
                  ))}{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                {filteredData.map((row) => (
                  <tr key={row.id}>
                    {" "}
                    {wordColumns.map((column) => (
                      <td
                        key={`${row.id}-${column.uid}`}
                        className="p-2 align-middle text-center border-b"
                      >
                        {row[column.uid]}{" "}
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

DataTableWords.propTypes = {
  data: PropTypes.array.isRequired,
  requestSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.object,
};

export default withSorting(DataTableWords);
