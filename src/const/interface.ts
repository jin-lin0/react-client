export interface UserInfo {
  _id: String;
  phone_number: String;
  avatarUrl?: String;
  nickname: String;
  sex: Number; // 0 未定义 1 男 2 女
  age: Number;
  birth: Date;
  type: Number;
}
