<template>
  <v-row style="padding-top: 12px">
    <v-col>
      <p>{{ years }}</p>
    </v-col>
    <v-col>
      <p>{{ position }}, {{ company }}</p>
      <p class="description">{{ description }}</p>
    </v-col>
    <v-divider></v-divider>
  </v-row>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExperienceRow",
  props: {
    years: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
});
</script>

<style scoped>
p {
  font-size: 16px;
}

.description {
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  color: #8c8c8c;
  margin-top: 4px;
}
</style>
