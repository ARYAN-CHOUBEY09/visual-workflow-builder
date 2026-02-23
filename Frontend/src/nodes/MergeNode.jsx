import BaseNode from "../components/BaseNode";
import { useFlowStore } from "../Store/FlowStore";
import { useEffect } from "react";

export default function MergeNode({ id }) {
  const { nodes, edges, updateNodeData } = useFlowStore();

  const incoming = edges.filter((e) => e.target === id);

  const n1 = nodes.find((n) => n.id === incoming[0]?.source);
  const n2 = nodes.find((n) => n.id === incoming[1]?.source);

  const t1 = n1?.data?.text || n1?.data?.value || "";
  const t2 = n2?.data?.text || n2?.data?.value || "";

  const merged = `${t1} ${t2}`.trim();

 
  useEffect(() => {
    updateNodeData(id, { merged });
  }, [t1, t2]);

  return (
    <BaseNode
      id={id}
      title="Merge"
      inputs={[{ id: "t1" }, { id: "t2" }]}
      outputs={[{ id: "output" }]}
    >
      <div className="text-white">{merged}</div>
    </BaseNode>
  );
}