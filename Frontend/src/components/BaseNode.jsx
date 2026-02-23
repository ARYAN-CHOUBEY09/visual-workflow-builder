import { Handle, Position } from "reactflow";
import { useFlowStore } from "../Store/FlowStore";

export default function BaseNode({ id, title, inputs = [], outputs = [], children }) {
  const { setNodes, setEdges, updateNodeData } = useFlowStore();

  const deleteNode = () => {
    setNodes((nodes) => nodes.filter((n) => n.id !== id));
    setEdges((edges) => edges.filter((e) => e.source !== id && e.target !== id));
  };

  return (
    <div className="bg-zinc-900 text-white rounded-lg border border-zinc-700 shadow-sm min-w-[220px] relative">

      <button
        onClick={deleteNode}
        className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 text-sm"
      >
        ✕
      </button>

      <div className="px-3 py-2 border-b border-zinc-700 text-sm font-medium">
        {title}
      </div>

      <div className="p-3 text-sm">
        {children}
      </div>

      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          id={input.id}
          position={Position.Left}
          style={{ top: 50 + index * 22 }}
          className="w-3 h-3 bg-purple-500"
        />
      ))}

      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          id={output.id}
          position={Position.Right}
          style={{ top: 50 + index * 22 }}
          className="w-3 h-3 bg-purple-500"
        />
      ))}
    </div>
  );
}