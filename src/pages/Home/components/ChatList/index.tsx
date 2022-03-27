import classNames from "classnames";
import React, { useEffect, useState } from "react";
import "./index.less";

const ChatListItem = (props) => {
  const { active, item, onClick } = props;
  const { nickname, avatorUrl } = item;
  return (
    <div
      className={classNames("chat-list-item", {
        "chat-list-item-active": active,
      })}
      onClick={onClick}
    >
      <img src={avatorUrl} alt="" />
      <div className="nickname">{nickname}</div>
    </div>
  );
};

const ChatList = () => {
  const [active, setActive] = useState(0);
  const [listData, setListData] = useState(
    Array(10).fill({ nickname: "NickOut" })
  );
  return (
    <div className="chat-list">
      {listData.map((item, index) => (
        <ChatListItem
          active={active === index}
          item={item}
          onClick={() => setActive(index)}
        />
      ))}
    </div>
  );
};

export default ChatList;
