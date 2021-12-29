import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { NoImage } from "../../assets";
import Button from "../Button";
import Typhography from "../Typhography";
import Loading from "../Loading";
import { BiMoviePlay, BiPlus, BiCheckCircle } from "react-icons/bi";
import { TiStarFullOutline } from "react-icons/ti";
import { DateFormat } from "../../lib/DateFormatter";

export default function Modal({ isOpen, closeModal, data }) {
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isListed, setIsListed] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (data) {
      (async () => {
        try {
          const responseMovieData = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/${
              data?.name ? "tv" : "movie"
            }/${data?.id}?api_key=${process.env.REACT_APP_API_KEY}`
          );
          setMovieDetail(responseMovieData.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [data]);

  useEffect(() => {
    setIsListed(false);
    const myList = localStorage.getItem("my-list");
    if (myList) {
      const newList = JSON.parse(myList);
      newList.map((el) => el?.id === data?.id && setIsListed(true));
    }
  }, [data?.id]);

  const handleMyList = (data) => {
    const myList = localStorage.getItem("my-list");
    const newList = myList ? [...JSON.parse(myList), data] : [data];
    localStorage.setItem("my-list", JSON.stringify(newList));
    setIsListed(true);
  };

  const removeWatchList = (id) => {
    const myList = JSON.parse(localStorage.getItem("my-list"));
    const newList = myList.filter((el) => el.id !== id);
    localStorage.setItem("my-list", JSON.stringify(newList));
    setIsListed(false);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-scroll bg-gray-900 bg-opacity-50 z-40 __styled-border-y"
          onClose={() => {
            closeModal();
            setLoading(true);
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {!loading ? (
                <div className="inline-block w-full max-w-[70vw] overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl">
                  <Button
                    label="Close"
                    customStyle="bg-danger absolute rounded-br-md"
                    onClickButton={() => {
                      closeModal();
                      setLoading(true);
                    }}
                  />
                  <img
                    src={
                      data?.backdrop_path
                        ? `${process.env.REACT_APP_ASSET_URL}${data?.backdrop_path}`
                        : NoImage
                    }
                    alt="pict backdrop"
                    className="w-full h-96 object-contain bg-gray-800"
                  />
                  <div className="grid grid-cols-2 mt-7 p-8 gap-x-5">
                    <div>
                      <Typhography
                        title={data?.title || data?.name || "no name"}
                        color="text-white"
                      />
                      <div className="mt-4 flex items-center space-x-3">
                        <Button
                          label={
                            isListed
                              ? "Added To Watch List"
                              : "Add To Watch List"
                          }
                          icon={
                            isListed ? (
                              <BiCheckCircle className="mr-2 h-4 w-4 mt-0.5 opacity-70" />
                            ) : (
                              <BiPlus className="mr-2 h-4 w-4 mt-0.5 opacity-70" />
                            )
                          }
                          onClickButton={() =>
                            isListed
                              ? removeWatchList(data.id)
                              : handleMyList(data)
                          }
                        />
                        {movieDetail?.homepage && (
                          <Button
                            label="Watch Now"
                            onClickButton={() =>
                              (window.location.href = movieDetail?.homepage)
                            }
                            icon={
                              <BiMoviePlay className="mr-2 h-4 w-4 mt-0.5 opacity-70" />
                            }
                          />
                        )}
                      </div>
                      <div>
                        <div className=" text-gray-300 font-medium max-w-lg mt-6">
                          {data?.overview || "no overview avaliable"}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex space-x-8">
                        <div>
                          <div className="text-white font-medium">Status :</div>
                          <div className="text-gray-200">
                            {movieDetail?.status}
                          </div>
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            First Aired Date :
                          </div>
                          <div className="text-gray-200">
                            {data?.release_date || data?.first_air_date
                              ? DateFormat(
                                  data?.release_date || data?.first_air_date
                                )
                              : data?.gender
                              ? data?.gender === 1
                                ? "Female"
                                : "Male"
                              : "uknow"}
                          </div>
                        </div>
                        <div>
                          <div className="text-white font-medium">Rate :</div>
                          <div className="flex items-center space-x-3 w-full">
                            <TiStarFullOutline className="text-2xl text-yellow-400" />
                            <div className="text-sm font-medium text-white">
                              {data?.vote_average ||
                                data?.popularity ||
                                "no rating yet"}
                            </div>
                          </div>
                        </div>
                      </div>
                      {movieDetail?.genres && (
                        <div>
                          <div className="text-white font-medium mt-4">
                            Genre :
                          </div>
                          <div className="flex items-center space-x-2 py-2">
                            {movieDetail?.genres?.map((el, index) => (
                              <div
                                key={index}
                                className="bg-mainpurple __text-elipsis-one-line text-center rounded-full py-1 px-4 shadow-md text-white"
                              >
                                {el.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <div className="text-white font-medium">
                          Created By :
                        </div>
                        {movieDetail[
                          movieDetail?.created_by
                            ? "created_by"
                            : "production_companies"
                        ].map((el, index) => (
                          <div
                            className="text-gray-200 flex items-center space-x-3 mt-3"
                            key={index}
                          >
                            <img
                              src={
                                el?.profile_path || el?.logo_path
                                  ? `${process.env.REACT_APP_ASSET_URL}${
                                      el?.profile_path || el?.logo_path
                                    }`
                                  : NoImage
                              }
                              className="w-10 h-10 rounded-full object-contain"
                              alt="profil"
                            />
                            <div>{el?.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="inline-block w-full h-64 max-w-[70vw] transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="flex justify-center items-center h-full">
                    <Loading />
                  </div>
                </div>
              )}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
