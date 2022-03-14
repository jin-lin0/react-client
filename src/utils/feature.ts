import { message } from "antd";

const Feature = {
  handleValidate: (validateCon: boolean[], validateMsg: string[]) => {
    let errIndex = validateCon.findIndex((item) => item === false);
    if (errIndex !== -1) {
      message.error(validateMsg[errIndex]);
      return false;
    }
    return true;
  },
};

export default Feature;
