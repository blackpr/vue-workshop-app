<template>
  <div class="dots-wrapper">
    <template v-for="exercise in exerciseInfo" :key="exercise.id">
      <input
        :checked="exercise.id === currentId"
        :id="`exercise-dot-${exercise.id}`"
        @change="navigateToExercise(exercise.number)"
        type="radio"
        name="exercise-dots"
        class="visually-hidden"
      />
      <label :htmlFor="`exercise-dot-${exercise.id}`" :title="exercise.title">
        <span class="visually-hidden">{exercise.title}</span>
        <span
          class="dot"
          :class="exercise.id === currentId ? 'checked-dot' : ''"
        ></span>
      </label>
    </template>
  </div>
</template>

<script>
export default {
  name: "HeaderExercisesNavigationDots",
  props: {
    exerciseInfo: {
      type: Array,
      required: true
    },
    currentId: {
      type: String,
      required: true
    }
  },
  methods: {
    navigateToExercise(exerciseNumber) {
      this.$router.push(`/${exerciseNumber}`);
    }
  }
};
</script>

<style lang="scss">
.visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.dot {
  cursor: pointer;
  display: block;
  border-radius: 50%;
  height: 12px;
  width: 12px;
  margin: 0 6px;
  background-color: #c4cdd5;
}
.checked-dot {
  background-color: $base-color;
}
.dots-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
