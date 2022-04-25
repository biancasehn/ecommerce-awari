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
      _hover: { transform: "scale(1.05)" },
    },
    login: {
      fontWeight: "normal",
      backgroundColor: "button.submit",
      color: "button.white",
      borderRadius: "0",
    },
  },
  defaultProps: {},
};
