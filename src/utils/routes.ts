import { include } from "named-urls";

const routes = {
  error: "/error",
  home: "/home",
  movie: "/movie",
  tvShow: "/tv",
  detail: "/:category/:id",
  trending: "/trending",
  people: include("/person", {
    self: "",
    details: "details/:id",
  }),
  profile: include("/profile", {
    self: "",
    event: include("event", {
      self: "",
      favorite: "favorite",
      watchlist: "watchlist",
      lists: include("lists", {
        self: "",
        details: "details/:id"
      }),
    }),
  }),
  login: "/login",
};

export default routes;
