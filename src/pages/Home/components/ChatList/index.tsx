import classNames from "classnames";
import { useContext } from "react";
import { HomeContext } from "@/context";
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

const ChatList = (props) => {
  const { onChooseChat, data } = props;
  const { activeChatIndex } = useContext<any>(HomeContext);
  return (
    <div className="chat-list">
      {data.map((item, index) => (
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
