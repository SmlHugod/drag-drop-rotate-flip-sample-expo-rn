import { Dimensions } from "react-native";

export const GRID_SIZE = 40;

export const useGridSnap = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const snapToGrid = (value: number) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

  const gridLines = Array.from({ length: Math.ceil(height / GRID_SIZE) })
    .map((_, i) => ({
      key: `h-${i}`,
      isHorizontal: true,
      position: i * GRID_SIZE,
    }))
    .concat(
      Array.from({ length: Math.ceil(width / GRID_SIZE) }).map((_, i) => ({
        key: `v-${i}`,
        isHorizontal: false,
        position: i * GRID_SIZE,
      }))
    );

  return { snapToGrid, gridLines };
};
