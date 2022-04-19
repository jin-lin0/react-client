const Regex = {
  phoneNumber: /^1[3-9]\d{9}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
  nickname: /^.{2,6}/,
  getFileName: (file: string) =>
    file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi, "$1"),
  getFileExt: (file: string) => file.replace(/.+\./, "").toLowerCase(),
};

export default Regex;
