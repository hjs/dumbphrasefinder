"use strict";

// loader-code: wait until gmailjs has finished loading, before triggering actual extension-code.
const loaderId = setInterval(() => {
  if (!window._gmailjs) {
    return;
  }

  clearInterval(loaderId);
  startExtension(window._gmailjs);
}, 100);

// actual extension-code
function startExtension(gmail) {
  window.gmail = gmail;

  gmail.observe.on("load", () => {
    gmail.observe.on("compose", (compose) => {
    });
  });
}
