import React, { useEffect, useState } from "react";
import { Card, Typhography, Modal } from "../../components";
import { NoImage } from "../../assets";

const MyList = () => {
  const [myList, setMyList] = useState(null);
  const [modalOpen, setModalOpen] = useState({
    status: false,
    data: null,
  });

  useEffect(() => {
    const myList = localStorage.getItem("my-list");
    if (myList) {
      const newList = JSON.parse(myList);
      setMyList(newList);
    }
  }, []);

  const removeWatchList = (id) => {
    const newList = myList.filter((el) => el.id !== id);
    localStorage.setItem("my-list", JSON.stringify(newList));
    setMyList(newList);
  };

  const handleMyList = (data) => {
    const newList = myList ? [...myList, data] : [data];
    localStorage.setItem("my-list", JSON.stringify(newList));
    setMyList(newList);
  };

  console.log(myList);

  return (
    <div className="mycontainer">
      <div className="mt-10">
        <Typhography title="My Movie List" />
        <div
          className="grid gap-5 mt-10 justify-center"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 220px))",
          }}
        >
          {myList && myList.length > 0 ? (
            myList.map((el) => (
              <div key={el.id}>
                <Card
                  data={el}
                  onClick={(data) => setModalOpen({ status: true, data: data })}
                />
              </div>
            ))
          ) : (
            <div className="w-[90vw] absolute">
              <div className="flex flex-col items-center justify-center">
                <img src={NoImage} alt="no data" className="max-w-xs" />
                <div className="text-gray-900">
                  Belum Ada Data Film Ingin Ditonton, Ayo Mulai Tambahkan
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalOpen.status}
        closeModal={() => setModalOpen({ data: null, status: false })}
        data={modalOpen.data}
        isMyList={(id) => removeWatchList(id)}
        addListed={(data) => handleMyList(data)}
      />
    </div>
  );
};

export default MyList;
