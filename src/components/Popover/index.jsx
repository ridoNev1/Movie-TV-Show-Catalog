import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const solutions = [
  {
    name: "Jakarta",
    description: "Temukan Lebih Banyak di Jakarta",
    href: "##",
  },
  {
    name: "Bandung",
    description: "Pilihan di Kota Bandung",
    href: "##",
  },
  {
    name: "Bogor",
    description: "Telusuri Pilihan Yang Ada di Bogor",
    href: "##",
  },
  {
    name: "Jogja",
    description: "Pengalaman Lain Dari Kota Jogja",
    href: "##",
  },
];

const PopOver = ({ ListData, ButtonComponent }) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`inline-flex justify-center px-4 py-2 text-sm font-medium focus:outline-none opacity-95 bg-transparent basic-popover-button-for-nav`}
          >
            {ButtonComponent}
            {open ? (
              <IoIosArrowUp className="-mr-1 ml-2 h-5 w-5" />
            ) : (
              <IoIosArrowDown
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="rightFloatyThing absolute z-10 w-screen max-w-sm px-4 mt-3 sm:px-0 -left-12 xl:max-w-xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 xl:grid-cols-2">
                  {solutions.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                        <span>tempat img</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900 overflowing-for-text">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 overflowing-for-text">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PopOver;
