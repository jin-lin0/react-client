import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import Api from "@/api";
import Regex from "@/utils/regex";
import Feature from "@/utils/feature";
import "./index.less";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    const { phone_number, password, confirm_password } = values;
    const validateCon = [
      password === confirm_password,
      Regex.phoneNumber.test(phone_number),
      Regex.password.test(password),
    ];
    const validateMsg = [
      "密码与重新设置的密码不一致!",
      "请输入正确的手机号格式!",
      "密码中需包含字母、数字，长度8至16位!",
    ];
    if (Feature.handleValidate(validateCon, validateMsg)) {
      const data = await Api.register({ phone_number, password });
      if (data) {
        message.success("注册成功！");
        navigate("/login", { replace: true });
      }
    }
  };

  return (
    <div className="register">
      <section className="register-container">
        <h1>注册</h1>
        <Form onFinish={handleRegister} colon={false} requiredMark={false}>
          <Form.Item name="phone_number">
            <Input
              placeholder="请输入手机号"
              bordered={false}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="请输入密码" bordered={false} />
          </Form.Item>
          <Form.Item name="confirm_password">
            <Input.Password placeholder="请重新输入密码" bordered={false} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-button"
            >
              注册
            </Button>
          </Form.Item>
        </Form>
        <Link to="/login">
          <span className="loginText">去登录</span>
        </Link>
      </section>
    </div>
  );
};

export default Register;
