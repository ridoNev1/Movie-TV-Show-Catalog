import React from "react";

const Typhography = ({ title, color }) => {
  return (
    <div
      className={`${
        color ? color : "text-secondarypurple"
      } font-semibold text-2xl poppins-font drop-shadow`}
    >
      {title}
    </div>
  );
};

export default Typhography;
