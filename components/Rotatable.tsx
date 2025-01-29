import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/hook/commonTypes";

type RotatableProps = {
  onRotate?: (rotation: number) => void;
  children: React.ReactElement;
};

export const Rotatable = ({ onRotate, children }: RotatableProps) => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(
    () =>
      ({
        transform: [{ rotate: `${rotation.value}deg` }],
      } as DefaultStyle)
  );

  const gesture = Gesture.Tap()
    .onStart(() => {
      const newRotation = rotation.value + 90;
      rotation.value = newRotation;
      onRotate?.(newRotation);
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </GestureDetector>
  );
};
