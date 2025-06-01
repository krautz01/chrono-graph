// GraphView.tsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface NodeData {
  id: string;
  label: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface EdgeData {
  source: string;
  target: string;
}

interface GraphViewProps {
  elements: {
    nodes: { data: NodeData }[];
    edges: { data: EdgeData }[];
  };
  onNodeClick?: (data: NodeData) => void;
}

const GraphView: React.FC<GraphViewProps> = ({ elements, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const defs = svg.append("defs");

    defs
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 32) // расстояние от центра узла до стрелки (радиус узла + немного)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .attr("fill", "#ccc")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5");

    const width = 1024;
    const height = 600;

    const nodes: NodeData[] = elements.nodes.map((n) => ({ ...n.data }));
    const links = elements.edges.map((e) => ({ ...e.data }));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<NodeData, d3.SimulationLinkDatum<NodeData>>(links)
          .id((d) => d.id)
          .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("marker-end", "url(#arrowhead)");

    const nodeGroup = svg.append("g");

    const node = nodeGroup
      .selectAll<SVGCircleElement, NodeData>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 30)
      .attr("fill", "#3b82f6")
      .call(
        d3
          .drag<SVGCircleElement, NodeData>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
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
      .style("font-size", "14px")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as unknown as NodeData).x || 0)
        .attr("y1", (d) => (d.source as unknown as NodeData).y || 0)
        .attr("x2", (d) => (d.target as unknown as NodeData).x || 0)
        .attr("y2", (d) => (d.target as unknown as NodeData).y || 0);

      node.attr("cx", (d) => d.x || 0).attr("cy", (d) => d.y || 0);
      labels.attr("x", (d) => d.x || 0).attr("y", (d) => d.y || 0);
    });

    return () => {
      simulation.stop();
    };
  }, [elements, onNodeClick]);

  return <svg ref={svgRef} width={1440} height={600} />;
};

export default GraphView;
