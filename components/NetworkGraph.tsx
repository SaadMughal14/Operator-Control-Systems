import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const NetworkGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Define gradients
    const defs = svg.append("defs");
    
    // Link Gradient
    const linkGradient = defs.append("linearGradient")
      .attr("id", "link-gradient")
      .attr("gradientUnits", "userSpaceOnUse");
      
    linkGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#D4C6A9")
      .attr("stop-opacity", 0.2); // Increased opacity
      
    linkGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#D4C6A9")
      .attr("stop-opacity", 0.6); // Increased opacity

    // Node Glow
    const filter = defs.append("filter")
      .attr("id", "glow");
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Data
    const nodeCount = 18;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({ 
      id: i, 
      group: i % 4, // 0 = Core (Accent), others are satellite
      r: i % 4 === 0 ? 6 : 3
    }));
    
    const links = [];
    for (let i = 0; i < 25; i++) {
      links.push({
        source: Math.floor(Math.random() * nodeCount),
        target: Math.floor(Math.random() * nodeCount)
      });
    }

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "url(#link-gradient)")
      .attr("stroke-width", 1.5);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d) => d.group === 0 ? "#D4C6A9" : "#4B5563") // Accent Gold or Dark Gray
      .attr("stroke", (d) => d.group === 0 ? "#fff" : "transparent")
      .attr("stroke-width", 1)
      .style("filter", (d) => d.group === 0 ? "url(#glow)" : "none")
      .call(drag(simulation) as any);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <svg ref={svgRef} className="w-full h-full opacity-80 dark:opacity-60 transition-opacity duration-700" />
  );
};