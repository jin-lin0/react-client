import { Input } from "antd";
import React, { useEffect } from "react";
import "./index.less";

const ChatArea = () => {
  return (
    <div className="chat-area">
      <Input placeholder="请输入" />
    </div>
  );
};

export default ChatArea;
