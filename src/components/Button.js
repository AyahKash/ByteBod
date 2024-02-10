import React from "react";
import "./Button.css";
// onClick allows for functional logic to assigned
// children allows for <Button> children content </Button>
// ...rest allows for additional additional arguments
function Button({ onClick, children, ...rest }) {
  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
