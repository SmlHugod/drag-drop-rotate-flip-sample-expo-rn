import React from "react";
import { ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/hook/commonTypes";
import { useRotateFlip } from "../hooks/useRotateFlip";

type RotatableFlippableProps = {
  onRotate?: (rotation: number) => void;
  onFlip?: () => void;
  style?: ViewStyle;
  children: React.ReactElement;
};

export const RotatableFlippable = ({
  onRotate,
  onFlip,
  children,
  style,
}: RotatableFlippableProps) => {
  const { rotation, offset, isFlipped, handleRotateOrFlip } = useRotateFlip(
    onRotate,
    onFlip
  );

  const animatedStyle = useAnimatedStyle(
    () =>
      ({
        transform: [
          { translateX: offset.value.x },
          { translateY: offset.value.y },
          { rotate: `${rotation.value}deg` },
          { scaleX: isFlipped.value ? -1 : 1 },
        ],
      } as DefaultStyle)
  );

  const gesture = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => handleRotateOrFlip(children.props.matrix))
    .runOnJS(true);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </GestureDetector>
  );
};
