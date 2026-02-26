import { nodeRegistry } from "../registry/nodeRegistry";
import type { NodeType } from "../registry/nodeRegistry";

const NodesPanel = () => {
  const onDragStart = (
    event: React.DragEvent,
    nodeType: NodeType
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-60 bg-gray-100 p-4 border-r">
      <div className="font-bold mb-3">Nodes</div>

      {Object.entries(nodeRegistry).map(([key, node]) => (
        <div
          key={key}
          draggable
          onDragStart={(event) =>
            onDragStart(event, key as NodeType)
          }
          className="p-2 bg-white shadow rounded cursor-grab mb-2 text-sm"
        >
          {node.label}
        </div>
      ))}
    </aside>
  );
};

export default NodesPanel;