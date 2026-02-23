import BaseNode from "../components/BaseNode";
import { useFlowStore } from "../Store/FlowStore";
import { useEffect } from "react";

export default function JSONNode({ id }) {
  const { nodes, edges, updateNodeData } = useFlowStore();

  const incoming = edges.find((e) => e.target === id);
  const srcNode = nodes.find((n) => n.id === incoming?.source);

  const raw =
    srcNode?.data?.value ??
    srcNode?.data?.text ??
    srcNode?.data?.output ??
    srcNode?.data?.merged ??
    "";

  let parsed = "Invalid JSON";
  let parsedObj = null;

  try {
    parsedObj = JSON.parse(raw);
    parsed = JSON.stringify(parsedObj, null, 2);
  } catch (err) {}

 
  useEffect(() => {
    updateNodeData(id, { json: parsedObj, raw });
  }, [raw]);

  return (
    <BaseNode
      id={id}
      title="JSON Viewer"
      inputs={[{ id: "json" }]}
      outputs={[]}
    >
      <pre className="text-white text-xs whitespace-pre-wrap">
        {parsed}
      </pre>
    </BaseNode>
  );
}