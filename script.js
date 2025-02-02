const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");

const userId = "unique_user_id"; // Replace with a unique identifier for each user 

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
        const response = await fetch("https://physics-website.onrender.com/chat", {
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
        messageElement.innerHTML = formatAIResponse(message);
    } else {
        // Plain user message
        messageElement.textContent = message;
    }

    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight; 

    // Trigger MathJax to render LaTeX
    if (sender === "ai") {
        MathJax.typesetPromise([messageElement]).catch(err => console.error(err));
    }
}

function formatAIResponse(response) {
    const paragraphs = response.split("\n").filter(line => line.trim() !== ""); 
    let formattedResponse = '<div class="ai-response">';

    paragraphs.forEach((paragraph) => {
        // Step headers
        if (paragraph.startsWith("Step")) {
            formattedResponse += `<p class="step-header">${paragraph.trim()}</p>`;
        }
        // Bullet points
        else if (paragraph.startsWith("*")) {
            const bulletPoints = paragraph.split("\n").map(line => line.replace("*", "").trim());
            const listItems = bulletPoints.map(item => `<li>${item}</li>`).join("");
            formattedResponse += `<ul>${listItems}</ul>`;
        }
        // Summary section
        else if (paragraph.startsWith("Summary")) {
            formattedResponse += `<p class="summary-header"><strong>${paragraph.trim()}</strong></p>`;
        }
        // Equations
        else if (paragraph.includes("$")) {
            formattedResponse += `<p class="equation">${paragraph.trim()}</p>`;
        }
        // Plain text
        else {
            formattedResponse += `<p>${paragraph.trim()}</p>`;
        }
    });

    formattedResponse += "</div>";
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

async function sendMessage(userMessage) {
    try {
        const response = await fetch("https://physics-website.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userMessage,
                user_id: "default_user"
            })
        });

        const data = await response.json();
        console.log("AI Response:", data.response); // Display response in console

        // If you have a chat UI, update it here:
        document.getElementById("chat-form").innerHTML += `<p><strong>AI:</strong> ${data.response}</p>`;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Example usage when user submits a message
document.getElementById("sendButton").addEventListener("click", function() {
    const userInput = document.getElementById("userMessage").value;
    sendMessage(userInput);
});