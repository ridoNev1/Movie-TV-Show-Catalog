import React, { useEffect, useState } from "react";
import { Carousel } from "../../components";
import axios from "axios";

const Home = () => {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=0deb1778235ad15f63b7b34040112116`
        );
        setTopRated(response.data.results);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    })();
  }, []);

  return (
    <div>
      <div className="mycontainer">
        <div className="my-4 font-semibold text-3xl poppins-font text-secondarypurple">
          Top Rated Movie
        </div>
        <div>{topRated && <Carousel data={topRated} />}</div>
      </div>
    </div>
  );
};

export default Home;
