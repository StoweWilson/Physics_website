// Function to calculate frictional force
function calculateFriction() {
    // Get input values
    const coefficient = parseFloat(document.getElementById('coefficient').value);
    const normalForce = parseFloat(document.getElementById('normal-force').value);
    const mass = parseFloat(document.getElementById('mass').value);
    const angle = parseFloat(document.getElementById('angle').value);
    const appliedForce = parseFloat(document.getElementById('applied-force').value);
    const isKinetic = document.getElementById('kinetic').checked;

    // Constants
    const gravity = 9.81;  // Acceleration due to gravity (m/s^2)

    // Validate inputs
    if (isNaN(coefficient)) {
        document.getElementById('result').textContent = 'Error: Please enter the coefficient of friction (μ).';
        return;
    }

    // Calculate normal force if not provided
    let normalForceAdjusted = normalForce;
    if (isNaN(normalForce) && !isNaN(mass) && !isNaN(angle)) {
        normalForceAdjusted = mass * gravity * Math.cos(angle * Math.PI / 180);
    } else if (isNaN(normalForce)) {
        document.getElementById('result').textContent = 'Error: Provide either the normal force or both mass and angle.';
        return;
    }

    // Calculate frictional force
    const frictionForce = coefficient * normalForceAdjusted;
    let resultText = `The frictional force is ${frictionForce.toFixed(2)} N.`;

    // Analyze applied force
    if (!isNaN(appliedForce)) {
        const frictionLimit = coefficient * normalForceAdjusted;
        if (appliedForce > frictionLimit) {
            resultText += ` The object will move because the applied force exceeds the maximum static friction.`;
        } else {
            resultText += ` The object will not move because the applied force is less than static friction.`;
        }
    }

    // Output result
    document.getElementById('result').textContent = resultText;
}

// Event listener for form submission
document.getElementById('frictionForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission
    calculateFriction();
});