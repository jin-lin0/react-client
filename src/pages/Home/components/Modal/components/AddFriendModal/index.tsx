import { useContext, useState } from "react";
import { HomeContext } from "@/context";
import "./index.less";
import { Input, Modal, Tabs } from "antd";
import { UserInfo } from "@/const/interface";
import Api from "@/api";

const AddFriendModal = () => {
  const [addFriendList, setAddFriendList] = useState<any>([]);
  const {
    currentUser = {},
    modal,
    setModal,
    socket,
  } = useContext<any>(HomeContext);
  const { key: modalKey } = modal;

  const onSearchUserById = (v) => {
    const fetch = async () => {
      const user = await Api.findUserById(v);
      if (Array.isArray(user)) {
        setAddFriendList(user);
      } else {
        setAddFriendList([]);
      }
    };

    fetch();
  };
  const onSearchUserByNickname = (v) => {
    const fetch = async () => {
      const users = await Api.findUserByNickname(v);
      if (Array.isArray(users)) {
        setAddFriendList(users);
      } else {
        setAddFriendList([]);
      }
    };

    fetch();
  };

  const handleAddFriend = (id: string) => {
    socket.emit("addFriend", {
      userBuild: currentUser._id,
      userReceive: id,
    });
  };

  return (
    <Modal
      title="添加好友"
      visible={modalKey === "addFriend"}
      onCancel={() => setModal({})}
      onOk={() => setModal({})}
      centered={true}
      footer={null}
      className="modal-addFriend"
    >
      <Tabs defaultActiveKey="1" tabBarStyle={{ border: "none" }}>
        <Tabs.TabPane key="1" tab="昵称查询">
          <Input.Search
            placeholder="请输入好友的昵称"
            onSearch={onSearchUserByNickname}
            spellCheck={false}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="id查询">
          <Input.Search
            placeholder="请输入好友的id"
            onSearch={onSearchUserById}
            spellCheck={false}
          />
        </Tabs.TabPane>
      </Tabs>

      {addFriendList.map((item: UserInfo, index: number) => (
        <div className="modal-addFriend-item" key={index}>
          <img
            src={item.avatarUrl || ""}
            alt=""
            className="modal-addFriend-item-avatar"
          />
          <div className="modal-addFriend-item-content">
            <div className="modal-addFriend-item-nickname">{item.nickname}</div>
            <div className="modal-addFriend-item-id">id:{item._id}</div>
          </div>
          <div
            className="modal-addFriend-item-button"
            onClick={() => handleAddFriend(item._id)}
          >
            添加
          </div>
        </div>
      ))}
    </Modal>
  );
};

export default AddFriendModal;
