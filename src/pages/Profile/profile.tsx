import React, { Suspense } from "react";
import "./profile.scss";
import bg from "../../assets/footer-bg.jpg";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import Favourite from "../../components/Favourite/Favourite";
import WatchList from "../../components/WatchList/WatchList";
import { routes } from "../../utils";

const Profile = () => {
  const history = useHistory();
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
            <h1>ntbngan</h1>
            <div className="profile-header__option">
              <ul>
                <li
                  onClick={() => {
                    history.push(routes.profile.favourite);
                  }}
                >
                  Favourite
                </li>
                <li
                  onClick={() => {
                    history.push(routes.profile.watchlist);
                  }}
                >
                  WatchList
                </li>
                <li>Create new list</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="profile-contact">
          <Router>
            <Switch>
              <Route key="watchlist" exact path={routes.profile.watchlist}>
                <WatchList />
              </Route>
              <Route key="favourite" exact path={routes.profile.favourite}>
                <Favourite />
              </Route>
              <Route key="default" exact path={routes.profile.self}>
                <Redirect to={routes.profile.favourite} />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default Profile;
