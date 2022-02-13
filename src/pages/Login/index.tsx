import React, { useEffect } from "react";
import { Button, Form, Input, Space } from "antd";
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

  const handleLogin = async () => {
    const data = await request({
      url: "http://localhost:5555/chatApi/user/findAll",
      method: "GET",
    });
    console.log(data);
  };

  return (
    <div className="login">
      <section className="login-container">
        <h1>Welcome</h1>
        <Form>
          <Space direction="vertical">
            <Input placeholder="User" />
            <Input.Password placeholder="Password" />
            <Button
              type="primary"
              className="login-button"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Link to="/register">
              <span className="register">Register</span>
            </Link>
          </Space>
        </Form>
      </section>
    </div>
  );
};

export default Login;
