import { PieceColor } from "../assets/cube_colors";

export type PieceMatrix = readonly (readonly number[])[];

export type Piece = {
  id: number;
  name: string;
  matrix: PieceMatrix;
  position: { x: number; y: number };
  color: PieceColor;
  zIndex: number;
};
