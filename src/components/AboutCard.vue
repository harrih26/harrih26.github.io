<template>
  <v-card class="main-card" elevation="10">
    <v-card-title>{{ $t("about.title") }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col xs="12" md="4" xl="auto">
          <Avatar />
        </v-col>
        <v-col xs="12" md="8" xl="auto">
          <p>
          {{ $t("about.about1") }} <br /><br />
          {{ $t("about.about2") }}
        </p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary-darken-1"
        prepend-icon="mdi-linkedin"
        href="https://www.linkedin.com/in/harri-heikkinen/"
        target="_blank"
      >
        LinkedIn
      </v-btn>
      <v-btn
        color="primary-darken-1"
        prepend-icon="mdi-email"
        href="mailto:harri.heikkinen8@luukku.com"
      >
        {{ $t("about.email") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from "vue";
import Avatar from "./Avatar.vue";

export default defineComponent({
  name: "AboutCard",
  components: {
    Avatar,
  },
});
</script>

<style scoped></style>
