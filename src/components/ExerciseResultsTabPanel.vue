<template>
  <div v-if="showMoreTabs">
    <Tabs class="tabs" v-model="selectedTabIndex">
      <Tab
        v-for="(tab, i) in selectedExerciseType"
        :key="`type-${i}`"
        :val="i"
        class="tab"
        :class="{ 'active-tab': getActive(i) }"
      >
        {{ tab.title }}
      </Tab>
    </Tabs>
    <TabPanels v-model="selectedTabIndex">
      <TabPanel class="tab-panel">
        <div class="open-isolated">
          <div class="open-isolated__title">
            {{ currentExercise.title }}
          </div>
          <div class="open-isolated__link">
            <a :href="selectedExercise?.isolatedPath" target="_blank">
              Open on isolated page
            </a>
          </div>
        </div>
        <iframe
          :title="selectedExercise.title"
          :src="selectedExercise.isolatedPath"
          height="100%"
        />
      </TabPanel>
    </TabPanels>
  </div>
  <div v-else>
    <div class="open-isolated">
      <div class="open-isolated__title">
        {{ currentExercise.title }}
      </div>
      <div class="open-isolated__link">
        <a :href="selectedExercise?.isolatedPath" target="_blank">
          Open on isolated page
        </a>
      </div>
    </div>
    <iframe
      v-if="selectedExercise"
      :title="selectedExercise.title"
      :src="selectedExercise.isolatedPath"
      height="100%"
    />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { Tabs, Tab, TabPanels, TabPanel } from "vue3-tabs";

export default {
  name: "ExerciseResultsTabPanel",
  components: {
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
  },
  props: {
    currentExercise: {
      type: Object,
      required: true,
    },
    selectedTabType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const selectedExerciseType = computed(
      () => props.currentExercise?.[props.selectedTabType]
    );

    const showMoreTabs = computed(() => selectedExerciseType.value?.length > 1);

    const selectedTabIndex = ref(0);

    const selectedExercise = computed(
      () =>
        props.currentExercise?.[props.selectedTabType]?.[selectedTabIndex.value]
    );

    const getActive = (index) => index === selectedTabIndex.value;

    return {
      showMoreTabs,
      selectedTabIndex,
      selectedExercise,
      selectedExerciseType,
      getActive,
    };
  },
};
</script>

<style lang="scss" scoped>
iframe {
  border: none;
  width: 100%;
  height: calc(100vh - 203px);
  display: block;
}

.open-isolated {
  justify-content: space-between;
  padding: 20px 10px;
  height: 20px;
  display: flex;
  align-items: center;
}

a[target="_blank"]::after {
  content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
  margin: 0 3px 0 5px;
}
</style>
