import PageHeader from "../../components/page-header/PageHeader";
import React, { useCallback, useEffect, useState } from "react";
import { category, tmdbApi } from "../../api/api";
import apiConfig from "../../utils/apiConfig";
import "./person.scss";
import PersonCard from "./personCard";

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
            <PersonCard key={i} data={ele} id={ele.id}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default Person;
