import { theme } from "../styles/theme";

export const pickTextColor = (bg: string) => {
  let luminosity = getLuminosity(theme.colors.type[bg]);
  if (luminosity <= 145) {
    return "white";
  }
  return "black";
};

export const getLuminosity = (color: string) => {
  let rgb: string | number[] | string[] = color;
  if (color.includes("#")) {
    rgb = hexToRGB(color);
  } else {
    rgb = rgb.replace(/rgb|[()]/g, "").split(", ");
  }

  let r = +rgb[0];
  let g = +rgb[1];
  let b = +rgb[2];

  let l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return l;
};

export const hexToRGB = (h: string) => {
  let r,
    g,
    b: string = "0";

  // 3 digits
  if (h.length == 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;

    // 6 digits
  } else if (h.length == 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }

  if (r && g && b) {
    return [+r, +g, +b];
  }
  return h;
};
