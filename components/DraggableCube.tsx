import Cube from "./Cube";
import { Draggable } from "./Draggable";

type DraggableCubeProps = {
  initialX: number;
  initialY: number;
  color?: string;
  shadowColor?: string;
  onPositionChange?: (position: { x: number; y: number }) => {
    x: number;
    y: number;
  };
};

export const DraggableCube = ({
  initialX,
  initialY,
  color,
  shadowColor,
  onPositionChange,
}: DraggableCubeProps) => {
  return (
    <Draggable
      initialX={initialX}
      initialY={initialY}
      onPositionChange={onPositionChange}
    >
      <Cube color={color} shadowColor={shadowColor} />
    </Draggable>
  );
};
