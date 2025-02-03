import {
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { CUBE_SIZE } from "../constants/constants";

export const useRotateFlip = (
  onRotate?: (rotation: number) => void,
  onFlip?: () => void
) => {
  const rotation = useSharedValue(0);
  const offset = useSharedValue({ x: 0, y: 0 });
  const isFlipped = useSharedValue(false);
  const lastTapTime = useSharedValue(0);
  const scale = useSharedValue(1);
  const scaleX = useSharedValue(1);
  const isAnimating = useSharedValue(false);

  const handleFlip = () => {
    if (isAnimating.value) return;
    isAnimating.value = true;

    // Animation sequence
    scale.value = withSequence(
      withTiming(1.1, { duration: 150 }), // Légère augmentation de la taille
      withTiming(1, { duration: 150 }, () => {
        isAnimating.value = false;
      }) // Retour à la taille normale
    );

    // Flip animation avec scale X négatif
    scaleX.value = withTiming(!isFlipped.value ? 1 : -1, { duration: 300 });

    isFlipped.value = !isFlipped.value;
    onFlip?.();
  };

  const handleRotate = (matrix: number[][]) => {
    if (isAnimating.value) return;
    isAnimating.value = true;

    // Animation sequence pour la rotation
    scale.value = withSequence(
      withTiming(1.1, { duration: 150 }), // Légère augmentation de la taille
      withTiming(1, { duration: 150 }, () => {
        isAnimating.value = false;
      }) // Retour à la taille normale
    );

    // Animation de rotation rapide
    const newRotation = rotation.value + 90;
    rotation.value = withTiming(newRotation, { duration: 300 });

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
    scale,
    scaleX,
    handleRotateOrFlip,
    handleRotate,
    handleFlip,
  };
};
