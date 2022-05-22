import { Pagination } from "antd";
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
  const [page, setPage] = useState(1);
  const getFavoriteList = useCallback(async () => {
    const params = {
      session_id: sessionId,
      sort_by: sortBy === "DESC" ? "created_at.desc" : "created_at.asc",
      page: page,
    };
    const res = await tmdbApi.getStatusList(
      accountId,
      "favorite",
      filter?.toLowerCase(),
      params
    );
    setFavoriteList(res);
  }, [accountId, filter, page, sortBy]);

  useEffect(() => {
    getFavoriteList();
  }, [getFavoriteList, sortBy]);

  return (
    <div className="favorite-card">
      {favoriteList?.results?.map((movie: any, i: number) => (
        <MovieCardEdit
          key={i}
          data={movie}
          filter={filter}
          category={"favorite"}
          getList={getFavoriteList}
        />
      ))}
      {page > 1 && (
        <div className="profile-pagination">
          <Pagination
            total={favoriteList?.total_pages}
            current={page}
            defaultPageSize={10}
            showSizeChanger={false}
            onChange={(page) => {
              setPage(page);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Favorite;
