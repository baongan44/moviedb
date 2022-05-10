import { include } from 'named-urls';

const routes = {
  error: '/error',
  home: '/home',
  movie: '/movie',
  tvShow:'/tv',
  detail: '/:category/:id',
  trending: '/trending',
  people: include('/person', {
    self: '',
    details: 'details/:id'
  }),
  profile: include('/profile/', {
    self: '',
    favourite: 'favourite',
    watchlist: 'watchlist',
  }),
  login: '/login',

};

export default routes;
