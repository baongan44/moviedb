import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./profile.scss";
import bg from "../../assets/footer-bg.jpg";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
  Link,
  useLocation,
} from "react-router-dom";
import { routes } from "../../utils";
import WatchList from "../../components/WatchList/WatchList";
import MyLists from "../../components/MyLists/MyLists";
import Favorite from "../../components/Favorite/Favorite";
import { tmdbApi } from "../../api/api";
import { AnimatePresence } from "framer-motion";
import { sessionId } from "../../utils/config";
import GradientBtn from "../../components/button/gradientBtn";
import AddNewList from "../../components/AddNewList/AddNewList";
import DetailList from "../../components/MyLists/DetailList";
import { profileList } from "../../data/data";

const Profile = () => {
  const [data, setData] = useState(null as any);
  const [newList, openPopupNewList] = useState<boolean>(false);
  const filterList = useMemo(() => {
    return ["Movies", "Tv"];
  }, []);
  const addListTime = useMemo(() => {
    return [{ name: "ASC" }, { name: "DESC" }];
  }, []);
  const [filter, setFilter] = useState(filterList[0] as string);
  const [sortBy, setSortBy] = useState(addListTime[0].name as string);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSortBy, setOpenSortBy] = useState(false);
  const { pathname } = useLocation();
  const active = profileList.findIndex((e) => e.path === pathname);
  const getAccount = useCallback(async () => {
    const params = {
      session_id: sessionId,
    };
    const res = await tmdbApi.getAccount(params);
    localStorage.setItem("account_id", res?.id);
    setData(res);
  }, []);
  const handleFilter = (event: string) => {
    setFilter(event);
    setOpenFilter(!openFilter);
  };
  const handleSortBy = (event: string) => {
    setSortBy(event);
    setOpenSortBy(!openSortBy);
  };
  useEffect(() => {
    getAccount();
  }, [getAccount]);

  const handleProfileList = (event: string) => {
    localStorage.setItem("filter-status", event);
  };

  return (
    <div className="profile">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      ></div>
      <div>
        <div className="profile-header">
          <div className="profile-header__circle">
            <i className="bx bxs-user"></i>
          </div>
          <div className="profile-header__content">
            <h1>{data?.username}</h1>
            <div className="profile-header__option">
              <ul>
                {profileList?.map((ele, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      handleProfileList(ele.title);
                    }}
                    className={`${i === active ? "active" : ""}`}
                  >
                    <Link to={ele.path}>{ele.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="profile-contact">
          <div className="filterList">
            <div className="filterList-title">
              <h2>{localStorage.getItem("filter-status")}</h2>
              {localStorage.getItem("filter-status") === "My Lists" ||
              localStorage.getItem("filter-status") === "My Favorite Lists" ||
              localStorage.getItem("filter-status") === "My WatchList Lists" ? (
                <>
                  {localStorage.getItem("filter-status") === "My Lists" ? (
                    <div className="filterList-button">
                      <GradientBtn
                        name="Create New List"
                        onClick={() => openPopupNewList(true)}
                      />
                    </div>
                  ) : (
                    <div className="filterList-title-filter">
                      <div className="filterList-title-filter__lists">
                        <span>
                          Filter:
                          <span
                            className="filter-text"
                            onClick={() => {
                              setOpenFilter(!openFilter);
                            }}
                          >
                            {filter}
                            <i
                              className="bx bx-chevron-down"
                              style={{
                                transform: openFilter
                                  ? "rotateX(180deg)"
                                  : "rotateX(0deg)",
                              }}
                            ></i>
                          </span>
                        </span>
                        <div style={{ display: openFilter ? "block" : "none" }}>
                          <ul>
                            {filterList?.map((ele, i) => (
                              <li key={i} onClick={() => handleFilter(ele)}>
                                {ele}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="filterList-title-filter__lists">
                        <span>
                          Sort By:
                          <span
                            className="filter-text"
                            onClick={() => {
                              setOpenSortBy(!openFilter);
                            }}
                          >
                            {sortBy}
                            <i
                              className="bx bx-chevron-down"
                              style={{
                                transform: openSortBy
                                  ? "rotateX(180deg)"
                                  : "rotateX(0deg)",
                              }}
                            ></i>
                          </span>
                        </span>
                        <div style={{ display: openSortBy ? "block" : "none" }}>
                          <ul>
                            {addListTime?.map((ele, i) => (
                              <li
                                key={i}
                                onClick={() => handleSortBy(ele?.name)}
                              >
                                {ele?.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
            <Suspense fallback={null}>
              <Switch>
                <AnimatePresence>
                  <Route key="favorite" path={routes.profile.event.favorite}>
                    <Favorite
                      accountId={data?.id}
                      filter={filter}
                      sortBy={sortBy}
                    />
                  </Route>
                  <Route key="watchlist" path={routes.profile.event.watchlist}>
                    <WatchList
                      accountId={data?.id}
                      filter={filter}
                      sortBy={sortBy}
                    />
                  </Route>
                  <Route
                    key="lists"
                    exact
                    path={routes.profile.event.lists.self}
                  >
                    <MyLists />
                  </Route>
                  <Route
                    key="lists-details"
                    exact
                    path={routes.profile.event.lists.details}
                  >
                    <DetailList />
                  </Route>
                  <Route key="default" exact path={routes.profile.self}>
                    <Redirect to={routes.profile.event.favorite} />
                  </Route>
                </AnimatePresence>
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
      {newList && <AddNewList onClose={() => openPopupNewList(false)} />}
    </div>
  );
};

export default Profile;
