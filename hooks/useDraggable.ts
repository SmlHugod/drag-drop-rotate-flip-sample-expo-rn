import { useSharedValue } from "react-native-reanimated";

type Position = { x: number; y: number };

export const useDraggable = (
  initialX: number,
  initialY: number,
  onPositionChange?: (position: Position) => Position
) => {
  const position = useSharedValue({ x: initialX, y: initialY });
  const start = useSharedValue({ x: 0, y: 0 });

  const handleDragStart = () => {
    start.value = {
      x: position.value.x,
      y: position.value.y,
    };
  };

  const handleDragUpdate = (translationX: number, translationY: number) => {
    const newPosition = {
      x: start.value.x + translationX,
      y: start.value.y + translationY,
    };
    position.value = onPositionChange
      ? onPositionChange(newPosition)
      : newPosition;
  };

  return {
    position,
    handleDragStart,
    handleDragUpdate,
  };
};
