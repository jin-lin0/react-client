import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Api from "@/api";
import Regex from "@/utils/regex";
import Feature from "@/utils/feature";
import "./index.less";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const { phone_number, password } = values;
    const validateCon = [
      Regex.phoneNumber.test(phone_number),
      Regex.password.test(password),
    ];
    const validateMsg = [
      "请输入正确的手机号格式!",
      "密码中需包含字母、数字，长度8至16位!",
    ];
    if (Feature.handleValidate(validateCon, validateMsg)) {
      const data = await Api.login(values);
      if (data) {
        navigate("/home", { replace: true });
      }
    }
  };

  return (
    <div className="login">
      <section className="login-container">
        <h1>欢迎</h1>
        <Form onFinish={handleLogin}>
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
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              登录
            </Button>
          </Form.Item>
          <Link to="/register">
            <span className="registerText">去注册</span>
          </Link>
        </Form>
      </section>
    </div>
  );
};

export default Login;
