import type { Node, Edge } from "@xyflow/react";

export type FlowValidationResult = {
  isValid: boolean;
  error?: string;
};

export function validateFlow(
  nodes: Node[],
  edges: Edge[],
): FlowValidationResult {
  if (nodes.length <= 1) {
    return { isValid: true };
  }

  const nodesWithoutIncoming = nodes.filter(
    (node) => !edges.some((edge) => edge.target === node.id),
  );
  console.log("Nodes:", nodes);
  console.log("Edges:", edges);
  console.log("Nodes without incoming:", nodesWithoutIncoming);

  if (nodesWithoutIncoming.length > 1) {
    return {
      isValid: false,
      error:
        "Flow must contain only one starting node. Multiple nodes have no incoming connections.",
    };
  }

  return { isValid: true };
}
