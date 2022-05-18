import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { tmdbApi } from "../../api/api";
import MovieList from "../../components/movie-list/MovieList";
import apiConfig from "../../utils/apiConfig";
import CastList from "./cardList";
import VideoList from "./videoList";
import "./details.scss";
import { Alert, Progress } from "antd";
import styled from "styled-components";
import { accountId, sessionId } from "../../utils/config";

const Details = () => {
  const { category, id } = useParams<any>();
  const isConnect = localStorage.getItem("login");
  const [item, setItem] = useState(null as any);
  const [rate, setRate] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isWatchList, setIsWatchList] = useState<boolean>(false);
  const [openMyCreateList, setOpenMyCreateList] = useState<boolean>(false);
  const [openList, setOpenList] = useState<boolean>(false);
  const [createList, setCreateList] = useState(null as any);
  const [initValue, setInitValue] = useState("Choose Your List");
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const refSelectCurrent: any = useRef();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = {
    session_id: sessionId,
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

  const getCreateLists = useCallback(async () => {
    const res = await tmdbApi.getCreatedList(accountId, params);
    setCreateList(res.results);
  }, [params]);

  const addToCreateList = useCallback(
    async (listId: any) => {
      try {
        const data = {
          media_id: id,
        };
        await tmdbApi.addToCreateList(listId, params, data);
        setAlert(true);
      } catch (error) {
        setErrorAlert(true);
      }
    },
    [id, params]
  );

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

  useEffect(() => {
    const checkIfCloseOutside = (e: any) => {
      if (
        openList &&
        refSelectCurrent.current &&
        !refSelectCurrent.current.contains(e.target)
      ) {
        setOpenList(false);
      }
    };
    document.addEventListener("click", checkIfCloseOutside);
    return () => {
      document.removeEventListener("click", checkIfCloseOutside);
    };
  }, [openList]);

  const listsAction = useMemo(() => {
    return [
      {
        name: "Add To List",
        color: "",
        icon: "bx bx-list-plus",
        dropdown: (
          <div
            className="dropdown-list"
            style={{ display: openList ? "block" : "none" }}
          >
            <div className="dropdown-list__create">
              <i className="bx bx-layer-plus"></i> Create new list
            </div>
            <div className="dropdown-list__choose">
              <div
                className="dropdown-list__choose__init"
                onClick={(e: any) => {
                  e.stopPropagation();
                  setOpenMyCreateList(!openMyCreateList);
                }}
              >
                <span>{initValue}</span>{" "}
                <i
                  className="bx bx-chevrons-down"
                  style={{
                    transform: openMyCreateList
                      ? "rotateX(180deg)"
                      : "rotateX(0deg)",
                  }}
                ></i>
              </div>
              <ul
                className="dropdown-list__choose__list"
                style={{ display: openMyCreateList ? "block" : "none" }}
              >
                {createList?.map((ele: any, i: number) => (
                  <li
                    key={i}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setInitValue(ele?.name);
                      setOpenMyCreateList(!openMyCreateList);
                      addToCreateList(ele?.id);
                    }}
                  >
                    {ele?.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ),
        onClick: () => {
          setOpenList(!openList);
          getCreateLists();
        },
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
  }, [
    addToCreateList,
    addToFavorite,
    addToWatchList,
    createList,
    getCreateLists,
    initValue,
    isFavourite,
    isWatchList,
    openList,
    openMyCreateList,
    rate,
  ]);
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
                {isConnect === "CONNECTED" && (
                  <div className="lists-action">
                    {listsAction.map((ele, i) => (
                      <div
                        key={i}
                        className="lists-action__item"
                        onClick={ele.onClick}
                        ref={refSelectCurrent}
                      >
                        <i
                          className={ele.icon}
                          style={{ color: ele.color }}
                        ></i>
                        {ele.dropdown}
                      </div>
                    ))}
                  </div>
                )}
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
              <MovieList categoryData={category} type="similar" id={item.id} />
            </div>
          </div>
          {alert && (
            <div style={{ position: "fixed", top: "20%", right: "20px" }}>
              <Alert
                message="Successfully"
                description="Add to your list successful"
                closable
              />
            </div>
          )}
          {errorAlert && (
            <div style={{ position: "fixed", top: "20%", right: "20px" }}>
              <Alert
                message="Already Had"
                description="This item was add to your list already"
                type="error"
                closable
              />
            </div>
          )}
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
