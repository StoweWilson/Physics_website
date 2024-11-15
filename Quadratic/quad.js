let a = 0, b = 0 , c= 0;
let outputDiv;
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

async function quad(){
    let a_choice;
    while (true){
        a_choice = await getInput("Does your equation have an a (yes or no)");
        if(a_choice === "yes"){
            a = parseFloat(await getInput(" Enter your a:"));
            break;
        } else if (a_choice == "no") {
            a = 0;
            break;
        } else {
            await getInput("Invaild input. Please enter 'yes' or 'no");
        }
        
    }
    let b_choice;
    while(true){
        b_choice = await getInput("does your equation have an b (yes or no)");
        if(a_choice === "yes"){
            b = parseFloat(await getInput(" Enter your b:"));
            break;
        } else if (b_choice == "no") {
            b = 0;
            break;
        } else {
            await getInput("Invaild input. Please enter 'yes' or 'no");
        }
    }
    let c_choice;
    while(true){
    c_choice = await getInput("does your equation have an c (yes or no)");
        if(c_choice === "yes"){
            c = parseFloat(await getInput(" Enter your c:"));
            break;
        } else if (c_choice == "no") {
            c = 0;
            break; 
        } else {
            await getInput("Invaild input. Please enter 'yes' or 'no");
        }
    }
}

async function Solve(){
    
    let op_1,op_2;

    const top = Math.pow(b,2) - ( 4 * a * c);
    if(top < 0){
        outputDiv.innerHTML += `No real solutions for the equation.\n`;
        return;
    }

    op_1 = (-b - Math.sqrt(top))/(a*2);
    op_2 = (-b + Math.sqrt(top))/(a*2);

    outputDiv.innerHTML += `The solutions are: x = ${op_1}, x = ${op_2}\n`;
}

async function main() { 
    outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "Quadratic Calculator 1.0\n";

    await quad();
    await Solve();
    
}

// Run the main function when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    main();
});