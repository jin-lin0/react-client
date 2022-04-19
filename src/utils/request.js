import { message } from "antd";
import axios from "axios";
import { LoginToken } from "./token";
import { SOCKET_URL } from "@/const/config";

const instance = axios.create({
  timeout: 5000,
  baseURL: `${SOCKET_URL}/chatApi`,
});

instance.interceptors.request.use(
  (config) => {
    const token = LoginToken.get();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    const { data } = res;
    if (data.code && data.code !== 0) {
      switch (data.code) {
        case 1004:
        case 1005:
          window.location.replace("/login");
          break;
        default:
          break;
      }
      if (!data.hideError) {
        message.error(data.msg);
      }
    }
    if (data.token) {
      LoginToken.save(data.token);
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const request = ({
  url,
  method = "GET",
  params = {},
  config = {},
  raw = false,
}) => {
  const configParams = { method: method.toLowerCase(), url, ...config };
  method.toLocaleUpperCase() === "GET"
    ? (configParams.params = params)
    : (configParams.data = params);
  return instance(configParams)
    .then((payload) => payload.data)
    .then(
      (payload) => {
        if (!payload.code || payload.code === 0) {
          return raw ? payload : payload.data;
        }
      },
      (err) => {
        message.error(err.toString() || "网络超时，请重试！");
        throw err;
      }
    );
};
