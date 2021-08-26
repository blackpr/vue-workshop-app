<template>
  <Tabs class="tabs" v-model="selectedTabType">
    <Tab
      v-for="tab in tabsType"
      :key="`type-${tab.value}`"
      :val="tab.value"
      class="tab"
      :class="{ 'active-tab': getActive(tab.value) }"
    >
      {{ tab.label }}
    </Tab>
  </Tabs>
  <TabPanels v-model="selectedTabType">
    <TabPanel class="tab-panel">
      <div>
        <ExerciseResultsTabPanel
          :currentExercise="currentExercise"
          :selectedTabType="selectedTabType"
        />
      </div>
    </TabPanel>
  </TabPanels>
</template>

<script>
import { reactive, toRefs } from "vue";
import { Tabs, Tab, TabPanels, TabPanel } from "vue3-tabs";
import ExerciseResultsTabPanel from "./ExerciseResultsTabPanel.vue";

const tabsType = [
  {
    label: "⚒️ Exercise",
    value: "exercise",
    description: "desc1"
  },
  {
    label: "🏁 Final",
    value: "final",
    description: "desc2"
  }
  // {
  //   label: "Tab 3",
  //   value: 3,
  //   description:
  //     "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
  //   color: "grey"
  // }
];

export default {
  name: "ExerciseResults",
  components: {
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
    ExerciseResultsTabPanel
  },
  props: {
    currentExercise: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      selectedTabType: tabsType[0].value
    });
    function getActive(tab) {
      return state.selectedTabType === tab;
    }
    return {
      tabsType,
      getActive,
      ...toRefs(state)
    };
  }
};
</script>

<style lang="scss">
.tabs {
  background: #f4f6f8;
  height: 50px;
}
.tab {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  margin: 0;
  cursor: pointer;
  user-select: none;
}
.tab:hover {
  color: $base-color;
}
.active-tab {
  border-width: 0px;
  border-top-width: 2px;
  border-style: solid;
  border-color: $base-color;
  background-color: #ffffff;
  color: $base-color;
}
/* disable select highlight */
/* .tab-panels {
  -webkit-user-select: none;
  -moz-user-select: none;
} */
.tab-panel {
  // padding: 0 20px 20px 0;
  box-sizing: border-box;
  border-top: 1px solid #e9edf1;
}
</style>
