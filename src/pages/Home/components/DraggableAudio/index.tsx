import DraggableComponent from "@/components/DraggableComponent";
import { HomeContext } from "@/context";
import { PhoneOutlined } from "@ant-design/icons";
import { useContext, useEffect, useRef, useState } from "react";
import "./index.less";

interface ChatData {
  senderId?: string;
  receiveId?: string;
  senderAvatarUrl?: string;
  receiveAvatarUrl?: string;
}

interface DraggableAudioProps {
  action?: "send" | "receive";
  avatarUrl?: string;
  chatData: ChatData;
  hidden?: boolean;
  hiddenOpacity?: number;
}

const DraggableAudio = (props: DraggableAudioProps) => {
  const { hidden, hiddenOpacity, action, chatData } = props;
  const { setWebRtcShow, socket, setRtcChatData } =
    useContext<any>(HomeContext);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>(
    new RTCPeerConnection()
  );
  const [audioStream, setAudioStream] = useState<any>(null);
  const draggableAudioRef = useRef<any>();

  const { senderAvatarUrl, receiveAvatarUrl } = chatData;
  useEffect(() => {
    const getPeerStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      if (draggableAudioRef.current) {
        draggableAudioRef.current.srcObject = stream;
      }
      console.log(stream);
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });
      const offer = await peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      socket.emit("rtcOfferSend", { offer, data: chatData });
    };
    getPeerStream();
  }, []);

  return (
    <DraggableComponent
      type="audio"
      id="draggableAudio"
      children={
        <div className="draggableAudio">
          <img src={receiveAvatarUrl} alt="" className="avatar" />
          <PhoneOutlined
            style={{ fontSize: "1.3rem", color: "red" }}
            onClick={() => {
              setWebRtcShow("");
              setRtcChatData({});
            }}
          />
          <audio
            src=""
            playsInline
            autoPlay
            ref={draggableAudioRef}
            id="draggableAudio"
          ></audio>
        </div>
      }
      hidden={hidden}
      hiddenOpacity={hiddenOpacity}
    />
  );
};

export default DraggableAudio;
