import React from "react";
import { ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/hook/commonTypes";
import { GRID_SIZE } from "../hooks/useGridSnap";

export type DraggableRotatableProps = {
  initialX: number;
  initialY: number;
  onPositionChange?: (position: { x: number; y: number }) => {
    x: number;
    y: number;
  };
  onRotate?: (rotation: number) => void;
  onFlip?: () => void;
  style?: ViewStyle;
  children: React.ReactElement;
};

export const DraggableRotatable = ({
  initialX,
  initialY,
  onPositionChange,
  onRotate,
  onFlip,
  children,
  style,
}: DraggableRotatableProps) => {
  const position = useSharedValue({ x: initialX, y: initialY });
  const start = useSharedValue({ x: 0, y: 0 });
  const rotation = useSharedValue(0);
  const offset = useSharedValue({ x: 0, y: 0 });
  const isFlipped = useSharedValue(false);
  const lastTapTime = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(
    () =>
      ({
        transform: [
          { translateX: position.value.x + offset.value.x },
          { translateY: position.value.y + offset.value.y },
          { rotate: `${rotation.value}deg` },
          { scaleX: isFlipped.value ? -1 : 1 },
        ],
      } as DefaultStyle)
  );

  const dragGesture = Gesture.Pan()
    .onStart(() => {
      start.value = {
        x: position.value.x,
        y: position.value.y,
      };
    })
    .onUpdate((event) => {
      const newPosition = {
        x: start.value.x + event.translationX,
        y: start.value.y + event.translationY,
      };
      position.value = onPositionChange
        ? onPositionChange(newPosition)
        : newPosition;
    })
    .runOnJS(true);

  const handleRotateOrFlip = () => {
    const now = Date.now();
    if (now - lastTapTime.value < 200) {
      // Double tap - Flip
      isFlipped.value = !isFlipped.value;
      onFlip?.();
    } else {
      setTimeout(() => {
        if (now === lastTapTime.value) {
          // Single tap - Rotate
          const newRotation = rotation.value + 90;
          rotation.value = newRotation;
          const isRotated = newRotation % 180 !== 0;
          const matrix = children.props.matrix;
          const width = matrix[0].length;
          const height = matrix.length;
          const needsOffset = width !== height;

          offset.value = {
            x:
              isRotated && needsOffset ? ((width - height) * GRID_SIZE) / 2 : 0,
            y:
              isRotated && needsOffset ? ((width - height) * GRID_SIZE) / 2 : 0,
          };
          onRotate?.(newRotation);
        }
      }, 200);
    }
    lastTapTime.value = now;
  };

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onStart(handleRotateOrFlip)
    .runOnJS(true);

  const gesture = Gesture.Exclusive(dragGesture, tapGesture);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[{ position: "absolute" }, animatedStyle, style]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};
