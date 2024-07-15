import React, { useState } from "react";

const withSorting = (WrappedComponent) => {
  return (props) => {
    const [sortConfig, setSortConfig] = useState(null);

    const sortedData = [...props.data].sort((a, b) => {
      if (sortConfig !== null) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      }
      return 0;
    });

    const requestSort = (key) => {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    return (
      <WrappedComponent
        {...props}
        data={sortedData}
        requestSort={requestSort}
        sortConfig={sortConfig}
      />
    );
  };
};

export default withSorting;
