# vue-workshop-app

> an abstarction for my vue workshops

## usage:
- create new vue project with `vue cli`
- run `vue add @blackpr/vue-cli-plugin-workshop-app`
- install `npm i @blackpr/vue-workshop-app` 
- add backend if needed
  - create `src/backend.js`
  - run `npx msw init public/`
- create `src/exercise` and `src/final`
- use workshop in main.js 
```js
import * as timsWorkshop from "@blackpr/vue-workshop-app/workshop-app";
import "@blackpr/vue-workshop-app/dist/workshop-app.css";

// @ts-ignore
// eslint-disable-next-line no-undef
const filesInfo = WORKSHOP_FILES;
import * as backend from "./backend";

const imports = filesInfo
  .filter((item) => ["exercise", "final"].includes(item.type))
  .reduce((acc, curr) => {
    acc[curr.filePath] = () =>
      import(`@/${curr.type}/${curr.filename}${curr.ext}`);
    return acc;
  }, {});

timsWorkshop.makeWorkshopApp({
  imports,
  filesInfo,
  projectTitle: "Testing Vue 3",
  gitHubRepoUrl: "https://github.com/blackpr/vue-fundamentals",
  backend,
});
```

- Until I publish the dep in npm use verdacio
  - create .npmrc with content: `registry=http://localhost:4873`

example: [vue-workshop-example-usage](https://github.com/blackpr/vue-workshop-example-usage)

## publish
- `npm run build`
- `npm publish`