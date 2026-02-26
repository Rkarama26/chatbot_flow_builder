import type { Node, Edge } from "@xyflow/react";

import { useState } from "react";
import { validateFlow } from "../validate/validateFlow";

interface Props {
  nodes: Node[];
  edges: Edge[];
  onSave: () => void;
}

const SaveButton = ({ nodes, edges, onSave }: Props) => {
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const result = validateFlow(nodes, edges);

    if (!result.isValid) {
      setError(result.error ?? "Invalid flow");
      return;
    }

    setError(null);
    onSave();
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
      >
        Save Flow
      </button>

      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default SaveButton;
