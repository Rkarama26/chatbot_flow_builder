import { Handle, Position } from "@xyflow/react";

const TextNode = ({ data }: any) => {
  return (
    <div className="rounded-xl shadow-md bg-white w-56 overflow-hidden border border-gray-200">
      <Handle
        type="target"
        position={Position.Top}
        className="bg-gray-400! w-3! h-3!"
      />


      <div className="bg-emerald-400 text-white px-3 py-2 flex items-center justify-between text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-white/30 px-1.5 py-0.5 rounded"></span>
          <span>Send Message</span>
        </div>

        <div className="w-2 h-2 rounded-full bg-white" />
      </div>

      <div className="px-3 py-3 text-sm text-gray-700">{data.label}</div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="bg-gray-400! w-3! h-3!"
      />
    </div>
  );
};

export default TextNode;
