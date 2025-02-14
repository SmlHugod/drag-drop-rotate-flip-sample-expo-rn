export type PieceColor = {
  main: string;
  shadow: string;
};

export const PIECE_COLORS: Record<string, PieceColor> = {
  blue: { main: "#4CC9F0", shadow: "#43B0D2" },
  red: { main: "#CE351B", shadow: "#A50C00" },
  yellow: { main: "#E5DC2F", shadow: "#BFB829" },
  green: { main: "#34B515", shadow: "#129B0B" },
  purple: { main: "#8619FE", shadow: "#771ADC" },
  black: { main: "#353A3A", shadow: "#1E2323" },
  orange: { main: "#EF880C", shadow: "#D66203" },
  dark_blue: { main: "#5417E0", shadow: "#3A0CA3" },
  pink: { main: "#CA34C5", shadow: "#9D369A" },
  turquoise: { main: "#06B48B", shadow: "#009975" },
  brown: { main: "#895129", shadow: "#6C4020" },
  dark_green: { main: "#197D40", shadow: "#125A2E" },
};
