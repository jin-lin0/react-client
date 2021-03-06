import { message, Popover, Upload, Image } from "antd";
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
import { LoginToken } from "@/utils/token";
import { RcFile } from "antd/lib/upload";
import Regex from "@/utils/regex";
import { SOCKET_URL } from "@/const/config";
import ColorAvatar from "@/components/ColorAvatar";

const GroupChatArea = (props) => {
  const { data: areaData } = props;
  const {
    nickname,
    avatarUrl,
    _id: receiveId,
    signature = "",
    signatureColor = "#fff",
    infoType = "user",
  } = areaData;
  const { currentUser, socket, setModal, setWebRtcShow, setRtcChatData } =
    useContext<any>(HomeContext);
  const [panel, setPanel] = useState("");
  const [msg, setMsg] = useState("");
  const [listMsg, setListMsg] = useState<any>([]);
  const contentRef = useRef<any>(null);

  const onAvatorClick = async () => {
    if (receiveId) {
      const modalData = await Api.getInfo(receiveId);
      setModal({ key: "showGroupDetail", data: modalData });
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
    socket.emit("sendGroupMsg", {
      type: "text",
      sender: currentUser._id,
      senderAvatar: currentUser.avatarUrl,
      senderNickname: currentUser.nickname,
      groupId: receiveId,
      content: msg,
    });
    setListMsg((list) => [
      ...list,
      {
        sender: currentUser._id,
        groupId: receiveId,
        senderAvatar: currentUser.avatarUrl,
        senderNickname: currentUser.nickname,
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
        groupId: receiveId,
        content: `${SOCKET_URL}/upload/${info.file.response.data.filename}`,
      };
      socket.emit("sendGroupMsg", imgMsg);
      setListMsg((list) => [...list, imgMsg]);
      console.log(info);
      message.success("??????????????????!");
    }
  };

  const onBeforeUpload = (file: RcFile): Promise<boolean> => {
    const types: string[] = ["jpg", "png"];
    return new Promise((resolve, reject) => {
      if (!types.includes(Regex.getFileExt(file.name))) {
        message.error(`???????????????${types.join("???")}??????????????????`);
        return reject(false);
      }
      if (file.size / 1024 / 1024 > 2) {
        message.error("?????????????????????????????????2MB???");
        return reject(false);
      }
      return resolve(true);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await Api.getGroupMsg(currentUser._id, receiveId);
      if (data) {
        setListMsg(data);
      } else {
        setListMsg([]);
      }
    };
    if (!socket._callbacks.$receiveGroupMsg) {
      socket.on("receiveGroupMsg", (data) => {
        console.log({ data, listMsg });
        setListMsg((list) => [...list, data]);
      });
    }

    fetchData();
  }, [receiveId]);

  useLayoutEffect(() => {
    if (receiveId) {
      handleScrollBottom();
    }
  }, [receiveId]);

  const MessageItem = (props) => {
    const { msgObj } = props;
    const {
      sender = "",
      content = "",
      type = "text",
      senderAvatar = "",
    } = msgObj;
    const TextMessageItem = () => (
      <div
        className={classNames("message-item", {
          "message-item-self": sender === currentUser._id,
        })}
      >
        <img
          src={senderAvatar}
          alt=""
          style={{ width: "2rem", height: "2rem", margin: "0 .5rem" }}
        />
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
    return <div className="hint-item">- {nickname} ????????? -</div>;
  };

  return (
    <div className="chat-area">
      <header>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="avatar"
            onClick={onAvatorClick}
          />
        ) : (
          <ColorAvatar nickname={nickname} onClick={onAvatorClick} />
        )}

        <div className="nickname">{nickname}</div>
      </header>
      <section
        className="chat-area-content"
        ref={contentRef}
        style={{ padding: "0" }}
      >
        {listMsg
          .filter((item) => item.groupId === receiveId)
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
        </div>
        <TextArea
          onChange={onChangeTextare}
          value={msg}
          spellCheck={false}
          bordered={false}
        />
        <div className="chat-area-sendButton" onClick={onSendMsg}>
          ??????
        </div>
      </footer>
    </div>
  );
};

export default GroupChatArea;
