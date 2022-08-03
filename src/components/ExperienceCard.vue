<template>
  <v-card class="main-card" elevation="10">
    <v-card-title>
      <v-icon icon="mdi-briefcase" color="primary" size="small"></v-icon>
      {{ $t("experience.title") }}
    </v-card-title>
    <v-card-text>
      <ExperienceRow
        :years="'2018 - present'"
        :position="$t('experience.developer')"
        :company="'Talentree Oy'"
        :description="$t('experience.developer_description')"
      />
      <ExperienceRow
        :years="'2016, 2017'"
        :position="'Caddiemaster'"
        :company="'Tarinagolf'"
        :description="$t('experience.caddiemaster_description')"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent } from "vue";
import ExperienceRow from "./ExperienceRow.vue";

export default defineComponent({
  name: "ExperienceCard",
  components: { ExperienceRow },
});
</script>

<style scoped></style>
