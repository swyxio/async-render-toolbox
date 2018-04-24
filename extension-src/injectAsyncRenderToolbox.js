
// https://stackoverflow.com/questions/26183649/correct-simplest-way-of-calling-one-js-file-inside-another-js
const s = document.createElement("script");
s.type = "text/javascript";
s.async = true;
s.src = "https://rawgit.com/sw-yx/async-render-toolbox/addReactInjection/extension-src/build/main.js.js";
// s.src = "/build/main.js.js";
document.body.appendChild(s);



console.log('injected js')
XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function (value) {
  console.log('caught')
  this.addEventListener(
    "loadstart",
    function () {
      console.log("Loading");
    },
    false
  );
  // var trap = document.getElementById('trapcounter')
  // trap.innerHTML = trap.innerHTML + " 3 "
  window.asyncreacttoolboxqueue = []
  console.log("********************", window);
  // if (!window.asyncreacttoolboxqueue) window.asyncreacttoolboxqueue = []
  // window.asyncreacttoolboxqueue.push(() => this.realSend(value))
  // console.log('xmlhttp', window.asyncreacttoolboxqueue, this);
};