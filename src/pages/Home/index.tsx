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
import { message } from "antd";
import { UserInfo } from "@/const/interface";
import ShowDetailModal from "./components/Modal/components/ShowDetailModal";
import AddFriendModal from "./components/Modal/components/AddFriendModal";

const Home = (props) => {
  const { socket } = props;
  const navigate = useNavigate();
  const [curUser, setCurUser] = useState<any>({});
  const [activeChatId, setActiveChatId] = useState("");
  const [chatList, setChatList] = useState([]);
  const [modal, setModal] = useState<any>({});

  const onChooseChat = (id) => {
    setActiveChatId(id);
  };

  const handleLogout = () => {
    navigate("/login", { replace: true });
    LoginToken.delete();
    socket.disconnect();
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket);
      Api.getMyInfo().then((userInfo) => {
        socket.emit("online", userInfo);
      });
    });
    socket.on("addSuccess", (data) => {
      if (data) {
        message.success("添加好友成功");
        setModal({});
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
      const user = await Api.getMyInfo();
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
        value={{ currentUser: curUser, activeChatId, socket, setModal, modal }}
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

        {modal.key === "addFriend" && <AddFriendModal />}
        {modal.key === "showDetail" && <ShowDetailModal />}
      </HomeContext.Provider>
      <LogoutOutlined className="home-logout" onClick={handleLogout} />
    </div>
  );
};

export default Home;
