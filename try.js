document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate the main container text
    gsap.from(".main-container .mainword div", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".main-container",
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
        },
    });

    // Animate the second container words
    gsap.from(".second-container .secondword div", {
        x: -200,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".second-container",
            start: "top 90%",
            end: "top 50%",
            toggleActions: "play none none reverse",
        },
    });

    
});
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Second container guiding the user down
    gsap.fromTo(
        ".second-container",
        {
            y: 200,  // Start from below
            opacity: 0,  // Invisible initially
            scale: 0.95, // Slightly smaller size
        },
        {
            y: 0,  // Move to original position
            opacity: 1,  // Fade in fully
            scale: 1,  // Grow to natural size
            duration: 1.5,
            ease: "power4.out",  // Smooth easing
            scrollTrigger: {
                trigger: ".second-container",
                start: "top 80%",  // Start animation when near the viewport
                end: "top 50%",  // Complete by the time it's halfway visible
                scrub: true,  // Smoothly synced with scroll
            },
        }
    );

    // Subtle parallax effect for second-container's content
    gsap.to(".second-container .secondword", {
        y: -20,  // Move content slightly upward as you scroll
        ease: "none", // Linear movement for parallax effect
        scrollTrigger: {
            trigger: ".second-container",
            start: "top bottom",  // Begin when the second container enters the viewport
            end: "bottom top",  // Continue until it exits the viewport
            scrub: true,  // Smooth parallax scrolling
        },
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Parallax animation for the second container
    gsap.to(".second-container", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".second-container",
            start: "top 75%", // When the second container is 75% in view
            end: "top 50%", // Animation ends at 50% of viewport
            scrub: true, // Smooth scrolling effect
        },
    });

    // Optional: Add parallax effect to main-container
    gsap.to(".main-container", {
        y: -50,
        scrollTrigger: {
            trigger: ".main-container",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });
});

// JavaScript to handle the button display and scrolling behavior
const scrollBtnLeft = document.querySelector('.scroll-btn-left');
const scrollBtnRight = document.querySelector('.scroll-btn-right');
const buttonsWrapper = document.querySelector('.buttons-wrapper');

// Function to toggle visibility of buttons inside the wrapper
const toggleScroll = () => {
    buttonsWrapper.classList.toggle('show-scroll');
};

document.addEventListener("DOMContentLoaded", () => {
    // Adjust button container for scrolling
    const buttonWrapper = document.querySelector(".buttons-wrapper");
    const leftArrow = document.getElementById("left-arrow");
    const rightArrow = document.getElementById("right-arrow");

    // Function to scroll buttons horizontally
    const scrollLeft = () => {
        buttonWrapper.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        buttonWrapper.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    };

    // Attach scroll event listeners to the buttons
    leftArrow.addEventListener("click", scrollLeft);
    rightArrow.addEventListener("click", scrollRight);

    // Show buttons based on screen size (use show-scroll class for small screens)
    if (window.innerWidth <= 768) {
        buttonWrapper.classList.add("show-scroll");
    }
});