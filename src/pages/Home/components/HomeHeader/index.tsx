import { HomeContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import "./index.less";

const HomeHeader = () => {
  const { currentUser = {}, socket } = useContext<any>(HomeContext);
  const [onLineInfo, setOnlineInfo] = useState({});
  useEffect(() => {
    socket.on("onLineUser", (data) => {
      console.log(data);
      setOnlineInfo(data);
    });
  }, []);
  return (
    <div className="home-header">
      <header>
        <img
          src={currentUser.avatorUrl}
          alt=""
          className="home-header-avator"
        />
        <div className="home-header-nickname">{`${
          currentUser.nickname || ""
        }（当前在线人数：${Object.keys(onLineInfo).length}）`}</div>
      </header>

      <div className="home-header-addFriend">添加好友</div>
    </div>
  );
};

export default HomeHeader;
