<template>
  <div class="insturctions">
    <MdFile :fileName="filename" />
  </div>
</template>

<script>
import { computed, toRefs } from "vue";
import MdFile from "./MdFile.vue";
import useHighlight from "@/composables/useHighlight";

export default {
  components: { MdFile },
  name: "ExerciseInstruction",
  props: {
    currentExercise: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { currentExercise } = toRefs(props);
    const filename = computed(
      () =>
        `${currentExercise.value.instruction.filename}${currentExercise.value.instruction.ext}`
    );

    useHighlight();

    return { filename };
  },
};
</script>

<style lang="scss" scoped>
.insturctions {
  background-color: $base-drop;
  min-height: calc(100vh - 61px);
}
</style>
