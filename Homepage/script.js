const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");

const userId = "unique_user_id"; // Replace with a unique identifier for each user (e.g., session ID)

// Auto-start conversation
document.addEventListener("DOMContentLoaded", async () => {
    showTypingIndicator();

    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId, message: "" }),
        });

        const data = await response.json();
        hideTypingIndicator();

        const aiResponse = data.response || "Hello! How can I assist you with physics today?";
        displayMessage(aiResponse, "ai");
    } catch (error) {
        hideTypingIndicator();
        console.error("Error contacting AI:", error);
    }
});

// Handle form submission for user input
chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display user message
    displayMessage(userMessage, "user");

    // Clear input field
    userInput.value = "";

    showTypingIndicator();

    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId, message: userMessage }),
        });

        const data = await response.json();
        hideTypingIndicator();

        const aiResponse = data.response || "Error in AI response";
        displayMessage(aiResponse, "ai");
    } catch (error) {
        hideTypingIndicator();
        console.error("Error contacting AI:", error);
    }
});

function displayMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);

    if (sender === "ai") {
        // Format the AI response, preserving LaTeX math
        messageElement.innerHTML = formatAIResponse(message);
    } else {
        // Plain user message
        messageElement.textContent = message;
    }

    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight; // Scroll to the bottom

    // Trigger MathJax to render LaTeX
    if (sender === "ai") {
        MathJax.typesetPromise([messageElement]).catch(err => console.error(err));
    }
}

function formatAIResponse(response) {
    const sections = response.split(/\*\*(.*?)\*\*/); // Split by bold markers
    let formattedResponse = "";

    sections.forEach((section, index) => {
        if (index % 2 === 1) {
            // Bold section header
            formattedResponse += `<p><strong>${section.trim()}</strong></p>`;
        } else {
            // Check for LaTeX math and format it
            const latexRegex = /\$.*?\$/g; // Match LaTeX math expressions
            const processedText = section.replace(latexRegex, match => {
                return `<span class="math">${match}</span>`;
            });
            formattedResponse += `<p>${processedText.trim()}</p>`;
        }
    });

    return formattedResponse;
}

// Function to show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");
    typingIndicator.id = "typing-indicator";
    typingIndicator.innerHTML = `<span>.</span><span>.</span><span>.</span>`;
    messages.appendChild(typingIndicator);
    messages.scrollTop = messages.scrollHeight;
}

// Function to hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) typingIndicator.remove();
}