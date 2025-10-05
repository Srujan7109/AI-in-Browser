// Step 1: Import the pipeline function from the library URL
import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1";

const messageList = document.getElementById("message-list");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const statusBar = document.getElementById("status-bar");

let generator = null;

(async () => {
  try {
    statusBar.textContent = "Loading model, please wait...";

    // Step 2: Call the imported pipeline function directly
    generator = await pipeline(
      "text2text-generation",
      "Xenova/LaMini-Flan-T5-77M"
    );

    statusBar.textContent = "Model loaded. Ready to chat!";
  } catch (error) {
    console.error("Error loading model:", error);
    statusBar.textContent = "Failed to load the AI model.";
  }
})();

function addMessage(text, sender) {
  const li = document.createElement("li");
  li.textContent = text;
  li.classList.add("message", sender);
  messageList.appendChild(li);
  messageList.scrollTop = messageList.scrollHeight;
}

async function handleSendMessage() {
  const text = messageInput.value.trim();
  if (!generator) {
    addMessage("The AI model is still loading, please wait.", "bot");
    return;
  }
  if (text === "") return;
  addMessage(text, "user");
  messageInput.value = "";
  addMessage("Thinking...", "bot");
  try {
    const output = await generator(text, { max_new_tokens: 100 });
    const botResponse = output[0].generated_text;
    messageList.lastChild.remove();
    addMessage(botResponse, "bot");
  } catch (error) {
    console.error("Error during generation: ", error);
    messageList.lastChild.remove();
    addMessage("Sorry, I encountered an error.", "bot");
  }
}

sendButton.addEventListener("click", handleSendMessage);
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSendMessage();
  }
});
/*
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "ServiceWorker registration successful: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed: ", error);
      });
  });
}*/
