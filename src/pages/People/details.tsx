import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { category, tmdbApi } from "../../api/api";
import apiConfig from "../../utils/apiConfig";
import "./person.scss";

const PersonDetails = () => {
  const [info, setInfo] = useState(null as any);
  const { id } = useParams<any>();
  const getDetailPerson = useCallback(async () => {
    const res = await tmdbApi.getPersonDetail(category.person, id);
    setInfo(res);
  }, [id]);

  useEffect(() => {
    getDetailPerson();
  }, [getDetailPerson]);

  return (
    <div>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${apiConfig.originalImage(
            info?.profile_path
          )})`,
        }}
      ></div>
      <div className="mb-3 person-content container">
        <div className="person-content__poster">
          <div
            className="person-content__poster__img"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                info?.profile_path
              )})`,
            }}
          ></div>
        </div>
        <div className="person-content__info">
          <h1 className="title">{info?.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
