// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "startVoiceRecognition") {
    startVoiceRecognition();
  }
});

// Start voice recognition
function startVoiceRecognition() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    console.log("You said:", voiceText);
    // Send the recognized text to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { command: "processVoiceCommand", text: voiceText });
    });
  };

  recognition.start();
}