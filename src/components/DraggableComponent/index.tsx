import { useDrag } from "react-dnd";
import "./index.less";

interface DraggableComponentProps {
  type: string;
  id: string;
  hidden?: boolean;
  index?: number;
  top?: string;
  left?: string;
  children?: JSX.Element;
}

const DraggableComponent = (props: DraggableComponentProps) => {
  const { index = 0, type, id, children, top, left, hidden = false } = props;
  const [, domRef] = useDrag({
    type,
    end(item, monitor) {
      const dragDOM = document.querySelectorAll(`#${id}`)[index] as HTMLElement;
      if (monitor.didDrop() && dragDOM) {
        const droptarget = monitor.getDropResult() as any;
        const top = dragDOM.offsetTop;
        const left = dragDOM.offsetLeft;
        dragDOM.style.top = top + droptarget.top + "px";
        dragDOM.style.left = left + droptarget.left + "px";
      }
    },
  }) as any;
  return (
    <div
      ref={domRef}
      className="draggableComponent"
      id={id}
      style={{ top, left, display: hidden ? "none" : "block" }}
    >
      {children}
    </div>
  );
};

export default DraggableComponent;
