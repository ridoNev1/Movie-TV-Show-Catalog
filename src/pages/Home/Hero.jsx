import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Typhography, Button } from "../../components";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <label
      onClick={() => onClick()}
      className="absolute right-0 inline-block text-secondarypurple cursor-pointer bg-white rounded-full shadow-md active:translate-y-0.5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};
const CustomLeftArrow = ({ onClick }) => {
  return (
    <label
      onClick={() => onClick()}
      className="absolute inline-block text-secondarypurple cursor-pointer bg-white rounded-full shadow-md active:translate-y-0.5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};

const Hero = ({ data, onRequestDetail }) => {
  return (
    <div className="bg-gray-800">
      <div className="mycontainer">
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          infinite={true}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={"desktop"}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className="py-5"
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
          autoPlay={true}
          autoPlaySpeed={4000}
        >
          {data?.map((el, index) => {
            return (
              <div
                key={index}
                className="px-9 py-3 flex justify-center items-center"
              >
                <div
                  className="w-11/12 h-[500px] object-cover rounded-3xl shadow-2xl"
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_ASSET_URL}${el?.backdrop_path})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="bg-gray-900 bg-opacity-50 w-full h-full flex items-center px-16">
                    <div className="space-y-4">
                      <Typhography
                        title="Now Playing"
                        color="text-buttonblue"
                      />
                      <Typhography title={el?.title} color="text-gray-100" />
                      <div className="__text-elipsis-many-line text-gray-200 max-w-lg">
                        {el?.overview}
                      </div>
                      <Button
                        label="View More"
                        onClickButton={() => onRequestDetail(el)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
