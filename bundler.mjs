import fs from "node:fs"
import { spawnSync } from "node:child_process"
import { minify } from "html-minifier"
import CleanCSS from "clean-css"

const html = fs.readFileSync("./src/index.html", "utf8")
const css = fs.readFileSync("./src/style.css", "utf8")
const js = fs.readFileSync("./src/main.js", "utf8")

const cleanedCss = new CleanCSS({ level: 2 }).minify(css)

console.log(cleanedCss)

const mini = minify(
  html
    .replace(/<link.*css.*>/, "<style>" + cleanedCss.styles + "</style>")
    .replace(/<script.*js.*>/, "<script>" + js + "</script>")
  
  , {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true
})

if (!fs.existsSync("./dist")) fs.mkdirSync("./dist")

fs.writeFileSync("./dist/index.html", mini)

spawnSync("cp ./src/*.svg ./dist", { shell: true })
spawnSync("cp ./src/*.webp ./dist", { shell: true })
