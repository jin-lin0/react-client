import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { request } from "@/utils/request";
import "./index.less";
import { Link } from "react-router-dom";

const Register = (values) => {
  const handleRegister = async () => {
    const data = await request({
      url: "http://localhost:5555/chatApi/user/register",
      method: "POST",
      params: values,
    });
    console.log(data, values);
  };

  return (
    <div className="register">
      <section className="register-container">
        <h1>注册</h1>
        <Form onFinish={handleRegister} labelCol={{ span: 5 }}>
          <Form.Item
            name="username"
            label="账号"
            rules={[{ required: true, message: "请输入账号" }]}
          >
            <Input placeholder="Account" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="Password" />
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
