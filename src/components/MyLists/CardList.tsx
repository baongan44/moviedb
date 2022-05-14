import React from "react";
import { useHistory } from "react-router-dom";
import { tmdbApi } from "../../api/api";
import { routes } from "../../utils";
import { sessionId } from "../../utils/config";
import "./mylists.scss";

const CardList = ({ data, getList }: { data: any; getList?: any }) => {
  const history = useHistory();
  const handleDelete = async (e: any) => {
    e.stopPropagation();
    const params = {
      session_id: sessionId,
    };
    await tmdbApi.deleteList(data?.id, params);
    getList();
  };
  return (
    <div
      className="card-list"
      onClick={() => {
        history.push(`${routes.profile.event.lists.self}details/${data?.id}`);
        localStorage.setItem("filter-status", `${data?.name}`);
      }}
    >
      <div className="card-list-status">
        <span>public</span>
      </div>
      <div className="card-list-content">
        <div className="card-list-content-wrap">
          <div className="card-list-content-wrap__title">{data?.name}</div>
          <div className="card-list-content-wrap__items">
            {data?.item_count} items
          </div>
          <div className="card-list-content-wrap__datetime">
            Updated 2 days ago
          </div>
        </div>
      </div>
      <div className="card-list-content__des">
        <div>
          <p>{data?.description}</p>
          <div className="card-list-content__des-delete">
            <button onClick={(e) => handleDelete(e)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardList;
