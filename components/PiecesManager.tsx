import React, { memo } from "react";
import { usePiecesStore } from "../stores/piecesStore";
import { DraggablePieceWrapper } from "./DraggablePieceWrapper";

type PiecesManagerProps = {
  snapToGrid: (value: number) => number;
};

export const PiecesManager: React.FC<PiecesManagerProps> = memo(
  ({ snapToGrid }) => {
    const pieceIds = usePiecesStore((state) => Object.keys(state.pieces));

    return (
      <>
        {pieceIds.map((pieceId) => (
          <DraggablePieceWrapper
            key={pieceId}
            pieceId={Number(pieceId)}
            snapToGrid={snapToGrid}
          />
        ))}
      </>
    );
  }
);
