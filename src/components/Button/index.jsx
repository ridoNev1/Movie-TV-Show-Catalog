import React from "react";

const Button = ({ icon, label, onClickButton }) => {
  return (
    <div>
      <button
        className={
          "bg-buttonblue text-white px-4 py-2 text-sm font-semibold border-0 focus:outline-none focus:ring-0 rounded-3xl transition delay-75 shadow-md flex hover:bg-opacity-80"
        }
        onClick={onClickButton}
      >
        <span>
          {icon && <icon className="mr-2 h-4 w-4 mt-0.5 opacity-70" />}
        </span>{" "}
        {label}
      </button>
    </div>
  );
};

export default Button;
