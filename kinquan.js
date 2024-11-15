async function calculateKinematicQuantities() {
    const outputDiv = document.getElementById("output");
    let find_choice;
    let no_find;
    find_choice = (await getInput("what is your problem trying to find (d,a,vf,t,vi):")).trim().toLowerCase();
    no_find = (await getInput("what is your problem NOT trying to find (d,a,vf,t,vi):")).trim().toLowerCase();

    if (find_choice === "d"){
        if(no_find === "a"){
            d = (.5 * (vi + vf) * t);
             outputDiv.innerHTML += `Equation: D = 1/2(Vi + Vf)T \n`;
             outputDiv.innerHTML += `Calculated Final Distance: ${d}\n`;
        }else if (no_find === "vf"){
            d = (vi * t) + ((.5 * a) * (t * t));
            outputDiv.innerHTML += `Equation: D = ViT + 1/2AT^2 \n`;
            outputDiv.innerHTML += `Calculated Final Distance: ${d}\n`;
        }else if(no_find === "vi"){
            d = (vf * t) - ((.5 * a)* (t * t));
            outputDiv.innerHTML += `Equation: D = VfT - 1/2AT^2 \n`;
            outputDiv.innerHTML += `Calculated Final Distance: ${d}\n`;
        }else if (no_find === "t"){
            d = ((vf * vf)-(vi *vi))/(2*a);
            outputDiv.innerHTML += `Equation: Vf^2 = Vi^2 + 2aD \n`;
            outputDiv.innerHTML += `Calculated Final Distance: ${d}\n`;
        }else{
            outputDiv.innerHTML += `Not engough information Given\n`;
        }
    
    }else if (find_choice === "vf"){
        if(no_find === "d"){
            vf = vi + (a*t);
            outputDiv.innerHTML += `Equation: Vf = Vi + AT \n`;
            outputDiv.innerHTML += `Calculated Final Velocity: ${vf}\n`;
        }else if(no_find == "t"){
            vf = math.sqrt(((vi *vi)+ ((2 *a)*d)));
            outputDiv.innerHTML += `Equation: Vf^2 = Vi^2  + 2AD \n`;
            outputDiv.innerHTML += `Calculated Final Velocity: ${vf}\n`;
        }else if (no_find === "a"){
            vf = ((2* d)/t) - vi;
            outputDiv.innerHTML += `Equation: Equation: D = 1/2(Vi + Vf)T \n`;
            outputDiv.innerHTML += `Calculated Final Velocity: ${vf}\n`;
        }else if(no_find == "vi"){
            vf = (d/t)+ ((.5 *a)*t);
            outputDiv.innerHTML += `Equation: Equation: D = VfT - 1/2AT^2 \n`;
            outputDiv.innerHTML += `Calculated Final Velocity: ${vf}\n`;
        }else{
            outputDiv.innerHTML += `Not engough information Given\n`;
        }
    }else if (find_choice === "t") {
        if (no_find === "d") {
            t = (vf - vi) / a;
            outputDiv.innerHTML += `Equation: T = (Vf - Vi) / A \n`;
            outputDiv.innerHTML += `Calculated Time: ${t}\n`;
        } else if (no_find === "vf") {
            t = Math.sqrt((2 * d) / a);
            outputDiv.innerHTML += `Equation: T = √(2D/A) \n`;
            outputDiv.innerHTML += `Calculated Time: ${t}\n`;
        } else if (no_find === "vi") {
            t = (2 * d) / (vi + vf);
            outputDiv.innerHTML += `Equation: T = 2D / (Vi + Vf) \n`;
            outputDiv.innerHTML += `Calculated Time: ${t}\n`;
        } else if (no_find === "a") {
            t = (2 * d) / (vi + vf); // Using D = 1/2(Vi + Vf)T
            outputDiv.innerHTML += `Equation: T = 2D / (Vi + Vf) \n`;
            outputDiv.innerHTML += `Calculated Time: ${t}\n`;
        } else {
            outputDiv.innerHTML += `Not enough information Given\n`;
        }
    } else if (find_choice === "a") {
        if (no_find === "d") {
            a = (vf - vi) / t;
            outputDiv.innerHTML += `Equation: A = (Vf - Vi) / T \n`;
            outputDiv.innerHTML += `Calculated Acceleration: ${a}\n`;
        } else if (no_find === "vf") {
            a = (d - vi * t) / (0.5 * t * t);
            outputDiv.innerHTML += `Equation: A = (D - ViT) / (0.5T^2) \n`;
            outputDiv.innerHTML += `Calculated Acceleration: ${a}\n`;
        } else if (no_find === "vi") {
            a = (d - vf * t) / (0.5 * t * t);
            outputDiv.innerHTML += `Equation: A = (D - VfT) / (0.5T^2) \n`;
            outputDiv.innerHTML += `Calculated Acceleration: ${a}\n`;
        } else if (no_find === "t") {
            a = (vf * vf - vi * vi) / (2 * d);
            outputDiv.innerHTML += `Equation: A = (Vf^2 - Vi^2) / (2D) \n`;
            outputDiv.innerHTML += `Calculated Acceleration: ${a}\n`;
        } else {
            outputDiv.innerHTML += `Not enough information Given\n`;
        }
    } else if (find_choice === "vi") {
        if (no_find === "d") {
            vi = vf - (a * t);
            outputDiv.innerHTML += `Equation: Vi = Vf - AT \n`;
            outputDiv.innerHTML += `Calculated Initial Velocity: ${vi}\n`;
        } else if (no_find === "vf") {
            vi = d / t - (0.5 * a * t);
            outputDiv.innerHTML += `Equation: Vi = D / T - 0.5AT \n`;
            outputDiv.innerHTML += `Calculated Initial Velocity: ${vi}\n`;
        } else if (no_find === "a") {
            vi = (2 * d) / t - vf;
            outputDiv.innerHTML += `Equation: Vi = (2D / T) - Vf \n`;
            outputDiv.innerHTML += `Calculated Initial Velocity: ${vi}\n`;
        } else if (no_find === "t") {
            vi = (d - (0.5 * a * t)) / t;
            outputDiv.innerHTML += `Equation: Vi = (D - 0.5AT^2) / T \n`;
            outputDiv.innerHTML += `Calculated Initial Velocity: ${vi}\n`;
        } else {
            outputDiv.innerHTML += `Not enough information Given\n`;
        }
    } else {
        outputDiv.innerHTML += `Invalid choice. Please enter a valid quantity to find.\n`;
    }
    // Call main() to reset and start over

} 
async function main() {
    
    await calculateKinematicQuantities();
}