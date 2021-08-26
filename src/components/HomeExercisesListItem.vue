<template>
  <div
    class="exercise-list-item"
    :style="{ '--exerciseNumber': `'${exercise.number}'` }"
  >
    <router-link :to="`${exercise.number}`" class="exercise-item-link">
      <small class="exercise-number">{{ exercise.number }}</small>
      <h3 class="exercise-title">{{ exercise.title }}</h3>
    </router-link>
    <div class="exercise-isolated">
      <a
        :href="exercise?.exercise?.[0]?.isolatedPath"
        target="_blank"
        class="isolated-exercise-link"
        ><span>⚒️ Exercise</span></a
      >
      <a
        :href="exercise?.final?.[0]?.isolatedPath"
        target="_blank"
        class="isolated-final-link"
        ><span>🏁 Final Version</span></a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeExercisesListItem",
  props: {
    exercise: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.isolated-exercise-link {
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: inherit;
  padding: 0.7rem 1rem;
  font-style: 16px;
  height: 48px;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: #ffffff;
  }
}
.isolated-final-link {
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: inherit;
  padding: 0.7rem 1rem;
  font-style: 16px;
  height: 48px;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: #ffffff;
  }
}

.exercise-isolated {
  display: flex;
  flex-direction: row;
  height: auto;
  padding: 1.5rem 0.5rem;
  align-items: center;
}

.exercise-item-link {
  padding: 2rem 2rem 0 2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: $text-color;
  &:hover {
    & h3 {
      text-decoration: underline;
    }
  }
}

.exercise-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  margin-left: 1rem;
}

.exercise-number {
  display: block;
  opacity: 0.7;
  font-size: 14px;
}

.exercise-list-item {
  align-items: center;
  background-color: $background-light;
  border-radius: 5px;
  box-shadow: 0 0px 1.7px -7px rgba(0, 0, 0, 0.02),
    0 0px 4px -7px rgba(0, 0, 0, 0.028), 0 0px 7.5px -7px rgba(0, 0, 0, 0.035),
    0 0px 13.4px -7px rgba(0, 0, 0, 0.042),
    0 0px 25.1px -7px rgba(0, 0, 0, 0.05), 0 0px 60px -7px rgba(0, 0, 0, 0.07);
  display: grid;
  font-size: 18px;
  grid-template-columns: auto;
  position: relative;
  small {
    display: block;
  }
  &:hover {
    background-color: $base-drop;
    small {
      opacity: 1;
    }
    &::before {
      background-color: $base-color;
      border: 2px solid $base-color;
      color: #ffffff;
    }
  }
  &::before {
    content: "";
    display: none;
  }
  &::after {
    content: "";
    display: none;
  }
  &:first-of-type {
    &::after {
      content: "";
      display: none;
    }
  }
  &:last-of-type {
    &::after {
      content: "";
      display: none;
    }
  }
}

@media (min-width: $mq-sm) {
  .exercise-title {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    margin-left: 1rem;
  }

  .exercise-item-link {
    padding: 0 2rem 0 3rem;
  }

  .exercise-list-item {
    grid-template-columns: 60% 40%;

    small {
      display: none;
    }

    &::before {
      content: var(--exerciseNumber);
      display: flex; /** flex */
      align-items: center;
      background-color: #ffffff;
      border: 2px solid $light-color;
      border-radius: 12px;
      color: $base-color;

      font-size: 12px;
      font-weight: 600;
      height: 24px;
      justify-content: center;
      margin-left: 23px;
      margin-top: 0;
      padding-top: 1px;
      padding-left: 1px;
      position: absolute;
      width: 24px;
      z-index: 1;
    }

    &::after {
      position: absolute;
      display: block;
      width: 2px;
      height: calc(100% + 1rem);
      background-color: $light-color;
      margin-left: 34px;
    }

    &:first-of-type {
      &::after {
        content: "";
        position: absolute;
        display: block;
        width: 2px;
        height: calc(50% + 1rem);
        background-color: $light-color;
        margin-left: 34px;
        margin-top: 4rem;
      }
    }
    &:last-of-type {
      &::after {
        content: "";
        position: absolute;
        display: block;
        width: 2px;
        height: calc(50% + 1rem);
        background-color: $light-color;
        margin-left: 34px;
        margin-bottom: 4rem;
      }
    }
  }
}
</style>
