import { useContext, useEffect, useState } from "react";
import { HomeContext } from "@/context";
import "./index.less";
import { Button, Descriptions, Form, Input, message, Modal, Radio } from "antd";
import Tool from "@/utils/tool";
import Api from "@/api";

const SexTextObj = {
  0: "未知",
  1: "男",
  2: "女",
};

const ShowDetailModal = () => {
  const {
    currentUser = {},
    modal,
    setModal,
    setCurUser,
  } = useContext<any>(HomeContext);
  const { key: modalKey, data: userData = currentUser } = modal;
  const [tab, setTab] = useState("");

  const MainPanel = () => (
    <Descriptions className="modal-showDetail" column={1}>
      <Descriptions.Item label="头像">
        <img src={userData.avatarUrl} style={{ width: "2rem" }} alt="" />
      </Descriptions.Item>
      <Descriptions.Item label="昵称">{userData.nickname}</Descriptions.Item>
      <Descriptions.Item label="性别">
        {SexTextObj[userData.sex]}
      </Descriptions.Item>
      <Descriptions.Item label="手机号">
        {userData.phone_number}
      </Descriptions.Item>
      <Descriptions.Item label="个性签名">
        {userData.signature}
      </Descriptions.Item>
      <Descriptions.Item label="id">{userData._id}</Descriptions.Item>
      <Descriptions.Item label="注册时间">
        {Tool.formatDate(userData.createdAt)}
      </Descriptions.Item>
    </Descriptions>
  );

  const ModifyInfoPanel = () => {
    const [form] = Form.useForm();
    useEffect(() => {
      form.setFieldsValue(currentUser);
    }, []);

    const handleSubmitModifyInfo = async (values) => {
      const data = await Api.updateMyInfo(values);
      if (data) {
        const curUser = await Api.getMyInfo();
        setCurUser(curUser);
        message.success("修改信息成功！");
      }
    };

    return (
      <Form
        onFinish={handleSubmitModifyInfo}
        form={form}
        labelCol={{ span: 3 }}
      >
        <Form.Item name="nickname" label="昵称">
          <Input
            placeholder="请输入您的昵称"
            bordered={false}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item name="phone_number" label="手机号">
          <Input
            placeholder="请输入您的手机号"
            bordered={false}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item name="sex" label="性别">
          <Radio.Group className="modifyInfoPanel-radio">
            <Radio value={0}>未知</Radio>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="signature" label="个性签名">
          <Input
            placeholder="请输入您的个性签名"
            bordered={false}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const ModifyPwdPanel = () => {
    const [form] = Form.useForm();

    const handleSubmitModifyPwd = async (values) => {
      const { password, confirm_password } = values;
      if (password !== confirm_password) {
        message.error("确认密码与新密码不一致！");
      } else {
        const data = await Api.updateMyPwd(values);
        if (data) {
          form.resetFields();
          message.success("修改密码成功！");
        }
      }
    };
    return (
      <Form onFinish={handleSubmitModifyPwd} form={form}>
        <Form.Item name="current_password">
          <Input.Password
            placeholder="请输入当前密码"
            bordered={false}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password placeholder="请输入新密码" bordered={false} />
        </Form.Item>
        <Form.Item name="confirm_password">
          <Input.Password placeholder="请确认新密码" bordered={false} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={
        <div className="modal-showDetail-header">
          <div
            style={{ cursor: "pointer", whiteSpace: "nowrap" }}
            onClick={() => setTab("")}
          >
            详细信息
          </div>
          {userData._id === currentUser._id && (
            <>
              <Button
                type="primary"
                style={{ marginLeft: "16px" }}
                onClick={() => setTab("modifyInfo")}
              >
                修改信息
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: "16px" }}
                onClick={() => setTab("modifyPwd")}
              >
                修改密码
              </Button>
            </>
          )}
        </div>
      }
      visible={modalKey === "showDetail"}
      onCancel={() => setModal({})}
      onOk={() => setModal({})}
      centered={true}
      footer={null}
    >
      {tab === "" && <MainPanel />}
      {tab === "modifyInfo" && <ModifyInfoPanel />}
      {tab === "modifyPwd" && <ModifyPwdPanel />}
    </Modal>
  );
};

export default ShowDetailModal;
