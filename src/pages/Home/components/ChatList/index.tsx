import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
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
  const { activeChatId } = useContext<any>(HomeContext);
  const [chatListData, setChatListData] = useState(data);
  useEffect(() => {
    setChatListData(data);
  }, [data]);

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
          active={activeChatId === item._id}
          item={item}
          onClick={() => onChooseChat(item._id)}
        />
      ))}
    </div>
  );
};

export default ChatList;
