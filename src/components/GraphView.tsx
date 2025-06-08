import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { GraphViewProps } from "../interfaces/GraphViewProps";
import type { NodeData } from "../interfaces/NodeData";

const GraphView: React.FC<GraphViewProps> = ({ elements, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const getColorByDiscipline = (discipline?: string): string => {
    switch (discipline?.toLowerCase()) {
      case "physics":
        return "#3b82f6";
      case "chemistry":
        return "#ef4444";
      case "biology":
        return "#10b981";
      case "cybernetics":
        return "#8b5cf6";
      case "astronomy":
        return "#f59e0b";
      case "geology":
        return "#a855f7";
      case "mathematics":
        return "#0ea5e9";
      case "medicine":
        return "#ec4899";
      case "engineering":
        return "#f97316";
      case "psychology":
        return "#22d3ee";
      default:
        return "#9ca3af";
    }
  };

  const nodeSize = 10;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const defs = svg.append("defs");
    defs
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", nodeSize + 10)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .attr("fill", "#ccc")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5");

    const width = 1440;
    const height = 800;

    const nodes: NodeData[] = elements.nodes.map((n) => ({ ...n.data }));
    const links = elements.edges.map((e) => ({ ...e.data }));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<NodeData, d3.SimulationLinkDatum<NodeData>>(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-10))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1.5)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("marker-end", "url(#arrowhead)");

    const nodeGroup = svg.append("g");

    const node = nodeGroup
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", nodeSize)
      .attr("fill", (d) => getColorByDiscipline(d.discipline))
      .call(
        d3
          .drag()
          .on("start", (event, d: NodeData) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d: NodeData) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d: NodeData) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on("click", (_, d) => onNodeClick?.(d));

    const labels = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .style("font-size", "0.6rem")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: d3.SimulationLinkDatum<NodeData>) => clamp((d.source as NodeData).x || 0, 0, width))
        .attr("y1", (d: d3.SimulationLinkDatum<NodeData>) => clamp((d.source as NodeData).y || 0, 0, height))
        .attr("x2", (d: d3.SimulationLinkDatum<NodeData>) => clamp((d.target as NodeData).x || 0, 0, width))
        .attr("y2", (d: d3.SimulationLinkDatum<NodeData>) => clamp((d.target as NodeData).y || 0, 0, height));

      node
        .attr("cx", (d) => clamp(d.x || 0, 0, width))
        .attr("cy", (d) => clamp(d.y || 0, 0, height));

      labels
        .attr("x", (d) => clamp(d.x || 0, 0, width))
        .attr("y", (d) => clamp(d.y || 0, 0, height));
    });

    const clamp = (val: number, min: number, max: number): number =>
      Math.max(min + 30, Math.min(max - 30, val));

    return () => {
      simulation.stop();
    };
  }, [elements, onNodeClick]);

  return <svg ref={svgRef} width={1440} height={800} />;
};

export default GraphView;