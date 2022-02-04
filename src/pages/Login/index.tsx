import React, { useEffect } from "react";
import { Button, Form, Input, Space } from "antd";
import io from "socket.io-client";
import { SOCKET_OPTIONS, SOCKET_URL } from "../../const/config";
import "./index.less";

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

  return (
    <div className="login">
      <section className="login-container">
        <h1>Welcome</h1>
        <Form>
          <Space direction="vertical">
            <Input placeholder="User" />
            <Input placeholder="Password" type="password" />
            <Button type="primary" className="login-button">
              Login
            </Button>
          </Space>
        </Form>
      </section>
    </div>
  );
};

export default Login;
