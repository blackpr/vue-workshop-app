<template>
  <div class="exercise-container-wrapper">
    <div class="exerciese-container-main">
      <div class="exercise-lesson">
        <ExerciseInstruction :currentExercise="currentExercise" />
      </div>
      <div class="exercise-results">
        <ExerciseResults :currentExercise="currentExercise" />
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseResults from "@/components/ExerciseResults";
import useExerciseInfo from "@/composables/useExerciseInfo";
import { useRoute } from "vue-router";
import { computed } from "vue";
import ExerciseInstruction from "../components/ExerciseInstruction.vue";
export default {
  name: "Excercise",
  components: {
    ExerciseResults,
    ExerciseInstruction,
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
    gitHubRepoUrl: {
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

<style lang="scss" scoped>
.exercise-results {
  border-top: 1px solid #e9edf1;
  background-color: #ffffff;
}
.exercise-container-wrapper {
  min-height: calc(100vh - 60px);
}
.exerciese-container-main {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
}
.exercise-lesson {
  grid-row: 2;
  border-top: 1px solid #e9edf1;
}

@media (min-width: $mq-md) {
  .exerciese-container-main {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .exercise-lesson {
    grid-row: auto;
    height: calc(100vh - 60px);
    overflow-y: scroll;
  }
}

@media (min-width: $mq-sm) {
}
</style>
