<template>
  <v-app class="app">
    <v-layout>
      <router-view />
    </v-layout>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
small {
  cursor: pointer;
}

.v-divider {
  background-color: #757c83;
}

.v-card-title {
  color: #d2dade;
}

.v-card {
  border: 1px solid green;
}
</style>
