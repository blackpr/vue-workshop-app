<template>
  <div class="exercise-list">
    <HomeExercisesListItem
      v-for="exercise in exerciseInfo"
      :key="exercise.id"
      :exercise="exercise"
    />
  </div>
</template>

<script>
import HomeExercisesListItem from "@/components/HomeExercisesListItem.vue";

export default {
  components: { HomeExercisesListItem },
  name: "HomeExercisesList",
  props: {
    exerciseInfo: {
      type: Array,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
.exercise-list {
  width: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-gap: 1rem;
}
</style>
