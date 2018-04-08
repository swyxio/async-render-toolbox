// Called when the user clicks on the browser action. (the little icon thing on the top right)
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!

  chrome.tabs.executeScript({
    file: "injectAsyncRenderToolbox.js"
  });
  chrome.tabs.insertCSS({
    file: "injectAsyncRenderToolbox.css"
  });
  // chrome.tabs.executeScript({
  //   file: "static/js/main.js" // inject our react app
  // });
  // chrome.storage.local.get(["injectAsyncRenderToolbox"], function(result) {
  //   // i cant figure out how to kill after injecting so leaving this commented out for now
  //   // resources used
  //   // https://medium.com/front-end-hacking/how-do-chrome-extensions-modify-webpages-using-content-scripts-9ae278e2bdf8
  //   // https://stackoverflow.com/questions/20010623/turn-on-and-off-chrome-extension
  //   const isOn = result.injectAsyncRenderToolbox;
  //   console.log("Value currently is " + isOn);
  //   if (isOn) {
  //     // kill the thing somehow
  //   } else {
  //     chrome.tabs.executeScript({
  //       file: "injectAsyncRenderToolbox.js"
  //     });
  //     chrome.tabs.insertCSS({
  //       file: "injectAsyncRenderToolbox.css"
  //     });
  //   }
  //   chrome.storage.local.set({ injectAsyncRenderToolbox: !isOn }, function() {
  //     console.log("toggled value to " + !isOn);
  //   });

  // });
});
