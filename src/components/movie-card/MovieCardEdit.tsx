import { Progress } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { tmdbApi } from "../../api/api";
import apiConfig from "../../utils/apiConfig";
import "./movie-card.scss";

const MovieCardEdit = ({ data, filter }: { data: any; filter: string }) => {
  const type: string = filter === "Movies" ? "movie" : filter.toLowerCase();
  const [isFavourite, setIsFavourite] = useState(false);
  const [isWatchList, setIsWatchList] = useState(false);
  const history = useHistory();
  const getStatusCard = useCallback(async () => {
    const params = {
      session_id: localStorage.getItem("session_id"),
    };
    const res = await tmdbApi.getStatus(data?.id, type, params);
    setIsFavourite(res?.favorite);
    setIsWatchList(res?.watchlist);
  }, [data?.id, type]);

  useEffect(() => {
    getStatusCard();
  }, [getStatusCard]);
  return (
    <div
      className="card-edit"
      onClick={() => {
        history.push(`/${type}/${data?.id}`);
      }}
    >
      <div className="card-edit__img">
        <img
          src={`${apiConfig.w500Image(
            data?.backdrop_path || data?.poster_path
          )}`}
          alt="img"
        />
      </div>
      <div className="card-edit__content">
        <div className="card-edit__content__title">
          <div className="rate">
            <RangeCircle
              type="circle"
              percent={data?.vote_average * 10}
              strokeColor={{
                "100%": `${
                  data?.vote_average * 10 > 70
                    ? "rgb(28,149,90)"
                    : "rgb(210,213,49)"
                }`,
              }}
            />
          </div>
          <div className="date">
            <div>{data?.title || data?.original_name}</div>
            <div>
              {new Date(data?.release_date || data?.first_air_date)
                .toUTCString()
                .slice(0, 17)}
            </div>
          </div>
        </div>
        <div className="card-edit__content__des">
          <p>{data?.overview}</p>
        </div>
        <div className="card-edit__content__edit">
          <div>
            <i
              className="bx bx-heart-circle"
              style={{ color: isFavourite ? "#ef47b6" : "unset" }}
            ></i>{" "}
            Favorite
          </div>
          <div>
            <i
              className="bx bx-check-circle"
              style={{ color: isWatchList ? "#1c955a" : "unset" }}
            ></i>{" "}
            Add to Watchlist
          </div>
          <div>
            <i className="bx bx-x-circle"></i> Remove
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardEdit;

const RangeCircle = styled(Progress)`
  transition: transform 0.2s;
  & div {
    width: 45px !important;
    height: 45px !important;
  }
  & svg {
    background: rgb(8, 28, 34);
  }
  & span {
    color: #fff !important;
    font-weight: 600;
    font-size: 12px !important;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
