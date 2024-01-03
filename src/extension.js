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
  const downcasedBody = composeBody?.toLowerCase() || "";
  dumbPhrases.forEach((phrase) => {
    if (downcasedBody.includes(phrase)) {
      gmail.tools.infobox(`found dumb phrase: "${phrase}"`);
    }
  });
}

const dumbPhrases = [
  "circle back",
  "circling back",
  "touch base",
  "ping",
  "quick question",
  "quick q",
  "just checking in",
  "pick your brain",
  "let's sync",
  "disrupt",
];
