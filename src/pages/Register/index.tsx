import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { request } from "@/utils/request";
import "./index.less";
import { Link } from "react-router-dom";

const Register = () => {
  const handleRegister = async (values) => {
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
        <Form onFinish={handleRegister} colon={false} requiredMark={false}>
          <Form.Item name="phone_number">
            <Input placeholder="请输入手机号" bordered={false} />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="请输入密码" bordered={false} />
          </Form.Item>
          <Form.Item name="confirm_password">
            <Input.Password placeholder="请确认密码" bordered={false} />
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
