import React from 'react'
import PropTypes from 'prop-types'

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
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  color: PropTypes.string,
  marginBottom: PropTypes.number, 
}
export default Button