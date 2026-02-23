import BaseNode from "../components/BaseNode";
import { useFlowStore } from "../Store/FlowStore";
import { useEffect } from "react";

export default function ConditionNode({ id }) {
  const { nodes, edges, updateNodeData } = useFlowStore();

  const incoming = edges.filter((e) => e.target === id);

  const n1 = nodes.find((n) => n.id === incoming[0]?.source);
  const n2 = nodes.find((n) => n.id === incoming[1]?.source);

  const a = Number(
    n1?.data?.value ??
    n1?.data?.text ??
    n1?.data?.sum ??
    n1?.data?.merged ??
    0
  );

  const b = Number(
    n2?.data?.value ??
    n2?.data?.text ??
    n2?.data?.sum ??
    n2?.data?.merged ??
    0
  );

  const result = a > b ? "True" : "False";

 
  useEffect(() => {
    updateNodeData(id, { a, b, result });
  }, [a, b]);

  return (
    <BaseNode
      id={id}
      title="Condition"
      inputs={[{ id: "a" }, { id: "b" }]}
      outputs={[{ id: "result" }]}
    >
      <div className="text-white">
        {a} > {b} → <span className="font-bold">{result}</span>
      </div>
    </BaseNode>
  );
}