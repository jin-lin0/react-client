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

const Home = () => {
  const socket = io(SOCKET_URL, SOCKET_OPTIONS);
  const navigate = useNavigate();
  const [curUser, setCurUser] = useState({});
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const [chatList, setChatList] = useState([
    { nickname: "NickOut" },
    { nickname: "王思思" },
  ]);

  const onChooseChat = (activeChat) => {
    setActiveChatIndex(activeChat);
  };

  const handleLogout = () => {
    navigate("/login", { replace: true });
    LoginToken.delete();
    socket.disconnect();
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
      <div className="home-container">
        <HomeContext.Provider
          value={{ currentUser: curUser, activeChatIndex, socket }}
        >
          <ChatList onChooseChat={onChooseChat} data={chatList} />
          <ChatArea data={chatList[activeChatIndex]} />
        </HomeContext.Provider>
      </div>
      <LogoutOutlined className="home-logout" onClick={handleLogout} />
    </div>
  );
};

export default Home;
