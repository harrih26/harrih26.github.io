<template>
  <v-card class="main-card" elevation="14">
    <v-card-title>
      {{ $t("about.title") }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col xs="12" md="4" xl="auto">
          <Avatar/>
        </v-col>
        <v-col xs="12" md="8" xl="auto">
          <p>
            {{ $t("about.about1") }} <br/><br/>
            {{ $t("about.about2") }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-spacer/>
      <v-btn
          class="link-button"
          elevation="2"
          icon="mdi-github"
          href="https://github.com/hheikkinen"
          target="_blank"
      />
      <v-btn
          class="link-button"
          elevation="2"
          icon="mdi-linkedin"
          href="https://www.linkedin.com/in/harri-heikkinen/"
          target="_blank"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import {defineComponent} from "vue";
import Avatar from "./Avatar.vue";

export default defineComponent({
  name: "AboutCard",
  components: {
    Avatar,
  },
});
</script>

<style scoped>
p {
  color: #ADBAC2;
}

.link-button {
  font-weight: normal;
  background-color: #347D39;
}
</style>
