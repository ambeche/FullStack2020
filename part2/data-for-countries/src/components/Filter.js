import React from "react";

const Filter = ({ searchCountry, searchText }) => {
  return (
    <>
      <div>
        Find Countries: <input type="search" value={searchText} onChange={searchCountry} />
      </div>
    </>
  );
};

export default Filter;