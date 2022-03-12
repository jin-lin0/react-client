import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import "./index.less";
import { Link } from "react-router-dom";
import Api from "@/api";

const Register = () => {
  const handleRegister = async (values) => {
    const { phone_number, password, confirm_password } = values;
    if (password !== confirm_password) {
      message.error("密码与重新设置的密码不一致！");
    } else {
      const data = await Api.register(values);
      message.success("注册成功！");
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
