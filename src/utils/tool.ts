const Tool = {
  //前缀匹配搜索
  fuzzyQuery: (input, data, key) =>
    data.filter((item) => item[key].indexOf(input) > -1),

  //日期格式化
  formatDate: (timeStamp = Date.now(), format = "YYYY-MM-DD hh:mm:ss") => {
    let date = new Date(timeStamp);
    let formatNumber = (n) => (n < 10 ? "0" + n : n);
    return format
      .replace("YYYY", String(date.getFullYear()))
      .replace("MM", formatNumber(date.getMonth() + 1))
      .replace("DD", formatNumber(date.getDate()))
      .replace("hh", formatNumber(date.getHours()))
      .replace("mm", formatNumber(date.getMinutes()))
      .replace("ss", formatNumber(date.getSeconds()));
  },
};

export default Tool;
