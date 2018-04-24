// https://www.w3schools.com/howto/howto_js_draggable.asp

var asyncRenderToolbox = document.createElement("div");
asyncRenderToolbox.id = "asyncRenderToolbox_div";
var asyncRenderToolbox_header = document.createElement("div");
asyncRenderToolbox_header.id = "asyncRenderToolbox_divheader";
asyncRenderToolbox_header.textContent = "async-render-toolbox (alt/⌥+R to toggle)";
asyncRenderToolbox.appendChild(asyncRenderToolbox_header);
document.body.prepend(asyncRenderToolbox);
dragElement(asyncRenderToolbox); // make it draggable
// const destroy = lagRadar({ parent: document.getElementById("asyncRenderToolbox_div") });
lagRadar({ parent: document.getElementById("asyncRenderToolbox_div") });
asyncRenderToolbox.style.top = document.documentElement.scrollTop + 30;
asyncRenderToolbox.style.left = Math.round(window.innerWidth / 2) - 30;
document.addEventListener("keyup", handleKeyUp, false);

// https://stackoverflow.com/questions/26183649/correct-simplest-way-of-calling-one-js-file-inside-another-js?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
const s = document.createElement("script");
s.type = "text/javascript";
s.async = true;
s.src = "https://rawgit.com/sw-yx/async-render-toolbox/addReactAndMonkeyPatch/extension-src/static/js/main.js";
document.body.appendChild(s);

// ********************************************************
// monkey patch XmlHTTPRequest to listen to every send
// https://gist.github.com/suprememoocow/2823600
// http://qnimate.com/monitoring-ajax-requests/
// (function(XHR) {
//   "use strict";
//   XHR.prototype.realSend = XHR.prototype.send;
//   XHR.prototype.send = function(value) {
//     console.log("xhr send detected!", value);
//     this.addEventListener(
//       "progress",
//       function(e) {
//         console.log("Loading", e);
//       },
//       false
//     );
//     this.realSend(value);
//   };
// })(XMLHttpRequest);

// console.log("***start******", XMLHttpRequest.prototype.send);

// XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
// XMLHttpRequest.prototype.send = function(value) {
//   this.addEventListener(
//     "loadstart",
//     function() {
//       console.log("Loading");
//     },
//     false
//   );
//   console.log("********************");
//   this.realSend(value);
// };

// console.log("***end******", XMLHttpRequest.prototype.send);

// // nope
// document.body.addEventListener("load", function(doc, ev) {
//   console.log("loading doc", doc);
//   console.log("loading ev", ev);
// });
// document.body.addEventListener("readystatechange", function(doc, ev) {
//   console.log("loading doc", doc);
//   console.log("loading ev", ev);
// });

// // this is a working monkeypatch thing
// var el = document.createElement("script");
// el.innerHTML = `
// XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
// XMLHttpRequest.prototype.send = function(value) {
//   this.addEventListener(
//     "loadstart",
//     function() {
//       console.log("Loading");
//     },
//     false
//   );
//   console.log("********************");
//   this.realSend(value);
// };
// `;
// document.body.appendChild(el);

// require("./static/js/main"); // should add a little button

// ********************************************************
// handleKeyUp
let asyncRenderToolboxActive = true;

// we can use this programmatically in future
function toggleToolbox() {
  if (asyncRenderToolboxActive) {
    asyncRenderToolbox.style.display = "none";
  } else {
    asyncRenderToolbox.style.display = "block";
  }
  asyncRenderToolboxActive = !asyncRenderToolboxActive;
}

function handleKeyUp(e) {
  // this would test for alt + R key
  if (e.altKey && e.keyCode == 82) {
    toggleToolbox();
  }
}

// dragger defitions
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  // if (document.getElementById(elmnt.id + "header")) {
  //   /* if present, the header is where you move the DIV from:*/
  //   document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  // } else {
  //   /* otherwise, move the DIV from anywhere inside the DIV:*/
  //   elmnt.onmousedown = dragMouseDown;
  // }
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function lagRadar(config = {}) {
  const {
    frames = 50, // number of frames to draw, more = worse performance
    speed = 0.0017, // how fast the sweep moves (rads per ms)
    size = 300, // outer frame px
    inset = 3, // circle inset px
    parent = document.body // DOM node to attach to
  } = config;

  const svgns = "http://www.w3.org/2000/svg";

  const styles = document.createTextNode(`
    .lagRadar-sweep > * {
      shape-rendering: crispEdges;
    }
    .lagRadar-face {
      fill: transparent;
    }
    .lagRadar-hand {
      stroke-width: 4px;
      stroke-linecap: round;
    }
  `);

  function $svg(tag, props = {}, children = []) {
    const el = document.createElementNS(svgns, tag);
    Object.keys(props).forEach(prop => el.setAttribute(prop, props[prop]));
    children.forEach(child => el.appendChild(child));
    return el;
  }

  const PI2 = Math.PI * 2;
  const middle = size / 2;
  const radius = middle - inset;

  const $hand = $svg("path", { class: "lagRadar-hand" });
  const $arcs = new Array(frames).fill("path").map(t => $svg(t));
  const $root = $svg("svg", { class: "lagRadar", height: size, width: size }, [
    $svg("style", { type: "text/css" }, [styles]),
    $svg("g", { class: "lagRadar-sweep" }, $arcs),
    $hand,
    $svg("circle", { class: "lagRadar-face", cx: middle, cy: middle, r: radius })
  ]);

  parent.appendChild($root);

  let frame;
  let framePtr = 0;
  let last = {
    rotation: 0,
    now: Date.now(),
    tx: middle + radius,
    ty: middle
  };

  const calcHue = (() => {
    const max_hue = 120;
    const max_ms = 1000;
    const log_f = 10;
    const mult = max_hue / Math.log(max_ms / log_f);
    return function(ms_delta) {
      return max_hue - Math.max(0, Math.min(mult * Math.log(ms_delta / log_f), max_hue));
    };
  })();

  function animate() {
    const now = Date.now();
    const rdelta = Math.min(PI2 - speed, speed * (now - last.now));
    const rotation = (last.rotation + rdelta) % PI2;
    const tx = middle + radius * Math.cos(rotation);
    const ty = middle + radius * Math.sin(rotation);
    const bigArc = rdelta < Math.PI ? "0" : "1";
    const path = `M${tx} ${ty}A${radius} ${radius} 0 ${bigArc} 0 ${last.tx} ${last.ty}L${middle} ${middle}`;
    const hue = calcHue(rdelta / speed);

    $arcs[framePtr % frames].setAttribute("d", path);
    $arcs[framePtr % frames].setAttribute("fill", `hsl(${hue}, 80%, 40%)`);
    $hand.setAttribute("d", `M${middle} ${middle}L${tx} ${ty}`);
    $hand.setAttribute("stroke", `hsl(${hue}, 80%, 60%)`);

    for (let i = 0; i < frames; i++) {
      $arcs[(frames + framePtr - i) % frames].style.fillOpacity = 1 - i / frames;
    }

    framePtr++;
    last = { now, rotation, tx, ty };

    frame = window.requestAnimationFrame(animate);
  }

  animate();

  return function destroy() {
    if (frame) {
      window.cancelAnimationFrame(frame);
    }
    $root.remove();
  };
}
