import { request } from "@/utils/request";

interface LoginInfo {
  username: String;
  password: String;
}

export const login = (LoginInfo: LoginInfo) =>
  request({ url: "/login", method: "GET", params: LoginInfo });
