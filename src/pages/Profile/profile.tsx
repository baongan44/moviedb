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
        onClick: () => {
          history.push(routes.profile.favorite);
        },
      },
      {
        name: "WatchList",
        onClick: () => {
          history.push(routes.profile.watchlist);
        },
      },
      {
        name: "My Lists",
        onClick: () => {
          history.push(routes.profile.lists);
        },
      },
    ];
  }, [history]);
  const getAccount = useCallback(async () => {
    const params = {
      session_id: localStorage.getItem("session_id"),
    };
    const res = await tmdbApi.getAccount(params);
    localStorage.setItem("account_id", res?.id);
    setData(res);
  }, []);

  useEffect(() => {
    getAccount();
  }, [getAccount]);

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
                  <li key={i} onClick={ele.onClick}>
                    {ele.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="profile-contact">
          <Suspense fallback={null}>
            <AnimatePresence>
              <Router>
                <Switch>
                  <Route key="watchlist" exact path={routes.profile.watchlist}>
                    <WatchList />
                  </Route>

                  <Route key="favorite" exact path={routes.profile.favorite}>
                    <Favorite accountId={data?.id} />
                  </Route>

                  <Route key="list" exact path={routes.profile.lists}>
                    <MyLists />
                  </Route>

                  <Route key="default" path={routes.profile.self}>
                    <Redirect to={routes.profile.favorite} />
                  </Route>
                </Switch>
              </Router>
            </AnimatePresence>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Profile;
