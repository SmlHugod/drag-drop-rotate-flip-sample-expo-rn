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
      {pieces.map((piece, index) => (
        <DraggablePiece
          key={index}
          pieceProps={{
            matrix: piece.matrix,
            color: piece.color.main,
            shadowColor: piece.color.shadow,
          }}
          draggableProps={{
            initialX: piece.position.x,
            initialY: piece.position.y,
            style: { zIndex: piece.zIndex },
            onPositionChange: (pos) => {
              bringToFront(piece.id);
              const snappedPosition = {
                x: snapToGrid(pos.x),
                y: snapToGrid(pos.y),
              };
              updatePiecePosition(piece.id, snappedPosition);
              return snappedPosition;
            },
            onRotate: (rotation) => {
              bringToFront(piece.id);
            },
            onFlip: () => {
              bringToFront(piece.id);
            },
          }}
        />
      ))}
    </>
  );
};
