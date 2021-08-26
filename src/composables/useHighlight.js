import Prism from "prismjs";
import { onMounted } from "vue";
import "prismjs/themes/prism.css";
// import "prismjs/themes/prism-tomorrow.css";

export default function useHighlight() {
  onMounted(() => {
    Prism.languages["vue"] = Prism.languages.extend("markup", {});

    Prism.languages.insertBefore("vue", "tag", {
      interpolation: {
        pattern: /{{((?!}})(.|\n))*}}/,
        inside: {
          punctuation: /^{{|}}$/,
          "inline-js language-js": {
            pattern: /.*/,
            inside: Prism.languages.javascript,
          },
        },
      },
    });

    Prism.languages["vue"].tag.inside = Prism.languages.insertBefore(
      "inside",
      "attr-value",
      {
        directive: {
          pattern:
            /(?<=\s)((v-[a-z0-9-]+)|:|@|#)(((?<=[:@#])|:)([a-z0-9-]+|(\[[^\]]+\])))?(\.[a-z0-9]+)*="[^"]+"/i,
          inside: {
            "punctuation directive-shorthand": /^[:@#]/,
            "identifier directive-name": /^v-[a-z0-9-]+/i,
            "directive-argument": [
              {
                pattern: /^((?<=[:@#])|:)[a-z0-9-]+/i,
                inside: {
                  punctuation: /^:/,
                  identifier: /[a-z0-9-]+/i,
                },
              },
              {
                pattern: /^((?<=[:@#])|:)(\[[^\]]+\])/,
                inside: {
                  punctuation: /^\[|\]$/,
                  "inline-js language-js": {
                    pattern: /.*/,
                    inside: Prism.languages.javascript,
                  },
                },
              },
            ],
            "directive-modifier": {
              pattern: /^.[a-z0-9-]+/i,
              inside: {
                punctuation: /^./,
                identifier: /[a-z0-9-]+/i,
              },
            },
            "directive-expression": {
              pattern: /^=(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
              inside: {
                punctuation: [/^=/, /^["']|["']$/],
                "inline-js language-js": {
                  pattern: /.*/,
                  inside: Prism.languages.javascript,
                },
              },
            },
          },
        },
      },
      Prism.languages["vue"].tag
    );

    Prism.highlightAll();
  });
}
