import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL;

const apiClient = async <T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
  const apiKey = process.env.API_KEY;

  const { params: customParams, ...restOptions } = options;

  if (!apiKey) throw new Error("No API KEY found in env vars");

  const formedUrl = `${BASE_URL}${endpoint}`;

  const config: AxiosRequestConfig = {
    method: "GET",
    url: formedUrl,
    params: {
      access_key: apiKey,
      ...(customParams || {}),
    },
    timeout: 100000,
    ...restOptions,
  };

  return axios.request<T>(config);
};

export default apiClient;
