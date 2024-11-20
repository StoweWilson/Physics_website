// Initialize the variables
let dis = 0, acc = 0, vi = 0, vf = 0, t = 0;

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
            resolve(userInput.toLowerCase());
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

// Function to get acceleration input
async function findAcc() {
    let acc_choice;
    while (true) {
        acc_choice = await getInput("Does your problem have constant acceleration (yes or no)?");
        if (acc_choice === "yes") {
            acc = parseFloat(await getInput("Enter the acceleration:"));
            break;
        } else if (acc_choice === "no") {
            acc = parseFloat(await getInput("Enter the acceleration (if known):"));
            break;
        } else {
            await getInput("Invalid input. Please enter 'yes' or 'no'.");
        }
    }
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

// Function to calculate the missing kinematic quantities
async function calculateKinematicQuantities() {
    const outputDiv = document.getElementById("output");
    let find_choice, no_find;

    // Prompt for what the user wants to find and what they don't want to find
    find_choice = (await getInput("What is your problem trying to find? (d, a, vf, t, vi)")).trim().toLowerCase();
    no_find = (await getInput("What is your problem NOT trying to find? (d, a, vf, t, vi)")).trim().toLowerCase();

    // Solve for Distance (d)
    if (find_choice === "d") {
        if (no_find === "a") {
            dis = (vi * t) + (0.5 * acc * t * t);
            outputDiv.innerHTML += `Equation: D = ViT + 1/2AT^2\n`;
            outputDiv.innerHTML += `Calculated Distance: ${dis}\n`;
        } else if (no_find === "vf") {
            dis = (vf * t) - (0.5 * acc * t * t);
            outputDiv.innerHTML += `Equation: D = VfT - 1/2AT^2\n`;
            outputDiv.innerHTML += `Calculated Distance: ${dis}\n`;
        } else if (no_find === "vi") {
            dis = (vf * t) - (0.5 * acc * t * t);
            outputDiv.innerHTML += `Equation: D = VfT - 1/2AT^2\n`;
            outputDiv.innerHTML += `Calculated Distance: ${dis}\n`;
        } else if (no_find === "t") {
            dis = ((vf * vf) - (vi * vi)) / (2 * acc);
            outputDiv.innerHTML += `Equation: D = (Vf^2 - Vi^2) / 2A\n`;
            outputDiv.innerHTML += `Calculated Distance: ${dis}\n`;
        } else {
            outputDiv.innerHTML += `Not enough information given.\n`;
        }
    }

    // Solve for Final Velocity (vf)
    else if (find_choice === "vf") {
        if (no_find === "d") {
            vf = vi + (acc * t);
            outputDiv.innerHTML += `Equation: Vf = Vi + AT\n`;
            outputDiv.innerHTML += `Calculated Final Velocity: ${vf}\n`;
        } else if (no_find === "t") {
            vf = Math.sqrt((vi * vi) + (2 * acc * dis));
            outputDiv.innerHTML += `Equation: Vf^2 = Vi^2 + 2AD\n`;
            outputDiv.innerHTML += `Calculated Final Velocity: ${vf}\n`;
        } else if (no_find === "a") {
            vf = (dis / t) - (0.5 * acc * t);
            outputDiv.innerHTML += `Equation: Vf = (D / T) - (0.5AT)\n`;
            outputDiv.innerHTML += `Calculated Final Velocity: ${vf}\n`;
        } else if (no_find === "vi") {
            vf = dis / t + (0.5 * acc * t);
            outputDiv.innerHTML += `Equation: Vf = D / T + 0.5AT\n`;
            outputDiv.innerHTML += `Calculated Final Velocity: ${vf}\n`;
        } else {
            outputDiv.innerHTML += `Not enough information given.\n`;
        }
    }

    // Solve for Time (t)
    else if (find_choice === "t") {
        if (no_find === "d") {
            t = (vf - vi) / acc;
            outputDiv.innerHTML += `Equation: T = (Vf - Vi) / A\n`;
            outputDiv.innerHTML += `Calculated Time: ${t}\n`;
        } else if (no_find === "vf") {
            t = Math.sqrt(2 * dis / acc);
            outputDiv.innerHTML += `Equation: T = √(2D / A)\n`;
            outputDiv.innerHTML += `Calculated Time: ${t}\n`;
        } else if (no_find === "vi") {
            t = dis / (0.5 * acc * t);
            outputDiv.innerHTML += `Equation: T = 2D / (Vi + Vf)\n`;
            outputDiv.innerHTML += `Calculated Time: ${t}\n`;
        } else {
            outputDiv.innerHTML += `Not enough information given.\n`;
        }
    }

    // Solve for Acceleration (a)
    else if (find_choice === "a") {
        if (no_find === "d") {
            acc = (vf - vi) / t;
            outputDiv.innerHTML += `Equation: A = (Vf - Vi) / T\n`;
            outputDiv.innerHTML += `Calculated Acceleration: ${acc}\n`;
        } else if (no_find === "vf") {
            acc = (dis - (vi * t)) / (0.5 * t * t);
            outputDiv.innerHTML += `Equation: A = (D - ViT) / (0.5T^2)\n`;
            outputDiv.innerHTML += `Calculated Acceleration: ${acc}\n`;
        } else if (no_find === "vi") {
            acc = (dis - (vf * t)) / (0.5 * t * t);
            outputDiv.innerHTML += `Equation: A = (D - VfT) / (0.5T^2)\n`;
            outputDiv.innerHTML += `Calculated Acceleration: ${acc}\n`;
        } else {
            outputDiv.innerHTML += `Not enough information given.\n`;
        }
    }

    // Solve for Initial Velocity (vi)
    else if (find_choice === "vi") {
        if (no_find === "d") {
            vi = vf - (acc * t);
            outputDiv.innerHTML += `Equation: Vi = Vf - AT\n`;
            outputDiv.innerHTML += `Calculated Initial Velocity: ${vi}\n`;
        } else if (no_find === "vf") {
            vi = dis / t - (0.5 * acc * t);
            outputDiv.innerHTML += `Equation: Vi = D / T - 0.5AT\n`;
            outputDiv.innerHTML += `Calculated Initial Velocity: ${vi}\n`;
        } else if (no_find === "a") {
            vi = (dis / t) - (0.5 * acc * t);
            outputDiv.innerHTML += `Equation: Vi = (D / T) - 0.5AT\n`;
            outputDiv.innerHTML += `Calculated Initial Velocity: ${vi}\n`;
        } else {
            outputDiv.innerHTML += `Not enough information given.\n`;
        }
    }

    // If no known choice was made
    else {
        outputDiv.innerHTML += `Please enter a valid option. Choices: d, a, vf, t, vi\n`;
    }
}

// Initialize the input prompt and start solving kinematic problem
async function startKinematicProblem() {
    await getInput("Welcome to the Kinematic Equation Solver. Please enter 'start' to begin.");
    await findAcc();
    await findDistance();
    await findVelocity();
    await findTime();
    await calculateKinematicQuantities();
}

startKinematicProblem();