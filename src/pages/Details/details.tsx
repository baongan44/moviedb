import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdbApi } from "../../api/api";
import MovieList from "../../components/movie-list/MovieList";
import apiConfig from "../../utils/apiConfig";
import CastList from "./cardList";
import VideoList from "./videoList";
import "./details.scss";
import { Progress } from "antd";
import styled from "styled-components";
import { boolean } from "yup";

const Details = () => {
  const { category, id } = useParams<any>();

  const [item, setItem] = useState(null as any);
  const [addList, setAddList] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [watchList, setWatchList] = useState<boolean>(false);
  const [rate, setRate] = useState<boolean>(false);
  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, {});
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  const listsAction = useMemo(() => {
    return [
      {
        name: "Add To List",
        icon: addList ? "bx bx-list-check" : "bx bx-list-plus",
        color: "",
        onClick: () => {
          setAddList(!addList)
        },
        dropdown: "",
      },
      {
        name: "Add To Favorite",
        icon: favorite ? "bx bxs-heart" : "bx bx-heart",
        color: favorite ? "rgb(239,71,182)" : "unset",
        onClick: () => {
          setFavorite(!favorite)
        },
        dropdown: "",
      },
      {
        name: "Add To Watchlist",
        icon: watchList ? "bx bxs-bookmark" : "bx bxs-bookmark",
        color: watchList ? "rgb(207,49,49)" : "unset",
        onClick: () => {
          setWatchList(!watchList)
        },
        dropdown: "",
      },
      {
        name: "Rated",
        icon: rate ? "bx bxs-star" : "bx bx-star",
        color: rate ? "rgb(238,196,7)" : "unset",
        onClick: () => {
          setRate(!rate)
        },
        dropdown: "",
      },
    ];
  }, [addList, favorite, rate, watchList]);
  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre: any, i: any) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <div className="range">
                <div>
                  <RangeCircle
                    type="circle"
                    percent={item?.vote_average * 10}
                    strokeColor={{
                      "100%": `${
                        item?.vote_average * 10 > 70
                          ? "rgb(28,149,90)"
                          : "rgb(210,213,49)"
                      }`,
                    }}
                  />
                </div>
                <div className="lists-action">
                  {listsAction.map((ele, i) => (
                    <div
                      key={i}
                      className="lists-action__item"
                      onClick={ele.onClick}
                    >
                      <i className={ele.icon} style={{color: ele.color}}></i>
                    </div>
                  ))}
                </div>
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;

const RangeCircle = styled(Progress)`
  transition: transform 0.2s;
  & div {
    width: 60px !important;
    height: 60px !important;
  }
  & svg {
    background: rgb(8, 28, 34);
  }
  & span {
    color: #fff !important;
    font-weight: 600;
    font-size: 13px !important;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
