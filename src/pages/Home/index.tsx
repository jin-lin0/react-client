import { useEffect, useState } from "react";
import io from "socket.io-client";
import { HomeContext } from "@/context";
import { SOCKET_OPTIONS, SOCKET_URL } from "../../const/config";
import HomeHeader from "./components/HomeHeader";
import ChatList from "./components/ChatList";
import ChatArea from "./components/ChatArea";
import "./index.less";

const Home = () => {
  const socket = io(SOCKET_URL, SOCKET_OPTIONS);
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const [chatList, setChatList] = useState([
    { nickname: "NickOut" },
    { nickname: "王思思" },
  ]);

  const onChoseChat = (activeChat) => {
    setActiveChatIndex(activeChat);
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
        <HomeContext.Provider value={{ currentUser: 1, activeChatIndex }}>
          <ChatList onChoseChat={onChoseChat} data={chatList} />
          <ChatArea data={chatList[activeChatIndex]} />
        </HomeContext.Provider>
      </div>
    </div>
  );
};

export default Home;
