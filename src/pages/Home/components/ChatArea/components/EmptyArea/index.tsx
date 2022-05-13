import "./index.less";
import { MessageTwoTone } from "@ant-design/icons";

const EmptyArea = () => {
  return (
    <div className="chat-area-empty">
      <MessageTwoTone style={{ fontSize: "5rem" }} />
      <div className="chat-area-empty-text">Welcome to join our chat!</div>
    </div>
  );
};

export default EmptyArea;
