import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdbApi } from "../../api/api";
import MovieList from "../../components/movie-list/MovieList";
import apiConfig from "../../utils/apiConfig";
import CastList from "./cardList";
import VideoList from "./videoList";
import "./details.scss";
import { Progress } from "antd";
import styled from "styled-components";

const Details = () => {
  const { category, id } = useParams<any>();

  const [item, setItem] = useState(null as any);
  const [addList, setAddList] = useState<boolean>(false);
  const [rate, setRate] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isWatchList, setIsWatchList] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = {
    session_id: localStorage.getItem("session_id"),
  };
  const getStatusCard = useCallback(async () => {
    const res = await tmdbApi.getStatus(id, category, params);
    setIsFavourite(res?.favorite);
    setIsWatchList(res?.watchlist);
  }, [category, id, params]);

  const addToFavorite = useCallback(async () => {
    const data = {
      media_type: category,
      media_id: id,
      favorite: !isFavourite,
    };
    await tmdbApi.maskAsStatus(id, "favorite", params, data);
    getStatusCard();
  }, [category, getStatusCard, id, isFavourite, params]);

  const addToWatchList = useCallback(async () => {
    const data = {
      media_type: category,
      media_id: id,
      watchlist: !isWatchList,
    };
    await tmdbApi.maskAsStatus(id, "watchlist", params, data);
    getStatusCard();
  }, [category, getStatusCard, id, isWatchList, params]);

  useEffect(() => {
    getStatusCard();
  }, [getStatusCard]);

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
          setAddList(!addList);
        },
        dropdown: "",
      },
      {
        name: "Add To Favorite",
        icon: isFavourite ? "bx bxs-heart" : "bx bx-heart",
        color: isFavourite ? "rgb(239,71,182)" : "unset",
        onClick: () => {
          addToFavorite();
        },
        dropdown: "",
      },
      {
        name: "Add To Watchlist",
        icon: isWatchList ? "bx bxs-bookmark" : "bx bxs-bookmark",
        color: isWatchList ? "rgb(207,49,49)" : "unset",
        onClick: () => {
          addToWatchList();
        },
        dropdown: "",
      },
      {
        name: "Rated",
        icon: rate ? "bx bxs-star" : "bx bx-star",
        color: rate ? "rgb(238,196,7)" : "unset",
        onClick: () => {
          setRate(!rate);
        },
        dropdown: "",
      },
    ];
  }, [addList, addToFavorite, addToWatchList, isFavourite, isWatchList, rate]);
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
                      <i className={ele.icon} style={{ color: ele.color }}></i>
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
