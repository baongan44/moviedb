import React, { useCallback, useEffect, useMemo, useState } from "react";
import { tmdbApi } from "../../api/api";
import { sessionId } from "../../utils/config";
import MovieCardEdit from "../movie-card/MovieCardEdit";
import "./favorite.scss";

interface Props {
  accountId?: any;
  filter?: any;
  sortBy?: any;
}
const Favorite = ({ accountId, filter, sortBy }: Props) => {
  const [favoriteList, setFavoriteList] = useState(null as any);
  const getFavoriteList = useCallback(async () => {
    const params = {
      session_id: sessionId,
      sort_by: sortBy === "DESC" ? "created_at.desc" : "created_at.asc",
    };
    const res = await tmdbApi.getStatusList(
      accountId,
      "favorite",
      filter?.toLowerCase(),
      params
    );
    setFavoriteList(res?.results);
  }, [accountId, filter, sortBy]);

  useEffect(() => {
    getFavoriteList();
  }, [getFavoriteList, sortBy]);

  return (
    <div className="favorite-card">
      {favoriteList?.map((movie: any, i: number) => (
        <MovieCardEdit
          key={i}
          data={movie}
          filter={filter}
          category={"favorite"}
          getList={getFavoriteList}
        />
      ))}
    </div>
  );
};

export default Favorite;
