<template>
  <div class="navigation-exercises">
    <div class="navigation-prev">
      <router-link
        :to="`/${currentExercise.previous.number}`"
        v-if="currentExercise.previous"
      >
        <PrevIco />
        <span class="exercise-title">{{
          currentExercise?.previous?.title
        }}</span>
      </router-link>
    </div>
    <div class="navigation-dots">
      <HeaderExercisesNavigationDots
        :exerciseInfo="exerciseInfo"
        :currentId="currentExercise.id"
      />
    </div>
    <div class="navigation-next">
      <router-link
        :to="`/${currentExercise.next.number}`"
        v-if="currentExercise.next"
      >
        <span class="exercise-title">{{ currentExercise?.next?.title }}</span>
        <NextIco />
      </router-link>
    </div>
  </div>
</template>
<script>
import PrevIco from "@/components/PrevIco";
import NextIco from "@/components/NextIco";
import HeaderExercisesNavigationDots from "@/components/HeaderExercisesNavigationDots";

export default {
  name: "HeaderExercises",
  components: {
    PrevIco,
    NextIco,
    HeaderExercisesNavigationDots,
  },
  props: {
    currentExercise: {
      type: Object,
    },
    exerciseInfo: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation-exercises {
  align-items: center;
  display: grid;
  grid-template-columns: 3fr 2fr 3fr;
  padding-left: 1rem;
  width: 100%;
}

.navigation-dots {
  text-align: center;
}

.navigation-next {
  text-align: right;
}

.navigation-next a {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.navigation-prev a {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.exercise-title {
  display: inline-block;
  color: $text-color;
  font-size: 15px;
  opacity: 0.9;
}
</style>
