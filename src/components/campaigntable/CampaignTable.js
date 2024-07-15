import React, { useState } from "react";
import PropTypes from "prop-types";
import withSorting from "./withSorting";
import { columns } from "./columns";

const CampaignTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  // Handle search term change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e, column) => {
    setFilters({ ...filters, [column.uid]: e.target.value });
  };

  // Render table rows
  const renderRows = () => {
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

    return filteredData.map((row) => (
      <tr key={row.id}>
        {" "}
        {columns.map((column) => (
          <td
            key={`${row.id}-${column.uid}`}
            className="p-2 align-middle text-center border-b"
          >
            {column.uid === "limitedRepeatance" ? (
              row[column.uid] ? (
                "Yes"
              ) : (
                "No"
              )
            ) : column.uid === "mainType" || column.uid === "subType" ? (
              <span className={getColorClass(row[column.uid])}>
                {" "}
                {row[column.uid]}{" "}
              </span>
            ) : (
              row[column.uid]
            )}{" "}
          </td>
        ))}{" "}
      </tr>
    ));
  };

  // Function to determine color class based on mainType and subType values
  const getColorClass = (value) => {
    switch (value) {
      case "Premium":
        return "bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs";
      case "Burn":
        return "bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs";
      case "Top":
        return "bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs";
      case "Latest":
        return "bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs";
      default:
        return "bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs";
    }
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
                {column.filterOptions.map((option) => (
                  <option key={option} value={option}>
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
          <h6> Campaign Table </h6>{" "}
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
                    >
                      {column.name}{" "}
                    </th>
                  ))}{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody> {renderRows()} </tbody>{" "}
            </table>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

CampaignTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default withSorting(CampaignTable);
