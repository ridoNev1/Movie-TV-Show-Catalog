import React, { useEffect, useState, Suspense } from "react";
import { Loading, Typhography, Loading2 } from "../../components";
import axios from "axios";
import Hero from "./Hero";
const Carousel = React.lazy(() => import("../../components/Carousel"));

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [topRated, setTopRated] = useState([]);
  const [moviePopular, setMoviePopular] = useState([]);
  const [movieNowPlaying, setMovieNowPlaying] = useState([]);
  const [upcomingMovie, setUpcomingMovie] = useState([]);
  const [onAirTv, setOnAirTv] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);
  const [airingTodayTv, setAiringTodayTv] = useState([]);
  const [peoplePopular, setPeoplePopular] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const responseMovieTopRated = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const responseMoviePopular = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const responseMovieNowPlaying = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const responseMovieUpcoming = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const responseTvPopular = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const responseTvOnAir = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const responseTvTopRated = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const responseTvAiringToday = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const responsePopularPeople = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/person/popular?api_key=${process.env.REACT_APP_API_KEY}`
        );

        setPeoplePopular(responsePopularPeople.data.results);
        setTopRated(responseMovieTopRated.data.results);
        setMoviePopular(responseMoviePopular.data.results);
        setMovieNowPlaying(responseMovieNowPlaying.data.results);
        setUpcomingMovie(responseMovieUpcoming.data.results);
        setPopularTv(responseTvPopular.data.results);
        setOnAirTv(responseTvOnAir.data.results);
        setTopRatedTv(responseTvTopRated.data.results);
        setAiringTodayTv(responseTvAiringToday.data.results);

        setLoading(false);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    })();
  }, []);

  return loading === false ? (
    <div>
      <Hero data={movieNowPlaying} />
      <div className="mt-11">
        <div className="mycontainer my-3">
          <div className="mt-4">
            <Typhography title="Top Rated Movie" />
            <div>
              {topRated && topRated.length > 0 && (
                <Suspense fallback={<Loading2 />}>
                  <Carousel data={topRated} />
                </Suspense>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Typhography title="Popular Movie" />
            <div>
              {moviePopular && moviePopular.length > 0 && (
                <Suspense fallback={<Loading2 />}>
                  <Carousel data={moviePopular} />
                </Suspense>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Typhography title="Upcoming Movie" />
            <div>
              {upcomingMovie && upcomingMovie.length > 0 && (
                <Suspense fallback={<Loading2 />}>
                  <Carousel data={upcomingMovie} />
                </Suspense>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Typhography title="Popular People" />
            <div>
              {peoplePopular && peoplePopular.length > 0 && (
                <Suspense fallback={<Loading2 />}>
                  <Carousel data={peoplePopular} />
                </Suspense>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Typhography title="On the Air Tv Shows" />
            <div>
              {onAirTv && onAirTv.length > 0 && (
                <Suspense fallback={<Loading2 />}>
                  <Carousel data={onAirTv} />
                </Suspense>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Typhography title="Popular Tv Shows" />
            <div>
              {popularTv && popularTv.length > 0 && (
                <Suspense fallback={<Loading2 />}>
                  <Carousel data={popularTv} />
                </Suspense>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Typhography title="Top Rated Tv Shows" />
            <div>
              {topRatedTv && topRatedTv.length > 0 && (
                <Suspense fallback={<Loading2 />}>
                  <Carousel data={topRatedTv} />
                </Suspense>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Typhography title="Airing Today Tv Shows" />
            <div>
              {airingTodayTv && airingTodayTv.length > 0 && (
                <Suspense fallback={<Loading2 />}>
                  <Carousel data={airingTodayTv} />
                </Suspense>
              )}
            </div>
          </div>
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
