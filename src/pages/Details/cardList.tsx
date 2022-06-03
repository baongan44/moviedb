import React, { useState, useEffect } from "react";

import { useParams,useHistory } from "react-router-dom";
import { tmdbApi } from "../../api/api";
import { routes } from "../../utils";
import apiConfig from "../../utils/apiConfig";

interface Props {
  id?: any;
}
const CastList = (props: Props) => {
  const { category } = useParams<any>();
  const [casts, setCasts] = useState([]);
  const { id } = props;
  const history = useHistory();
  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, id);
      setCasts(res.cast.slice(0, 5));
    };
    getCredits();
  }, [category, id]);
  return (
    <div className="casts">
      {casts.map((item: any, i) => (
        <div key={i} className="casts__item" onClick={() => history.push(`/person/details/${item?.id}`)}>
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(
                item?.profile_path
              )})`,
            }}
          ></div>
          <p className="casts__item__name">{item?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
