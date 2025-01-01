const express = require("express");
const cors = require("cors");

// Import Ollama (adjust this if the import path or method differs)
const ollama = require("ollama");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    try {
        // Ensure the model is properly configured
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
    } catch (error) {
        console.error("Error in Ollama chat:", error.message);
        res.status(500).send("An error occurred while communicating with Ollama.");
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});