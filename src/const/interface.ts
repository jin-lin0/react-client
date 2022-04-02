export interface UserInfo {
  _id: string;
  phone_number: string;
  avatarUrl?: string;
  nickname: string;
  sex: number; // 0 未定义 1 男 2 女
  age: number;
  birth: Date;
  type: number;
}
