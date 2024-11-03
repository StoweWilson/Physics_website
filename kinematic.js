// JavaScript version of the C++ Kinematic Calculator

// Initialize the variables
let dis = 0, acc = 0, vi = 0, vf = 0, t = 0;

// Utility function to prompt the user and update the display in the terminal
function getInput(promptMessage) {
    return new Promise((resolve) => {
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML += `${promptMessage}\n`;

        const input = document.getElementById("input");
        const submitButton = document.getElementById("submit");

        submitButton.onclick = () => {
            const userInput = input.value.trim();
            outputDiv.innerHTML += `> ${userInput}\n`;
            input.value = "";
            resolve(userInput.toLowerCase());
        };
    });
}

// Function to get distance input
async function findDistance() {
    let dis_choice;
    while (true) {
        dis_choice = await getInput("Does your problem have distance (yes or no)?");
        if (dis_choice === "yes") {
            dis = parseFloat(await getInput("Enter the distance between two points:"));
            break;
        } else if (dis_choice === "no") {
            dis = 0;
            break;
        } else {
            await getInput("Invalid input. Please enter 'yes' or 'no'.");
        }
    }
}

// Function to get acceleration input
async function findAcc() {
    let acc_choice;
    while (true) {
        acc_choice = await getInput("Does your problem have constant acceleration (yes or no)?");
        if (acc_choice === "yes") {
            acc = parseFloat(await getInput("Enter the acceleration:"));
            break;
        } else if (acc_choice === "no") {
            acc = 0;
            break;
        } else {
            await getInput("Invalid input. Please enter 'yes' or 'no'.");
        }
    }
}

// Function to get initial and final velocity input
async function findVelocity() {
    let velocityi_choice, velocityf_choice;

    while (true) {
        velocityi_choice = await getInput("Does your problem have initial velocity (yes or no)?");
        if (velocityi_choice === "yes") {
            vi = parseFloat(await getInput("Enter the initial velocity:"));
            break;
        } else if (velocityi_choice === "no") {
            vi = 0;
            break;
        } else {
            await getInput("Invalid input. Please enter 'yes' or 'no'.");
        }
    }

    while (true) {
        velocityf_choice = await getInput("Does your problem have final velocity (yes or no)?");
        if (velocityf_choice === "yes") {
            vf = parseFloat(await getInput("Enter the final velocity:"));
            break;
        } else if (velocityf_choice === "no") {
            vf = 0;
            break;
        } else {
            await getInput("Invalid input. Please enter 'yes' or 'no'.");
        }
    }
}

// Function to get time input
async function findTime() {
    let time_choice;
    while (true) {
        time_choice = await getInput("Does your problem have time (yes or no)?");
        if (time_choice === "yes") {
            t = parseFloat(await getInput("Enter the time:"));
            break;
        } else if (time_choice === "no") {
            t = 0;
            break;
        } else {
            await getInput("Invalid input. Please enter 'yes' or 'no'.");
        }
    }
}

// Main function to gather inputs
async function main() {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "Physics Kinematic Calculator 1.0\n";

    await findDistance();
    await findAcc();
    await findVelocity();
    await findTime();

    outputDiv.innerHTML += `\nYour Inputs:\nDistance: ${dis}\nAcceleration: ${acc}\nInitial Velocity: ${vi}\nFinal Velocity: ${vf}\nTime: ${t}\n`;
}

// Run the main function when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    main();
});