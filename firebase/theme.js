import { extendTheme } from "native-base";

const theme = extendTheme({
  colors: {
    background: {
      400: "#f4e5d7", //coffeeer
      500: "#F4E7DB", //light beige
      600: "#e7cbb1", //10% darker
    },

    coffee: {
      500: "#A17C5B", //mocha Brown
    },

    accent: {
      500: "#a34643", // Dusty Rose dark
    },

    button: {
      500: "#1a120b", //lightish orange
    },

    primaryText: {
      500: "#2f2228",
    },

    secondaryText: {
      500: "",
    },

    navigation: {
      500: "#1a120b",
    },

    // BUTOANE1:
    // primary1: {
    //   50: "#dff8fb", // 35% lighten
    //   100: "#83e4f1", // 25% lighten
    //   500: "#118797", // original
    //   600: "#DE6F6F", // 10% darker
    // },
    // // BUTOANE2:
    // primary2: {
    //   50: "#FFFFA9", // 35% lighten
    //   100: "#FFFF90", // 25% lighten
    //   500: "#16b0c5", // original
    //   600: "#DAB937", // 10% darker
    // },
    // // Header
    // primary3: {
    //   50: "#F9F9F9", // 5% lighten
    //   500: "black", // original
    //   600: "#D3D3D3", // 10% darker
    // },
    // // Text
    // primary4: {
    //   50: "#E9FFFF", // 35% lighten
    //   100: "#D0FFFF", // 25% lighten
    //   500: "#118797", // original
    //   600: "#77B3DB", // 10% darker
    // },

    // // BACKGROUND :
    // primary5: {
    //   50: "#FFE1E1", // 35% lighten
    //   100: "#FFC8C8", // 25% lighten
    //   500: "#f7f7f7", // original
    //   600: "#dff8fb", // 10% darker
    // },
  },
  breakpoints: {
    sm: 320, // Small screens (portrait)
    md: 375, // Medium screens (portrait)
    lg: 768, // Large screens (portrait)
  },
});

export default theme;
