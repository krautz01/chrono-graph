import type { EdgeData } from "./EdgeData";
import type { NodeData } from "./NodeData";

export interface GraphViewProps {
  elements: {
    nodes: { data: NodeData }[];
    edges: { data: EdgeData }[];
  };
  onNodeClick?: (data: NodeData) => void;
}
