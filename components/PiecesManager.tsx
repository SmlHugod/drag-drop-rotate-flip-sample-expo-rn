import React from "react";
import { usePiecesStore } from "../stores/piecesStore";
import { DraggablePiece } from "./DraggablePiece";

type PiecesManagerProps = {
  snapToGrid: (value: number) => number;
};

export const PiecesManager: React.FC<PiecesManagerProps> = ({ snapToGrid }) => {
  const { pieces, updatePiecePosition, bringToFront } = usePiecesStore();

  return (
    <>
      {pieces.map((piece) => (
        <DraggablePiece
          key={piece.id}
          matrix={piece.matrix}
          initialX={piece.position.x}
          initialY={piece.position.y}
          color={piece.color}
          shadowColor={piece.shadowColor}
          style={{ zIndex: piece.zIndex }}
          onPositionChange={(pos) => {
            bringToFront(piece.id);
            const snappedPosition = {
              x: snapToGrid(pos.x),
              y: snapToGrid(pos.y),
            };
            updatePiecePosition(piece.id, snappedPosition);
            return snappedPosition;
          }}
        />
      ))}
    </>
  );
};
