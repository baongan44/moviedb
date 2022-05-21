import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { category, movieType, timeType } from "../../api/api";
import { OutlineButton } from "../../components/button/Button";
import HeroSlide from "../../components/hero-slide/HeroSlide";
import MovieList from "../../components/movie-list/MovieList";
import Toggle from "../../components/Toggle/toggle";
import { routes } from "../../utils";

const Home = () => {
  const [popularData, setPopularData] = useState(category.movie);
  const [topRateData, setTopRateData] = useState(category.movie);
  const [titlePopular, setTitlePopular] = useState("Movies" as any);
  const [titleTop, setTitleTop] = useState("Movies" as any);
  const [routePopular, setRoutePopular] = useState(routes.movie);
  const [routeTop, setRouteTop] = useState(routes.movie);
  const [time, setTime] = useState(timeType.day);

  const handleOnToggleTrading = (event: any) => {
    setTitlePopular(event);
    switch (event) {
      case "Movies":
        setPopularData(category.movie);
        setRoutePopular(routes.movie);
        break;
      case "Tv":
        setPopularData(category.tv);
        setRoutePopular(routes.tvShow);
        break;
      default:
        setPopularData(category.movie);
    }
  };
  const handleOnToggleTop = (event: any) => {
    setTitleTop(event);
    switch (event) {
      case "Movies":
        setTopRateData(category.movie);
        setRouteTop(routes.movie);
        break;
      case "Tv":
        setTopRateData(category.tv);
        setRouteTop(routes.tvShow);
        break;
      default:
        setTopRateData(category.movie);
    }
  };
  const handleOnToggleTime = (event: any) => {
    if (event === "Today") {
      setTime(timeType.day);
    } else {
      setTime(timeType.week);
    }
  };
  useEffect(() => {
    if(localStorage.getItem("login") === "CONNECTED") {
      toast.success("Welcom to 'Milen Movie'", {
        position: "top-right",
        autoClose: 5000,
        draggablePercent: 60,
        theme: 'dark',
      })
    }
  })
  return (
    <>
      <ToastContainer />
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <div style={{ display: "flex", gap: "20px" }}>
              <h2>Popular {titlePopular}</h2>
              <Toggle
                firstName={"Movies"}
                secondName={"Tv"}
                handleToggle={handleOnToggleTrading}
              />
            </div>
            <div>
              <Link to={routePopular}>
                <OutlineButton className="small">View more</OutlineButton>
              </Link>
            </div>
          </div>
          <MovieList categoryData={popularData} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <div style={{ display: "flex", gap: "20px" }}>
              <h2>Top Rated {titleTop}</h2>
              <Toggle
                firstName={"Movies"}
                secondName={"Tv"}
                handleToggle={handleOnToggleTop}
              />
            </div>
            <Link to={routeTop}>
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList categoryData={topRateData} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <div style={{ display: "flex", gap: "20px" }}>
              <h2>What's trending</h2>
              <Toggle
                firstName={"Today"}
                secondName={"This week"}
                handleToggle={handleOnToggleTime}
              />
            </div>
            <Link to={routeTop}>
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList
            categoryData={category.all}
            type={category.movie}
            time={time}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
