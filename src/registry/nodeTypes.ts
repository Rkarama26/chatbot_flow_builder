// registry/nodeTypes.ts

import type { NodeTypes } from "@xyflow/react";
import { nodeRegistry } from "./nodeRegistry";

export const nodeTypes: NodeTypes = Object.fromEntries(
  Object.entries(nodeRegistry).map(([key, config]) => [
    key,
    config.component,
  ])
);