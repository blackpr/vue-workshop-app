// credit: https://github.com/kentcdodds/react-workshop-app/blob/d51cfc32131f18bb683738bd1260c4d0724f5587/src/load-files.js#L1
const path = require("path");
const fs = require("fs");
const glob = require("glob");

function loadFiles({
  cwd = process.cwd(),
  ignore = [
    "**/__tests__/**",
    "**/test/**",
    "**/backend.js",
    "**/setupTests.js",
    "**/setupProxy.js",
    "**/*.d.ts",
  ],
  ...rest
} = {}) {
  const fileInfo = glob
    .sync(
      "src/**/+(exercise|final|examples)/*.+(js|html|jsx|ts|tsx|md|mdx|vue)",
      {
        cwd,
        ignore,
        ...rest,
      }
    )
    // eslint-disable-next-line complexity
    .map((filePath) => {
      const fullFilePath = path.join(cwd, filePath);
      const { dir, name, ext } = path.parse(fullFilePath);
      const parentDir = path.basename(dir);
      const contents = String(fs.readFileSync(fullFilePath));
      let type = parentDir;
      if (ext === ".md" || ext === ".mdx") {
        type = "instruction";
      }
      const [firstLine, secondLine] = contents.split(/\r?\n/);
      let title, extraCreditTitle;
      const isExtraCredit = name.includes(".extra-");
      const fallbackMatch = { groups: { title: "" } };
      if (parentDir === "final" || parentDir === "exercise") {
        if (
          ext === ".js" ||
          ext === ".tsx" ||
          ext === ".ts" ||
          ext === ".vue"
        ) {
          const titleMatch =
            firstLine.match(/\/\/ (?<title>.*)$/) || fallbackMatch;
          title = titleMatch.groups.title.trim();
          const extraCreditTitleMatch =
            (secondLine && secondLine.match(/\/\/ 💯 (?<title>.*)$/)) ||
            fallbackMatch;
          extraCreditTitle = extraCreditTitleMatch.groups.title.trim();
        } else if (ext === ".html") {
          const titleMatch =
            firstLine.match(/<!-- (?<title>.*) -->/) || fallbackMatch;
          title = titleMatch.groups.title.trim();
          const extraCreditTitleMatch =
            (secondLine && secondLine.match(/<!-- 💯 (?<title>.*) -->/)) ||
            fallbackMatch;
          extraCreditTitle = extraCreditTitleMatch.groups.title.trim();
        } else if (ext === ".md" || ext === ".mdx") {
          const titleMatch =
            firstLine.match(/# (?<title>.*)$/) || fallbackMatch;
          title = titleMatch.groups.title.trim();
        }
      }
      return {
        id: filePath,
        title,
        fullFilePath,
        filePath,
        atFilePath: filePath.replace("src", "@"),
        isolatedPath: filePath.replace("src", "/isolated"),
        ext,
        filename: name,
        type,
        number: Number((name.match(/(^\d+)/) || [null])[0]),
        isExtraCredit,
        extraCreditNumber: Number((name.match(/(\d+$)/) || [null])[0]),
        extraCreditTitle,
      };
    });

  fileInfo.sort((a, b) => {
    // change order so that shorter file names (01) are before longer (01.extra-01)
    if (a.filename.startsWith(b.filename)) return 1;
    if (b.filename.startsWith(a.filename)) return -1;
    // otherwise preserve order from glob (use explicit condition for consistency in Node 10)
    return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
  });

  return fileInfo;
}

// const files = loadFiles();
// console.log(files);

module.exports = loadFiles;
