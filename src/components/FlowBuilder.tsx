// Import necessary components and hooks from @xyflow/react for building the flow editor
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  type Node,
  type Edge,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// React hooks and custom registry/types
import { useCallback, useState } from "react";
import {
  nodeRegistry,
  type NodeType,
  type TextNodeData,
} from "../registry/nodeRegistry";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import { nodeTypes } from "../registry/nodeTypes";
import SaveButton from "./SaveButton";

// Simple id generator for new nodes
let id = 0;
const getId = () => `node_${id++}`;

function Flow() {
  // State for nodes and edges in the flow
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<TextNodeData>>(
    [],
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // State for currently selected node (for settings panel)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Handle connecting two nodes with an edge
  const onConnect = useCallback(
    (connection: Connection) => {
      // Prevent multiple outgoing connections from the same node
      const alreadyHasOutgoing = edges.some(
        (edge) => edge.source === connection.source,
      );

      if (alreadyHasOutgoing) {
        alert("Only one outgoing connection allowed.");
        return;
      }

      setEdges((eds) => addEdge(connection, eds));
    },
    [edges],
  );

  // Handle dropping a new node onto the canvas
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      // Get the node type from the drag event
      const rawType = event.dataTransfer.getData("application/reactflow");

      if (!rawType || !(rawType in nodeRegistry)) return;

      const type = rawType as NodeType;

      // Calculate position relative to canvas
      const position = {
        x: event.clientX - 250, // subtract sidebar - approx
        y: event.clientY,
      };

      // Add new node to state
      setNodes((nds) => [
        ...nds,
        {
          id: getId(),
          type,
          position,
          data: nodeRegistry[type].defaultData,
        },
      ]);
    },
    [setNodes],
  );

  //  drag-over for dropping nodes
  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // Update the label of a node -- used by settings panel--
  const updateNodeLabel = useCallback(
    (id: string, value: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, label: value } }
            : node,
        ),
      );
    },
    [setNodes],
  );

  // Handle selection change - open/close settings panel-
  const onSelectionChange = useCallback(({ nodes }: { nodes: Node[] }) => {
    if (nodes.length > 0) {
      setSelectedNodeId(nodes[0]?.id ?? null); // open panel
    } else {
      setSelectedNodeId(null); // close panel
    }
  }, []);

  // Delete a node and its connected edges
  const deleteNode = useCallback(
    (nodeId: string) => {
      // Remove node from state
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));

      // Remove all edges connected to this node
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      );

      // Close settings panel if open
      setSelectedNodeId(null);
    },
    [setNodes, setEdges],
  );

  // Find the currently selected node (if any)
  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;

  return (
    <div className="flex flex-col h-screen">
      <header className="h-14 border-b bg-white flex items-center justify-between px-4">
        <div className="font-semibold text-sm">Chatbot Flow Builder</div>

        {/* SaveButton triggers save and shows success message */}
        <SaveButton
          nodes={nodes}
          edges={edges}
          onSave={() => {
            // Simulate save logic
            console.log("Saving flow...", { nodes, edges });
            // Show success message
            window.alert("Flow saved successfully!");
          }}
        />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar- shows either settings or the node panel */}
        <div className="w-64 border-r bg-gray-50 overflow-y-auto">
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              updateNodeLabel={updateNodeLabel}
              onBack={() => setSelectedNodeId(null)}
              deleteNode={deleteNode}
            />
          ) : (
            <NodesPanel />
          )}
        </div>

        {/*  canvas area */}
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onSelectionChange={onSelectionChange}
            fitView
          >
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default function FlowBuilder() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
