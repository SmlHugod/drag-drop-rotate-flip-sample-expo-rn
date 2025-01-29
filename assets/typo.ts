import { StyleSheet } from "react-native";
import { normalize } from "../utils/utils";
import { colors } from "./colors";

export const typo = StyleSheet.create({
  title1: {
    fontFamily: "Poppins-Black",
    fontSize: normalize(28),
    color: colors.white,
    textAlign: "center",
  },
  title2: {
    fontFamily: "Poppins-Black",
    fontSize: normalize(26),
    color: colors.white,
    textAlign: "center",
  },
  title3: {
    fontFamily: "Poppins-Black",
    fontSize: normalize(24),
    color: colors.white,
    textAlign: "center",
  },
  title4: {
    fontFamily: "Poppins-Black",
    fontSize: normalize(22),
    color: colors.white,
    textAlign: "center",
  },
  title5: {
    fontFamily: "Poppins-Black",
    fontSize: normalize(20),
    color: colors.white,
    textAlign: "center",
  },
  emoji: {
    fontFamily: "Poppins-Black",
    fontSize: normalize(26),
    color: colors.white,
    textAlign: "center",
  },
  regular: {
    fontFamily: "Poppins-Medium",
    fontSize: normalize(18),
    color: colors.white,
  },
});
