const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files (HTML, JS)
app.use(express.static(__dirname));

// Route to handle form submission
app.post("/submit-survey", (req, res) => {
    const { name, feed } = req.body;

    if (!name || !feed) {
        return res.status(400).send("Invalid input");
    }

    const data = `${name},${feed}\n`;

    // Append data to the CSV file
    fs.appendFile("survey_data.csv", data, (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).send("Failed to save data");
        }
        res.send("Data saved successfully");
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});