import React from "react";

const Notification = ({ notice }) => {
  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    border: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const toggleStyle = notice.code
    ? messageStyle
    : { ...messageStyle, color: "red" };

  if (notice.message === null) {
    return null;
  }

  return <div style={toggleStyle}>{notice.message}</div>;
};

export default Notification;
