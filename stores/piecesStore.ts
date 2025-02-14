import { create } from "zustand";
import { Piece } from "../models/Piece";

type InitialState = {
  pieces: Record<number, Piece>;
  currentMaxZIndex: number;
};

type Actions = {
  addPiece: (piece: Omit<Piece, "zIndex">) => void;
  updatePiecePosition: (id: number, position: { x: number; y: number }) => void;
  updatePieceRotation: (id: number, rotation: number) => void;
  updatePieceFlip: (id: number, isFlipped: boolean) => void;
  bringToFront: (id: number) => void;
};

const initialState: InitialState = {
  pieces: {},
  currentMaxZIndex: 1,
};

export const usePiecesStore = create<InitialState & Actions>((set) => ({
  ...initialState,

  addPiece: (piece) =>
    set((state) => {
      const newZIndex = state.currentMaxZIndex + 1;
      return {
        pieces: {
          ...state.pieces,
          [piece.id]: { ...piece, zIndex: newZIndex },
        },
        currentMaxZIndex: newZIndex,
      };
    }),

  updatePiecePosition: (id, position) =>
    set((state) => ({
      pieces: {
        ...state.pieces,
        [id]: { ...state.pieces[id], position },
      },
    })),

  updatePieceRotation: (id, rotation) =>
    set((state) => ({
      pieces: {
        ...state.pieces,
        [id]: { ...state.pieces[id], rotation },
      },
    })),

  updatePieceFlip: (id, isFlipped) =>
    set((state) => ({
      pieces: {
        ...state.pieces,
        [id]: { ...state.pieces[id], isFlipped },
      },
    })),

  bringToFront: (id) =>
    set((state) => {
      const newZIndex = state.currentMaxZIndex + 1;
      return {
        pieces: {
          ...state.pieces,
          [id]: { ...state.pieces[id], zIndex: newZIndex },
        },
        currentMaxZIndex: newZIndex,
      };
    }),
}));

// Sélecteurs optimisés
export const selectPiece = (id: number) => (state: InitialState) =>
  state.pieces[id];
export const selectPiecePosition = (id: number) => (state: InitialState) =>
  state.pieces[id]?.position;
export const selectPieceRotation = (id: number) => (state: InitialState) =>
  state.pieces[id]?.rotation;
export const selectPieceFlip = (id: number) => (state: InitialState) =>
  state.pieces[id]?.isFlipped;
export const selectPieceZIndex = (id: number) => (state: InitialState) =>
  state.pieces[id]?.zIndex;

// Ajout du sélecteur pour obtenir toutes les pièces
export const selectAllPieces = (state: InitialState) => state.pieces;

// Ajout du sélecteur pour obtenir la grille
export const selectGrid =
  (width: number, height: number, cubeSize: number) =>
  (state: InitialState) => {
    const gridWidth = Math.ceil(width / cubeSize);
    const gridHeight = Math.ceil(height / cubeSize);
    const grid = Array(gridHeight)
      .fill(0)
      .map(() => Array(gridWidth).fill(0));
    const zIndexMap = new Map<number, number>(); // Pour stocker le zIndex de chaque cellule

    Object.values(state.pieces).forEach((piece) => {
      const pieceX = Math.round(piece.position.x / cubeSize);
      const pieceY = Math.round(piece.position.y / cubeSize);
      const matrix = transformMatrix(
        piece.matrix,
        piece.rotation,
        piece.isFlipped
      );

      matrix.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell === 1) {
            const x = pieceX + colIndex;
            const y = pieceY + rowIndex;
            if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
              // Ne remplace que si le zIndex est plus élevé
              const currentZIndex = zIndexMap.get(y * gridWidth + x) || 0;
              if (!currentZIndex || piece.zIndex > currentZIndex) {
                grid[y][x] = piece.id;
                zIndexMap.set(y * gridWidth + x, piece.zIndex);
              }
            }
          }
        });
      });
    });

    return grid;
  };

// Fonction utilitaire pour transformer la matrice selon la rotation et le flip
const transformMatrix = (
  matrix: readonly (readonly number[])[],
  rotation: number,
  isFlipped: boolean
): number[][] => {
  let result = matrix.map((row) => [...row]);

  // Appliquer le flip d'abord si nécessaire
  if (isFlipped) {
    result = result.map((row) => [...row].reverse());
  }

  // Appliquer la rotation
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const rotations = normalizedRotation / 90;

  for (let i = 0; i < rotations; i++) {
    result = rotateMatrix90Degrees(result);
  }

  return result;
};

const rotateMatrix90Degrees = (matrix: number[][]): number[][] => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated = Array(cols)
    .fill(0)
    .map(() => Array(rows).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = matrix[r][c];
    }
  }

  return rotated;
};
