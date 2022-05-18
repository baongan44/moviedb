import React from "react";

import "./movie-card.scss";

import { Link } from "react-router-dom";

import Button from "../button/Button";
import { category } from "../../api/api";
import apiConfig from "../../utils/apiConfig";
import { Progress } from "antd";
import styled from "styled-components";

const MovieCard = (props) => {
  const item = props.item;

  const link = "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
        <RangeCircle
          type="circle"
          percent={(item?.vote_average * 10).toFixed()}
          strokeColor={{
            "100%": `${item?.vote_average * 10 > 70 ? "rgb(28,149,90)" : "rgb(210,213,49)"}`,
          }}
        />
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;

const RangeCircle = styled(Progress)`
  position: absolute;
  right: 10%;
  bottom: -4%;
  & div {
    width: 35px !important;
    height: 35px !important;
  }
  & svg {
    background: rgb(8, 28, 34);
  }
  & span {
    color: #fff !important;
    font-weight: 600;
    font-size: 10px !important;
  }
`;
