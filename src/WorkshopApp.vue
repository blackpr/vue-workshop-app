<template>
  <div class="vue-workshop-app">
    <Header
      :projectTitle="projectTitle"
      :exerciseInfo="exerciseInfo"
      :currentExercise="currentExercise"
    />
    <router-view :key="$route"></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";
import useExerciseInfo from "./composables/useExerciseInfo";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  name: "WorkshopApp",
  components: {
    Header,
  },
  props: {
    filesInfo: {
      type: Array,
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const exerciseInfo = useExerciseInfo(props.filesInfo);

    const route = useRoute();
    const currentExerciseId = computed(() => +route.params.exerciseId);
    const currentExercise = computed(
      () => exerciseInfo.value[currentExerciseId.value - 1]
    );

    return { exerciseInfo, currentExercise };
  },
};
</script>

<style lang="scss">
body {
  color: $text-color;
}
a {
  color: $link-color;
}
::selection {
  background: $base-color;
  color: white;
}
.vue-workshop-app {
  background-color: $base-drop;
  min-height: 100vh;
}
</style>
