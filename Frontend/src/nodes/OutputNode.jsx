import BaseNode from "../components/BaseNode";
import { useFlowStore } from "../Store/FlowStore";
import { useEffect } from "react";

export default function OutputNode({ id }) {
  const { nodes, edges, updateNodeData } = useFlowStore();

  const incoming = edges.find((e) => e.target === id);
  const sourceNode = nodes.find((n) => n.id === incoming?.source);

  let finalText = sourceNode?.data?.text || 
                  sourceNode?.data?.value || 
                  sourceNode?.data?.sum || 
                  "";

  const variables = sourceNode?.data?.variables || [];

  variables.forEach((v) => {
    const varEdge = edges.find(
      (e) => e.target === sourceNode?.id && e.sourceHandle === v
    );

    const inputNode = nodes.find((n) => n.id === varEdge?.source);

    const value = inputNode?.data?.value || "";
    const regex = new RegExp(`{{\\s*${v}\\s*}}`, "g");

    finalText = finalText.replace(regex, value);
  });


  useEffect(() => {
    updateNodeData(id, { output: finalText });
  }, [finalText]);

  return (
    <BaseNode id={id} title="Output" inputs={[{ id: "input" }]}>
      <div className="text-white p-2 whitespace-pre-wrap">
        {finalText || "No input received"}
      </div>
    </BaseNode>
  );
}