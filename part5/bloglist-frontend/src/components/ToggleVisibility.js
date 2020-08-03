import React, { useState, useImperativeHandle } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

const ToggleVisibility = React.forwardRef((props, ref) => {
  const [visible, setVisibility] = useState(false);

  const hideOrShow = { display: visible ? "" : "none" };
  const label = visible ? props.labelOne : props.labelTwo;

  const toggleVisibility = () => {
    if (label === "Sign in" || label === "Register")
      label === "Register"
        ? props.setToggleSignUp(true)
        : props.setToggleSignUp(false);
    setVisibility(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideOrShow} className="hideOrShow">
        {" "}
        {props.children}{" "}
      </div>
      <Button
        handleClick={toggleVisibility}
        label={label}
        className={props.className}
        color={visible ? "orange" : "#008CBA"}
        marginBottom={10}
      />
    </div>
  );
});

ToggleVisibility.displayName = "ToggleVisibility";

ToggleVisibility.propTypes = {
  labelOne: PropTypes.string.isRequired,
  labelTwo: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default ToggleVisibility;
