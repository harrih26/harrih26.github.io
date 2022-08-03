<template>
  <v-container>
    <Transition appear name="slide-right">
      <AboutCard />
    </Transition>
    <Transition appear name="slide-left">
      <ExperienceCard />
    </Transition>
    <Transition appear name="slide-right">
      <CertificationsCard />
    </Transition>
    <Transition appear name="slide-left">
      <TechCard />
    </Transition>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import AboutCard from "../components/AboutCard.vue";
import TechCard from "../components/TechCard.vue";
import CertificationsCard from "../components/CertificationsCard.vue";
import ExperienceCard from "../components/ExperienceCard.vue";

export default defineComponent({
  name: "AboutView",
  components: {
    AboutCard,
    TechCard,
    CertificationsCard,
    ExperienceCard,
  },
});
</script>

<style>
.main-card {
  margin: auto;
  margin-top: 12px;
  padding: 12px;
  max-width: 700px;
}

p {
  text-align: left;
}

.slide-right-enter-active {
  transition: all 0.3s ease-in;
}

.slide-right-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all 0.3s ease-in;
}

.slide-left-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
