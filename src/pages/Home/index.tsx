import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
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
import DraggableVideoPanel from "./components/DraggableVideoPanel";

const Home = (props) => {
  const { socket } = props;
  const navigate = useNavigate();
  const [curUser, setCurUser] = useState<any>({});
  const [activeChatId, setActiveChatId] = useState("");
  const [chatList, setChatList] = useState([]);
  const [modal, setModal] = useState<any>({});
  const [webRtcShow, setWebRtcShow] = useState("");
  const [rtcChatData, setRtcChatData] = useState({});
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState<any>();
  const [stream, setStream] = useState<any>();
  const [, dropRef] = useDrop({
    accept: "audio",
    drop: (item, monitor) => {
      return {
        top: monitor.getDifferenceFromInitialOffset()?.y,
        left: monitor.getDifferenceFromInitialOffset()?.x,
      };
    },
  });

  const closeLocalStream = () => {
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  };
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
    socket.on("addFriendSuccess", (data) => {
      if (data) {
        message.success("添加好友成功");
        setModal({});
      } else {
        message.error("TA已经是您的好友了～");
      }
    });
    socket.on("deleteFriendSuccess", (data) => {
      if (data) {
        message.success("删除好友成功");
        setModal({});
      } else {
        message.error("删除好友失败！");
      }
    });

    socket.on("rtcVideoReceive", (data) => {
      const {
        senderId,
        receiveId,
        senderAvatarUrl,
        receiveAvatarUrl,
        senderNickname,
        signalData,
      } = data;
      // setVideoReceving(true);
      // setSenderSignal(signalData);
      console.log(data, "rtcVideoReceive");
      setRtcChatData({
        senderId,
        receiveId,
        senderAvatarUrl,
        receiveAvatarUrl,
        senderNickname,
      });
    });

    socket.on("callUser", (data) => {
      const {
        type,
        senderId,
        receiveId,
        senderAvatarUrl,
        receiveAvatarUrl,
        senderNickname,
        signalData,
      } = data;
      setWebRtcShow(type);
      setReceivingCall(true);
      setRtcChatData({
        type,
        senderId,
        receiveId,
        senderAvatarUrl,
        receiveAvatarUrl,
        senderNickname,
      });
      setCallerSignal(signalData);
    });

    socket.on("callUserError", (data) => {
      message.error("当前用户不在线！");
      closeLocalStream();
      setStream("");
      setWebRtcShow("");
      setRtcChatData({});
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
    <div className="home" ref={dropRef}>
      <HomeContext.Provider
        value={{
          currentUser: curUser,
          setCurUser,
          activeChatId,
          socket,
          setModal,
          modal,
          webRtcShow,
          setWebRtcShow,
          rtcChatData,
          setRtcChatData,
          receivingCall,
          setReceivingCall,
          callerSignal,
          setCallerSignal,
          stream,
          setStream,
          closeLocalStream,
        }}
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
        {(webRtcShow === "video" ||
          webRtcShow === "audio" ||
          receivingCall) && <DraggableVideoPanel />}
      </HomeContext.Provider>
      <LogoutOutlined className="home-logout" onClick={handleLogout} />
    </div>
  );
};

export default Home;
