export const ButtonStyles = {
  baseStyle: {
    fontWeight: "semibold",
    borderRadius: "50%",
    cursor: "pointer",
  },
  sizes: {},
  variants: {
    addToCart: {
      backgroundColor: "button.green",
      color: "button.white",
    },
    submit: {
      fontWeight: "normal",
      backgroundColor: "button.submit",
      color: "button.white",
      borderRadius: "0",
    },
    profile: {
      backgroundColor: "transparent",
      _focus: "none",
    },
  },
  defaultProps: {},
};
