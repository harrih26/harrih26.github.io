<template>
  <Transition appear name="fade-in">
      <v-img :src="avatar" class="avatar" />
  </Transition>
</template>

<script>
import { defineComponent } from "vue";
import avatar from "../assets/Heikkinen_Harri.jpg";

export default defineComponent({
  name: "Avatar",
  data: () => ({
    avatar: avatar,
  }),
});
</script>

<style scoped>
.avatar {
  margin: auto;
  width: 200px;
  border-radius: 5%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 10s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
