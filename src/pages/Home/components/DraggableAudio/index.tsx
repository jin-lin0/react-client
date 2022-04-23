import DraggableComponent from "@/components/DraggableComponent";
import { PhoneOutlined } from "@ant-design/icons";
import "./index.less";

interface DraggableAudioProps {
  avatarUrl?: string;
}

const DraggableAudio = (props: DraggableAudioProps) => {
  const { avatarUrl = "" } = props;
  return (
    <DraggableComponent
      type="audio"
      id="draggableAudio"
      children={
        <div className="draggableAudio">
          <img src={avatarUrl} alt="" className="avatar" />
          <PhoneOutlined style={{ fontSize: "1.3rem", color: "red" }} />
        </div>
      }
    />
  );
};

export default DraggableAudio;
