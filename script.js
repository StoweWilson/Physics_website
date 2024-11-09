// Get the buttons-wrapper element
const wrapper = document.querySelector('.buttons-wrapper');

// Get the scroll buttons
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

// Set the amount to scroll with each click
const scrollAmount = 300; // Adjust this value based on how much you want to scroll

leftArrow.addEventListener('click', () => {
    // Scroll the wrapper to the left by the specified amount
    wrapper.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth', // Smooth scroll
    });
});

rightArrow.addEventListener('click', () => {
    // Scroll the wrapper to the right by the specified amount
    wrapper.scrollBy({
        left: scrollAmount,
        behavior: 'smooth', // Smooth scroll
    });
});