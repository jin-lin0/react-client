import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { request } from "@/utils/request";
import io from "socket.io-client";
import { SOCKET_OPTIONS, SOCKET_URL } from "../../const/config";
import "./index.less";
import { Link } from "react-router-dom";

// const socket = io(SOCKET_URL, SOCKET_OPTIONS);

const Login = () => {
  // useEffect(() => {
  //     socket.on('connect', () => {
  //         console.log(socket.io);
  //     })
  //     socket.on('disconnect', reason => {
  //         console.log(reason)
  //         if (reason === 'io server disconnect') {
  //             socket.connect();
  //         }
  //     })
  // }, []);

  const handleLogin = async (values) => {
    const data = await request({
      url: "http://localhost:5555/chatApi/user/login",
      method: "POST",
      params: values,
    });
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
