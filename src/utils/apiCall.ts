import axios, { AxiosRequestConfig, Method } from "axios";
import apiConfig from "./apiConfig";

type apiCallType = (
  uri: string,
  method: Method,
  body?: Record<string, any>,
  params?: any
) => Promise<any>;

export const apiCall: apiCallType = (
  uri: string,
  method: Method = "GET",
  body = undefined,
  param,
) => {
  return new Promise((resolve, reject) => {
    let headers: AxiosRequestConfig["headers"] = {
      "content-type": "application/json",
      Accept: "application/json",
    };
    const paramsApiKey = {
      api_key: apiConfig.apiKey,
      ...param
    }
    axios({
      url: apiConfig.baseUrl + uri,
      method,
      params: paramsApiKey,
      data: body,
      headers,
    })
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
