const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.message;
    case "RESET":
      return null;
    default:
      return state;
  }
};

const setMessage = (message) => {
  return {
    type: "NOTIFY",
    message,
  };
};

const resetMessage = () => {
  return {
    type: "RESET",
  };
};

const notify = (dispatch, message) => {
  dispatch(setMessage(message))

  setTimeout(() => {
    dispatch( resetMessage())
  }, 5000) 
};

export { notificationReducer as default, notify };
