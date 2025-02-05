import { create } from "zustand";
import { Piece } from "../models/Piece";

type InitialState = {
  pieces: Piece[];
  currentMaxZIndex: number;
};

type Actions = {
  addPiece: (piece: Omit<Piece, "zIndex">) => void;
  updatePiecePosition: (id: number, position: { x: number; y: number }) => void;
  bringToFront: (id: number) => void;
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
