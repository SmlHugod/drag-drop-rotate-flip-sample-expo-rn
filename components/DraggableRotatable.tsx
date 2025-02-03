import React from "react";
import { ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/hook/commonTypes";
import { useDraggable } from "../hooks/useDraggable";
import { useRotateFlip } from "../hooks/useRotateFlip";

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
  const { position, handleDragStart, handleDragUpdate } = useDraggable(
    initialX,
    initialY,
    onPositionChange
  );

  const { rotation, offset, isFlipped, scale, scaleX, handleRotateOrFlip } =
    useRotateFlip(onRotate, onFlip);

  const animatedStyle = useAnimatedStyle(
    () =>
      ({
        transform: [
          { translateX: position.value.x + offset.value.x },
          { translateY: position.value.y + offset.value.y },
          { rotate: `${rotation.value}deg` },
          { scale: scale.value },
          { scaleX: scaleX.value },
        ],
      } as DefaultStyle)
  );

  const dragGesture = Gesture.Pan()
    .onStart(handleDragStart)
    .onUpdate((event) =>
      handleDragUpdate(event.translationX, event.translationY)
    )
    .runOnJS(true);

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => handleRotateOrFlip(children.props.matrix))
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
