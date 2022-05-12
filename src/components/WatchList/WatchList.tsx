import React, { useCallback, useEffect, useState } from "react";
import { tmdbApi } from "../../api/api";
import MovieCardEdit from "../movie-card/MovieCardEdit";

interface Props {
  accountId?: any;
  filter?: any;
}
const WatchList = ({ accountId, filter }: Props) => {
  const [watchList, setWatchList] = useState(null as any);

  const getWatchList = useCallback(async () => {
    const params = {
      session_id: localStorage.getItem("session_id"),
      sort_by: "created_at.asc",
    };
    const res = await tmdbApi.getStatusList(
      accountId,
      "watchlist",
      filter?.toLowerCase(),
      params
    );
    setWatchList(res?.results);
  }, [accountId, filter]);

  useEffect(() => {
    getWatchList();
  }, [getWatchList]);

  return (
    <div className="favorite-card">
      {watchList?.map((movie: any, i: number) => (
        <MovieCardEdit
          key={i}
          data={movie}
          filter={filter}
          category={"watchlist"}
          getList={getWatchList}
        />
      ))}
    </div>
  );
};

export default WatchList;
