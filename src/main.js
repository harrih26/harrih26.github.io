import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import translations from "./translations.js";

loadFonts();

const i18n = createI18n({
  locale: "en", // set locale
  fallbackLocale: "en", // set fallback locale
  messages: translations,
});

createApp(App).use(router).use(vuetify).use(i18n).mount("#app");
