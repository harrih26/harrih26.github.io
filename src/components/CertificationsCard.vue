<template>
  <v-card class="main-card" elevation="10">
    <v-card-title>
      <span class="headline">{{ $t("certifications.title") }}</span>
    </v-card-title>
    <v-card-text>
      <p style="margin-bottom: 4px">
        {{ $t("certifications.description") }}
      </p>
      <v-btn
        variant="text"
        class="button-link"
        color="primary-darken-1"
        prepend-icon="mdi-open-in-new"
        href="https://www.credly.com/badges/31c04894-6812-4f7e-a98a-85ce818a92f9/public_url"
        target="_blank"
      >
        AWS Cloud Practitioner, 2022
      </v-btn>
      <br />
      <v-btn
        variant="text"
        color="primary-darken-1"
        class="button-link"
        prepend-icon="mdi-open-in-new"
        href="https://bcert.me/sqbqbydea"
        target="_blank"
      >
        CSPO®, 2021
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent } from "vue";
import Avatar from "./Avatar.vue";

export default defineComponent({
  name: "CertificationsCard",
});
</script>

<style scoped>
.button-link {
  margin-top: 4px;
}
</style>
