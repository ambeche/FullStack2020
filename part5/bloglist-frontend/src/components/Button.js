import React from "react";

const Button = ({ marginBottom, color, label, handleClick }) => {
  const buttonStyle = {
    fontSize: label === '&#10003;' ? '20px' : '15px',
    borderRadius: 6,
    borderColor: 'white',
    backgroundColor: color,
    textDecoration: 'none',
    color: '#ffffff',
    marginBottom: marginBottom,
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