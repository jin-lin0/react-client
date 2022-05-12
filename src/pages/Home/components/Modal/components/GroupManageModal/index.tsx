import { useContext, useEffect, useState } from "react";
import { HomeContext } from "@/context";
import "./index.less";
import { Button, Input, Modal, Tabs, Popconfirm, Form, message } from "antd";
import { UserInfo } from "@/const/interface";
import Api from "@/api";
import classNames from "classnames";
import ColorAvatar from "@/components/ColorAvatar";

const { TextArea } = Input;

const GroupManageModal = () => {
  const [form] = Form.useForm();
  const [tab, setTab] = useState("");
  const [addGroupList, setAddGroupList] = useState<any>([]);
  const {
    currentUser = {},
    modal,
    setModal,
    socket,
  } = useContext<any>(HomeContext);
  const { key: modalKey } = modal;

  const handleSubmitCreateGroup = async (values) => {
    const data = await Api.createGroup({ ...values, owner: currentUser._id });
    if (data) {
      message.success("创建群聊成功！");
      form.resetFields();
    }
    console.log("createGroup", values, data);
  };

  const onSearchGroupByNickname = (v) => {
    const fetch = async () => {
      const users = await Api.findGroupByNickname(v);
      if (Array.isArray(users)) {
        setAddGroupList(users);
      } else {
        setAddGroupList([]);
      }
    };

    fetch();
  };
  const onSearchGroupById = (v) => {
    Api.findGroupById(v).then((data) => console.log(data));
  };
  const handleAddGroup = (id: string) => {
    // socket.emit("addFriend", {
    //   userBuild: currentUser._id,
    //   userReceive: id,
    // });
  };

  const CreateGroupPanel = () => {
    return (
      <Form
        onFinish={handleSubmitCreateGroup}
        form={form}
        labelCol={{ span: 5 }}
      >
        <Form.Item name="nickname" label="群昵称">
          <Input
            placeholder="请输入您要创建群的昵称"
            bordered={false}
            autoComplete="off"
            maxLength={20}
          />
        </Form.Item>

        <Form.Item name="notice" label="群公告">
          <TextArea
            placeholder="请输入您要创建的群公告"
            autoSize
            bordered={false}
            autoComplete="off"
            maxLength={50}
            showCount
            spellCheck={false}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button">
            创建
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const AddGroupPanel = () => {
    return (
      <div className="modal-addGroup">
        <Tabs defaultActiveKey="1" tabBarStyle={{ border: "none" }}>
          <Tabs.TabPane key="1" tab="群名称查询">
            <Input.Search
              placeholder="请输入群组的名称"
              onSearch={onSearchGroupByNickname}
              spellCheck={false}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="id查询">
            <Input.Search
              placeholder="请输入群组的id"
              onSearch={onSearchGroupById}
              spellCheck={false}
            />
          </Tabs.TabPane>
        </Tabs>
        {addGroupList.map((item: UserInfo, index: number) => (
          <div className="modal-addGroup-item" key={index}>
            <ColorAvatar nickname={item.nickname} />
            <div className="modal-addGroup-item-content">
              <div className="modal-addGroup-item-nickname">
                {item.nickname}
              </div>
              <div className="modal-addGroup-item-id">id:{item._id}</div>
            </div>
            <div
              className="modal-addGroup-item-button"
              onClick={() => handleAddGroup(item._id)}
            >
              加入
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {}, [tab]);

  return (
    <Modal
      title={
        <div className="modal-groupManage-header">
          <Button
            type="primary"
            onClick={() => setTab("")}
            className={classNames(
              tab !== "" && "modal-groupManage-inactiveTab"
            )}
          >
            创建群组
          </Button>
          <Button
            type="primary"
            onClick={() => setTab("addGroup")}
            className={classNames(
              tab !== "addGroup" && "modal-groupManage-inactiveTab"
            )}
          >
            添加群组
          </Button>
        </div>
      }
      visible={modalKey === "groupManage"}
      onCancel={() => setModal({})}
      onOk={() => setModal({})}
      centered={true}
      footer={null}
      className={classNames("modal-groupManage", `modal-groupManage-${tab}`)}
    >
      {tab === "" && <CreateGroupPanel />}
      {tab === "addGroup" && <AddGroupPanel />}
    </Modal>
  );
};

export default GroupManageModal;
