import { useState } from "react";
import { useFlowStore } from "../Store/FlowStore";
import { parsePipeline } from "../api/flowApi.js";

export default function SubmitButton() {
  const { nodes, edges } = useFlowStore();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setError(null);
      const data = await parsePipeline(nodes, edges);
      setResult(data);
    } catch (err) {
      setError("Error submitting pipeline");
      setResult(null);
    }
  };

  return (
    <>
    
      <button
        onClick={handleSubmit}
        className="
          absolute bottom-4 right-4 
          bg-purple-600 hover:bg-purple-700 
          px-5 py-2 rounded-xl 
          text-white font-medium 
          shadow-lg shadow-purple-500/30
          transition-all
        "
      >
        Submit Pipeline
      </button>

    
      {result && (
        <div
          className="
            absolute bottom-20 right-4 
            bg-zinc-900/80 backdrop-blur-xl 
            border border-zinc-700 
            text-white p-5 
            rounded-2xl shadow-2xl 
            w-64 animate-fadeIn
          "
        >
        
          <button
            onClick={() => setResult(null)}
            className="absolute top-2 right-2 text-zinc-400 hover:text-white text-sm"
          >
            ✕
          </button>

          <h3 className="font-semibold text-lg mb-3">Pipeline Analysis</h3>

          <div className="space-y-1 text-sm">
            <p>📌 <b>Nodes:</b> {result.num_nodes}</p>
            <p>🔗 <b>Edges:</b> {result.num_edges}</p>
            <p>🧠 <b>Is DAG:</b> {result.is_dag ? "Yes" : "No"}</p>
          </div>
        </div>
      )}

    
      {error && (
        <div
          className="
            absolute bottom-20 right-4 
            bg-red-600/90 text-white 
            p-4 rounded-2xl shadow-xl w-64 
            animate-fadeIn
          "
        >
          <button
            onClick={() => setError(null)}
            className="absolute top-2 right-2 text-white/80 hover:text-white text-sm"
          >
            ✕
          </button>

          <p className="font-semibold">⚠ {error}</p>
        </div>
      )}

    
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </>
  );
}