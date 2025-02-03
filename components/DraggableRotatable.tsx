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
  const {
    position,
    previewPosition,
    isDragging,
    scale: dragScale,
    dragRotation,
    handleDragStart,
    handleDragUpdate,
    handleDragEnd,
  } = useDraggable(initialX, initialY, onPositionChange);

  const { rotation, offset, isFlipped, scale, scaleX, handleRotateOrFlip } =
    useRotateFlip(onRotate, onFlip);

  const animatedStyle = useAnimatedStyle(
    () =>
      ({
        transform: [
          { translateX: position.value.x + offset.value.x },
          { translateY: position.value.y + offset.value.y },
          { rotate: `${rotation.value + dragRotation.value}deg` },
          { scale: scale.value * dragScale.value },
          { scaleX: scaleX.value },
        ],
      } as DefaultStyle)
  );

  const previewStyle = useAnimatedStyle(
    () =>
      ({
        position: "absolute",
        opacity: isDragging.value ? 0.4 : 0,
        transform: [
          { translateX: previewPosition.value.x + offset.value.x },
          { translateY: previewPosition.value.y + offset.value.y },
          { rotate: `${rotation.value}deg` },
          { scaleX: scaleX.value },
        ],
      } as DefaultStyle)
  );

  const dragGesture = Gesture.Pan()
    .onStart(handleDragStart)
    .onUpdate((event) =>
      handleDragUpdate(event.translationX, event.translationY)
    )
    .onEnd(handleDragEnd)
    .runOnJS(true);

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => handleRotateOrFlip(children.props.matrix))
    .runOnJS(true);

  const gesture = Gesture.Exclusive(dragGesture, tapGesture);

  return (
    <>
      <Animated.View style={previewStyle}>{children}</Animated.View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[{ position: "absolute" }, animatedStyle, style]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
};
