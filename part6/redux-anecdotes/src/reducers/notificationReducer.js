const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.message;
    case "RESET":
      return "";
    default:
      return state;
  }
};

const setNotification = (message, waitTime) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_MESSAGE",
      message,
    });
    await new Promise ( () => setTimeout(() => {
      dispatch({
        type: "RESET",
      });
    }, waitTime * 1000));
  };
};

export { notificationReducer as default, setNotification };
