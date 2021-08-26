<template>
  <div class="about">
    <h1>This is an about page</h1>
    <VueFile fileType="exercise" fileName="01.vue" />
    <MdFile fileName="01.md" />
  </div>
</template>
<script>
import VueFile from "@/components/VueFile.vue";
import MdFile from "@/components/MdFile.vue";

export default {
  name: "AboutPage",
  components: { VueFile, MdFile }
};
</script>
