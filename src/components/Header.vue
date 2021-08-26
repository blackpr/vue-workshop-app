<template>
  <div class="navigation-wrapper">
    <div class="navigation-details">
      <router-link class="navigation-link" to="/">
        <VueLogo class="navigation-logo" />
        <div class="navigation-description">
          <h1 class="navigation-project-title">{{ projectTitle }}</h1>
          <span class="navigation-title">Epic Vue</span>
        </div>
      </router-link>
    </div>
    <HeaderExercises
      v-if="currentExercise?.id"
      :exerciseInfo="exerciseInfo"
      :currentExercise="currentExercise"
    />
  </div>
</template>

<script>
import VueLogo from "@/components/VueLogo.vue";
import HeaderExercises from "./HeaderExercises.vue";

export default {
  name: "Header",
  components: {
    VueLogo,
    HeaderExercises
  },
  props: {
    projectTitle: {
      type: String,
      required: true
    },
    exerciseInfo: {
      type: Array,
      required: true
    },
    currentExercise: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation-wrapper {
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 60px;
  box-shadow: 0 0.9px 1.5px -18px rgba(0, 0, 0, 0.024),
    0 2.4px 4.1px -18px rgba(0, 0, 0, 0.035),
    0 5.7px 9.9px -18px rgba(0, 0, 0, 0.046),
    0 19px 33px -18px rgba(0, 0, 0, 0.07);
}
.navigation-logo {
  width: 34px;
  height: 34px;
  margin-right: 0.5rem;
}
.navigation-description {
  display: flex;
  flex-direction: column;
}
.navigation-details {
  display: flex;
  align-items: center;
}
.navigation-project-title {
  font-size: 16px;
  margin: 0;
}
.navigation-link {
  display: flex;
  text-decoration: none;
  color: $text-color;
}
.navigation-title {
  font-size: 14px;
  opacity: 0.8;
}

@media (min-width: $mq-md) {
  .navigation-wrapper {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: $mq-sm) {
  .navigation-wrapper {
    padding: 0 1.75rem;
  }
}
</style>
