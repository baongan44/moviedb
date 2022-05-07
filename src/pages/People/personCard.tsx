import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { category, tmdbApi } from "../../api/api";
import { routes } from "../../utils";
import apiConfig from "../../utils/apiConfig";

const PersonCard = ({ data, id, ...props }: { data: any; id: any }) => {
  const [info, setInfo] = useState(null as any);
  const history = useHistory();
  const getDetailPerson = useCallback(async () => {
    const res = await tmdbApi.getPersonDetail(category.person, id);
    setInfo(res);
  }, [id]);

  useEffect(() => {
    getDetailPerson();
  }, [getDetailPerson]);

  const handleClick = () => {
      history.push(`${routes.people.self}details/${info?.id}`)
  }
  return (
    <div className="person-list-item" {...props} onClick={handleClick}>
      <div className="person-list-item__image">
        <img src={apiConfig.w500Image(info?.profile_path)} alt="img" />
      </div>
      <div className="person-list-item__info">
        <span><i className='bx bx-user-pin'></i>{info?.name}</span>
        <div className="person-list-item__info-content">
          <div><i className='bx bxs-calendar'></i>{info?.birthday}</div>
          <div><i className='bx bxs-map'></i>{info?.place_of_birth}</div>
        </div>
      </div>
      <div className="person-list-item__biography">
        <p>{info?.biography}</p>
      </div>
    </div>
  );
};

export default PersonCard;
