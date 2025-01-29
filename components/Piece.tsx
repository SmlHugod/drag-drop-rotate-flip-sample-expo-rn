import { View } from "react-native";
import { cube_colors } from "../assets/cube_colors";
import { GRID_SIZE } from "../hooks/useGridSnap";
import Cube from "./Cube";

export type PieceMatrix = readonly (readonly number[])[];

type PieceProps = {
  matrix: PieceMatrix;
  color?: string;
  shadowColor?: string;
};

export const PIECE_SHAPES = {
  L: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  T: [
    [0, 1],
    [1, 1],
    [0, 1],
  ],
  "4B": [[1], [1], [1], [1]],
  "3B": [[1], [1], [1]],
  "2B": [[1], [1]],
} as const;

export const Piece = ({
  matrix,
  color = cube_colors.blue,
  shadowColor = cube_colors.blue_shadow,
}: PieceProps) => {
  return (
    <View style={{ flexDirection: "column" }}>
      {matrix.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row" }}>
          {row.map((cell, cellIndex) => (
            <View
              key={`${rowIndex}-${cellIndex}`}
              style={{
                width: GRID_SIZE,
                height: GRID_SIZE,
              }}
            >
              {cell === 1 && <Cube color={color} shadowColor={shadowColor} />}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
