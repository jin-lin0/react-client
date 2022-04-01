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
  generateAvator: (id: string) =>
    request({
      url: `https://api.multiavatar.com/${id}.svg?apikey=D7eQk9Fs0Ng1PB`,
    }),
};

export default Api;
