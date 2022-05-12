import DraggableComponent from "@/components/DraggableComponent";
import { HomeContext } from "@/context";
import { VideoCameraOutlined } from "@ant-design/icons";
import Peer from "simple-peer";
import { useContext, useEffect, useRef, useState } from "react";
import "./index.less";
import { Button, Modal } from "antd";

interface ChatData {
  senderId?: string;
  senderNickname?: string;
  receiveId?: string;
  senderAvatarUrl?: string;
  receiveAvatarUrl?: string;
}

interface DraggableVideoProps {
  action?: "send" | "receive";
  avatarUrl?: string;
  chatData: ChatData;
  hidden?: boolean;
  hiddenOpacity?: number;
}

const DraggableVideo = (props: DraggableVideoProps) => {
  const { hidden, hiddenOpacity, action, chatData } = props;
  const {
    setWebRtcShow,
    socket,
    setRtcChatData,
    currentUser,
    senderSignal,
    setSenderSignal,
    callAccepted,
    setCallAccepted,
    rtcVideoReceiving,
    setVideoReceving,
    videoStream,
    setVideoStream,
  } = useContext<any>(HomeContext);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>(
    new RTCPeerConnection()
  );

  const draggableVideoRef = useRef<any>();
  const draggableVideo2Ref = useRef<any>();
  const peerRef = useRef<any>();

  const {
    senderId,
    receiveId,
    senderNickname,
    senderAvatarUrl,
    receiveAvatarUrl,
  } = chatData;

  const sendCall = () => {
    console.log("sendCall");
    const peer = new Peer({
      initiator: true,
      stream: videoStream,
      trickle: false,
    });
    peer.on("signal", (data) => {
      console.log("callUser", data);
      socket.emit("rtcVideoSend", {
        senderId,
        receiveId,
        senderAvatarUrl,
        receiveAvatarUrl,
        senderNickname,
        signalData: data,
      });
    });

    peer.on("stream", (stream) => {
      draggableVideo2Ref.current.srcObject = stream;
    });

    socket.on("rtcVideoSenderReceive", (data) => {
      console.log("callAccepted", data.signalData);
      setCallAccepted(true);
      peer.signal(data.signalData);
    });
    peerRef.current = peer;
  };

  const receiveCall = () => {
    console.log("receiveCall", videoStream);
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      stream: videoStream,
      trickle: false,
    });

    peer.on("signal", (data) => {
      console.log("answercall", data);
      socket.emit("rtcVideoReceiveSend", {
        senderId,
        receiveId,
        senderAvatarUrl,
        receiveAvatarUrl,
        senderNickname,
        signalData: data,
      });
    });
    peer.on("stream", (stream) => {
      console.log("st");
      draggableVideo2Ref.current.srcObject = stream;
    });
    console.log(senderSignal, "callersigner");
    peer.signal(senderSignal);

    peerRef.current = peer;
  };

  useEffect(() => {
    const getPeerStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setVideoStream(stream);
      if (draggableVideoRef.current) {
        draggableVideoRef.current.srcObject = stream;
      }
      currentUser._id === senderId && sendCall();
      console.log(
        currentUser._id === senderId,
        currentUser._id === receiveId,
        currentUser._id,
        receiveId
      );
    };

    getPeerStream();
  }, []);

  return (
    <DraggableComponent
      type="audio"
      id="draggableVideo"
      top="50%"
      children={
        <div className="draggableVideo">
          {videoStream && (
            <>
              <div className="draggableVideo-container">
                <video
                  src=""
                  playsInline
                  controls
                  autoPlay
                  ref={draggableVideoRef}
                  id="draggableVideo"
                  muted
                ></video>
                {callAccepted && (
                  <video
                    src=""
                    playsInline
                    controls
                    autoPlay
                    ref={draggableVideo2Ref}
                    id="draggableVideo2"
                    muted
                  ></video>
                )}
              </div>

              <VideoCameraOutlined
                style={{ fontSize: "1.3rem", color: "red" }}
                onClick={() => {
                  setWebRtcShow("");
                  setRtcChatData({});
                  console.log("peerRef", peerRef);
                  peerRef.current.destroy();
                }}
              />
            </>
          )}
          {rtcVideoReceiving && !callAccepted && (
            <div className="receiving-video">
              正在视频通话...
              <Button type="primary" onClick={() => receiveCall()}>
                接受
              </Button>
              <Button type="primary">拒绝 </Button>
            </div>
          )}
        </div>
      }
      hidden={hidden}
      hiddenOpacity={hiddenOpacity}
    />
  );
};

export default DraggableVideo;
