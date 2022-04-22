import { Popover } from "antd";
import { ColorResult, TwitterPicker } from "react-color";
import "./index.less";

interface ColorPopoverProps {
  value?: string;
  onChange?: (v: string) => void;
}

const ColorPopover = (props: ColorPopoverProps) => {
  const { value: color, onChange } = props;

  const handleChangeColor = (v: ColorResult) => {
    onChange?.(v.hex);
  };
  return (
    <Popover
      trigger="click"
      content={<TwitterPicker color={color} onChange={handleChangeColor} />}
    >
      <div className="ColorPopover-switch">
        <div
          className="ColorPopover-switch-content"
          style={{ background: color }}
        />
      </div>
    </Popover>
  );
};

export default ColorPopover;
