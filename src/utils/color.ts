const Color = {
  rgbToHex: (r, g, b) =>
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1),
  randomHex: () =>
    `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, "0")}`,
  stringToHex: (str: string) => {
    let res = "";
    for (let i = 0; i < str.length; i++) {
      res += parseInt(String(str[i].charCodeAt(0)), 10).toString(16);
    }
    return "#" + res.padEnd(4, res).slice(1, 4);
  },
};

export default Color;
