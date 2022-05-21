import PageHeader from "../../components/page-header/PageHeader";
import React, { useCallback, useEffect, useState } from "react";
import { category, tmdbApi } from "../../api/api";
import "./person.scss";
import PersonCard from "./personCard";
import { OutlineButton } from "../../components/button/Button";
import { Pagination } from "antd";

const Person = () => {
  const [person, getPerson] = useState(null as any);
  const [numberPage, setNumberPage] = useState(1);

  const getPersonList = useCallback(async () => {
    const pages = {
      page: numberPage,
    };
    const res = await tmdbApi.getPopularPersonLists(category.person, pages);
    getPerson(res);
  }, [numberPage]);

  useEffect(() => {
    getPersonList();
  }, [getPersonList]);

  return (
    <>
      <PageHeader>Popular Actor</PageHeader>
      <div className="container">
        <div className="person-list">
          {person?.results?.map((ele: any, i: number) => (
            <PersonCard key={i} data={ele} id={ele.id} />
          ))}
          {/* {page < totalPage ? ( */}
          <div className="person-list__loadmore">
            {/* <OutlineButton className="small">
                Load more
              </OutlineButton> */}
            <Pagination
              total={person?.total_pages}
              current={numberPage}
              onChange={(page) => {
                setNumberPage(page);
              }}
            />
          </div>
          {/* ) : null} */}
        </div>
      </div>
    </>
  );
};

export default Person;
