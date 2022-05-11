import React, { useCallback, useEffect, useMemo, useState } from "react";
import { tmdbApi } from "../../api/api";
import MovieCardEdit from "../movie-card/MovieCardEdit";
import "./favorite.scss";

interface Props {
  accountId?: any;
}
const Favorite = ({ accountId }: Props) => {
  const filterList = useMemo(() => {
    return ["Movies", "Tv"];
  }, []);
  const [filter, setFilter] = useState(filterList[0] as string);
  const [openFilter, setOpenFilter] = useState(false);
  const [favoriteList, setFavoriteList] = useState(null as any);

  const getFavoriteList = useCallback(async () => {
    const params = {
      session_id: localStorage.getItem("session_id"),
      sort_by: "created_at.asc",
    };
    const res = await tmdbApi.getFavoriteList(
      accountId,
      filter.toLowerCase(),
      params
    );
    setFavoriteList(res?.results);
  }, [accountId, filter]);
  const handleFilter = (event: string) => {
    setFilter(event);
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    getFavoriteList();
  }, [getFavoriteList]);

  return (
    <div className="favorite">
      <div className="favorite-title">
        <h2>My Favorite Lists</h2>
        <div className="favorite-title-filter">
          <div className="favorite-title-filter__lists">
            <span>
              Filter:
              <span
                className="filter-text"
                onClick={() => {
                  setOpenFilter(!openFilter);
                }}
              >
                {filter}
                <i
                  className="bx bx-chevron-down"
                  style={{
                    transform: openFilter ? "rotateX(180deg)" : "rotateX(0deg)",
                  }}
                ></i>
              </span>
            </span>
            <div style={{ display: openFilter ? "block" : "none" }}>
              <ul>
                {filterList?.map((ele, i) => (
                  <li key={i} onClick={() => handleFilter(ele)}>
                    {ele}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="favorite-card">
        {favoriteList?.map((movie: any, i: number) => (
          <MovieCardEdit key={i} data={movie} filter={filter} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
