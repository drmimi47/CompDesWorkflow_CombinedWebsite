
document.addEventListener("DOMContentLoaded", function () {
  // Invert toggle button functionality
  const invertToggle = document.getElementById("invert-toggle");
  if (invertToggle) {
    invertToggle.addEventListener("click", function () {
      document.body.classList.toggle("inverted");
    });
  }
});

// Set desired scroll speed (pixels per second)
const SCROLL_SPEED = 70; // Adjust this value to make it faster or slower

function setScrollSpeed() {
  const scrollWrapper = document.querySelector('.scroll-wrapper');
  const scrollText = document.querySelector('.scroll-text');
  
  // Get the width of one text block
  const textWidth = scrollText.offsetWidth;
  
  // Calculate duration based on text width and desired speed
  const duration = textWidth / SCROLL_SPEED;
  
  // Apply the calculated duration to the animation
  scrollWrapper.style.animationDuration = `${duration}s`;
}

// Set speed when page loads
document.addEventListener('DOMContentLoaded', setScrollSpeed);

// Optional: Update speed if window is resized
window.addEventListener('resize', setScrollSpeed);