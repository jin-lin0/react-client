import { Popover } from "antd";
import {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import Picker from "emoji-picker-react";
import { SmileOutlined, UploadOutlined } from "@ant-design/icons";
import { HomeContext } from "@/context";
import "./index.less";
import TextArea from "antd/lib/input/TextArea";
import classNames from "classnames";
import Api from "@/api";

const ChatArea = (props) => {
  const { data: areaData } = props;
  const { nickname, avatarUrl, _id: receiveId } = areaData;
  const { currentUser, socket } = useContext<any>(HomeContext);
  const [panel, setPanel] = useState("");
  const [msg, setMsg] = useState("");
  const [listMsg, setListMsg] = useState<any>([]);
  const contentRef = useRef<any>(null);

  const MessageItem = (props) => {
    const { msgObj } = props;
    const { sender = "", content = "" } = msgObj;
    return (
      <div
        className={classNames("message-item", {
          "message-item-self": sender === currentUser._id,
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

  const handleScrollBottom = () => {
    if (contentRef) {
      setTimeout(
        () => (contentRef.current.scrollTop = contentRef.current.scrollHeight),
        15
      );
    }
  };

  const onSendMsg = () => {
    if (msg === "") return;
    socket.emit("sendMsg", {
      type: "text",
      sender: currentUser._id,
      receive: receiveId,
      content: msg,
    });
    setListMsg((list) => [
      ...list,
      { sender: currentUser._id, receive: receiveId, content: msg },
    ]);
    setMsg("");
    handleScrollBottom();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.getPrivate(currentUser._id, receiveId);
      if (data) {
        setListMsg(data);
      } else {
        setListMsg([]);
      }
    };
    if (!socket._callbacks.$receiveMsg) {
      socket.on("receiveMsg", (data) => {
        setListMsg((list) => [...list, data]);
      });
    }

    fetchData();
  }, [receiveId]);

  useLayoutEffect(() => {
    handleScrollBottom();
  }, [receiveId]);

  return (
    <div className="chat-area">
      <header>
        <img src={avatarUrl} alt="" className="avatar" />
        <div className="nickname">{nickname}</div>
      </header>
      <section className="chat-area-content" ref={contentRef}>
        {listMsg
          .filter(
            (item) => item.sender === receiveId || item.receive === receiveId
          )
          .map((msgItem, index) => (
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
