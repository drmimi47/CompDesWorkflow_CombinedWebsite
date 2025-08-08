// Wait for DOM to load before initializing p5.js sketch
document.addEventListener('DOMContentLoaded', function () {
  const sketch = (p) => {
    let particles = [];  // Array to hold particle objects
    let time = 0;        // Global time variable for animations
    let colors;          // Predefined color palette

    // p5.js setup function - runs once when sketch starts
    p.setup = () => {
      // Create canvas and attach to specific HTML element
      const canvas = p.createCanvas(800, 600);
      canvas.parent('p5js-canvas-2');

      // Define vibrant color palette for visual elements
      colors = [
        p.color(255, 107, 107),  // Red
        p.color(78, 205, 196),   // Teal
        p.color(249, 202, 36),   // Yellow
        p.color(69, 183, 209),   // Blue
        p.color(235, 77, 75),    // Coral
        p.color(106, 176, 76)    // Green
      ];

      // Initialize 30 particles with random positions
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle(p));
      }
    };

    // p5.js draw function - runs continuously (animation loop)
    p.draw = () => {
      // Semi-transparent background for trailing effect
      p.background(25, 25, 46, 50);
      time += 0.02;  // Increment time for smooth animations

      // Draw all visual elements in layers
      drawWaveBackground();
      drawShapes();
      drawCenter();
      updateParticles();
    };

    // Mouse movement handler - creates particle trail
    p.mouseMoved = () => {
      // Create new particle every 5 frames to avoid performance issues
      if (p.frameCount % 5 === 0) {
        particles.push(new Particle(p, p.mouseX, p.mouseY));
        // Limit particle count to 60 for performance
        if (particles.length > 60) particles.shift();
      }
    };

    // Mouse click handler - creates particle burst effect
    p.mousePressed = () => {
      // Create 8 burst particles at mouse position
      for (let i = 0; i < 8; i++) {
        particles.push(new Particle(p, p.mouseX, p.mouseY, true));
      }
    };

    // Draw animated wave patterns in background
    function drawWaveBackground() {
      p.strokeWeight(2);
      p.noFill();
      
      // Create 3 overlapping sine waves with different phases
      for (let i = 0; i < 3; i++) {
        let col = colors[i % colors.length];
        // Decreasing alpha for layered effect
        p.stroke(col.levels[0], col.levels[1], col.levels[2], 80 - i * 20);

        p.beginShape();
        // Draw sine wave across canvas width
        for (let x = 0; x <= p.width; x += 20) {
          let y = p.height / 2 + p.sin(x * 0.01 + time + i * 0.5) * (20 + i * 10);
          p.vertex(x, y);
        }
        p.endShape();
      }
    }

    // Draw rotating geometric shapes around center
    function drawShapes() {
      p.push();
      p.translate(p.width / 2, p.height / 2);
      
      // Calculate rotation speed based on mouse distance from center
      let d = p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2);
      let speed = p.map(d, 0, 300, 2, 0.5);

      // Create 6 rotating rectangles in circular formation
      for (let i = 0; i < 6; i++) {
        let angle = (i / 6) * p.TWO_PI + time * speed;
        let r = 100 + p.sin(time + i) * 20;  // Oscillating radius
        let x = p.cos(angle) * r;
        let y = p.sin(angle) * r;

        p.push();
        p.translate(x, y);
        p.rotate(angle + time);  // Individual rotation
        p.fill(colors[i % colors.length]);
        p.stroke(255, 100);
        p.strokeWeight(2);
        
        // Pulsing size based on time and index
        let s = 20 + p.sin(time * 2 + i) * 10;
        p.rect(-s / 2, -s / 2, s, s);
        p.pop();
      }

      p.pop();
    }

    // Draw animated central hexagon with pulsing effect
    function drawCenter() {
      p.push();
      p.translate(p.width / 2, p.height / 2);
      
      // Pulsing scale effect
      let pulse = p.sin(time * 3) * 0.3 + 1;
      // Mouse proximity scaling
      let scale = p.map(p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2), 0, 200, 1.5, 1);
      p.scale(pulse * scale);

      // Color cycling through palette
      let col = colors[Math.floor(time * 2) % colors.length];
      p.fill(col);
      p.stroke(255);
      p.strokeWeight(3);

      // Draw hexagon shape
      p.beginShape();
      for (let i = 0; i < 6; i++) {
        let angle = (i / 6) * p.TWO_PI;
        p.vertex(p.cos(angle) * 30, p.sin(angle) * 30);
      }
      p.endShape(p.CLOSE);

      // Inner white circle
      p.fill(255, 200);
      p.noStroke();
      p.circle(0, 0, 20);
      p.pop();
    }

    // Update and display all particles, remove dead ones
    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();   // Update position and properties
        particles[i].display();  // Render particle
        // Remove particles that have faded out
        if (particles[i].isDead()) particles.splice(i, 1);
      }
    }

    // Particle class for interactive elements
    class Particle {
      constructor(p, x = null, y = null, burst = false) {
        // Position: use provided coordinates or random
        this.pos = p.createVector(x ?? p.random(p.width), y ?? p.random(p.height));
        
        // Velocity: burst particles move faster in random directions
        this.vel = burst ? p5.Vector.random2D().mult(p.random(2, 6)) : p.createVector(p.random(-1, 1), p.random(-1, 1));
        
        this.life = 255;  // Alpha value for fade-out effect
        this.size = p.random(3, 8);  // Random particle size
        this.color = colors[Math.floor(p.random(colors.length))];  // Random color from palette
        this.burst = burst;  // Flag for burst particles (faster fade)
      }

      // Update particle position and life
      update() {
        this.pos.add(this.vel);  // Move particle
        this.life -= this.burst ? 4 : 2;  // Burst particles fade faster

        // Wrap around screen edges for continuous movement
        if (this.pos.x < 0) this.pos.x = p.width;
        if (this.pos.x > p.width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = p.height;
        if (this.pos.y > p.height) this.pos.y = 0;
      }

      // Render particle with fading alpha
      display() {
        let alpha = p.map(this.life, 0, 255, 0, 255);
        p.fill(p.red(this.color), p.green(this.color), p.blue(this.color), alpha);
        p.noStroke();
        p.circle(this.pos.x, this.pos.y, this.size);
      }

      // Check if particle should be removed
      isDead() {
        return this.life <= 0;
      }
    }
  };

  // Initialize p5.js sketch in instance mode
  new p5(sketch);
});