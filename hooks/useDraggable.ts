import { useSharedValue, withTiming } from "react-native-reanimated";

type Position = { x: number; y: number };

export const useDraggable = (
  initialX: number,
  initialY: number,
  onPositionChange?: (position: Position) => Position
) => {
  const position = useSharedValue({ x: initialX, y: initialY });
  const previewPosition = useSharedValue({ x: initialX, y: initialY });
  const start = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const dragRotation = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const handleDragStart = () => {
    start.value = {
      x: position.value.x,
      y: position.value.y,
    };
    isDragging.value = true;
    // Animation de scale et rotation au début du drag
    scale.value = withTiming(1.1, {
      duration: 200,
    });
    dragRotation.value = withTiming(-2, {
      duration: 200,
    });
  };

  const handleDragUpdate = (translationX: number, translationY: number) => {
    const newPosition = {
      x: start.value.x + translationX,
      y: start.value.y + translationY,
    };
    position.value = newPosition;

    // Met à jour la position du preview avec le snap
    if (onPositionChange) {
      previewPosition.value = onPositionChange(newPosition);
    }
  };

  const handleDragEnd = () => {
    isDragging.value = false;
    // Retour à la taille et rotation normales au relâchement
    scale.value = withTiming(1, {
      duration: 200,
    });
    dragRotation.value = withTiming(0, {
      duration: 200,
    });

    if (onPositionChange) {
      position.value = onPositionChange(position.value);
    }
  };

  return {
    position,
    previewPosition,
    isDragging,
    scale,
    dragRotation,
    handleDragStart,
    handleDragUpdate,
    handleDragEnd,
  };
};
