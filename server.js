const express = require("express");
const cors = require("cors");
const axios = require("axios"); // For HTTP requests to Flask API
const ollama = require("ollama"); // Ollama integration

const app = express();
app.use(express.json());
app.use(cors());

// Use an environment variable to toggle between Ollama and Flask API
const USE_FLASK_API = process.env.USE_FLASK_API === "true"; // Set this in your environment or Render settings
const FLASK_API_URL = process.env.FLASK_API_URL || "https://physics-website.onrender.com";

// Chat endpoint
app.post("/api/chat", async (req, res) => {
    const { message, user_id } = req.body;

    try {
        if (USE_FLASK_API) {
            // Forward the request to the Flask API
            const flaskResponse = await axios.post(FLASK_API_URL, {
                user_id: user_id || "default_user", // Default user if not provided
                message,
            });

            // Respond with Flask API's response
            return res.json(flaskResponse.data);
        } else {
            // Use Ollama directly
            const response = await ollama.chat({
                model: "llama3", // Ensure the model name is correct
                messages: [{ role: "user", content: message }],
                stream: true, // Enable streaming if supported
            });

            // Stream response back to the client
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.setHeader("Transfer-Encoding", "chunked");

            for await (const chunk of response) {
                res.write(chunk.message.content);
            }
            res.end();
        }
    } catch (error) {
        console.error("Error in /api/chat:", error.message);
        res.status(500).send("An error occurred while processing your request.");
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});