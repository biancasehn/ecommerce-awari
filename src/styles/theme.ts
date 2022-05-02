import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/ButtonStyles";

export const theme = extendTheme({
  colors: {
    darkText: "rgb(24, 31, 28)",
    whiteText: "rgb(255,255,255)",
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
  },
  components: {
    Button,
  },
});
