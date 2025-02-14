import { PieceColor } from "../assets/piece_colors";

export type PieceMatrix = readonly (readonly number[])[];

export type Piece = {
  id: number;
  name: string;
  matrix: PieceMatrix;
  position: { x: number; y: number };
  color: PieceColor;
  zIndex: number;
  rotation: number;
  isFlipped: boolean;
};
