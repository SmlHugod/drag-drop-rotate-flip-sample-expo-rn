import { create } from "zustand";

export type PieceData = {
  id: string;
  matrix: readonly (readonly number[])[];
  position: { x: number; y: number };
  color?: string;
  shadowColor?: string;
  zIndex: number;
};

type InitialState = {
  pieces: PieceData[];
  currentMaxZIndex: number;
};

type Actions = {
  addPiece: (piece: Omit<PieceData, "zIndex">) => void;
  updatePiecePosition: (id: string, position: { x: number; y: number }) => void;
  bringToFront: (id: string) => void;
};

const initialState: InitialState = {
  pieces: [],
  currentMaxZIndex: 1,
};

export const usePiecesStore = create<InitialState & Actions>((set) => ({
  ...initialState,

  addPiece: (piece) =>
    set((state) => ({
      pieces: [
        ...state.pieces,
        { ...piece, zIndex: state.currentMaxZIndex + 1 },
      ],
      currentMaxZIndex: state.currentMaxZIndex + 1,
    })),
  updatePiecePosition: (id, position) =>
    set((state) => ({
      pieces: state.pieces.map((piece) =>
        piece.id === id ? { ...piece, position } : piece
      ),
    })),
  bringToFront: (id) =>
    set((state) => ({
      pieces: state.pieces.map((piece) =>
        piece.id === id
          ? { ...piece, zIndex: state.currentMaxZIndex + 1 }
          : piece
      ),
      currentMaxZIndex: state.currentMaxZIndex + 1,
    })),
}));
