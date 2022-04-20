import { request } from "@/utils/request";

interface LoginInfo {
  avatarUrl?: string;
  phone_number: string;
  password: string;
  nickname: string;
}

type RegisterInfo = LoginInfo;

interface UpdatePwdInfo {
  current_password: string;
  password: string;
  confirm_password: string;
}

interface UpdateMyInfo {
  nickname: string;
  phone_number: string;
  sex: number;
}

const Api = {
  login: (LoginInfo: LoginInfo) =>
    request({ url: "/user/login", method: "POST", params: LoginInfo }),
  register: (RegisterInfo: RegisterInfo) =>
    request({ url: "/user/register", method: "POST", params: RegisterInfo }),
  getMyInfo: () => request({ url: "/user/getMyInfo", method: "GET" }),
  getInfo: (id: string | number) =>
    request({ url: `/user/getInfo?id=${id}`, method: "GET" }),
  generateavatar: (id: string | number) =>
    request({
      url: `https://api.multiavatar.com/${id}.svg?apikey=D7eQk9Fs0Ng1PB`,
    }),
  findUserById: (id: string) =>
    request({ url: "/user/findById", params: { id } }),
  updateMyPwd: (params: UpdatePwdInfo) =>
    request({ url: "/user/updateMyPwd", method: "POST", params }),
  updateMyInfo: (params: UpdateMyInfo) =>
    request({ url: "/user/updateMyInfo", method: "POST", params }),
  getMyFriends: (id: string) =>
    request({ url: "/friend/getMy", params: { id } }),
  getPrivate: (userAId: string, userBId: string, number = 30) =>
    request({ url: "/msg/getPrivate", params: { userAId, userBId, number } }),
};

export default Api;
