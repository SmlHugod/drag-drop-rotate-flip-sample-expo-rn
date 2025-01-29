import {
  DraggableRotatable,
  DraggableRotatableProps,
} from "./DraggableRotatable";
import { Piece, PieceMatrix } from "./Piece";

type DraggablePieceProps = {
  matrix: PieceMatrix;
  color?: string;
  shadowColor?: string;
  draggableProps?: Omit<DraggableRotatableProps, "children">;
};

export const DraggablePiece = ({
  matrix,
  color,
  shadowColor,
  draggableProps,
}: DraggablePieceProps) => {
  return (
    <DraggableRotatable {...draggableProps}>
      <Piece matrix={matrix} color={color} shadowColor={shadowColor} />
    </DraggableRotatable>
  );
};
