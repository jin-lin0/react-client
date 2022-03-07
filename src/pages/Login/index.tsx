import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import Api from "@/api";
import "./index.less";

const Login = () => {
  const handleLogin = async (values) => {
    const data = await Api.login(values);
    console.log(data, values);
  };

  return (
    <div className="login">
      <section className="login-container">
        <h1>欢迎</h1>
        <Form onFinish={handleLogin}>
          <Form.Item name="phone_number">
            <Input placeholder="请输入手机号" bordered={false} />
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
