const filterReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    filter,
  };
};

export { filterReducer as default, setFilter };
