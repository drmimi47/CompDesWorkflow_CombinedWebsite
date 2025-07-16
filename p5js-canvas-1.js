// p5js-canvas-1.js - 2D Static Drawing with Primitive Shapes

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Create a new p5 instance for canvas 1
    const sketch1 = (p) => {
        p.setup = () => {
            const canvas = p.createCanvas(800, 600);
            canvas.parent('p5js-canvas-1');
            p.background(25, 25, 46);
            p.noLoop(); // Static drawing - no animation
            
            // Draw the composition
            drawStaticComposition(p);
        };
        
        function drawStaticComposition(p) {
            // Set up color palette
            const colors = {
                primary: p.color(255, 107, 107),    // Red
                secondary: p.color(78, 205, 196),   // Teal
                accent: p.color(249, 202, 36),      // Yellow
                highlight: p.color(69, 183, 209),   // Blue
                background: p.color(44, 44, 84)     // Purple
            };
            
            // Background gradient effect
            for (let i = 0; i < p.height; i++) {
                let inter = p.map(i, 0, p.height, 0, 1);
                let c = p.lerpColor(p.color(25, 25, 46), colors.background, inter);
                p.stroke(c);
                p.line(0, i, p.width, i);
            }
            
            // Central mandala-like pattern
            p.push();
            p.translate(p.width / 2, p.height / 2);
            
            // Outer ring of circles
            p.strokeWeight(3);
            p.stroke(255, 255, 255, 100);
            p.fill(colors.primary);
            for (let i = 0; i < 12; i++) {
                let angle = (i / 12) * p.TWO_PI;
                let x = p.cos(angle) * 120;
                let y = p.sin(angle) * 120;
                p.circle(x, y, 40);
            }
            
            // Middle ring of rectangles
            p.fill(colors.secondary);
            p.strokeWeight(2);
            for (let i = 0; i < 8; i++) {
                let angle = (i / 8) * p.TWO_PI;
                let x = p.cos(angle) * 80;
                let y = p.sin(angle) * 80;
                p.push();
                p.translate(x, y);
                p.rotate(angle + p.PI / 4);
                p.rect(-15, -15, 30, 30);
                p.pop();
            }
            
            // Inner triangular pattern
            p.fill(colors.accent);
            p.strokeWeight(1);
            for (let i = 0; i < 6; i++) {
                let angle = (i / 6) * p.TWO_PI;
                let x = p.cos(angle) * 50;
                let y = p.sin(angle) * 50;
                p.push();
                p.translate(x, y);
                p.rotate(angle);
                p.triangle(0, -20, -15, 10, 15, 10);
                p.pop();
            }
            
            // Central hexagon
            p.fill(colors.highlight);
            p.strokeWeight(4);
            p.stroke(255);
            p.beginShape();
            for (let i = 0; i < 6; i++) {
                let angle = (i / 6) * p.TWO_PI;
                let x = p.cos(angle) * 25;
                let y = p.sin(angle) * 25;
                p.vertex(x, y);
            }
            p.endShape(p.CLOSE);
            
            p.pop();
            
            // Corner decorative elements
            drawCornerPattern(p, 50, 50, colors.primary);
            drawCornerPattern(p, p.width - 50, 50, colors.secondary);
            drawCornerPattern(p, 50, p.height - 50, colors.accent);
            drawCornerPattern(p, p.width - 50, p.height - 50, colors.highlight);
        }
        
        function drawCornerPattern(p, x, y, color) {
            p.push();
            p.translate(x, y);
            p.fill(color);
            p.noStroke();
            
            // Create corner pattern
            for (let i = 0; i < 3; i++) {
                let size = 15 + i * 8;
                let alpha = 255 - i * 60;
                let currentColor = p.color(p.red(color), p.green(color), p.blue(color), alpha);
                p.fill(currentColor);
                p.circle(0, 0, size);
            }
            p.pop();
        }
    };
    
    // Create the p5 instance
    new p5(sketch1);
});