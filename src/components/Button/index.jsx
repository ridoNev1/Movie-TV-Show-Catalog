import React from "react";

const Button = ({ icon, label, onClickButton, customStyle }) => {
  return (
    <div>
      <button
        className={`${
          customStyle ? customStyle : "bg-buttonblue rounded-3xl"
        } text-white px-4 py-2 text-sm font-semibold border-0 focus:outline-none focus:ring-0 transition delay-75 shadow-md flex hover:bg-opacity-80`}
        onClick={onClickButton}
      >
        <span>{icon}</span> {label}
      </button>
    </div>
  );
};

export default Button;
