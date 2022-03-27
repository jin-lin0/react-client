import { Input, Popover } from "antd";
import React, { useEffect, useReducer, useState } from "react";
import Picker from "emoji-picker-react";
import { SmileOutlined } from "@ant-design/icons";
import "./index.less";
import TextArea from "antd/lib/input/TextArea";

const ChatArea = () => {
  const [panel, setPanel] = useState("");
  const [msg, setMsg] = useState("");

  const onEmojiClick = (event, emoji) => {
    console.log(event, emoji);
    setMsg((msg) => msg + emoji.emoji);
  };

  const onPanelChange = (panel) => {
    setPanel(panel);
  };

  const onTextareChange = (e) => {
    setMsg(e.target.value);
  };

  const onMsgSend = () => {
    if (msg === "") return;
  };

  return (
    <div className="chat-area">
      <header>
        <img src="" alt="" className="avator" />
        <div className="nickname">王成</div>
      </header>
      <section className="chat-area-content">content</section>
      <footer>
        <div className="chat-area-panel">
          <Popover
            trigger="click"
            content={<Picker onEmojiClick={onEmojiClick} />}
          >
            <SmileOutlined
              style={{ fontSize: "1.2rem" }}
              onClick={() => onPanelChange("emoji")}
            />
          </Popover>
        </div>
        <TextArea
          onChange={onTextareChange}
          value={msg}
          spellCheck={false}
          bordered={false}
        />
        <div className="chat-area-sendButton" onClick={onMsgSend}>
          发送
        </div>
      </footer>
    </div>
  );
};

export default ChatArea;
