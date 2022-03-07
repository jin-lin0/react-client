import React, { useEffect } from "react";
import io from "socket.io-client";
import { SOCKET_OPTIONS, SOCKET_URL } from "../../const/config";
import HomeHeader from "./components/HomeHeader";
import ChatArea from "./components/ChatArea";
import "./index.less";

const socket = io(SOCKET_URL, SOCKET_OPTIONS);

const Home = () => {
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
      <HomeHeader />
      <ChatArea />
    </div>
  );
};

export default Home;
