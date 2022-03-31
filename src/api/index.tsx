import { request } from "@/utils/request";

interface LoginInfo {
  phone_number: String;
  password: String;
  nickname: String;
}

type RegisterInfo = LoginInfo;

const Api = {
  login: (LoginInfo: LoginInfo) =>
    request({ url: "/user/login", method: "POST", params: LoginInfo }),
  register: (RegisterInfo: RegisterInfo) =>
    request({ url: "/user/register", method: "POST", params: RegisterInfo }),
  getInfo: () => request({ url: "/user/getInfo", method: "GET" }),
};

export default Api;
