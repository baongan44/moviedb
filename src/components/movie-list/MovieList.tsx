import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./movie-list.scss";

import { SwiperSlide, Swiper } from "swiper/react";

import MovieCard from "../movie-card/MovieCard";
import { category, movieType, timeType, tmdbApi } from "../../api/api";

interface Props {
  categoryData: string;
  type: string;
  id?: any;
  time?: any;
}

const MovieList = ({ categoryData, type, id, time = timeType.day }: Props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};
      if (type !== "similar") {
        switch (categoryData) {
          case category.movie:
            response = await tmdbApi.getMoviesList(type, params);
            break;
          case category.all:
            response = await tmdbApi.getTrendingTime(type, time);
            break;
          default:
            response = await tmdbApi.getTvList(type, params);
        }
      } else {
        response = await tmdbApi.similar(categoryData, id);
      }
      setItems(response.results);
    };
    getList();
  }, [categoryData, id, time, type]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} slidesPerView={"auto"} spaceBetween={10}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={categoryData} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
