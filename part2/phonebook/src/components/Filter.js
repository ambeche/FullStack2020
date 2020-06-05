import React from "react";

const Filter = ({ handleSearch, searchText }) => {
  return (
    <>
      <div>
        Filter by name: <input type="search" value={searchText} onChange={handleSearch} />
      </div>
    </>
  );
};

export default Filter;
