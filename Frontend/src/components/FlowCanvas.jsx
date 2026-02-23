import { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import { useFlowStore } from "../Store/FlowStore";

import InputNode from "../nodes/InputNode";
import TextNode from "../nodes/TextNode";
import OutputNode from "../nodes/OutputNode";

import MathNode from "../nodes/MathNode";
import MergeNode from "../nodes/MergeNode";
import ConditionNode from "../nodes/ConditionNode";
import JSONNode from "../nodes/JSONNode";
import DelayNode from "../nodes/DelayNode";

import Toolbar from "./Toolbar";
import SubmitButton from "./SubmitButton";

const nodeTypes = {
  inputNode: (props) => <InputNode {...props} />,
  textNode: (props) => <TextNode {...props} />,
  outputNode: (props) => <OutputNode {...props} />,

  mathNode: (props) => <MathNode {...props} />,
  mergeNode: (props) => <MergeNode {...props} />,
  conditionNode: (props) => <ConditionNode {...props} />,
  jsonNode: (props) => <JSONNode {...props} />,
  delayNode: (props) => <DelayNode {...props} />,
};

export default function FlowCanvas() {
  const { nodes, edges, setNodes, setEdges } = useFlowStore();

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodesDelete = useCallback(
    (deleted) => setNodes((nds) => nds.filter((n) => !deleted.some((d) => d.id === n.id))),
    [setNodes]
  );

  const onEdgesDelete = useCallback(
    (deleted) => setEdges((eds) => eds.filter((e) => !deleted.some((d) => d.id === e.id))),
    [setEdges]
  );

  return (
    <div className="h-screen bg-zinc-950 relative">
      <Toolbar />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <SubmitButton />
    </div>
  );
}