import { useContext, useEffect, useState } from "react";
import { HomeContext } from "@/context";
import "./index.less";
import { Descriptions, Modal } from "antd";
import Tool from "@/utils/tool";

const ShowDetailModal = () => {
  const { currentUser = {}, modal, setModal } = useContext<any>(HomeContext);
  const { key: modalKey, data: userData = currentUser } = modal;

  return (
    <Modal
      title="详细信息"
      visible={modalKey === "showDetail"}
      onCancel={() => setModal({})}
      onOk={() => setModal({})}
      centered={true}
      footer={null}
    >
      <Descriptions className="modal-showDetail" column={1}>
        <Descriptions.Item label="头像">
          <img src={userData.avatarUrl} style={{ width: "2rem" }} alt="" />
        </Descriptions.Item>
        <Descriptions.Item label="昵称">{userData.nickname}</Descriptions.Item>
        <Descriptions.Item label="手机号">
          {userData.phone_number}
        </Descriptions.Item>
        <Descriptions.Item label="id">{userData._id}</Descriptions.Item>
        <Descriptions.Item label="注册时间">
          {Tool.formatDate(userData.createdAt)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ShowDetailModal;
