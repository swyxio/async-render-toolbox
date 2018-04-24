// Called when the user clicks on the browser action. (the little icon thing on the top right)
chrome.browserAction.onClicked.addListener(function (tab) {
  // No tabs or host permissions needed!

  chrome.tabs.executeScript({
    file: "injectAsyncRenderToolbox.js"
  });
  chrome.tabs.insertCSS({
    file: "injectAsyncRenderToolbox.css"
  });
});
