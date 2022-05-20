import { useState } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";
import apiConfig from "./apiConfig";

type apiCallType = (
  uri: string,
  method: Method,
  body?: Record<string, any>,
  params?: any,
  accessToken?: string,
) => Promise<any>;

export const apiCall: apiCallType = (
  uri: string,
  method: Method = "GET",
  body = undefined,
  param,
  accessToken = undefined,
) => {
  return new Promise((resolve, reject) => {
    let headers: AxiosRequestConfig["headers"] = {
      "content-type": "application/json",
      Accept: "application/json",
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    const paramsApiKey = {
      api_key: apiConfig.apiKey,
      ...param,
    };
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
