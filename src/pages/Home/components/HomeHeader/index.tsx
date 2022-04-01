import { HomeContext } from "@/context";
import React, { useContext, useEffect, useState } from "react";
import "./index.less";

const HomeHeader = (props) => {
  const { currentUser = {}, socket } = useContext<any>(HomeContext);
  const [onLineInfo, setOnlineInfo] = useState({});
  useEffect(() => {
    socket.on("onLineUser", (data) => {
      setOnlineInfo(data);
    });
  }, []);
  return (
    <div className="home-header">
      <img src={currentUser.avatorUrl} alt="" className="home-header-avator" />
      <div className="home-header-nickname">{`${
        currentUser.nickname || ""
      }（当前在线人数：${Object.keys(onLineInfo).length}）`}</div>
    </div>
  );
};

export default HomeHeader;
