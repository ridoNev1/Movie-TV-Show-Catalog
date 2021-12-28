import React, { useEffect, useState } from "react";
import { Carousel, Loading, Typhography } from "../../components";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [topRated, setTopRated] = useState([]);
  const [moviePopular, setMoviePopular] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const responseTopRated = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const responseMoviePopular = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setTopRated(responseTopRated.data.results);
        setMoviePopular(responseMoviePopular.data.results);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    })();
  }, []);

  return loading === false ? (
    <div className="mycontainer my-3">
      <div className="mt-4">
        <Typhography title="Top Rated Movie" />
        <div>
          {topRated && topRated.length > 0 && <Carousel data={topRated} />}
        </div>
      </div>
      <div className="mt-4">
        <Typhography title="Popular Movie" />
        <div>
          {moviePopular && moviePopular.length > 0 && (
            <Carousel data={moviePopular} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <Loading />
      </div>
    </div>
  );
};

export default Home;
