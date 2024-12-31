const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");

const userId = "unique_user_id"; // Replace with a unique identifier for each user (e.g., session ID)

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display user message
    const userMessageElement = document.createElement("div");
    userMessageElement.textContent = `You: ${userMessage}`;
    messages.appendChild(userMessageElement);

    // Clear input field
    userInput.value = "";

    // Send user message to the backend
    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId, message: userMessage }),
        });

        const data = await response.json();
        const aiResponse = data.response || "Error in AI response";

        // Render the AI response with Markdown
        const aiMessageElement = document.createElement("div");
        aiMessageElement.innerHTML = marked.parse(aiResponse); // Convert Markdown to HTML
        messages.appendChild(aiMessageElement);

        // Scroll to the bottom
        messages.scrollTop = messages.scrollHeight;
    } catch (error) {
        console.error("Error contacting AI:", error);
    }
});