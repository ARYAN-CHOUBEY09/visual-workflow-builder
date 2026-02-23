import BaseNode from "../components/BaseNode";
import { useFlowStore } from "../Store/FlowStore";

export default function InputNode({ id, data }) {
  const { setNodes } = useFlowStore();

  const handleChange = (e) => {
    const value = e.target.value;

    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, value } } : n
      )
    );
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      outputs={[{ id: "output" }]}
    >
      <input
        value={data?.value || ""}
        onChange={handleChange}
        placeholder="Enter value..."
        className="w-full bg-zinc-800 text-white p-2 rounded focus:outline-none"
      />
    </BaseNode>
  );
}