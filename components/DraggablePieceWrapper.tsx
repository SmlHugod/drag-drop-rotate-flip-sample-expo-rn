import React, { memo } from "react";
import { selectPiece, usePiecesStore } from "../stores/piecesStore";
import { DraggablePiece } from "./DraggablePiece";

type DraggablePieceWrapperProps = {
  pieceId: number;
  snapToGrid: (value: number) => number;
};

export const DraggablePieceWrapper = memo(
  ({ pieceId, snapToGrid }: DraggablePieceWrapperProps) => {
    const piece = usePiecesStore(selectPiece(pieceId));
    const {
      updatePiecePosition,
      updatePieceRotation,
      updatePieceFlip,
      bringToFront,
    } = usePiecesStore();

    if (!piece) return null;

    return (
      <DraggablePiece
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
            bringToFront(pieceId);
            const snappedPosition = {
              x: snapToGrid(pos.x),
              y: snapToGrid(pos.y),
            };
            updatePiecePosition(pieceId, snappedPosition);
            return snappedPosition;
          },
          onRotate: (rotation) => {
            bringToFront(pieceId);
            updatePieceRotation(pieceId, rotation);
          },
          onFlip: () => {
            bringToFront(pieceId);
            updatePieceFlip(pieceId, !piece.isFlipped);
          },
        }}
      />
    );
  }
);
