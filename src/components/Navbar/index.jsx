import React from "react";
import Input from "../Input";
import Dropdown from "../Dropdown";
import { typeOptions } from "../../static";
import { Logo } from "../../assets";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="absolute w-full py-2 poppins-font shadow-md bg-white">
      <div className="mycontainer flex justify-between items-center py-0.5">
        <img src={Logo} alt="Logo" className="w-28" />
        <div className="bg-gray-100 rounded grid grid-flow-col divide-x-2 max-w-max p-1">
          <Dropdown
            title="Movie"
            noBorder={true}
            dropdownOpts={typeOptions}
            viewMore
          />
          <Input
            placeholder="Search"
            customStyles="bg-transparent min-w-[30vw]"
          />
        </div>
        <div className="flex justify-between items-center gap-8">
          <button
            className={
              "bg-secondarypurple text-white px-4 py-1.5 text-sm font-semibold border-solid border-2 border-mainbg-mainpurple focus:outline-none focus:ring-0 rounded-3xl transition delay-75 shadow-md flex"
            }
          >
            <span>
              <FaUserCircle className="mr-2 h-4 w-4 mt-0.5 opacity-70" />
            </span>{" "}
            My List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
