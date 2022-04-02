const Tool = {
  //前缀匹配搜索
  fuzzyQuery: (input, data, key) =>
    data.filter((item) => item[key].indexOf(input) > -1),
};

export default Tool;
