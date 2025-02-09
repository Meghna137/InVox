// Start voice recognition
document.getElementById("startVoiceRecognition").addEventListener("click", () => {
  alert("this is an alert");
  chrome.runtime.sendMessage({ command: "startVoiceRecognition" });
});