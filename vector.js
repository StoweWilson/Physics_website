let vectors = [];

// Function to add a vector
document.getElementById("addVector").addEventListener("click", () => {
    const magnitude = parseFloat(document.getElementById("magnitude").value);
    const direction = parseFloat(document.getElementById("direction").value);

    if (isNaN(magnitude) || isNaN(direction)) {
        alert("Please enter valid magnitude and direction values.");
        return;
    }

    const radians = direction * (Math.PI / 180); // Convert degrees to radians
    const x = magnitude * Math.cos(radians);
    const y = magnitude * Math.sin(radians);

    vectors.push({ magnitude, direction, x, y });
    updateVectorList();
});

// Function to update the vector list display
function updateVectorList() {
    const vectorList = document.getElementById("vectorList");
    vectorList.innerHTML = "";
    vectors.forEach((vector, index) => {
        vectorList.innerHTML += `<li>Vector ${index + 1}: Magnitude = ${vector.magnitude}, Direction = ${vector.direction}°</li>`;
    });
}

// Function to calculate the resultant vector
document.getElementById("calculateResult").addEventListener("click", () => {
    if (vectors.length === 0) {
        alert("Please add at least one vector.");
        return;
    }

    const sumX = vectors.reduce((acc, vector) => acc + vector.x, 0);
    const sumY = vectors.reduce((acc, vector) => acc + vector.y, 0);
    const resultantMagnitude = Math.sqrt(sumX ** 2 + sumY ** 2);
    const resultantDirection = Math.atan2(sumY, sumX) * (180 / Math.PI);

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        Magnitude: ${resultantMagnitude.toFixed(2)}<br>
        Direction: ${resultantDirection.toFixed(2)}°
    `;
});