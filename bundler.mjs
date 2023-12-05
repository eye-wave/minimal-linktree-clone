import CleanCSS from "clean-css"
import { minify } from "html-minifier"
import { spawnSync } from "node:child_process"
import fs from "node:fs"

const html = fs.readFileSync("./src/index.html", "utf8")
const css = fs.readFileSync("./src/style.css", "utf8")
const js = fs.readFileSync("./src/main.js", "utf8")

const cleanedCss = new CleanCSS({ level: 2 }).minify(css)
const mini = minify(
  html
    .replace(/<link.*css.*>/, "<style>" + cleanedCss.styles + "</style>")
    .replace(/<script.*js.*>/, "<script>" + js + "</script>")
    .replace(/%age%/,Math.floor((Date.now() - 107784e7) / 315576e5))
  , {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true
})

if (!fs.existsSync("./dist")) fs.mkdirSync("./dist")

fs.writeFileSync("./dist/index.html", mini)

spawnSync("cp ./src/*.svg ./dist", { shell: true })
spawnSync("mkdir -p ./dist/assets", { shell: true })
spawnSync("cp ./src/assets -r ./dist", { shell: true })
