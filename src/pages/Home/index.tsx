import { useEffect, useState } from "react";
import io from "socket.io-client";
import { HomeContext } from "@/context";
import { SOCKET_OPTIONS, SOCKET_URL } from "../../const/config";
import HomeHeader from "./components/HomeHeader";
import ChatList from "./components/ChatList";
import ChatArea from "./components/ChatArea";
import { LogoutOutlined } from "@ant-design/icons";
import "./index.less";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const socket = io(SOCKET_URL, SOCKET_OPTIONS);
  const navigate = useNavigate();
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const [chatList, setChatList] = useState([
    { nickname: "NickOut" },
    { nickname: "王思思" },
  ]);

  const onChoseChat = (activeChat) => {
    setActiveChatIndex(activeChat);
  };

  const handleLogout = () => {
    navigate("/login", { replace: true });
    socket.disconnect();
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.io);
    });
    socket.on("disconnect", (reason) => {
      console.log(reason);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });
  }, []);

  return (
    <div className="home">
      <div className="home-container">
        <HomeContext.Provider
          value={{ currentUser: "123", activeChatIndex, socket }}
        >
          <ChatList onChoseChat={onChoseChat} data={chatList} />
          <ChatArea data={chatList[activeChatIndex]} />
        </HomeContext.Provider>
      </div>
      <LogoutOutlined className="home-logout" onClick={handleLogout} />
    </div>
  );
};

export default Home;
