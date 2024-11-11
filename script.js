document.addEventListener('DOMContentLoaded', () => {
    const equationsContainer = document.getElementById('equations-container');
    const equations = [];

    // Function to create and animate floating equations
    function createFloatingEquation() {
        const equation = document.createElement('div');
        equation.classList.add('equation');
        
        // Expanded list of equations
        const equationsList = [
            'v_f = v_i + at ', // Basic kinematic equation
            'v_f^2 = v_i^2 + 2 a d', // Another kinematic equation
            'v_avg = (v_i + v_f)/2', // Average velocity
            'F = ma', // Newton's second law
            'F = G(m_1 m_2)/r^2', // Gravitational force
            'KE = (1/2)m v^2', // Kinetic energy
            'PE = mgh', // Potential energy
            'W = ΔKE', // Work-energy theorem
            'E = mc^2', // Einstein's equation (energy-mass equivalence)
            'P = IV', // Electrical power
            'λ = c/f', // Wave equation
            'a = (v_f - v_i) / t', // Acceleration equation
            'v = v_i + a*t', // Velocity equation
            'W = Fd cos(θ)', // Work formula
            'p = mv', // Momentum formula
            'F_friction = μ N', // Friction force
            'F_net = ma', // Net force
            'a = (v_f - v_i) / t', // Alternative acceleration formula
            'P = Fv', // Power as force times velocity
            'v = v_i + at' // Another kinematic equation
        ];
        
        equation.innerText = equationsList[Math.floor(Math.random() * equationsList.length)];
        
        // Set random initial position
        const randomX = Math.random() * 100; // Random horizontal starting position
        const randomY = Math.random() * 100; // Random vertical starting position
        const randomSpeed = Math.random() * 0.001 + 0.1; // Slower random speed for floating

        equation.style.left = `${randomX}vw`;
        equation.style.top = `${randomY}vh`;

        // Store the speed of the equation to control how fast it floats
        equation.dataset.speedX = (Math.random() - 0.5) * randomSpeed;  // Horizontal floating speed
        equation.dataset.speedY = (Math.random() - 0.5) * randomSpeed;  // Vertical floating speed

        equationsContainer.appendChild(equation);
        equations.push(equation);
    }

    // Create multiple floating equations (adjust the number as needed)
    for (let i = 0; i < 25; i++) {  // Adjusted to create more equations
        createFloatingEquation();
    }

    let isHoveringOverMainWord = false;

    // Floating effect: equations float around the page
    function moveEquations() {
        if (!isHoveringOverMainWord) {
            equations.forEach((equation) => {
                const left = parseFloat(equation.style.left);
                const top = parseFloat(equation.style.top);
                const speedX = parseFloat(equation.dataset.speedX);
                const speedY = parseFloat(equation.dataset.speedY);

                // Update position
                const newLeft = left + speedX;
                const newTop = top + speedY;

                // Keep equations within bounds by resetting position if they go out of view
                if (newLeft < 0 || newLeft > 100) equation.dataset.speedX *= -1; // Reverse direction
                if (newTop < 0 || newTop > 100) equation.dataset.speedY *= -1; // Reverse direction

                equation.style.left = `${newLeft}vw`;
                equation.style.top = `${newTop}vh`;
            });
        }

        // Repeat this function to keep equations floating
        requestAnimationFrame(moveEquations);
    }

    // Start the floating effect
    moveEquations();

    // Mouse interaction to push equations
    equationsContainer.addEventListener('mousemove', (e) => {
        if (!isHoveringOverMainWord) {
            const equations = document.querySelectorAll('.equation');
            equations.forEach((equation) => {
                const rect = equation.getBoundingClientRect();
                const dx = e.clientX - rect.left - rect.width / 2;
                const dy = e.clientY - rect.top - rect.height / 2;

                // Push equations in the direction of the mouse
                const moveX = dx / 15;  // Slower push intensity (adjusted from /10)
                const moveY = dy / 15;  // Slower push intensity (adjusted from /10)

                equation.style.left = `${rect.left + moveX}px`;
                equation.style.top = `${rect.top + moveY}px`;

                // Optional: Add hover effect
                equation.style.transform = `scale(1.5)`;
                equation.style.color = `rgba(255, ${255 - Math.abs(dx / 10) * 100}, 0, 1)`;
            });
        }
    });

    // Detect mouse hover over the main word
    const mainWord = document.querySelector('.mainword');
    mainWord.addEventListener('mouseenter', () => {
        isHoveringOverMainWord = true;
    });

    // Detect mouse leave over the main word
    mainWord.addEventListener('mouseleave', () => {
        isHoveringOverMainWord = false;
    });
});
// JavaScript to handle scroll event and trigger animation
window.addEventListener('scroll', function () {
    const mainword = document.querySelector('.mainword a');
    const gradientBlock = document.querySelector('.gradient-block');
    const scrollPosition = window.scrollY;

    // Subtle scale effect
    const scaleValue = 1 + (scrollPosition / 1000); // Adjust for scaling speed
    mainword.style.transform = `translateX(-45%) scale(${scaleValue})`;

    // Apply a more subtle glow as the user scrolls
    const glowIntensity = Math.min(scrollPosition / 200, 0.5); // Limit glow intensity
    mainword.style.textShadow = `0 0 15px rgba(255, 255, 255, ${glowIntensity}), 0 0 30px rgba(255, 255, 255, ${glowIntensity})`;

    // Gradual darkening of the background as user scrolls
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / maxScroll;

    // Adjust gradient block opacity and position
    gradientBlock.style.opacity = 1 - scrollPercentage * 0.01; // Reduce opacity as you scroll
    gradientBlock.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Optional: Move gradient block down as you scroll

    // Toggle glow and text color based on scroll position
    if (scrollPosition > 100) { // Trigger glow effect at 200px scroll
        mainword.classList.add('glow-text');
        document.body.classList.add('dark-background');
        mainword.style.color = "white";  // Change text color to white when glowing
    } else {
        mainword.classList.remove('glow-text');
        document.body.classList.remove('dark-background');
        mainword.style.color = "initial"; // Revert text color to initial
    }
});

