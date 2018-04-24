
// https://stackoverflow.com/questions/26183649/correct-simplest-way-of-calling-one-js-file-inside-another-js
const s = document.createElement("script");
s.type = "text/javascript";
s.async = true;
// s.src = "https://rawgit.com/sw-yx/async-render-toolbox/addReactAndMonkeyPatch/extension-src/static/js/main.js";
s.src = "/build/main.js.js";
document.body.appendChild(s);
