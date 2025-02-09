// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "processVoiceCommand") {
    console.log("Processing voice command:", request.text);
    processVoiceCommand(request.text);
  }
});

// Process voice commands
function processVoiceCommand(text) {
  const command = text.toLowerCase();
  console.log("Command received:", command);

  if (command.includes("compose")) {
    composeMail();
  } else if (command.includes("read")) {
    readLatestEmail();
  } else if (command.includes("send")) {
    sendMail();
  } else {
    speak("Command not recognized.");
  }
}

// Compose a new mail
function composeMail() {
  setTimeout(() => {
    const composeButton = document.querySelector('[gh="cm"]');
    console.log("Compose button:", composeButton); // Debugging

    if (composeButton) {
      composeButton.click();
      console.log("Compose button clicked.");
      speak("Compose mail window opened.");
    } else {
      console.error("Compose button not found.");
      speak("Failed to open compose window.");
    }
  }, 2000); // Wait 2 seconds for the page to load
}

// Read the latest email
function readLatestEmail() {
  setTimeout(() => {
    const latestEmail = document.querySelector(".zA.zE .yP");
    console.log("Latest email element:", latestEmail); // Debugging

    if (latestEmail) {
      const emailText = latestEmail.innerText;
      console.log("Latest email text:", emailText); // Debugging
      speak("Latest email: " + emailText);
    } else {
      console.error("No emails found.");
      speak("No emails found.");
    }
  }, 2000); // Wait 2 seconds for the page to load
}

// Send the composed mail
function sendMail() {
  setTimeout(() => {
    const sendButton = document.querySelector('[aria-label="Send ‪(Ctrl-Enter)‬"]');
    console.log("Send button:", sendButton); // Debugging

    if (sendButton) {
      sendButton.click();
      console.log("Send button clicked.");
      speak("Mail sent.");
    } else {
      console.error("Send button not found.");
      speak("Failed to send mail.");
    }
  }, 2000); // Wait 2 seconds for the page to load
}

// Text-to-speech function
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US"; // Set language to English
  window.speechSynthesis.speak(utterance);
}

// Helper function to wait for an element to appear in the DOM
function waitForElement(selector, callback) {
  const interval = setInterval(() => {
    const element = document.querySelector(selector);
    if (element) {
      clearInterval(interval);
      callback(element);
    }
  }, 500); // Check every 500ms
}