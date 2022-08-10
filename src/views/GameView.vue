<template>
  <v-container>
    <SnakeGame/>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import SnakeGame from "../components/SnakeGame.vue";

export default defineComponent({
  name: "GameView",
  components: {
    SnakeGame
},
});
</script>

<style scoped>

</style>
