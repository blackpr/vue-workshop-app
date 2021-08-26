<script>
import { h } from "vue";

export default {
  name: "MdFile",
  props: {
    fileName: {
      type: String,
      required: true
    }
  },

  render() {
    return h("div", {
      class: "md-content",
      innerHTML: require(`@/exercise/${this.fileName}`)
    });
  }
};
</script>

<style lang="scss" scopped>
.md-content {
  padding: 1rem 2rem 3rem 2rem;
}
p,
li {
  font-size: 18;
  line-height: 1.5;
}
blockquote {
  border-left: 2px solid $base-color;
  margin: 0;
  padding-left: 1.5rem;
}
.md-content pre[class*="language-"] {
  background: $base-gray;
  font-size: 85%;
  margin: 1rem -2rem 1rem -2rem;
  padding: 2rem;
}
ul {
  padding: 0;
  list-style-position: inside;
}

ul ul {
  padding-left: 2rem;
}

p > code {
  background: $base-gray;
  color: darken($color: $text-color, $amount: 20);
  font-size: 85%;
  padding: 3px 5px;
}

.md-content .token.operator,
.token.string {
  background-color: $base-gray;
}

.md-content code[class*="language-"],
pre[class*="language-"] {
  text-shadow: none;
  max-width: 100vw;
}
</style>
