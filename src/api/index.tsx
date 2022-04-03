import { request } from "@/utils/request";

interface LoginInfo {
  avatarUrl?: string;
  phone_number: string;
  password: string;
  nickname: string;
}

type RegisterInfo = LoginInfo;

const Api = {
  login: (LoginInfo: LoginInfo) =>
    request({ url: "/user/login", method: "POST", params: LoginInfo }),
  register: (RegisterInfo: RegisterInfo) =>
    request({ url: "/user/register", method: "POST", params: RegisterInfo }),
  getInfo: () => request({ url: "/user/getInfo", method: "GET" }),
  generateavatar: (id: string | number) =>
    request({
      url: `https://api.multiavatar.com/${id}.svg?apikey=D7eQk9Fs0Ng1PB`,
    }),
  findUserById: (id: string) =>
    request({ url: "/user/findById", params: { id } }),
  getMyFriends: (id: string) =>
    request({ url: "/friend/getMy", params: { id } }),
};

export default Api;
