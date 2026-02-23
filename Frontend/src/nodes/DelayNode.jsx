import BaseNode from "../components/BaseNode";
import { useState, useEffect } from "react";

export default function DelayNode({ id }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <BaseNode
      id={id}
      title="Delay"
      inputs={[{ id: "in" }]}
      outputs={[{ id: "out" }]}
    >
      <div className="text-white">
        {loading ? "Processing..." : "Done ✔"}
      </div>
    </BaseNode>
  );
}