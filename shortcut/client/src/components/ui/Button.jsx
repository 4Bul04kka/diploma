import React from "react";

const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`px-6 py-2 rounded-2xl font-semibold shadow-md transition duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
