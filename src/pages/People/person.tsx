import PageHeader from "../../components/page-header/PageHeader";
import React, { useCallback, useEffect, useState } from "react";
import { category, tmdbApi } from "../../api/api";
import apiConfig from "../../utils/apiConfig";
import "./person.scss";

const Person = () => {
  const [person, getPerson] = useState(null as any);
  const getPersonList = useCallback(async () => {
    const res = await tmdbApi.getPopularPersonLists(category.person);
    getPerson(res?.results);
  }, []);

  useEffect(() => {
    getPersonList();
  }, [getPersonList]);

  return (
    <>
      <PageHeader>Popular Actor</PageHeader>
      <div className="container">
        <div className="person-list">
          {person?.map((ele: any, i: number) => (
            <div key={i} className="person-list-item">
              <div className="person-list-item__image">
                <img src={apiConfig.w500Image(ele.profile_path)} alt="img" />
              </div>
              <div className="person-list-item__info">
                <span>{ele.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Person;
