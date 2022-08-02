// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

const customTheme = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#489c50",
    "primary-darken-1": "#406e44",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#439194",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme,
    },
  },
});
