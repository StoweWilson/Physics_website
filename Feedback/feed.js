document.getElementById("surveyForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const nameField = document.getElementById("name");
    const feedbackField = document.getElementById("feed");
    const errorText = document.getElementById("errorText");

    const name = nameField.value.trim();
    const feed = feedbackField.value.trim();

    // Validate name input
    const Regex = /^[A-Za-z ]+$/;
    if (!name.match(Regex)) {
        nameField.classList.add("error");
        errorText.innerHTML = "Name field should only contain English alphabets and spaces";
        errorText.classList.add("errorText");
        return;
    }

    // Clear any previous error styles
    nameField.classList.remove("error");
    errorText.classList.remove("errorText");

    // Update the status message
    errorText.innerHTML = "Submitting...";
    errorText.classList.add("successText");

    // Prepare the form data to send to the backend
    const formData = { name, feed };

    try {
        // Send POST request to the backend
        const response = await fetch("/submit-survey", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            errorText.innerHTML = "Submitted Successfully!";
            document.getElementById("surveyForm").reset();
        } else {
            const error = await response.text();
            errorText.innerHTML = `Submission Failed: ${error}`;
        }
    } catch (err) {
        console.error("Error submitting form:", err);
        errorText.innerHTML = "An error occurred while submitting the form. Please try again.";
    }
});