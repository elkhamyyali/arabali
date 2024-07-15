import React, { useState } from "react";
import PropTypes from "prop-types";
import "daisyui"; // Assuming this is your Tailwind CSS setup

import withSorting from "./withSorting";

const NewDataTable = ({ columns, data, requestSort, sortConfig }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  // Function to get classes for account state based on type
  const getAccountStateClasses = (accountState) => {
    switch (accountState) {
      case "New":
        return "bg-green-100 text-green-800";
      case "Checked":
        return "bg-yellow-100 text-yellow-800";
      case "To Check":
        return "bg-red-100 text-red-800";
      case "Old":
        return "bg-blue-100 text-blue-800";
      case "BackUse":
        return "bg-indigo-100 text-indigo-800";
      case "In Session":
        return "bg-purple-100 text-purple-800";
      case "Used Recheck":
        return "bg-gray-100 text-gray-800";
      case "Recheck":
        return "bg-green-100 text-green-800";
      case "Wrong Auth":
        return "bg-yellow-100 text-yellow-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle search term change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e, column) => {
    setFilters({ ...filters, [column.uid]: e.target.value });
  };

  // Render chip for account state with color coding
  const renderAccountStateCell = (row, column) => {
    const accountState = row[column.uid];
    const chipClasses = `inline-block px-3 py-1 rounded-full ${getAccountStateClasses(
      accountState
    )}`;

    return <span className={chipClasses}> {accountState} </span>;
  };

  // Filter data based on current filters and search term
  const filteredData = data
    .filter((item) => {
      // Filter by column filters
      return columns.every((column) => {
        if (!filters[column.uid]) return true;
        return item[column.uid]
          .toString()
          .toLowerCase()
          .includes(filters[column.uid].toLowerCase());
      });
    })
    .filter((item) => {
      // Filter by search term
      return Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

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
        {columns
          .filter((col) => col.filterOptions)
          .map((column) => (
            <div key={column.uid} className="mb-4">
              <select
                value={filters[column.uid] || ""}
                onChange={(e) => handleFilterChange(e, column)}
                className="select select-bordered w-full"
              >
                <option value=""> Filter by {column.name} </option>{" "}
                {column.filterOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {" "}
                    {option}{" "}
                  </option>
                ))}{" "}
              </select>{" "}
            </div>
          ))}{" "}
      </div>{" "}
      <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl">
        <div className="px-6 py-3 mb-0 bg-white border-b-0 rounded-t-2xl">
          <h6> New Data Table </h6>{" "}
        </div>{" "}
        <div className="flex-auto px-0 pt-0 pb-2">
          <div className="p-0 overflow-x-auto">
            <table className="w-full mb-0 text-slate-500">
              <thead className="align-bottom">
                <tr>
                  {" "}
                  {columns.map((column) => (
                    <th
                      key={column.uid}
                      className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-b-solid tracking-none whitespace-nowrap text-xs border-b-gray-200"
                      onClick={() => requestSort(column.uid)}
                    >
                      {column.name}{" "}
                      {sortConfig.key === column.uid
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
                        key={`${rowIndex}-${column.uid}`}
                        className="p-2 align-middle text-center bg-transparent border-b text-xs whitespace-nowrap border-b-gray-200"
                      >
                        {column.uid === "accountState"
                          ? renderAccountStateCell(row, column)
                          : column.uid === "isActive"
                          ? row[column.uid] === "Yes"
                            ? "Yes"
                            : "No"
                          : row[column.uid]}{" "}
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

NewDataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired,
      filterOptions: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  requestSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.object.isRequired,
};

export default withSorting(NewDataTable);
