<script>
import { h, defineAsyncComponent } from "vue";

export default {
  name: "VueFile",
  props: {
    fileName: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      validator(value) {
        return ["exercise", "final"].includes(value);
      },
      required: true
    }
  },

  render() {
    const Component = defineAsyncComponent(() =>
      import(`@/${this.fileType}/${this.fileName}`)
    );
    return h(Component);
  }
};
</script>
