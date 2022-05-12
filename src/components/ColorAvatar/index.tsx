import Color from "@/utils/color";
import "./index.less";

interface ColorAvatarProps {
  nickname: string;
  onClick?: () => void;
}

const ColorAvatar = (props: ColorAvatarProps) => {
  const { nickname, onClick } = props;

  return (
    <div
      className="colorAvatar"
      style={{
        background: Color.stringToHex(nickname),
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {nickname.slice(0, 1)}
    </div>
  );
};

export default ColorAvatar;
