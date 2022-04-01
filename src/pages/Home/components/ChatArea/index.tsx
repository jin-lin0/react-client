import { Popover } from "antd";
import { useState, useContext, useEffect } from "react";
import Picker from "emoji-picker-react";
import { SmileOutlined, UploadOutlined } from "@ant-design/icons";
import { HomeContext } from "@/context";
import "./index.less";
import TextArea from "antd/lib/input/TextArea";
import classNames from "classnames";

const ChatArea = (props) => {
  const { data } = props;
  const { nickname } = data;
  const { currentUser } = useContext<any>(HomeContext);
  const [panel, setPanel] = useState("");
  const [msg, setMsg] = useState("");
  const [listMsg, setListMsg] = useState<any>([]);

  const MessageItem = (props) => {
    const { msgObj } = props;
    const { from = "", content = "" } = msgObj;
    return (
      <div
        className={classNames("message-item", {
          "message-item-self": from === currentUser.phone_number,
        })}
      >
        <pre className="message-item-content">{content}</pre>
      </div>
    );
  };

  const HintItem = (props) => {
    const { nickname } = props;
    return <div className="hint-item">- {nickname} 进来了 -</div>;
  };

  const onEmojiClick = (event, emoji) => {
    console.log(event, emoji);
    setMsg((msg) => msg + emoji.emoji);
  };

  const onChangePanel = (panel) => {
    setPanel(panel);
  };

  const onChangeTextare = (e) => {
    setMsg(e.target.value);
  };

  const onSendMsg = () => {
    if (msg === "") return;
    console.log(msg);
    setListMsg((list) => [
      ...list,
      { from: currentUser.phone_number, content: msg },
    ]);
    setMsg("");
  };

  useEffect(() => {}, [nickname]);

  return (
    <div className="chat-area">
      <header>
        <img alt="" className="avator" />
        <div className="nickname">{nickname}</div>
      </header>
      <section className="chat-area-content">
        {listMsg.map((msgItem, index) => (
          <MessageItem msgObj={msgItem} key={index} />
        ))}
      </section>
      <footer>
        <div className="chat-area-panel">
          <Popover
            trigger="click"
            content={
              <Picker onEmojiClick={onEmojiClick} disableSearchBar={true} />
            }
          >
            <SmileOutlined
              style={{ fontSize: "1.2rem" }}
              onClick={() => onChangePanel("emoji")}
            />
          </Popover>
          <UploadOutlined style={{ fontSize: "1.2rem" }} />
        </div>
        <TextArea
          onChange={onChangeTextare}
          value={msg}
          spellCheck={false}
          bordered={false}
        />
        <div className="chat-area-sendButton" onClick={onSendMsg}>
          发送
        </div>
      </footer>
    </div>
  );
};

export default ChatArea;