// document.getElementById('speak').addEventListener('click', function () {
//     // const text = document.getElementById('text').value;
//     // const utterance = new SpeechSynthesisUtterance(text);
//     // speechSynthesis.speak(utterance);
    
//     let text = "";

//     if (window.getSelection) {
//         text = window.getSelection().toString();
//     } else if (document.selection && document.selection.type != "Control") {
//         text = document.selection.createRange().text;
//     }

//     let msg = new SpeechSynthesisUtterance();
//     const voices = window.speechSynthesis.getVoices();
//     const lang = "ar";
//     msg.voice = voices.find(voice => voice.lang === lang); // Find an Arabic voice
//     msg.lang = lang;
//     msg.text = text;
//     window.speechSynthesis.speak(msg);
// });


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "read-arabic",
    title: "Read Arabic Text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "read-arabic") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: readArabicFromSelection
    });
  }
});

// function readArabicFromSelection() {
//   const selectedText = window.getSelection().toString();
//   const arabicRegex = /[\u0600-\u06FF]+/g;
//   const arabicOnly = selectedText.match(arabicRegex)?.join(" ");

//   if (arabicOnly) {
//     const utterance = new SpeechSynthesisUtterance(arabicOnly);
//     utterance.lang = "ar-SA"; // You can change to "ar-EG", "ar-AE", etc.
//     speechSynthesis.speak(utterance);
//   } else {
//     alert("No Arabic text selected.");
//   }
// }
function readArabicFromSelection() {
  const selectedText = window.getSelection().toString();
  const arabicRegex = /[\u0600-\u06FF]+/g;
  const arabicOnly = selectedText.match(arabicRegex)?.join(" ");

  if (arabicOnly) {
    const utterance = new SpeechSynthesisUtterance(arabicOnly);
    const voices = speechSynthesis.getVoices();

    // Try to pick a natural Arabic voice
    const preferredVoice = voices.find(v => v.lang.startsWith("ar"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    } else {
      utterance.lang = "ar-SA"; // Fallback
    }

    speechSynthesis.speak(utterance);
  } else {
    alert("No Arabic text selected.");
  }
}
