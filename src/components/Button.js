import React from "react";
import "./Button.css";

/**
 * A simple button component for use accross the app.
 * 
 * @param onClick the function to execute on click
 * @param children the textual contents of the button
 * @param className any class information
 * @param ...rest any further props to use with the button
 * @return A clickable button
*/
function Button({ onClick, children, className = "button", ...rest }) {
  return (
    <button onClick={onClick} className={className} {...rest}>
      {children}</button>
  );
}

export default Button;
