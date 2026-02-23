import BaseNode from "../components/BaseNode";
import { useFlowStore } from "../Store/FlowStore";
import { useEffect, useRef } from "react";

export default function TextNode({ id, data }) {
  const { setNodes } = useFlowStore();
  const textareaRef = useRef();


  const extractVariables = (text) => {
    const regex = /{{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*}}/g;
    let vars = new Set();
    let match;

    while ((match = regex.exec(text))) {
      vars.add(match[1]);
    }
    return Array.from(vars);
  };

  // Auto resize
  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleChange = (e) => {
    const text = e.target.value;
    autoResize();

    const variables = extractVariables(text);

    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === id
          ? {
              ...n,
              data: { ...n.data, text, variables },
            }
          : n
      )
    );
  };

  useEffect(() => {
    autoResize();
  }, []);

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={(data?.variables || []).map((v) => ({ id: v }))}
      outputs={[{ id: "output" }]}
    >
      <textarea
        ref={textareaRef}
        value={data?.text || ""}
        onChange={handleChange}
        placeholder="Type here... e.g. Hello {{name}}"
        className="w-full bg-zinc-800 text-white p-2 rounded resize-none overflow-hidden focus:outline-none"
      />
    </BaseNode>
  );
}