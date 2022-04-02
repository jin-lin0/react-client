import classNames from "classnames";
import { useContext, useState } from "react";
import { HomeContext } from "@/context";
import "./index.less";
import { Input } from "antd";
import Tool from "@/utils/tool";

const ChatListItem = (props) => {
  const { active, item, onClick } = props;
  const { nickname, avatarUrl } = item;
  return (
    <div
      className={classNames("chat-list-item", {
        "chat-list-item-active": active,
      })}
      onClick={onClick}
    >
      <img src={avatarUrl} alt="" />
      <div className="nickname">{nickname}</div>
    </div>
  );
};

const ChatList = (props) => {
  const { onChooseChat, data } = props;
  const { activeChatIndex } = useContext<any>(HomeContext);
  const [chatListData, setChatListData] = useState(data);

  const onSearchChatList = (e) => {
    setChatListData(Tool.fuzzyQuery(e.target.value, data, "nickname"));
  };

  return (
    <div className="chat-list">
      <div className="chat-list-search">
        <Input placeholder="请搜索" onChange={onSearchChatList} />
      </div>
      {chatListData.map((item, index) => (
        <ChatListItem
          key={index}
          active={activeChatIndex === index}
          item={item}
          onClick={() => onChooseChat(index)}
        />
      ))}
    </div>
  );
};

export default ChatList;
