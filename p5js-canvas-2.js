document.addEventListener('DOMContentLoaded', function () {
  const sketch = (p) => {
    let particles = [];
    let time = 0;
    let colors;

    p.setup = () => {
      const canvas = p.createCanvas(800, 600);
      canvas.parent('p5js-canvas-2');

      colors = [
        p.color(255, 107, 107),
        p.color(78, 205, 196),
        p.color(249, 202, 36),
        p.color(69, 183, 209),
        p.color(235, 77, 75),
        p.color(106, 176, 76)
      ];

      for (let i = 0; i < 30; i++) {
        particles.push(new Particle(p));
      }
    };

    p.draw = () => {
      p.background(25, 25, 46, 50);
      time += 0.02;

      drawWaveBackground();
      drawShapes();
      drawCenter();
      updateParticles();
    };

    p.mouseMoved = () => {
      if (p.frameCount % 5 === 0) {
        particles.push(new Particle(p, p.mouseX, p.mouseY));
        if (particles.length > 60) particles.shift();
      }
    };

    p.mousePressed = () => {
      for (let i = 0; i < 8; i++) {
        particles.push(new Particle(p, p.mouseX, p.mouseY, true));
      }
    };

    function drawWaveBackground() {
      p.strokeWeight(2);
      p.noFill();
      for (let i = 0; i < 3; i++) {
        let col = colors[i % colors.length];
        p.stroke(col.levels[0], col.levels[1], col.levels[2], 80 - i * 20);

        p.beginShape();
        for (let x = 0; x <= p.width; x += 20) {
          let y = p.height / 2 + p.sin(x * 0.01 + time + i * 0.5) * (20 + i * 10);
          p.vertex(x, y);
        }
        p.endShape();
      }
    }

    function drawShapes() {
      p.push();
      p.translate(p.width / 2, p.height / 2);
      let d = p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2);
      let speed = p.map(d, 0, 300, 2, 0.5);

      for (let i = 0; i < 6; i++) {
        let angle = (i / 6) * p.TWO_PI + time * speed;
        let r = 100 + p.sin(time + i) * 20;
        let x = p.cos(angle) * r;
        let y = p.sin(angle) * r;

        p.push();
        p.translate(x, y);
        p.rotate(angle + time);
        p.fill(colors[i % colors.length]);
        p.stroke(255, 100);
        p.strokeWeight(2);
        let s = 20 + p.sin(time * 2 + i) * 10;
        p.rect(-s / 2, -s / 2, s, s);
        p.pop();
      }

      p.pop();
    }

    function drawCenter() {
      p.push();
      p.translate(p.width / 2, p.height / 2);
      let pulse = p.sin(time * 3) * 0.3 + 1;
      let scale = p.map(p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2), 0, 200, 1.5, 1);
      p.scale(pulse * scale);

      let col = colors[Math.floor(time * 2) % colors.length];
      p.fill(col);
      p.stroke(255);
      p.strokeWeight(3);

      p.beginShape();
      for (let i = 0; i < 6; i++) {
        let angle = (i / 6) * p.TWO_PI;
        p.vertex(p.cos(angle) * 30, p.sin(angle) * 30);
      }
      p.endShape(p.CLOSE);

      p.fill(255, 200);
      p.noStroke();
      p.circle(0, 0, 20);
      p.pop();
    }

    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        if (particles[i].isDead()) particles.splice(i, 1);
      }
    }

    class Particle {
      constructor(p, x = null, y = null, burst = false) {
        this.pos = p.createVector(x ?? p.random(p.width), y ?? p.random(p.height));
        this.vel = burst ? p5.Vector.random2D().mult(p.random(2, 6)) : p.createVector(p.random(-1, 1), p.random(-1, 1));
        this.life = 255;
        this.size = p.random(3, 8);
        this.color = colors[Math.floor(p.random(colors.length))];
        this.burst = burst;
      }

      update() {
        this.pos.add(this.vel);
        this.life -= this.burst ? 4 : 2;

        // Wrap edges
        if (this.pos.x < 0) this.pos.x = p.width;
        if (this.pos.x > p.width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = p.height;
        if (this.pos.y > p.height) this.pos.y = 0;
      }

      display() {
        let alpha = p.map(this.life, 0, 255, 0, 255);
        p.fill(p.red(this.color), p.green(this.color), p.blue(this.color), alpha);
        p.noStroke();
        p.circle(this.pos.x, this.pos.y, this.size);
      }

      isDead() {
        return this.life <= 0;
      }
    }
  };

  new p5(sketch);
});
