document.addEventListener("DOMContentLoaded", async () => {
    await autoStartConversation();
});

const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");

const userId = "unique_user_id"; // Use a unique identifier
const API_URL = "http://127.0.0.1:8000/chat"; // Update if Flask is deployed remotely

async function autoStartConversation() {
    showTypingIndicator();
    
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, message: "" }),
        });

        const data = await response.json();
        hideTypingIndicator();

        if (data.response) {
            displayMessage(data.response, "ai", true);
        } else {
            displayMessage("⚠️ AI response error: No message received.", "ai");
        }
    } catch (error) {
        hideTypingIndicator();
        displayMessage("⚠️ AI is unavailable.", "ai");
        console.error("AI error:", error);
    }
}

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    displayMessage(userMessage, "user");
    userInput.value = ""; // Clear input
    await sendMessageToAI(userMessage);
});

async function sendMessageToAI(userMessage) {
    showTypingIndicator();

    try {
        console.log("Sending request to API:", API_URL);
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, message: userMessage }),
        });

        const data = await response.json();
        console.log("AI Response:", data);

        hideTypingIndicator();
        if (data.response) {
            displayMessage(data.response, "ai", true);
        } else {
            displayMessage("⚠️ AI response error: No message received.", "ai");
        }
    } catch (error) {
        hideTypingIndicator();
        displayMessage("⚠️ AI is currently unavailable. Try again later.", "ai");
        console.error("Fetch error:", error);
    }
}

function displayMessage(message, sender, isHTML = false) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    
    if (isHTML) {
        messageElement.innerHTML = message; // Render HTML response
    } else {
        messageElement.textContent = message;
    }

    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;

    // If AI response includes equations, render them with MathJax
    if (sender === "ai") {
        MathJax.typesetPromise([messageElement]).catch(err => console.error("MathJax error:", err));
    }
}

function showTypingIndicator() {
    if (!document.getElementById("typing-indicator")) {
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("typing-indicator");
        typingIndicator.id = "typing-indicator";
        typingIndicator.innerHTML = `<span>.</span><span>.</span><span>.</span>`;
        messages.appendChild(typingIndicator);
    }
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) typingIndicator.remove();
}