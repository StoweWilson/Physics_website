document.getElementById("calculateButton").addEventListener("click", () => {
    const find = document.getElementById("find").value;
    const vf = parseFloat(document.getElementById("vf").value);
    const vi = parseFloat(document.getElementById("vi").value);
    const t = parseFloat(document.getElementById("t").value);
    const a = parseFloat(document.getElementById("a").value);
    const d = parseFloat(document.getElementById("d").value);

    let result = "N/A";
    let equationUsed = "N/A";

    try {
        switch (find) {
            case "distance":
                if (!isNaN(vi) && !isNaN(t) && !isNaN(a)) {
                    result = vi * t + 0.5 * a * t ** 2;
                    equationUsed = "d = vi * t + 0.5 * a * t²";
                } else if (!isNaN(vf) && !isNaN(vi) && !isNaN(a)) {
                    result = (vf ** 2 - vi ** 2) / (2 * a);
                    equationUsed = "d = (vf² - vi²) / (2 * a)";
                }
                break;

            case "time":
                if (!isNaN(vf) && !isNaN(vi) && !isNaN(a)) {
                    result = (vf - vi) / a;
                    equationUsed = "t = (vf - vi) / a";
                }
                break;

            case "initialVelocity":
                if (!isNaN(vf) && !isNaN(a) && !isNaN(t)) {
                    result = vf - a * t;
                    equationUsed = "vi = vf - a * t";
                }
                break;

            case "finalVelocity":
                if (!isNaN(vi) && !isNaN(a) && !isNaN(t)) {
                    result = vi + a * t;
                    equationUsed = "vf = vi + a * t";
                }
                break;

            case "acceleration":
                if (!isNaN(vf) && !isNaN(vi) && !isNaN(t)) {
                    result = (vf - vi) / t;
                    equationUsed = "a = (vf - vi) / t";
                }
                break;

            default:
                result = "Invalid input";
                break;
        }

        if (isNaN(result)) {
            throw new Error("Not enough valid inputs to calculate.");
        }
    } catch (error) {
        result = "Calculation error!";
        equationUsed = "Check inputs.";
        console.error(error.message);
    }

    document.getElementById("result").textContent = `Result: ${result}`;
    document.getElementById("equationUsed").textContent = `Equation Used: ${equationUsed}`;
});