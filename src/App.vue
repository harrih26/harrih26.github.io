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
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200&display=swap');

p {
  font-family: "Roboto Mono";
}

small {
  cursor: pointer;
}

.v-divider {
  background-color: #757c83;
}

.v-card-title {
  font-family: "Roboto Mono";
  font-weight: bold;
}

.v-card {
  border: 1px solid green;
  font-family: "Roboto Mono";
}
</style>
