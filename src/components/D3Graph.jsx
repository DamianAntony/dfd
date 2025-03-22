import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const D3Graph = ({ nodes, links }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Select the SVG element and set dimensions
    const svg = d3.select(svgRef.current)
      .attr("width", 500)
      .attr("height", 300);

    // Clear previous content if any (useful when updating nodes/links)
    svg.selectAll("*").remove();

    // Create the simulation with forces
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(250, 150));

    // Draw links (lines)
    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke-width", 1.5);

    // Draw nodes (circles)
    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", 8)
      .attr("fill", "blue")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Drag event handlers
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Update positions on every tick of the simulation
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });
  }, [nodes, links]);

  return <svg ref={svgRef}></svg>;
};

export default D3Graph;
