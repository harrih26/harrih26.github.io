<template>
  <v-app>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-toolbar-title>Harri Heikkinen</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn variant="icon" icon="mdi-translate" @click="setLocale"></v-btn>
      </v-app-bar>
      <v-main>
        <router-view />
      </v-main>
    </v-layout>

    <v-footer style="margin-left: auto; margin-right: auto">
      <small @click="$router.push('/snake')">© {{ new Date().getFullYear() }} — Harri Heikkinen</small>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    locale: "en",
  }),
  methods: {
    setLocale() {
      if (this.$i18n.locale === "en") {
        this.$i18n.locale = "fi";
      } else {
        this.$i18n.locale = "en";
      }
    },
  },
};
</script>

<style>
small {
  cursor: pointer;
}
</style>
