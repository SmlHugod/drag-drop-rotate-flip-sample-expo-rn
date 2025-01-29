import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { cube_colors } from "./assets/cube_colors";
import { PIECE_SHAPES } from "./components/Piece";
import { PiecesManager } from "./components/PiecesManager";
import { useGridSnap } from "./hooks/useGridSnap";
import { usePiecesStore } from "./stores/piecesStore";
import { normalize } from "./utils/utils";

export default function App() {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const { snapToGrid, gridLines } = useGridSnap();
  const addPiece = usePiecesStore((state) => state.addPiece);

  useEffect(() => {
    // Initialiser les pièces
    const initialPieces = [
      {
        id: "L",
        matrix: PIECE_SHAPES.L,
        position: { x: snapToGrid(width / 4), y: snapToGrid(height / 4) },
      },
      {
        id: "T",
        matrix: PIECE_SHAPES.T,
        position: { x: snapToGrid(width / 2), y: snapToGrid(height / 2) },
        color: cube_colors.green,
        shadowColor: cube_colors.green_shadow,
      },
      {
        id: "4B",
        matrix: PIECE_SHAPES["4B"],
        position: { x: snapToGrid(width / 3), y: snapToGrid(height / 2) },
        color: cube_colors.brown,
        shadowColor: cube_colors.brown_shadow,
      },
      // ... autres pièces
    ];

    initialPieces.forEach(addPiece);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {gridLines.map((line) => (
          <View
            key={line.key}
            style={[
              styles.gridLine,
              line.isHorizontal
                ? { top: line.position, width: "100%", height: 1 }
                : { left: line.position, width: 1, height: "100%" },
            ]}
          />
        ))}
        <PiecesManager snapToGrid={snapToGrid} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(40),
    flex: 1,
    backgroundColor: "grey",
  },
  gridLine: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});
