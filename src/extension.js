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
      let composeDomElement = compose.dom("body")[0];
      composeDomElement.addEventListener("keydown", () => {
        let composeBody = compose.body();
        analyzeBody(composeBody);
      });
    });
  });
}

function analyzeBody(composeBody) {
  dumbPhrases.forEach((phrase) => {
    if (composeBody.includes(phrase)) {
      // TODO: show this in the email or a popup
      console.log("found dumb phrase: " + phrase);
    }
  });
}

const dumbPhrases = [
  "circle back",
  "touch base",
  "ping",
  "check in",
  "check-in",
  "checkin",
  "quick question",
  "quick q",
];
