import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "@/context";
import "./index.less";
import { Input, Tabs } from "antd";
import Tool from "@/utils/tool";
import Api from "@/api";
import ColorAvatar from "@/components/ColorAvatar";

const { TabPane } = Tabs;

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
      {avatarUrl ? (
        <img src={avatarUrl} alt="" />
      ) : (
        <ColorAvatar nickname={nickname} />
      )}
      <div className="nickname">{nickname}</div>
    </div>
  );
};

const ChatList = (props) => {
  const { onChooseChat } = props;
  const { activeChatId, modal } = useContext<any>(HomeContext);
  const [initChatData, setInitChatData] = useState<any>([]);
  const [chatListData, setChatListData] = useState<any>([]);
  const [tab, setTab] = useState("friends");

  const onChangeTab = (v) => {
    setTab(v);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (tab == "friends") {
        const { _id } = await Api.getMyInfo();
        const chatlist = await Api.getMyFriends(_id);
        setInitChatData(chatlist);
        setChatListData(chatlist);
      } else if (tab === "groups") {
        const chatlist = await Api.getMyGroup();
        setInitChatData(chatlist);
        setChatListData(chatlist);
      }
    };
    fetchData();
  }, [tab, modal]);

  const onSearchChatList = (e) => {
    setChatListData(Tool.fuzzyQuery(e.target.value, initChatData, "nickname"));
  };

  return (
    <div className="chat-list">
      <Tabs defaultActiveKey="friends" centered onChange={onChangeTab}>
        <TabPane tab="好友" key="friends">
          <>
            <div className="chat-list-search">
              <Input placeholder="请搜索" onChange={onSearchChatList} />
            </div>
            {chatListData?.map((item, index) => (
              <ChatListItem
                key={index}
                active={activeChatId === item._id}
                item={item}
                onClick={() => onChooseChat(item._id)}
              />
            ))}
          </>
        </TabPane>
        <TabPane tab="群组" key="groups">
          <div className="chat-list-search">
            <Input placeholder="请搜索" onChange={onSearchChatList} />
          </div>
          {chatListData?.map((item, index) => (
            <ChatListItem
              key={index}
              active={activeChatId === item._id}
              item={item}
              onClick={() => onChooseChat(item._id)}
            />
          ))}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ChatList;
