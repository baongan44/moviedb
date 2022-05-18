import React, { useCallback, useEffect, useState } from "react";
import { tmdbApi } from "../../api/api";
import { sessionId } from "../../utils/config";
import MovieCardEdit from "../movie-card/MovieCardEdit";

interface Props {
  accountId?: any;
  filter?: any;
  sortBy?: any;
}
const WatchList = ({ accountId, filter, sortBy }: Props) => {
  const [watchList, setWatchList] = useState(null as any);

  const getWatchList = useCallback(async () => {
    const params = {
      session_id: sessionId,
      sort_by: sortBy === "DESC" ? "created_at.desc" : "created_at.asc",
    };
    const res = await tmdbApi.getStatusList(
      accountId,
      "watchlist",
      filter?.toLowerCase(),
      params
    );
    setWatchList(res?.results);
  }, [accountId, filter, sortBy]);

  useEffect(() => {
    getWatchList();
  }, [getWatchList, sortBy]);

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
