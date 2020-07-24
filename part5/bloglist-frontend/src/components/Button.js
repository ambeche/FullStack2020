import React from "react";

const Button = ({ marginBottom, color, label, handleClick }) => {
  const buttonStyle = {
    padding: 2,
    borderRadius: 6,
    display: 'inline',
    backgroundColor: color,
    color: '#ffffff',
    marginBottom: marginBottom
  }
  return (
    <>
      <button style={buttonStyle} onClick={handleClick}>
        {label}
      </button>
    </>
  );
};

export default Button