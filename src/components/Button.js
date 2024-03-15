import React from "react";
import "./Button.css";

/* onClick allows for functional logic to assigned
  children allows for <Button> children content </Button>
   ...rest allows for additional arguments */

function Button({ onClick, children, className = "button", ...rest }) {
  return (
    <button onClick={onClick} className={className} {...rest}>
      {children}</button>
  );
}

export default Button;
