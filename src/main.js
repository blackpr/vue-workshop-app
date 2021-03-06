import { createApp } from "vue";
import WorkshopApp from "./WorkshopApp.vue";
import { createWorkshopRouter } from "./router";
import store from "./store";
import Exercise from "@/views/Exercise.vue";
import Home from "@/views/Home.vue";
import { setup as setupServer } from "./server";

// wip make workshop app and render isolated  files
// todo: export to file or npm module
// todo: backend
// credit: https://github.com/kentcdodds/react-workshop-app/blob/ab2fd707c259b59b5183b64dbb74694d51fa20a4/src/index.js#L25

import "normalize.css/normalize.css";
import "./css/workshop-app-styles.css";
import { isNavigationFailure } from "vue-router";

if (window.frameElement) {
  const styleTag = document.createElement("style");
  const requiredStyles = [
    `#app{display:grid;place-items:center;height:100vh;}`,
  ].join("\n");
  styleTag.appendChild(document.createTextNode(requiredStyles));
  document.head.prepend(styleTag);
}

const originalDocumentElement = document.documentElement;
const fillScreenCenter = `padding:30px;min-height:100vh;display:grid;align-items:center;justify-content:center;`;

function makeWorkshopApp({
  imports,
  filesInfo,
  projectTitle,
  gitHubRepoUrl,
  backend,
}) {
  console.log({ imports });
  const rootEl = document.getElementById("app");
  if (rootEl) rootEl.innerHTML = "";

  if (backend) {
    const {
      handlers,
      quiet = true,
      serviceWorker = { url: "/mockServiceWorker.js" },
      ...rest
    } = backend;
    const server = setupServer({ handlers });
    server.start({
      quiet,
      serviceWorker,
      onUnhandledRequest: "bypass",
      ...rest,
    });
  }

  const { router, history } = createWorkshopRouter([
    {
      path: "/:exerciseId",
      name: "Exercise",
      component: Exercise,
      props: {
        filesInfo,
        projectTitle,
        gitHubRepoUrl,
      },
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      props: {
        filesInfo,
        projectTitle,
        gitHubRepoUrl,
      },
    },
  ]);

  let previousLocation = history.location;
  let previousIsIsolated = null;

  function escapeForClassList(name) {
    // classList methods don't allow space or `/` characters
    return encodeURIComponent(name.replace(/\//g, "_"));
  }

  function handleLocationChange() {
    const pathname = history.location;
    console.log({ pathname });
    // add location pathname to classList of the body
    document.body.classList.remove(escapeForClassList(previousLocation));
    document.body.classList.add(escapeForClassList(pathname));

    const isIsolated = pathname.startsWith("/isolated");
    let info;
    if (isIsolated) {
      const filePath = pathname.replace("/isolated", "src");
      console.log(filePath);
      info = filesInfo.find((i) => i.filePath === filePath);
    } else {
      const number = Number(pathname.split("/").slice(-1)[0]);
      info = filesInfo.find(
        (i) => i.type === "instruction" && i.number === number
      );
    }

    if (isIsolated && !info) {
      document.body.innerHTML = `
        <div style="${fillScreenCenter}">
          <div>
            Sorry... nothing here. To open one of the exercises, go to
            <code>\`/exerciseNumber\`</code>, for example:
            <a href="/1"><code>/1</code></a>
          </div>
        </div>
      `;
      return;
    }

    // I honestly have no clue why, but there appears to be some kind of
    // race condition here with the title. It seems to get reset to the
    // title that's defined in the index.html after we set it :shrugs:
    setTimeout(() => {
      document.title = [
        info
          ? [
              info.number ? `${info.number}. ` : "",
              info.title || info.filename,
            ].join("")
          : null,
        projectTitle,
      ]
        .filter(Boolean)
        .join(" | ");
    }, 100);

    if (isIsolated) {
      console.log({ info });
      // import(`@/${info.type}/${info.filename}${info.ext}`)
      console.log(typeof imports[info.filePath]);
      let isolatedModuleImport = () =>
        typeof imports[info.filePath] === "function"
          ? imports[info.filePath]()
          : imports[info.filePath];
      renderIsolated(isolatedModuleImport);
    } else if (previousIsIsolated !== isIsolated) {
      renderVue();
    }
    previousLocation = history.location;
    previousIsIsolated = isIsolated;
  }

  // eslint-disable-next-line
  let mainApp;

  function renderIsolated(isolatedModuleImport) {
    isolatedModuleImport().then(async ({ default: defaultExport }) => {
      if (history.location !== previousLocation) {
        // location has changed while we were getting the module
        // so don't bother doing anything... Let the next event handler
        // deal with it
        return;
      }
      if (typeof defaultExport === "function") {
        mainApp = defaultExport();
      } else if (typeof defaultExport === "string") {
        // HTML file
        const domParser = new DOMParser();
        const newDocument = domParser.parseFromString(
          defaultExport,
          "text/html"
        );
        document.documentElement.replaceWith(newDocument.documentElement);

        // to get all the scripts to actually run, you have to create new script
        // elements, and no, cloneElement doesn't work unfortunately.
        // Apparently, scripts will only get loaded/run if you use createElement.
        const scripts = Array.from(document.querySelectorAll("script"));
        const loadingScriptsQueue = [];
        for (const script of scripts) {
          // if we're dealing with an inline script, we need to wait for all other
          // scripts to finish loading before we run it
          if (!script.hasAttribute("src")) {
            // eslint-disable-next-line no-await-in-loop
            await Promise.all(loadingScriptsQueue);
          }
          // replace the script
          const newScript = document.createElement("script");
          for (const attrName of script.getAttributeNames()) {
            newScript.setAttribute(attrName, script.getAttribute(attrName));
          }
          newScript.innerHTML = script.innerHTML;
          script.parentNode.insertBefore(newScript, script);
          script.parentNode.removeChild(script);

          // if the new script has a src, add it to the queue
          if (script.hasAttribute("src")) {
            loadingScriptsQueue.push(
              new Promise((resolve) => {
                newScript.onload = resolve;
              })
            );
          }
        }

        // now make sure all src scripts are loaded before continuing
        await Promise.all(loadingScriptsQueue);

        // Babel will call this when the DOMContentLoaded event fires
        // but because the content has already loaded, that event will never
        // fire, so we'll run it ourselves
        if (window.Babel) {
          window.Babel.transformScriptTags();
        }
      }

      // otherwise we'll just expect that the file ran the thing it was supposed
      // to run and doesn't need any help.
    });
  }

  function renderVue() {
    if (document.documentElement !== originalDocumentElement) {
      document.documentElement.replaceWith(originalDocumentElement);
    }
    mainApp = createApp(WorkshopApp, { filesInfo, projectTitle })
      .use(store)
      .use(router)
      .mount("#app");
  }

  // kick it off to get us started
  handleLocationChange();

  router.afterEach((to, from, failure) => {
    if (isNavigationFailure(failure)) {
      return;
    }
    if (to.path === from.path) {
      return;
    }
    handleLocationChange();
  });
}

//----usage
// @ts-ignore
// eslint-disable-next-line no-undef
// const filesInfo = WORKSHOP_FILES;
// import * as backend from "./backend";

// const imports = filesInfo
//   .filter((item) => ["exercise", "final"].includes(item.type))
//   .reduce((acc, curr) => {
//     acc[curr.filePath] = () =>
//       import(`@/${curr.type}/${curr.filename}${curr.ext}`);
//     return acc;
//   }, {});
// console.log(backend);
// makeWorkshopApp({
//   imports,
//   filesInfo,
//   projectTitle: "Testing Vue 3",
//   gitHubRepoUrl: "https://github.com/blackpr/vue-fundamentals",
//   backend,
// });

export { makeWorkshopApp };
