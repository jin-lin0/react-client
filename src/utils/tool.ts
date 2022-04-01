const Tool = {
  //模糊搜索
  fuzzyQuery: (input, data, key) =>
    data.filter((item) => item[key].search(new RegExp(input, "i")) > -1),
};

export default Tool;
