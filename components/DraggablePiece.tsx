import { ViewStyle } from "react-native";
import { DraggableRotatable } from "./DraggableRotatable";
import { Piece, PieceMatrix } from "./Piece";

type DraggablePieceProps = {
  matrix: PieceMatrix;
  initialX: number;
  initialY: number;
  color?: string;
  shadowColor?: string;
  onPositionChange?: (position: { x: number; y: number }) => {
    x: number;
    y: number;
  };
  style?: ViewStyle;
};

export const DraggablePiece = ({
  matrix,
  initialX,
  initialY,
  color,
  shadowColor,
  onPositionChange,
  style,
}: DraggablePieceProps) => {
  return (
    <DraggableRotatable
      initialX={initialX}
      initialY={initialY}
      onPositionChange={onPositionChange}
      style={style}
    >
      <Piece matrix={matrix} color={color} shadowColor={shadowColor} />
    </DraggableRotatable>
  );
};
