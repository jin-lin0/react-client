import { message } from "antd";
import axios from "axios";

const instance = axios.create({
  timeout: 5000,
  baseURL: "/chatApi",
});

/**
 * Request Interception
 */
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * Response Interception
 */
instance.interceptors.response.use(
  (res) => {
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
  raw = true,
}) => {
  const configParams = { method: method.toLowerCase(), url, ...config };
  method.toLocaleUpperCase() === "GET"
    ? (configParams.params = params)
    : (configParams.data = params);
  return instance(configParams)
    .then((payload) => payload.data)
    .then(
      (payload) => {
        if (!payload.code) {
          return raw ? payload : payload.data;
        } else {
          message.error(payload.msg);
          throw new Error(payload.msg);
        }
      },
      (err) => {
        message.error(err.toString() || "网络超时，请重试！");
        throw err;
      }
    );
};
