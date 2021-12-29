import React, { useEffect, useState } from "react";
import Input from "../Input";
import Dropdown from "../Dropdown";
import { typeOptions } from "../../static";
import { Logo } from "../../assets";
import { FaUserCircle } from "react-icons/fa";
import Loading from "../Loading";
import axios from "axios";
import { NoImage } from "../../assets";
import { IoIosPaper } from "react-icons/io";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState(null);
  const [searchList, setSearchList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchBy, setSearchBy] = useState("movie");
  const [modalOpen, setModalOpen] = useState({
    status: false,
    data: null,
  });

  useEffect(() => {
    if (searchVal) {
      setSearchLoading(true);
      searchMovie(searchVal, searchBy);
    }
    setSearchLoading(false);
  }, [searchVal, searchBy]);

  const searchMovie = async (search, searchby) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/search/${searchby}?query=${search}&api_key=${process.env.REACT_APP_API_KEY}&page=1`
      );
      setSearchList(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed w-full py-2 poppins-font shadow-md bg-white z-20">
      <div className="mycontainer flex justify-between items-center py-0.5">
        <img
          src={Logo}
          alt="Logo"
          className="w-28 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="relative">
          <div className="bg-gray-100 rounded grid grid-flow-col divide-x-2 max-w-max p-1">
            <Dropdown
              title="Movie"
              noBorder={true}
              dropdownOpts={typeOptions}
              onChangeValue={(el) => setSearchBy(el)}
              viewMore
            />
            <Input
              placeholder="Search"
              customStyles="bg-transparent min-w-[30vw]"
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>
          {searchVal && (
            <div className="absolute bg-white w-full mt-2 shadow-xl rounded p-5 z-20 overflow-y-scroll max-h-433 __styled-border-y">
              {!searchLoading ? (
                searchList.length > 0 ? (
                  searchList.map((el, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-6 py-2 px-1 rounded cursor-pointer hover:bg-gray-200"
                      onClick={() => setModalOpen({ status: true, data: el })}
                    >
                      <img
                        src={
                          el?.poster_path || el?.backdrop_path
                            ? `${process.env.REACT_APP_ASSET_URL}${
                                el?.poster_path || el?.backdrop_path
                              }`
                            : NoImage
                        }
                        alt="pict"
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="text-sm">
                        <p className="font-medium text-textDefault __text-elipsis-one-line">
                          {el?.title || el?.name}
                        </p>
                        <p className="text-subtitle __text-elipsis-one-line">
                          {el?.overview || "no overview data"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-subtitle flex items-center">
                    <IoIosPaper />
                    Tidak ada data
                  </span>
                )
              ) : (
                <Loading />
              )}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center gap-8">
          <button
            className={
              "bg-secondarypurple text-white px-4 py-1.5 text-sm font-semibold border-solid border-2 border-mainbg-mainpurple focus:outline-none focus:ring-0 rounded-3xl transition delay-75 shadow-md flex"
            }
            onClick={() => navigate("/my-list")}
          >
            <span>
              <FaUserCircle className="mr-2 h-4 w-4 mt-0.5 opacity-70" />
            </span>{" "}
            My List
          </button>
        </div>
        <Modal
          isOpen={modalOpen.status}
          closeModal={() => setModalOpen({ data: null, status: false })}
          data={modalOpen.data}
        />
      </div>
    </div>
  );
};

export default Navbar;
