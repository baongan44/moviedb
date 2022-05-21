import { accountId } from "./../utils/config";
import { apiCall, routes } from "../utils";
import apiConfig from "../utils/apiConfig";

export const category: any = {
  movie: "movie",
  tv: "tv",
  person: "person",
  all: "all",
};

export const movieType: any = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
  trending: "trending",
};

export const tvType: any = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};
export const timeType: any = {
  day: "day",
  week: "week",
};
export const tmdbApi = {
  getMoviesList: async (type: string, params?: any) => {
    const res = await apiCall(
      `movie/${movieType[type]}`,
      "GET",
      undefined,
      params
    );
    return res;
  },
  getTvList: async (type: string, params?: any) => {
    const res = await apiCall(`tv/${tvType[type]}`, "GET", undefined, params);
    return res;
  },
  getTrendingTime: async (type: string, time?: string) => {
    const res = await apiCall(
      `trending/${category[type]}/${time}`,
      "GET",
      undefined,
      undefined
    );
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
  getPopularPersonLists: async (cate: string, params?:any) => {
    const res = await apiCall(`${category[cate]}/popular`, "GET", undefined, params);
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
  getStatusList: async (
    accountId: any,
    typeList: any,
    type: any,
    params: any
  ) => {
    const res = await apiCall(
      `/account/${accountId}/${typeList}/${type}`,
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
  maskAsStatus: async (
    account_id: any,
    typeStatus: any,
    params: any,
    body: any
  ) => {
    const res = await apiCall(
      `/account/${account_id}/${typeStatus}`,
      "POST",
      body,
      params
    );
    return res;
  },
  getCreatedList: async (accountId: any, params: any) => {
    const res = await apiCall(
      `account/${accountId}/lists`,
      "GET",
      undefined,
      params
    );
    return res;
  },
  clearList: async (listId: any, params: any, body: any) => {
    const res = await apiCall(`/list/${listId}/clear?`, "POST", body, params);
    return res;
  },
  deleteList: async (listId: any, params: any) => {
    const res = await apiCall(
      `list/${listId}`,
      "DELETE",
      undefined,
      params,
    );
    return res;
  },
  getDetailList: async (listId: any) => {
    const res = await apiCall(`/list/${listId}`, "GET", undefined, undefined);
    return res;
  },
  removieMovieFromMyList: async (listId: any, params: any, body: any) => {
    const res = await apiCall(
      `list/${listId}/remove_item`,
      "POST",
      body,
      params
    );
    return res;
  },
  addToCreateList: async (listId: any, params: any, body: any) => {
    const res = await apiCall(`list/${listId}/add_item`, "POST", body, params);
    return res;
  },
  getRateMovie: async (type: any, accountId: any, params: any) => {
    const res = await apiCall(
      `account/${accountId}/rated/${type}`,
      "GET",
      undefined,
      params
    );
    return res;
  },
  setReview: async (type: any, id: any, body: any, params: any) => {
    const res = await apiCall(`${type}/${id}/rating`, "POST", body, params);
    return res;
  },
  deleteRate: async (type: any, id: any, params: any) => {
    const res = await apiCall(
      `${type}/${id}/rating`,
      "DELETE",
      undefined,
      params
    );
    return res;
  },
};
