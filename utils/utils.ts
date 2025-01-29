import { Animated, Dimensions, Easing, PixelRatio } from "react-native";

export const startTimingAnimation = (
  animation,
  toValue,
  duration,
  easing = Easing.linear,
  useNativeDriver = true,
  callback = null
) => {
  const anim = Animated.timing(animation, {
    toValue,
    duration,
    easing: easing,
    useNativeDriver: useNativeDriver,
  });
  anim.start(callback);
  return anim;
};

const { width, height } = Dimensions.get("window");
const baseWidth = 375; // Base de référence, par exemple iPhone 13
const baseHeight = 812; // Hauteur de référence
const baseScale = Math.min(width / baseWidth, height / baseHeight);

export function normalize(size) {
  const newSize = size * baseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
