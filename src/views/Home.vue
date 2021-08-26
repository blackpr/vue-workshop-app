<template>
  <div class="home">
    <VueLogo color="#b6d2be" class="vue-logo" />
    <h1 class="workshop-title">{{ projectTitle }}</h1>
    <HomeExercisesList :exerciseInfo="exerciseInfo" />
  </div>
</template>

<script>
// @ is an alias to /src
import useExerciseInfo from "@/composables/useExerciseInfo";
import VueLogo from "@/components/VueLogo.vue";
import HomeExercisesList from "@/components/HomeExercisesList.vue";

export default {
  name: "Home",
  components: {
    VueLogo,
    HomeExercisesList,
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

    return { exerciseInfo };
  },
};
</script>

<style lang="scss" scoped>
.home {
  max-width: 850px;
  min-height: 85vh;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.vue-logo {
  width: 120px;
  opacity: 0.7;
}

.workshop-title {
  text-align: center;
  margin: 3rem 0 4rem 0;
}
</style>
