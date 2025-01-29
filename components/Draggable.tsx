import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/hook/commonTypes";
import { useDraggable } from "../hooks/useDraggable";

type DraggableProps = {
  initialX: number;
  initialY: number;
  onPositionChange?: (position: { x: number; y: number }) => {
    x: number;
    y: number;
  };
  children: React.ReactNode;
};

export const Draggable = ({
  initialX,
  initialY,
  onPositionChange,
  children,
}: DraggableProps) => {
  const { position, handleDragStart, handleDragUpdate } = useDraggable(
    initialX,
    initialY,
    onPositionChange
  );

  const animatedStyle = useAnimatedStyle(
    () =>
      ({
        transform: [
          { translateX: position.value.x },
          { translateY: position.value.y },
        ],
      } as DefaultStyle)
  );

  const gesture = Gesture.Pan()
    .onStart(handleDragStart)
    .onUpdate((event) =>
      handleDragUpdate(event.translationX, event.translationY)
    )
    .runOnJS(true);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.draggable, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  draggable: {
    position: "absolute",
  },
});
