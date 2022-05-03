import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/ButtonStyles";

export const theme = extendTheme({
  colors: {
    darkText: "rgb(24, 31, 28)",
    whiteText: "rgb(255,255,255)",
    lightGray: "rgb(222, 225, 227)",
    textLink: "rgb(50, 147, 111)",
    colorDanger: "#df1b41",
    header: {
      orange: "rgb(250,131,52)",
      lightYellow: "rgb(253,197,29)",
      darkYellow: "rgb(252,176,69)",
    },
    button: {
      green: "rgb(95, 173, 86)",
      gray: "rgb(237, 242, 247)",
      white: "rgb(255,255,255)",
      submit: "rgb(28,49,68)",
    },
    type: {
      bug: "#729f3f",
      dragon: "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)",
      fairy: "#fdb9e9",
      fire: "#fd7d24",
      ghost: "#7b62a3",
      ground: "linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)",
      normal: "#a4acaf",
      psychic: "#f366b9",
      steel: "#9eb7b8",
      dark: "#707070",
      electric: "#eed535",
      fight: "#d56723",
      flying: "linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)",
      grass: "#9bcc50",
      ice: "#51c4e7",
      poison: "#b97fc9",
      rock: "#a38c21",
      water: "#4592c4",
    },
  },
  components: {
    Button,
  },
});
