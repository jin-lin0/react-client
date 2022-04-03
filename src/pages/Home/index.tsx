import { useEffect, useState } from "react";
import { HomeContext } from "@/context";
import HomeHeader from "./components/HomeHeader";
import ChatList from "./components/ChatList";
import ChatArea from "./components/ChatArea";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FreshToken, LoginToken } from "@/utils/token";
import Api from "@/api";
import "./index.less";
import { Input, message, Modal } from "antd";
import { UserInfo } from "@/const/interface";

const Home = (props) => {
  const { socket } = props;
  const navigate = useNavigate();
  const [curUser, setCurUser] = useState<any>({});
  const [activeChatId, setActiveChatId] = useState("");
  const [chatList, setChatList] = useState([]);
  const [modal, setModal] = useState("");
  const [addFriendList, setAddFriendList] = useState<any>([]);

  const onChooseChat = (id) => {
    setActiveChatId(id);
  };

  const handleLogout = () => {
    navigate("/login", { replace: true });
    LoginToken.delete();
    socket.disconnect();
  };

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
  const handleAddFriend = (id: string) => {
    socket.emit("addFriend", {
      userBuild: curUser._id,
      userReceive: id,
    });
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket);
      Api.getInfo().then((userInfo) => {
        socket.emit("online", userInfo);
      });
    });
    socket.on("addSuccess", (data) => {
      if (data) {
        message.success("添加好友成功");
        setModal("");
      } else {
        message.error("TA已经是您的好友了");
      }
    });
    socket.on("disconnect", (reason) => {
      console.log(reason);
      FreshToken.delete();
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });
    const fetchData = async () => {
      const user = await Api.getInfo();
      setCurUser(user);
    };

    //socket 在进入页面之后才绑定，暂时的处理方案
    if (!FreshToken.get()) {
      FreshToken.save(1);
      window.location.reload();
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const chatlist = await Api.getMyFriends(curUser._id);
      setChatList(chatlist);
    };
    fetchData();
  }, [curUser, modal]);

  return (
    <div className="home">
      <HomeContext.Provider
        value={{ currentUser: curUser, activeChatId, socket, setModal }}
      >
        <HomeHeader />
        <div className="home-container">
          <ChatList onChooseChat={onChooseChat} data={chatList} />
          <ChatArea
            data={
              chatList.find((item: UserInfo) => item._id === activeChatId) || {}
            }
          />
        </div>
      </HomeContext.Provider>
      <Modal
        title="添加好友"
        visible={modal === "addFriend"}
        onCancel={() => setModal("")}
        onOk={() => {
          setModal("");
        }}
        centered={true}
        footer={null}
      >
        <Input.Search
          placeholder="请输入好友的id"
          onSearch={onSearchUserById}
          spellCheck={false}
        />
        {addFriendList.map((item: UserInfo, index: number) => (
          <div className="modal-addFriend-item" key={index}>
            <img
              src={item.avatarUrl || ""}
              alt=""
              className="modal-addFriend-item-avatar"
            />
            <div className="modal-addFriend-item-content">
              <div className="modal-addFriend-item-nickname">
                {item.nickname}
              </div>
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
      <LogoutOutlined className="home-logout" onClick={handleLogout} />
    </div>
  );
};

export default Home;
