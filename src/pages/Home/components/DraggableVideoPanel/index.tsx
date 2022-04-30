import { HomeContext } from "@/context";
import { Button, message } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import DraggableComponent from "@/components/DraggableComponent";
import "./index.less";

const VideoPanel = () => {
  const {
    socket,
    rtcChatData,
    setRtcChatData,
    currentUser,
    webRtcShow,
    receivingCall,
    setReceivingCall,
    callerSignal,
    setCallerSignal,
    setWebRtcShow,
    stream,
    setStream,
    closeLocalStream,
  } = useContext<any>(HomeContext);

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(true);
  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef<any>();

  const webRtcShowText = {
    video: "视频通话",
    audio: "语音通话",
  };

  const {
    senderId,
    receiveId,
    senderAvatarUrl,
    receiveAvatarUrl,
    senderNickname,
  } = rtcChatData;
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: webRtcShow === "video" ? true : false,
      })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });
    return closeLocalStream();
  }, []);

  const callUser = () => {
    setCallEnded(false);
    const peer = new Peer({
      initiator: true,
      stream: stream,
      trickle: false,
    });
    peer.on("close", () => {
      leaveCall();
      message.info(`${webRtcShowText[webRtcShow]}已经断开～`);
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        ...rtcChatData,
        signalData: data,
      });
    });

    peer.on("stream", (stream) => {
      if (stream && userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      console.log("callAccepted", signal);
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallEnded(false);
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      stream: stream,
      trickle: false,
    });
    peer.on("close", () => {
      leaveCall();
      message.info(`${webRtcShowText[webRtcShow]}已经断开～`);
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: senderId,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    closeLocalStream();
    setCallAccepted(false);
    setReceivingCall(false);
    socket.off("callAccepted");
    setWebRtcShow("");

    connectionRef.current.destroy();
  };

  return (
    <>
      <div className="videoPanel">
        <div className="videoPanel-video">
          <div className="video" hidden={webRtcShow === "audio"}>
            <video
              playsInline
              muted
              autoPlay
              ref={myVideo}
              hidden={!stream || (receivingCall && !callAccepted)}
            />
          </div>

          <div className="video" hidden={webRtcShow === "audio"}>
            <video
              playsInline
              autoPlay
              ref={userVideo}
              hidden={!callAccepted || callEnded}
            />
          </div>
        </div>
        {webRtcShow === "audio" && (
          <img
            src={
              currentUser._id === rtcChatData.senderId
                ? rtcChatData.receiveAvatarUrl
                : rtcChatData.senderAvatarUrl
            }
            alt=""
            className="videoPanel-avatar"
          />
        )}

        <div className="videoPanel-footer">
          {callAccepted && !callEnded && (
            <Button
              type="primary"
              style={{
                background: "red",
                borderRadius: "1rem",
              }}
              onClick={leaveCall}
            >
              结束
            </Button>
          )}
          {!callAccepted && !receivingCall && (
            <>
              <Button
                type="primary"
                style={{ background: "#17ea17", borderRadius: "1rem" }}
                onClick={callUser}
              >
                {callEnded ? "拨打" : "拨打中..."}
              </Button>
              {callEnded && (
                <Button
                  type="primary"
                  style={{
                    background: "red",
                    borderRadius: "1rem",
                    marginLeft: "1rem",
                  }}
                  onClick={() => {
                    closeLocalStream();
                    setWebRtcShow("");
                    setRtcChatData({});
                  }}
                >
                  取消
                </Button>
              )}
            </>
          )}
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="videoPanel-caller">
              <div className="videoPanel-caller-text">
                {senderNickname}邀请您{webRtcShowText[webRtcShow]}...
              </div>
              <Button
                type="primary"
                style={{ background: "#2acd2a", borderRadius: "1rem" }}
                onClick={answerCall}
              >
                同意
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

const DraggableVideoPanel = () => (
  <DraggableComponent
    type="audio"
    id="draggableVideo"
    top="50%"
    children={<VideoPanel />}
  />
);

export default DraggableVideoPanel;
