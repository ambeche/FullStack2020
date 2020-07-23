import React, { useState, useImperativeHandle } from "react";

const ToggleVisibility = React.forwardRef((props, ref) => {
  const [visible, setVisibility] = useState(false);

  const hideOrShow = { display: visible ? "" : "none" };
  const toggleVisibility = () => setVisibility(!visible);
  const label = visible ? props.labelOne : props.labelTwo;

  useImperativeHandle(ref, () =>  (
    {toggleVisibility}
    )
  )

  return (
    <div>
        <div style={hideOrShow}> {props.children} </div>
        <button onClick={toggleVisibility}> {label} </button>
    </div>
  );
});

export default ToggleVisibility;
