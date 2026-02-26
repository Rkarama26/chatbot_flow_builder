import type { Node } from "@xyflow/react";
import type { TextNodeData } from "../registry/nodeRegistry";

interface Props {
  selectedNode: Node<TextNodeData>;
  updateNodeLabel: (id: string, value: string) => void;
  onBack: () => void;
  deleteNode: (id: string) => void;
}

const SettingsPanel = ({
  selectedNode,
  updateNodeLabel,
  onBack,
  deleteNode,
}: Props) => {
  return (
    <aside className="w-64 bg-gray-50 p-4 border-r">
      <button onClick={onBack} className="text-sm text-blue-600 mb-4">
        ← Back
      </button>

      <div className="text-sm font-semibold mb-2">Text Settings</div>

      <input
        type="text"
        value={selectedNode.data.label}
        onChange={(e) => updateNodeLabel(selectedNode.id, e.target.value)}
        className="w-full border p-2 rounded text-sm"
      />
      <button
        onClick={() => deleteNode(selectedNode.id)}
        className="mt-4 w-full bg-red-600 text-white py-2 rounded text-sm"
      >
        Delete Node
      </button>
    </aside>
  );
};

export default SettingsPanel;
