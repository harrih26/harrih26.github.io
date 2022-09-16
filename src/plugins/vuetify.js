// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

const customTheme = {
  dark: false,
  colors: {
    background: "#5f5f60",
    surface: "#3F3E43",
    primary: "#347D39",
    secondary: "#373E47",
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
