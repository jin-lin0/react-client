import { HomeContext } from "@/context";
import { Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import "./index.less";

const HomeHeader = () => {
  const { currentUser = {}, socket, setModal } = useContext<any>(HomeContext);
  const [onLineInfo, setOnlineInfo] = useState({});
  useEffect(() => {
    socket.on("onLineUser", (data) => {
      setOnlineInfo(data);
    });
  }, []);
  return (
    <div className="home-header">
      <header>
        <img
          src={currentUser.avatarUrl}
          alt=""
          className="home-header-avatar"
          onClick={() => setModal({ key: "showDetail" })}
        />
        <div className="home-header-nickname">{`${
          currentUser.nickname || ""
        }（当前在线人数：${Object.keys(onLineInfo).length}）`}</div>
      </header>

      <div
        className="home-header-addFriend"
        onClick={() => setModal({ key: "addFriend" })}
      >
        好友管理
      </div>
      <div
        className="home-header-groupManage"
        onClick={() => setModal({ key: "groupManage" })}
      >
        群组管理
      </div>
    </div>
  );
};

export default HomeHeader;
