import { apiCall, routes } from "../utils";

export const category: any = {
  movie: "movie",
  tv: "tv",
  person: "person",
};

export const movieType: any = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType: any = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

export const tmdbApi = {
  getMoviesList: async (type: string, params: any) => {
    const res = await apiCall(
      `movie/${movieType[type]}`,
      "GET",
      undefined,
      params
    );
    return res;
  },
  getTvList: async (type: string, params: any) => {
    const res = await apiCall(`tv/${tvType[type]}`, "GET", undefined, params);
    return res;
  },
  getVideos: async (cate: string, id: any) => {
    const res = await apiCall(`${category[cate]}/${id}/videos`, "GET");
    return res;
  },
  search: async (cate: string, params: any) => {
    const res = await apiCall(
      `search/${category[cate]}`,
      "GET",
      undefined,
      params
    );
    return res;
  },
  detail: async (cate: string, id: any, params: any) => {
    const res = await apiCall(
      `${category[cate]}/${id}`,
      "GET",
      undefined,
      params
    );
    return res;
  },
  credits: async (cate: string, id: any) => {
    const res = await apiCall(`${category[cate]}/${id}/credits`, "GET");
    return res;
  },
  similar: async (cate: string, id: any) => {
    const res = await apiCall(`${category[cate]}/${id}/similar`, "GET");
    return res;
  },
  getPersonDetail: async (cate: string, id: any) => {
    const res = await apiCall(`${category[cate]}/${id}`, "GET");
    return res;
  },
  getPopularPersonLists: async (cate: string) => {
    const res = await apiCall(`${category[cate]}/popular`, "GET");
    return res;
  },
  movieCreditEachPerson: async (id: string) => {
    const res = await apiCall(`/person/${id}/combined_credits`, "GET");
    return res;
  },
  getImageEachPerson: async (id: string) => {
    const res = await apiCall(`/person/${id}/images`, "GET");
    return res;
  },
  createNewList: async (body: any, params: any) => {
    const res = await apiCall(`/list`, "POST", body, params);
    return res;
  },
  getAccount: async (params: any) => {
    const res = await apiCall(`/account`, "GET", undefined, params);
    return res;
  },
  getFavoriteList: async (accountId: any, type: any, params: any) => {
    const res = await apiCall(
      `/account/${accountId}/favorite/${type}`,
      "GET",
      undefined,
      params
    );
    return res;
  },
  getStatus: async (id: any, type: string, params: any) => {
    const res = await apiCall(
      `/${type}/${id}/account_states`,
      "GET",
      undefined,
      params
    );
    return res;
  },
  maskAsFavorite: async (account_id: any, params: any, body: any) => {
    const res = await apiCall(
      `/account/${account_id}/favorite`,
      "POST",
      body,
      params
    );
    return res;
  },
};
