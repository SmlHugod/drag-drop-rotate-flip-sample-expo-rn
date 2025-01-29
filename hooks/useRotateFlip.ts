import { useSharedValue } from "react-native-reanimated";
import { CUBE_SIZE } from "../constants/constants";

export const useRotateFlip = (
  onRotate?: (rotation: number) => void,
  onFlip?: () => void
) => {
  const rotation = useSharedValue(0);
  const offset = useSharedValue({ x: 0, y: 0 });
  const isFlipped = useSharedValue(false);
  const lastTapTime = useSharedValue(0);

  const handleFlip = () => {
    isFlipped.value = !isFlipped.value;
    onFlip?.();
  };

  const handleRotate = (matrix: number[][]) => {
    const newRotation = rotation.value + 90;
    rotation.value = newRotation;
    const isRotated = newRotation % 180 !== 0;
    const width = matrix[0].length;
    const height = matrix.length;
    const needsOffset = width !== height;

    offset.value = {
      x: isRotated && needsOffset ? ((width - height) * CUBE_SIZE) / 2 : 0,
      y: isRotated && needsOffset ? ((width - height) * CUBE_SIZE) / 2 : 0,
    };
    onRotate?.(newRotation);
  };

  /**
   * Gère la rotation ou le retournement d'une pièce en fonction du type de tap
   * - Double tap (< 200ms) : retourne la pièce
   * - Simple tap : fait pivoter la pièce de 90 degrés
   *
   * @param matrix - La matrice représentant la forme de la pièce
   */
  const handleRotateOrFlip = (matrix: number[][]) => {
    const now = Date.now();
    if (now - lastTapTime.value < 200) {
      // Double tap - Flip
      handleFlip();
    } else {
      setTimeout(() => {
        if (now === lastTapTime.value) {
          // Single tap - Rotate
          handleRotate(matrix);
        }
      }, 200);
    }
    lastTapTime.value = now;
  };

  return {
    rotation,
    offset,
    isFlipped,
    handleRotateOrFlip,
    handleRotate,
    handleFlip,
  };
};
