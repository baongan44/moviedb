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

const Profile = () => {
  const [data, setData] = useState(null as any);
  const history = useHistory();
  const profileList = useMemo(() => {
    return [
      {
        name: "Favorite",
        title: "My Favorite Lists",
        path: routes.profile.event.favorite,
      },
      {
        name: "WatchList",
        title: "My WatchList Lists",

        path: routes.profile.event.watchlist,
      },
      {
        name: "My Lists",
        title: "My Lists",
        path: routes.profile.event.lists,
      },
    ];
  }, []);
  const [filterTitleName, setFilterTitleName] = useState(
    profileList[0].name as any
  );
  const filterList = useMemo(() => {
    return ["Movies", "Tv"];
  }, []);
  const [filter, setFilter] = useState(filterList[0] as string);
  const [openFilter, setOpenFilter] = useState(false);
  const { pathname } = useLocation();
  const active = profileList.findIndex((e) => e.path === pathname);
  const getAccount = useCallback(async () => {
    const params = {
      session_id: localStorage.getItem("session_id"),
    };
    const res = await tmdbApi.getAccount(params);
    localStorage.setItem("account_id", res?.id);
    setData(res);
  }, []);
  const handleFilter = (event: string) => {
    setFilter(event);
    setOpenFilter(!openFilter);
  };
  useEffect(() => {
    getAccount();
  }, [getAccount]);

  const handleProfileList = (event: string) => {
    setFilterTitleName(event);
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
              <h2>{filterTitleName}</h2>
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
              </div>
            </div>
            <Suspense fallback={null}>
              <Switch>
                <AnimatePresence>
                  <Route key="favorite" path={routes.profile.event.favorite}>
                    <Favorite accountId={data?.id} filter={filter} />
                  </Route>
                  <Route key="watchlist" path={routes.profile.event.watchlist}>
                    <WatchList accountId={data?.id} filter={filter} />
                  </Route>
                  <Route key="lists" path={routes.profile.event.lists}>
                    <MyLists />
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
    </div>
  );
};

export default Profile;
