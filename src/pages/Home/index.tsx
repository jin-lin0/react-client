import { useEffect, useState } from "react";
import io from "socket.io-client";
import { HomeContext } from "@/context";
import { SOCKET_OPTIONS, SOCKET_URL } from "../../const/config";
import HomeHeader from "./components/HomeHeader";
import ChatList from "./components/ChatList";
import ChatArea from "./components/ChatArea";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { LoginToken } from "@/utils/token";
import Api from "@/api";
import "./index.less";
import { Input, Modal } from "antd";
import { UserInfo } from "@/const/interface";

const Home = () => {
  const socket = io(SOCKET_URL, SOCKET_OPTIONS);
  const navigate = useNavigate();
  const [curUser, setCurUser] = useState({});
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const [chatList, setChatList] = useState([
    { nickname: "NickOut" },
    { nickname: "王思思" },
  ]);
  const [modal, setModal] = useState("");
  const [addFriendList, setAddFriendList] = useState<any>([]);

  const onChooseChat = (activeChat) => {
    setActiveChatIndex(activeChat);
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

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket);
      Api.getInfo().then((userInfo) => {
        socket.emit("online", userInfo);
      });
    });
    socket.on("disconnect", (reason) => {
      console.log(reason);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });
    const fetchData = async () => {
      const user = await Api.getInfo();
      setCurUser(user);
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <HomeContext.Provider
        value={{ currentUser: curUser, activeChatIndex, socket, setModal }}
      >
        <HomeHeader />
        <div className="home-container">
          <ChatList onChooseChat={onChooseChat} data={chatList} />
          <ChatArea data={chatList[activeChatIndex]} />
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
            <div className="modal-addFriend-item-button">添加</div>
          </div>
        ))}
      </Modal>
      <LogoutOutlined className="home-logout" onClick={handleLogout} />
    </div>
  );
};

export default Home;
