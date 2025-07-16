// ── SETTINGS ────────────────────────────────────────────────────────────────
const width = 800, height = 600;
const svg = d3.select("#viz").append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height);

// ── DATA LOADING ─────────────────────────────────────────────────────────────
// Load your CSV file; assumes columns: x, y, r
d3.csv("my-data.csv", d3.autoType).then(raw => {
  const data = raw.map(d => ({
    x: d.x,
    y: d.y,
    radius: d.r
  }));
  
  draw(data);
}).catch(error => {
  console.error("Error loading CSV file:", error);
  // Optionally, you can handle errors here (e.g., show message to user)
});

// ── DRAW FUNCTION ────────────────────────────────────────────────────────────
function draw(data) {
  // Find min and max radius values to create opacity scale
  const minRadius = d3.min(data, d => d.radius);
  const maxRadius = d3.max(data, d => d.radius);
  
  // Create opacity scale: smaller radius = more transparent (lower opacity)
  const opacityScale = d3.scaleLinear()
    .domain([minRadius, maxRadius])
    .range([0.2, 0.8]); // min opacity: 0.2, max opacity: 0.8
  
  const circles = svg.selectAll("circle")
    .data(data)
    .join("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.radius)
      .attr("fill", "steelblue")
      .attr("opacity", d => opacityScale(d.radius)) // Apply radius-based opacity
      .attr("stroke", "white")
      .attr("stroke-width", 2);

  circles
    .on("mouseover", function(event, d) {
      d3.select(this)
        .attr("fill", "grey")
        .attr("opacity", 1); // Full opacity on hover
    })
    .on("mouseout", function(event, d) {
      d3.select(this)
        .attr("fill", "steelblue")
        .attr("opacity", opacityScale(d.radius)); // Return to radius-based opacity
    });

  svg.selectAll("text")
    .data(data)
    .join("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y + 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "white")
      .text((d, i) => `${i + 1}`);
}