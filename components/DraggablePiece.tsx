import {
  DraggableRotatable,
  DraggableRotatableProps,
} from "./DraggableRotatable";
import { Piece, PieceProps } from "./Piece";

type DraggablePieceProps = {
  pieceProps?: PieceProps;
  draggableProps?: Omit<DraggableRotatableProps, "children">;
};

export const DraggablePiece = ({
  pieceProps,
  draggableProps,
}: DraggablePieceProps) => {
  return (
    <DraggableRotatable {...draggableProps}>
      <Piece {...pieceProps} />
    </DraggableRotatable>
  );
};
