import BaseNode from "../components/BaseNode";
import { useFlowStore } from "../Store/FlowStore";
import { useEffect } from "react";

export default function MathNode({ id }) {
  const { nodes, edges, updateNodeData } = useFlowStore();


  const inputs = edges.filter((e) => e.target === id);
  const aNode = nodes.find((n) => n.id === inputs[0]?.source);
  const bNode = nodes.find((n) => n.id === inputs[1]?.source);

  const a = Number(aNode?.data?.value ?? 0);
  const b = Number(bNode?.data?.value ?? 0);

  const sum = a + b;
  const diff = a - b;
  const mul = a * b;
  const div = b !== 0 ? a / b : "∞";

 
  useEffect(() => {
    updateNodeData(id, {
      a,
      b,
      sum,
      diff,
      mul,
      div,
    });
  }, [a, b]);

  return (
    <BaseNode
      id={id}
      title="Math"
      inputs={[{ id: "a" }, { id: "b" }]}
      outputs={[{ id: "result" }]}
    >
      <div className="text-white space-y-1">
        <div>A: {a}</div>
        <div>B: {b}</div>
        <div className="font-semibold">Sum: {sum}</div>
        <div>Diff: {diff}</div>
        <div>Mul: {mul}</div>
        <div>Div: {div}</div>
      </div>
    </BaseNode>
  );
}