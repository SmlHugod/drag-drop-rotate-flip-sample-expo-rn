import { PIECE_COLORS } from "../assets/piece_colors";
import { Piece } from "../models/Piece";

export type PieceDefinition = Omit<
  Piece,
  "position" | "zIndex" | "rotation" | "isFlipped"
>;

export const PIECES: Record<string, PieceDefinition> = {
  "2B": {
    id: 2,
    name: "2b",
    matrix: [[1], [1]],
    color: PIECE_COLORS.pink,
  },
  "3B": {
    id: 3,
    name: "3b",
    matrix: [[1], [1], [1]],
    color: PIECE_COLORS.dark_blue,
  },
  LITTLE_L: {
    id: 4,
    name: "littleL",
    matrix: [
      [1, 0],
      [1, 1],
    ],
    color: PIECE_COLORS.turquoise,
  },
  CUBE: {
    id: 5,
    name: "cube",
    matrix: [
      [1, 1],
      [1, 1],
    ],
    color: PIECE_COLORS.red,
  },
  REVERSE_T: {
    id: 6,
    name: "reverseT",
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: PIECE_COLORS.yellow,
  },
  MEDIUM_L: {
    id: 7,
    name: "mediumL",
    matrix: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: PIECE_COLORS.green,
  },
  "4B": {
    id: 8,
    name: "4b",
    matrix: [[1], [1], [1], [1]],
    color: PIECE_COLORS.brown,
  },
  Z: {
    id: 9,
    name: "z",
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: PIECE_COLORS.blue,
  },
  T: {
    id: 10,
    name: "t",
    matrix: [
      [1, 0],
      [1, 1],
      [1, 0],
      [1, 0],
    ],
    color: PIECE_COLORS.black,
  },
  P: {
    id: 11,
    name: "p",
    matrix: [
      [1, 1],
      [1, 1],
      [1, 0],
    ],
    color: PIECE_COLORS.dark_green,
  },
  BIG_L: {
    id: 12,
    name: "bigL",
    matrix: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: PIECE_COLORS.purple,
  },
  S: {
    id: 13,
    name: "s",
    matrix: [
      [0, 1, 1],
      [0, 1, 0],
      [1, 1, 0],
    ],
    color: PIECE_COLORS.orange,
  },
};

export class PieceFactory {
  static createPiece(
    pieceId: number,
    position: { x: number; y: number }
  ): Omit<Piece, "zIndex"> | undefined {
    const piece = Object.values(PIECES).find((piece) => piece.id === pieceId);
    return piece
      ? {
          ...piece,
          position,
          rotation: 0,
          isFlipped: false,
        }
      : undefined;
  }

  static createPieceByName(
    pieceName: string,
    position: { x: number; y: number }
  ): Omit<Piece, "zIndex"> | undefined {
    const piece = PIECES[pieceName];
    return piece
      ? {
          ...piece,
          position,
          rotation: 0,
          isFlipped: false,
        }
      : undefined;
  }

  static getAllPieces(position: {
    x: number;
    y: number;
  }): Omit<Piece, "zIndex">[] {
    return Object.values(PIECES).map((piece) => ({
      ...piece,
      position,
      rotation: 0,
      isFlipped: false,
    }));
  }
}
