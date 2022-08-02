<template>
  <v-card class="main-card" elevation="10">
    <v-card-title>{{ $t("tech.title") }}</v-card-title>
    <v-card-text>
      <div>
        <v-chip
          v-for="tag in tags"
          :key="tag"
          style="pointer-events: none; margin: 4px"
          variant="outlined"
          label
          color="primary"
        >
          {{ tag }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TechCard",
  data: () => ({
    tags: [
      "Node.js",
      "PHP",
      "Laravel",
      "C#",
      "JavaScript",
      "Typescript",
      "Vue",
      "React",
      "React Native",
      "SQL",
      "NoSQL",
      "MySQL",
      "SQL Server",
      "GraphQL",
      "REST API",
      "AWS",
      "Docker",
      "Git",
    ],
  }),
});
</script>

<style scoped></style>
