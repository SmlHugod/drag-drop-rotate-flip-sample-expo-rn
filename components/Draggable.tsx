import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/hook/commonTypes";

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
  const position = useSharedValue({ x: initialX, y: initialY });
  const start = useSharedValue({ x: 0, y: 0 });

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
