import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";

import { category, movieType, tvType, tmdbApi } from "../../api/api";
import { Col, Row } from "antd";
import GradientBtn from "../button/gradientBtn";
import { filterLists } from "../../data/data";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState(null);
  const [year, setYear] = useState("");
  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (!keyword) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, params);
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, params);
        }
      } else {
        const keys = {
          query: keyword,
          year: year,
        };
        response = await tmdbApi.search(props.category, keys);
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword, year]);
  
  const handleKeyword = (key) => {
    setKeyword(key);
  };
  const handleYear = (year) => {
    setYear(year);
  };
  const loadMore = async () => {
    let response = null;
    if (!keyword) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, params);
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, params);
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(props.category, params);
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <div>
      <Row className="movie-list-layout">
        <Col className="section mb-3" span={6}>
          <MovieSearch
            category={props.category}
            keyword={handleKeyword}
            year={handleYear}
          />
        </Col>
        <Col className="movie-grid" span={18}>
          {items.map((item, i) => (
            <MovieCard category={props.category} item={item} key={i} />
          ))}
        </Col>
        {page < totalPage ? (
          <div className="movie-grid__loadmore">
            <OutlineButton className="small" onClick={loadMore}>
              Load more
            </OutlineButton>
          </div>
        ) : null}
      </Row>
    </div>
  );
};

const MovieSearch = (props) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [filter, setFilter] = useState(filterLists[0].title);

  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const handleChooseFilter = (value) => {
    setFilter(value);
    setOpenFilter(!openFilter);
  };
  const handleSearch = () => {
    props.keyword(keyword);
    props.year(filter);
  };
  return (
    <div className="movie-search">
      <div className="filter">
        <div className="filter-title">
          <span>Filter</span>
        </div>
        <div className="filter-dropdown">
          <div className="filter-dropdown__title">Sort results by</div>
          <div className="filter-dropdown__content" onClick={handleFilter}>
            {filter}
            <span>
              <i
                className="bx bxs-down-arrow"
                style={{
                  transform: openFilter ? "rotateX(180deg)" : "rotateX(0deg)",
                }}
              ></i>
            </span>
          </div>
          <div
            className="filter-dropdown__list"
            style={{ display: openFilter ? "block" : "none" }}
          >
            <ul>
              {filterLists.map((ele, i) => (
                <li key={i} onClick={() => handleChooseFilter(ele.title)}>
                  {ele.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="search">
        <div className="search-title">
          <span>Search</span>
        </div>
        <div className="search-input">
          <div className="search-input__title">Search</div>
          <div className="search-input__input">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <GradientBtn name="Search" onClick={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieGrid;
