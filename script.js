
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

document.addEventListener('DOMContentLoaded', function() {
    const paragraph = document.querySelector('main p em');
    
    if (paragraph) {
        const text = paragraph.textContent;
        paragraph.textContent = '';
        
        // Add cursor styling
        paragraph.style.borderRight = '2px solid';
        paragraph.style.animation = 'blink 1s infinite';
        
        let index = 0;
        const speed = 50; // Adjust speed (lower = faster)
        
        function typeWriter() {
            if (index < text.length) {
                paragraph.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, speed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    paragraph.style.borderRight = 'none';
                    paragraph.style.animation = 'none';
                }, 1000);
            }
        }
        
        // Start typing after a small delay
        setTimeout(typeWriter, 500);
    }
});

// Function to create a dot matrix effect .... SHIFT + ALT + A .....
/* const canvas = document.getElementById('dotMatrix');
const ctx = canvas.getContext('2d');

let mouseX = 0;
let mouseY = 0;
let dots = [];

const spacing = 25;
const maxDistance = 80;
const pullStrength = 0.15;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createDots();
}

function createDots() {
    dots = [];
    for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
            dots.push({
                originalX: x,
                originalY: y,
                currentX: x,
                currentY: y
            });
        }
    }
}

function updateDots() {
    dots.forEach(dot => {
        const dx = mouseX - dot.originalX;
        const dy = mouseY - dot.originalY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const pullX = dx * force * pullStrength;
            const pullY = dy * force * pullStrength;
            
            dot.currentX = dot.originalX + pullX;
            dot.currentY = dot.originalY + pullY;
        } else {
            // Smoothly return to original position
            dot.currentX += (dot.originalX - dot.currentX) * 0.1;
            dot.currentY += (dot.originalY - dot.currentY) * 0.1;
        }
    });
}

function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(150, 150, 150, 0.3)';
    
    dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.currentX, dot.currentY, 1, 0, Math.PI * 2);
        ctx.fill();
    });
}

function animate() {
    updateDots();
    drawDots();
    requestAnimationFrame(animate);
}

// Event listeners
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Initialize
resizeCanvas();
animate(); */