import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { BsCalendar2Date } from "react-icons/bs";
import { DateFormat } from "../../lib/DateFormatter";
import { NoImage } from "../../assets";

const Card = ({ data, onClick }) => {
  return (
    <div
      className="hover:scale-105 transition"
      onClick={() => !data?.gender && onClick(data)}
    >
      <div className="cursor-pointer poppins-font h-full max-w-[220px] bg-white shadow-card rounded-lg">
        <img
          className="rounded-lg rounded-b-none max-h-48 object-cover w-full"
          src={
            data?.poster_path || data?.backdrop_path || data?.profile_path
              ? `${process.env.REACT_APP_ASSET_URL}${
                  data?.poster_path || data?.backdrop_path || data?.profile_path
                }`
              : NoImage
          }
          alt="thumbnail"
          loading="lazy"
        />
        <div className="flex justify-between -mt-4 px-4">
          <span className="inline-block ring-4 bg-[#403359] ring-white rounded-full text-sm font-medium tracking-wide text-gray-100 px-3 pt-0.5">
            {data?.title
              ? "movie"
              : data?.known_for_department
              ? data?.known_for_department
              : "tv shows"}
          </span>
          <span className="flex h-min space-x-1 items-center rounded-full text-subtitle bg-white py-1 px-2 text-xs font-medium">
            {!data?.gender && <BsCalendar2Date />}
            <p className="text-subtitle font-semibold text-xs">
              {data?.release_date || data?.first_air_date
                ? DateFormat(data?.release_date || data?.first_air_date)
                : data?.gender
                ? data?.gender === 1
                  ? "Female"
                  : "Male"
                : "uknow"}
            </p>
          </span>
        </div>
        <div className="py-2 px-4">
          <div className="font-semibold text-[16px] leading-5 text-gray-700 __text-elipsis-two-line min-h-[40px]">
            {data?.title || data?.name || "no name"}
          </div>
        </div>
        {!data.known_for_department && (
          <div className="px-4 space-y-2">
            <p className="text-gray-600 text-sm font-normal leading-5 tracking-wide __text-elipsis-two-line min-h-[40px]">
              {data?.overview || "no overview avaliable"}
            </p>
          </div>
        )}

        <div className="h-full w-full px-4 mt-4">
          <div className="flex border-t border-gray-300 w-full py-1.5">
            <div className="flex items-center space-x-3 w-full">
              <TiStarFullOutline className="text-2xl text-yellow-400" />
              <div className="text-sm font-medium">
                {data?.vote_average || data?.popularity || "no rating yet"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
