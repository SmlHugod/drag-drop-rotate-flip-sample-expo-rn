import React from "react";
import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";
import { cube_colors } from "../assets/cube_colors";
import { CUBE_SIZE } from "../constants/constants";

export interface CubeProps {
  readonly color?: ColorValue;
  readonly shadowColor?: ColorValue;
  readonly size?: number;
}

const Cube: React.FC<CubeProps> = React.memo(
  ({
    color = cube_colors.black,
    shadowColor = cube_colors.black_shadow,
    size = CUBE_SIZE,
  }) => (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      <Path d="M40 0H0V40H40V0Z" fill={color} />
      <Path d="M40 0V40H0" fill={shadowColor} />
    </Svg>
  )
);

export default Cube;
