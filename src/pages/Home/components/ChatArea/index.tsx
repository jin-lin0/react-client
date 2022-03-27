import { Input } from "antd";
import React, { useEffect } from "react";
import "./index.less";

const ChatArea = () => {
  return (
    <div className="chat-area">
      <header>
        <img src="" alt="" className="avator" />
        <div className="nickname">王成</div>
      </header>
      area
      <footer className="chat-area-input">
        <input type="text" />
      </footer>
    </div>
  );
};

export default ChatArea;
