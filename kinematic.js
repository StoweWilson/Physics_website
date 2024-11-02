let questions = [];
let currentQuestionIndex = 0;

function askQuestion(question) {
    questions.push(question);
    displayQuestion(question);
}

function displayQuestion(question) {
    const output = document.getElementById("output");
    output.textContent += `> ${question}\n`;
    output.scrollTop = output.scrollHeight; // Scroll to the bottom
    document.getElementById("input").focus(); // Focus on the input field
}

function handleInput(userAnswer) {
    const output = document.getElementById("output");
    output.textContent += `You: ${userAnswer}\n`;
    output.scrollTop = output.scrollHeight; // Scroll to the bottom

    // Normalize user input for comparison
    const normalizedAnswer = userAnswer.toLowerCase();

    if (currentQuestionIndex === 0) {
        // Ask about constant acceleration
        if (normalizedAnswer === "yes" || normalizedAnswer === "y") {
            askQuestion("Enter the acceleration:");
            currentQuestionIndex++;
        } else {
            output.textContent += "Kinematic equations require constant acceleration. Ending program.\n";
            output.scrollTop = output.scrollHeight; // Scroll to the bottom
            resetCalculator(); // Reset the program
            return; // Stop processing further
        }
    } else if (currentQuestionIndex === 1) {
        // Handle acceleration input
        const acceleration = parseFloat(userAnswer);
        questions[0] = acceleration; // Store acceleration
        askQuestion("Does your problem have displacement (yes or no)?");
        currentQuestionIndex++;
    } else if (currentQuestionIndex === 2) {
        // Handle displacement
        if (normalizedAnswer === "yes" || normalizedAnswer === "y") {
            askQuestion("Enter the displacement:");
            currentQuestionIndex++;
        } else {
            questions.push(0); // No displacement
            // Move to the next question without asking again
            askQuestion("Does your problem have initial velocity (yes or no)?");
            currentQuestionIndex++;
        }
    } else if (currentQuestionIndex === 3) {
        // Handle displacement input
        const displacement = parseFloat(userAnswer);
        questions[1] = displacement; // Store displacement
        if (normalizedAnswer === "yes" || normalizedAnswer === "y") {
            askQuestion("Enter the initial velocity:");
            currentQuestionIndex++;
        } else {
            questions.push(0); // No initial velocity
            // Move to the next question without asking again
            askQuestion("Does your problem have final velocity (yes or no)?");
            currentQuestionIndex++;
        }
    } else if (currentQuestionIndex === 4) {
        // Handle initial velocity
        if (normalizedAnswer === "yes" || normalizedAnswer === "y") {
            askQuestion("Enter the initial velocity:");
            currentQuestionIndex++;
        } else {
            questions.push(0); // No initial velocity
            // Move to the next question without asking again
            askQuestion("Does your problem have final velocity (yes or no)?");
            currentQuestionIndex++;
        }
    } else if (currentQuestionIndex === 5) {
        // Handle initial velocity input
        const initialVelocity = parseFloat(userAnswer);
        questions[2] = initialVelocity; // Store initial velocity
        askQuestion("Does your problem have final velocity (yes or no)?");
        currentQuestionIndex++;
    } else if (currentQuestionIndex === 6) {
        // Handle final velocity
        if (normalizedAnswer === "yes" || normalizedAnswer === "y") {
            askQuestion("Enter the final velocity:");
            currentQuestionIndex++;
        } else {
            questions.push(0); // No final velocity
            // Move to the next question without asking again
            askQuestion("Does your problem have time (yes or no)?");
            currentQuestionIndex++;
        }
    } else if (currentQuestionIndex === 7) {
        // Handle final velocity input
        const finalVelocity = parseFloat(userAnswer);
        questions[3] = finalVelocity; // Store final velocity
        askQuestion("Does your problem have time (yes or no)?");
        currentQuestionIndex++;
    } else if (currentQuestionIndex === 8) {
        // Handle time
        if (normalizedAnswer === "yes" || normalizedAnswer === "y") {
            askQuestion("Enter the time:");
            currentQuestionIndex++;
        } else {
            questions.push(0); // No time
            processResults();
        }
    } else if (currentQuestionIndex === 9) {
        // Handle time input
        const time = parseFloat(userAnswer);
        questions[4] = time; // Store time
        processResults();
    }
}

function processResults() {
    // Process the input values and output results
    const [acceleration, displacement, initialVelocity, finalVelocity, time] = questions;
    let resultMessage = "";

    // Implement your calculation logic here
    // Example:
    resultMessage += `Acceleration: ${acceleration}\n`;
    resultMessage += `Displacement: ${displacement}\n`;
    resultMessage += `Initial Velocity: ${initialVelocity}\n`;
    resultMessage += `Final Velocity: ${finalVelocity}\n`;
    resultMessage += `Time: ${time}\n`;

    const output = document.getElementById("output");
    output.textContent += resultMessage;

    // Reset the program for a new calculation
    resetCalculator();
}

function resetCalculator() {
    questions = [];
    currentQuestionIndex = 0;
    displayQuestion("Does your problem have constant acceleration (yes or no)?");
}

// Event listeners for input submission
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const submitButton = document.getElementById("submit");

    submitButton.addEventListener("click", () => {
        const userAnswer = input.value.trim();
        if (userAnswer) {
            handleInput(userAnswer);
            input.value = ""; // Clear the input field
        }
    });

    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const userAnswer = input.value.trim();
            if (userAnswer) {
                handleInput(userAnswer);
                input.value = ""; // Clear the input field
            }
        }
    });

    // Start the program
    resetCalculator();
});