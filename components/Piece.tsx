import { View } from "react-native";
import { CUBE_SIZE } from "../constants/constants";
import Cube from "./Cube";

export type PieceMatrix = readonly (readonly number[])[];

export type PieceProps = {
  matrix: PieceMatrix;
  color: string;
  shadowColor: string;
};

export const Piece = ({ matrix, color, shadowColor }: PieceProps) => {
  return (
    <View style={{ flexDirection: "column" }}>
      {matrix.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row" }}>
          {row.map((cell, cellIndex) => (
            <View
              key={`${rowIndex}-${cellIndex}`}
              style={{
                width: CUBE_SIZE,
                height: CUBE_SIZE,
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
