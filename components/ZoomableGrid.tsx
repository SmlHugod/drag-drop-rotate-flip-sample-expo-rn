import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const GRID_SIZE = 50; // Taille de base des cellules de la grille
const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const INITIAL_SCALE = 1.5; // Zoom initial

// Calculer la taille totale de la grille pour qu'elle remplisse l'écran au zoom minimum
const TOTAL_WIDTH = width / MIN_SCALE;
const TOTAL_HEIGHT = height / MIN_SCALE;

// Position initiale pour centrer
const INITIAL_X = (width - TOTAL_WIDTH) / 2;
const INITIAL_Y = (height - TOTAL_HEIGHT) / 2;

const ZoomableGrid = () => {
  // Valeur partagée pour le scale (zoom)
  const scale = useSharedValue(INITIAL_SCALE);

  // Gestionnaire du pincement
  const pinchHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startScale = scale.value;
    },
    onActive: (event, ctx) => {
      scale.value = ctx.startScale * event.scale;
    },
    onEnd: () => {
      // Animation de retour si le scale est trop petit ou trop grand
      if (scale.value < MIN_SCALE) {
        scale.value = withSpring(MIN_SCALE);
      } else if (scale.value > MAX_SCALE) {
        scale.value = withSpring(MAX_SCALE);
      }
    },
  });

  // Style animé pour la grille
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: INITIAL_X },
        { translateY: INITIAL_Y },
        { scale: scale.value },
      ],
    };
  });

  // Création de la grille
  const renderGrid = () => {
    const rows = Math.ceil(TOTAL_HEIGHT / GRID_SIZE);
    const cols = Math.ceil(TOTAL_WIDTH / GRID_SIZE);
    const cells = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        cells.push(
          <View
            key={`${i}-${j}`}
            style={[
              styles.cell,
              {
                left: j * GRID_SIZE,
                top: i * GRID_SIZE,
              },
            ]}
          />
        );
      }
    }

    return cells;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View
          style={[
            styles.gridContainer,
            {
              width: TOTAL_WIDTH,
              height: TOTAL_HEIGHT,
            },
            animatedStyle,
          ]}
        >
          {renderGrid()}
        </Animated.View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  gridContainer: {
    position: "absolute",
  },
  cell: {
    position: "absolute",
    width: GRID_SIZE - 1,
    height: GRID_SIZE - 1,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "transparent",
  },
});

export default ZoomableGrid;
