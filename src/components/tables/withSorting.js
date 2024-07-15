import React from "react";

const withSorting = (WrappedComponent) => {
  return (props) => {
    const [sortConfig, setSortConfig] = React.useState({
      key: "",
      direction: "",
    });

    const sortedData = React.useMemo(() => {
      let sortableData = [...props.data];
      if (sortConfig.key) {
        sortableData.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableData;
    }, [props.data, sortConfig]);

    const requestSort = (key) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
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
