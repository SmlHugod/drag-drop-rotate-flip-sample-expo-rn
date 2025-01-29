import { Dimensions } from "react-native";
import { CUBE_SIZE } from "../constants/constants";

export const useGridSnap = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const snapToGrid = (value: number) => {
    return Math.round(value / CUBE_SIZE) * CUBE_SIZE;
  };

  const gridLines = Array.from({ length: Math.ceil(height / CUBE_SIZE) })
    .map((_, i) => ({
      key: `h-${i}`,
      isHorizontal: true,
      position: i * CUBE_SIZE,
    }))
    .concat(
      Array.from({ length: Math.ceil(width / CUBE_SIZE) }).map((_, i) => ({
        key: `v-${i}`,
        isHorizontal: false,
        position: i * CUBE_SIZE,
      }))
    );

  return { snapToGrid, gridLines };
};
