import { HomeContext } from "@/context";
import { Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
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
  } = useContext<any>(HomeContext);
  const [stream, setStream] = useState<any>();
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
  }, []);

  const callUser = () => {
    setCallEnded(false);
    const peer = new Peer({
      initiator: true,
      stream: stream,
      trickle: false,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        ...rtcChatData,
        signalData: data,
      });
    });

    peer.on("stream", (stream) => {
      console.log("stream", stream);
      userVideo.current.srcObject = stream;
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

  const closeLocalStream = () => {
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
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
            {stream && <video playsInline muted autoPlay ref={myVideo} />}
          </div>
          <div className="video" hidden={webRtcShow === "audio"}>
            {console.log(
              "callAccepted:" + callAccepted + "   callEnded:" + callEnded
            )}
            {callAccepted && !callEnded ? (
              <video playsInline autoPlay ref={userVideo} />
            ) : null}
          </div>
        </div>
        <PhoneOutlined
          style={{ color: "#17ea17", fontSize: "2rem", marginBottom: "1rem" }}
        />
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
