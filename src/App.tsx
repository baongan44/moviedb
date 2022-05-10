import Layout from "./layout/Layout";
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { darkTheme, lightTheme, routes } from "./utils";
import React, { Suspense, useEffect } from "react";
import 'swiper/swiper.min.css';


function App() {
  const Home = React.lazy(() => import("./pages/Home/home"));
  const Movies = React.lazy(() => import("./pages/Movies/movies"));
  const Profile = React.lazy(() => import("./pages/Profile/profile"));
  const TvShow = React.lazy(() => import("./pages/TvSeries/tvshow"));
  const Person = React.lazy(() => import("./pages/People/person"));
  const Detail = React.lazy(() => import("./pages/Details/details"));
  const Login = React.lazy(() => import("./pages/Login/login"));
  const PersonDetails = React.lazy(() => import("./pages/People/details"));

  return (
    <Router>
      <Layout>
        <Suspense fallback={null}>
          <AnimatePresence>
            <Switch>
              <Route key="home" exact path={routes.home} component={Home} />
              <Route key="movies" exact path={routes.movie} component={Movies} />
              <Route
                key="tvshow"
                exact
                path={routes.tvShow}
                component={TvShow}
              />
              <Route
                key="profile"
                path={routes.profile.self}
                component={Profile}
              />
              <Route
                key="person"
                exact
                path={routes.people.self}
                component={Person}
              />
              <Route
                key="person-details"
                exact
                path={routes.people.details}
                component={PersonDetails}
              />
              <Route
                key="details-movies"
                exact
                path={routes.detail}
                component={Detail}
              />
              <Route
                key="login"
                exact
                path={routes.login}
                component={Login}
              />
              <Route key="default" path="/">
                <Redirect to={routes.home} />
              </Route>
            </Switch>
          </AnimatePresence>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
