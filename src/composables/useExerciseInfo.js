import { computed, ref } from "vue";

export default function useExerciseInfo(filesInfo) {
  const exerciseInfo = ref([]);
  const exerciseTypes = ["final", "exercise", "instruction"];
  for (const fileInfo of filesInfo) {
    if (exerciseTypes.includes(fileInfo.type)) {
      exerciseInfo.value[fileInfo.number] = exerciseInfo.value[
        fileInfo.number
      ] ?? {
        exercise: [],
        final: []
      };
      const info = exerciseInfo.value[fileInfo.number];
      if (fileInfo.type === "instruction") {
        info.instruction = fileInfo;
        const { title, number, id } = fileInfo;
        Object.assign(info, { title, number, id });
      } else {
        info[fileInfo.type].push(fileInfo);
      }
    }
  }

  const infoWithNextPrev = computed(() =>
    exerciseInfo.value.filter(Boolean).map(inf => {
      inf.next = exerciseInfo.value[inf.number + 1];
      inf.previous = exerciseInfo.value[inf.number - 1];

      return inf;
    })
  );

  return infoWithNextPrev;
}
