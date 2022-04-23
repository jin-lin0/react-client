import { message, Popover, Upload, Image } from "antd";
import {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import Picker from "emoji-picker-react";
import {
  SmileOutlined,
  UploadOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { HomeContext } from "@/context";
import "./index.less";
import TextArea from "antd/lib/input/TextArea";
import classNames from "classnames";
import Api from "@/api";
import { LoginToken } from "@/utils/token";
import { RcFile } from "antd/lib/upload";
import Regex from "@/utils/regex";
import { SOCKET_URL } from "@/const/config";

const ChatArea = (props) => {
  const { data: areaData } = props;
  const {
    nickname,
    avatarUrl,
    _id: receiveId,
    signature = "",
    signatureColor = "#fff",
  } = areaData;
  const { currentUser, socket, setModal } = useContext<any>(HomeContext);
  const [panel, setPanel] = useState("");
  const [msg, setMsg] = useState("");
  const [listMsg, setListMsg] = useState<any>([]);
  const contentRef = useRef<any>(null);

  const onAvatorClick = async () => {
    if (receiveId) {
      const modalData = await Api.getInfo(receiveId);
      setModal({ key: "showDetail", data: modalData });
    }
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
      {
        sender: currentUser._id,
        receive: receiveId,
        content: msg,
        type: "text",
      },
    ]);
    setMsg("");
    handleScrollBottom();
  };

  const onChangeUpload = (info) => {
    if (info?.file.status === "done") {
      const imgMsg = {
        type: "img",
        sender: currentUser._id,
        receive: receiveId,
        content: `${SOCKET_URL}/upload/${info.file.response.data.filename}`,
      };
      socket.emit("sendMsg", imgMsg);
      setListMsg((list) => [...list, imgMsg]);
      console.log(info);
      message.success("上传文件成功!");
    }
  };

  const onBeforeUpload = (file: RcFile): Promise<boolean> => {
    const types: string[] = ["jpg", "png"];
    return new Promise((resolve, reject) => {
      if (!types.includes(Regex.getFileExt(file.name))) {
        message.error(`您只能上传${types.join("、")}类型的文件！`);
        return reject(false);
      }
      if (file.size / 1024 / 1024 > 2) {
        message.error("您所传的文件大小应小于2MB！");
        return reject(false);
      }
      return resolve(true);
    });
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

  const MessageItem = (props) => {
    const { msgObj } = props;
    const { sender = "", content = "", type = "text" } = msgObj;
    const TextMessageItem = () => (
      <div
        className={classNames("message-item", {
          "message-item-self": sender === currentUser._id,
        })}
      >
        <pre className="message-item-content">{content}</pre>
      </div>
    );

    const ImgMessageItem = () => (
      <div
        className={classNames("message-item", {
          "message-item-self": sender === currentUser._id,
        })}
      >
        <Image width="8rem" src={content} />
      </div>
    );
    switch (type) {
      case "img":
        return <ImgMessageItem />;
      default:
        return <TextMessageItem />;
    }
  };

  const HintItem = (props) => {
    const { nickname } = props;
    return <div className="hint-item">- {nickname} 进来了 -</div>;
  };

  return (
    <div className="chat-area">
      <header>
        <img
          src={avatarUrl}
          alt=""
          className="avatar"
          onClick={onAvatorClick}
        />
        <div className="nickname">{nickname}</div>
        <div className="signature" style={{ color: signatureColor }}>
          {signature}
        </div>
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
          <Upload
            action={`${SOCKET_URL}/chatApi/file/upload`}
            maxCount={1}
            beforeUpload={onBeforeUpload}
            onChange={onChangeUpload}
            name="singleFile"
            showUploadList={false}
            headers={{ Authorization: LoginToken.get() || "" }}
          >
            <UploadOutlined style={{ fontSize: "1.2rem", color: "#fff" }} />
          </Upload>
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
          <PhoneOutlined
            style={{ fontSize: "1.2rem" }}
            onClick={() => onChangePanel("phone")}
          />
          <VideoCameraOutlined
            style={{ fontSize: "1.2rem" }}
            onClick={() => onChangePanel("video")}
          />
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
