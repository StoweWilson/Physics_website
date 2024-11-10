// Initialize arrays for x and y components of each vector
let xComponents = [], yComponents = [];

// Utility function to prompt the user and update the display in the terminal
function getInput(promptMessage) {
    return new Promise((resolve) => {
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML += `${promptMessage}\n`;

        const input = document.getElementById("input");
        const submitButton = document.getElementById("submit");

        const submitInput = () => {
            const userInput = input.value.trim();
            outputDiv.innerHTML += `> ${userInput}\n`;
            input.value = "";
            input.removeEventListener("keydown", handleEnterKey); // Remove listener
            resolve(userInput);
        };

        function handleEnterKey(event){
            if(event.key === "Enter"){
                event.preventDefault();
                submitInput();
            }
        }
        submitButton.onclick = submitInput;

        input.addEventListener("keydown", handleEnterKey);
    });
}

// Function to get vector magnitude and direction
async function getVector() {
    const magnitude = parseFloat(await getInput("Enter the vector magnitude:"));
    const angle = parseFloat(await getInput("Enter the vector direction in degrees (0° is east, 90° is north, 270° South):"));
    
    // Convert to x and y components
    const radians = angle * (Math.PI / 180); // Convert angle to radians
    const x = magnitude * Math.cos(radians);
    const y = magnitude * Math.sin(radians);
    
    xComponents.push(x);
    yComponents.push(y);
    
    return { magnitude, angle, x, y };
}

// Function to sum vector components and calculate resultant
function calculateResultant() {
    const sumX = xComponents.reduce((acc, x) => acc + x, 0);
    const sumY = yComponents.reduce((acc, y) => acc + y, 0);
    const resultantMagnitude = Math.sqrt(sumX ** 2 + sumY ** 2);
    const resultantAngle = Math.atan2(sumY, sumX) * (180 / Math.PI); // Convert back to degrees
    
    return { magnitude: resultantMagnitude, angle: resultantAngle, x: sumX, y: sumY };
}

// Main function to gather vector inputs
async function main() { 
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "Vector Addition Calculator\n";
    
    let addMoreVectors = "yes";
    while (addMoreVectors === "yes") {
        const vector = await getVector();
        outputDiv.innerHTML += `Vector: Magnitude = ${vector.magnitude}\n Direction = ${vector.angle}°\n Component X = ${vector.x.toFixed(2)}, Component Y = ${vector.y.toFixed(2)}\n`;
        
        addMoreVectors = (await getInput("Add another vector? (yes or no):")).toLowerCase();
    }
    
    // Calculate the resultant vector
    const resultant = calculateResultant();
    outputDiv.innerHTML += `\nResultant Vector:\nMagnitude: ${resultant.magnitude.toFixed(2)}\nDirection: ${resultant.angle.toFixed(2)}°\nComponents: (${resultant.x.toFixed(2)}, ${resultant.y.toFixed(2)})\n`;
}

// Run the main function when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    main();
});