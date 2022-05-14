import { divide } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { tmdbApi } from "../../api/api";
import { routes } from "../../utils";
import { sessionId } from "../../utils/config";
import GradientBtn from "../button/gradientBtn";
import MovieCardEdit from "../movie-card/MovieCardEdit";
import "./mylists.scss";
const DetailList = () => {
  const [list, setList] = useState(null as any);
  const { id } = useParams<any>();
  const history = useHistory();
  const getDetail = useCallback(async () => {
    const res = await tmdbApi.getDetailList(id);
    setList(res);
  }, [id]);
  useEffect(() => {
    getDetail();
  }, [getDetail]);
  const handleClear = async () => {
    const params = {
      session_id: sessionId,
      confirm: true,
    };
    const data = {
      list_id: id,
    };
    await tmdbApi.clearList(id, params, data);
    getDetail();
  };
  const handleDelete = async () => {
    const params = {
      session_id: sessionId,
    };
    await tmdbApi.deleteList(id, params);
    history.push(`${routes.profile.event.lists.self}`)
  };
  return (
    <div className="favorite-card">
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <GradientBtn name="Clear List" onClick={handleClear} />
        <GradientBtn name="Delete List" onClick={handleDelete} />
      </div>
      {list?.item_count > 0 ? (
        <>
          {list?.items?.map((movie: any, i: number) => (
            <MovieCardEdit
              key={i}
              data={movie}
              filter={movie?.media_type}
              getList={getDetail}
              listId={id}
            />
          ))}
        </>
      ) : (
        <div className="not-found">No items were found...</div>
      )}
    </div>
  );
};

export default DetailList;
