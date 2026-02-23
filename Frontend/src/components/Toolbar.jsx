import { nanoid } from "nanoid";
import { useFlowStore } from "../Store/FlowStore";

export default function Toolbar() {
  const { addNode } = useFlowStore();

  const createNode = (type) => {
    addNode({
      id: nanoid(),
      type,
      position: {
        x: Math.random() * 400 + 150,
        y: Math.random() * 300 + 150,
      },
      data: {},
    });
  };

  const menuItemsTop = [
    { label: "Input", type: "inputNode" },
    { label: "Text", type: "textNode" },
    { label: "Output", type: "outputNode" },
  ];

  const menuItemsBottom = [
    { label: "Math", type: "mathNode" },
    { label: "Merge", type: "mergeNode" },
    { label: "Condition", type: "conditionNode" },
    { label: "JSON", type: "jsonNode" },
    { label: "Delay", type: "delayNode" },
  ];

  return (
    <div className="absolute top-4 left-4 z-50 w-44
      bg-[#0e0e0f]/90 backdrop-blur-xl 
      border border-zinc-800/70 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.6)]
      p-4">

      <h3 className="text-zinc-200 text-sm font-semibold tracking-wide mb-3">
        Nodes
      </h3>

     
      <div className="space-y-1 mb-3">
        {menuItemsTop.map((item) => (
          <button
            key={item.type}
            onClick={() => createNode(item.type)}
            className="
              w-full text-left px-3 py-2 rounded-lg
              bg-zinc-800 hover:bg-zinc-700 
              text-zinc-100 hover:text-white
              transition-all border border-zinc-700/50 
              text-sm shadow-sm
            "
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="border-t border-zinc-700/50 my-3"></div>

      
      <div className="space-y-1">
        {menuItemsBottom.map((item) => (
          <button
            key={item.type}
            onClick={() => createNode(item.type)}
            className="
              w-full text-left px-3 py-2 rounded-lg
              bg-zinc-800 hover:bg-zinc-700 
              text-zinc-100 hover:text-white
              transition-all border border-zinc-700/50 
              text-sm shadow-sm
            "
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}